from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import get_user_model
from django.db.models import Q, Count, Avg, Case, When, IntegerField, Prefetch, F
from django.db import transaction
from django.utils import timezone
from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from datetime import datetime, timedelta
import json

from .models import (
    Post, PostMedia, PostMetrics, Hashtag, PostHashtag, Reaction, Comment,
    CommentLike, Follow, Bookmark, Share, Message, UserProfile, Report,
    Notification, PostView
)
from .serializers import (
    PostSerializer, CreatePostSerializer, ReactionSerializer, CommentSerializer,
    FollowSerializer, MessageSerializer, CreateMessageSerializer, UserProfileSerializer,
    NotificationSerializer, TrendingTopicSerializer, SuggestedUserSerializer,
    CommunityStatsSerializer, UserBasicSerializer
)

User = get_user_model()

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

# ===================== POST VIEWS =====================

class PostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        post_type = self.request.query_params.get('type', None)
        sort_by = self.request.query_params.get('sort', 'recent')  # recent, trending, popular
        
        # Optimized queryset with prefetch
        queryset = Post.objects.select_related('user').prefetch_related(
            'media',
            'metrics',
            Prefetch('posthashtag_set', queryset=PostHashtag.objects.select_related('hashtag')),
            Prefetch('reactions', queryset=Reaction.objects.filter(user=user)),
            Prefetch('bookmarks', queryset=Bookmark.objects.filter(user=user)),
            Prefetch('comments', queryset=Comment.objects.filter(parent=None).select_related('user'))
        )
        
        # Filter by type
        if post_type and post_type != 'all':
            queryset = queryset.filter(type=post_type)
        
        # Apply sorting
        if sort_by == 'trending':
            queryset = queryset.order_by('-engagement_score', '-created_at')
        elif sort_by == 'popular':
            queryset = queryset.order_by('-likes_count', '-loves_count', '-created_at')
        else:  # recent
            queryset = queryset.order_by('-created_at')
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        # Track user activity for feed algorithm
        cache_key = f"user_activity_{request.user.id}"
        cache.set(cache_key, timezone.now(), 300)  # 5 minutes
        
        return super().list(request, *args, **kwargs)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_post(request):
    """Create a new post with media and hashtags"""
    serializer = CreatePostSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        try:
            with transaction.atomic():
                post = serializer.save()
                
                # Update user post count
                profile, created = UserProfile.objects.get_or_create(user=request.user)
                profile.posts_count = F('posts_count') + 1
                profile.save()
                
                # Create notification for followers
                followers = Follow.objects.filter(following=request.user).select_related('follower')
                notifications = []
                for follow in followers:
                    user_name = request.user.name.split()[0] if request.user.name else request.user.email.split('@')[0]
                    notifications.append(Notification(
                        user=follow.follower,
                        notification_type='post',
                        title=f"New post from {user_name}",
                        message=f"{user_name} shared a new {post.type} post",
                        post=post,
                        from_user=request.user
                    ))
                
                if notifications:
                    Notification.objects.bulk_create(notifications)
                
                # Return created post
                response_serializer = PostSerializer(post, context={'request': request})
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            return Response(
                {'error': 'Failed to create post', 'details': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_reaction(request, post_id):
    """Toggle reaction on a post (like, love, motivate)"""
    try:
        post = Post.objects.get(id=post_id)
        reaction_type = request.data.get('reaction_type')
        
        if reaction_type not in ['liked', 'loved', 'motivated']:
            return Response(
                {'error': 'Invalid reaction type'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        with transaction.atomic():
            # Check if user already reacted
            existing_reaction = Reaction.objects.filter(user=request.user, post=post).first()
            
            if existing_reaction:
                if existing_reaction.reaction_type == reaction_type:
                    # Remove reaction
                    existing_reaction.delete()
                    
                    # Update post counts
                    if reaction_type == 'liked':
                        post.likes_count = F('likes_count') - 1
                    elif reaction_type == 'loved':
                        post.loves_count = F('loves_count') - 1
                    elif reaction_type == 'motivated':
                        post.motivates_count = F('motivates_count') - 1
                    
                    post.save()
                    post.refresh_from_db()
                    
                    # Recalculate engagement score
                    post.calculate_engagement_score()
                    post.save()
                    
                    return Response({'message': 'Reaction removed'}, status=status.HTTP_200_OK)
                else:
                    # Update existing reaction
                    # First decrease old count
                    if existing_reaction.reaction_type == 'liked':
                        post.likes_count = F('likes_count') - 1
                    elif existing_reaction.reaction_type == 'loved':
                        post.loves_count = F('loves_count') - 1
                    elif existing_reaction.reaction_type == 'motivated':
                        post.motivates_count = F('motivates_count') - 1
                    
                    # Then increase new count
                    if reaction_type == 'liked':
                        post.likes_count = F('likes_count') + 1
                    elif reaction_type == 'loved':
                        post.loves_count = F('loves_count') + 1
                    elif reaction_type == 'motivated':
                        post.motivates_count = F('motivates_count') + 1
                    
                    existing_reaction.reaction_type = reaction_type
                    existing_reaction.save()
            else:
                # Create new reaction
                Reaction.objects.create(
                    user=request.user,
                    post=post,
                    reaction_type=reaction_type
                )
                
                # Update post counts
                if reaction_type == 'liked':
                    post.likes_count = F('likes_count') + 1
                elif reaction_type == 'loved':
                    post.loves_count = F('loves_count') + 1
                elif reaction_type == 'motivated':
                    post.motivates_count = F('motivates_count') + 1
            
            post.save()
            post.refresh_from_db()
            
            # Recalculate engagement score
            post.calculate_engagement_score()
            post.save()
            
            # Create notification for post owner (if not self)
            if post.user != request.user:
                Notification.objects.create(
                    user=post.user,
                    notification_type=reaction_type,
                    title=f"Your post was {reaction_type}!",
                    message=f"{request.user.name} {reaction_type} your {post.type} post",
                    post=post,
                    from_user=request.user
                )
            
            return Response({'message': 'Reaction updated'}, status=status.HTTP_200_OK)
            
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(
            {'error': 'Failed to update reaction', 'details': str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_bookmark(request, post_id):
    """Toggle bookmark on a post"""
    try:
        post = Post.objects.get(id=post_id)
        
        bookmark, created = Bookmark.objects.get_or_create(
            user=request.user, 
            post=post
        )
        
        if not created:
            bookmark.delete()
            post.bookmarks_count = F('bookmarks_count') - 1
            post.save()
            return Response({'message': 'Bookmark removed', 'bookmarked': False})
        else:
            post.bookmarks_count = F('bookmarks_count') + 1
            post.save()
            return Response({'message': 'Post bookmarked', 'bookmarked': True})
            
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def share_post(request, post_id):
    """Share a post"""
    try:
        post = Post.objects.get(id=post_id)
        
        # Create share record
        Share.objects.create(user=request.user, post=post)
        
        # Update post count
        post.shares_count = F('shares_count') + 1
        post.save()
        post.refresh_from_db()
        
        # Recalculate engagement score
        post.calculate_engagement_score()
        post.save()
        
        # Create notification for post owner (if not self)
        if post.user != request.user:
            Notification.objects.create(
                user=post.user,
                notification_type='share',
                title=f"Your post was shared!",
                message=f"{request.user.name} shared your {post.type} post",
                post=post,
                from_user=request.user
            )
        
        return Response({'message': 'Post shared successfully'})
        
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

# ===================== COMMENT VIEWS =====================

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_post_comments(request, post_id):
    """Get comments for a specific post"""
    try:
        post = Post.objects.get(id=post_id)
        comments = Comment.objects.filter(post=post, parent=None).select_related('user').prefetch_related(
            Prefetch('replies', queryset=Comment.objects.select_related('user'))
        ).order_by('created_at')
        
        page = request.query_params.get('page', 1)
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(comments, request)
        
        serializer = CommentSerializer(result_page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)
        
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_comment(request, post_id):
    """Create a comment on a post"""
    try:
        post = Post.objects.get(id=post_id)
        content = request.data.get('content')
        parent_id = request.data.get('parent_id')
        
        if not content or not content.strip():
            return Response({'error': 'Comment content is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        parent = None
        if parent_id:
            try:
                parent = Comment.objects.get(id=parent_id, post=post)
            except Comment.DoesNotExist:
                return Response({'error': 'Parent comment not found'}, status=status.HTTP_404_NOT_FOUND)
        
        with transaction.atomic():
            comment = Comment.objects.create(
                user=request.user,
                post=post,
                parent=parent,
                content=content.strip()
            )
            
            # Update post comment count
            post.comments_count = F('comments_count') + 1
            post.save()
            post.refresh_from_db()
            
            # Recalculate engagement score
            post.calculate_engagement_score()
            post.save()
            
            # Create notification for post owner (if not self)
            if post.user != request.user:
                Notification.objects.create(
                    user=post.user,
                    notification_type='comment',
                    title=f"New comment on your post",
                    message=f"{request.user.name} commented on your {post.type} post",
                    post=post,
                    comment=comment,
                    from_user=request.user
                )
            
            serializer = CommentSerializer(comment, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

# ===================== FOLLOW VIEWS =====================

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_follow(request, user_id):
    """Follow/unfollow a user"""
    try:
        target_user = User.objects.get(id=user_id)
        
        if target_user == request.user:
            return Response({'error': 'Cannot follow yourself'}, status=status.HTTP_400_BAD_REQUEST)
        
        follow, created = Follow.objects.get_or_create(
            follower=request.user,
            following=target_user
        )
        
        with transaction.atomic():
            if not created:
                # Unfollow
                follow.delete()
                
                # Update counts
                follower_profile, _ = UserProfile.objects.get_or_create(user=request.user)
                following_profile, _ = UserProfile.objects.get_or_create(user=target_user)
                
                follower_profile.following_count = F('following_count') - 1
                following_profile.followers_count = F('followers_count') - 1
                
                follower_profile.save()
                following_profile.save()
                
                return Response({'message': 'Unfollowed successfully', 'following': False})
            else:
                # Follow
                # Update counts
                follower_profile, _ = UserProfile.objects.get_or_create(user=request.user)
                following_profile, _ = UserProfile.objects.get_or_create(user=target_user)
                
                follower_profile.following_count = F('following_count') + 1
                following_profile.followers_count = F('followers_count') + 1
                
                follower_profile.save()
                following_profile.save()
                
                # Create notification
                Notification.objects.create(
                    user=target_user,
                    notification_type='follow',
                    title=f"New follower!",
                    message=f"{request.user.name} started following you",
                    from_user=request.user
                )
                
                return Response({'message': 'Followed successfully', 'following': True})
        
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_suggested_users(request):
    """Get suggested users to follow"""
    # Get users that current user is not following
    following_ids = Follow.objects.filter(follower=request.user).values_list('following_id', flat=True)
    excluded_ids = list(following_ids) + [request.user.id]
    
    # Find users with mutual connections
    suggested_users = UserProfile.objects.select_related('user').exclude(
        user_id__in=excluded_ids
    ).annotate(
        mutual_count=Count('user__followers', filter=Q(user__followers__follower__in=following_ids))
    ).order_by('-mutual_count', '-followers_count')[:10]
    
    serializer = SuggestedUserSerializer(suggested_users, many=True, context={'request': request})
    return Response(serializer.data)

# ===================== COMMUNITY DATA VIEWS =====================

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_community_stats(request):
    """Get community statistics"""
    cache_key = 'community_stats'
    stats = cache.get(cache_key)
    
    if not stats:
        today = timezone.now().date()
        week_ago = today - timedelta(days=7)
        
        total_posts = Post.objects.count()
        total_users = User.objects.count()
        posts_today = Post.objects.filter(created_at__date=today).count()
        posts_this_week = Post.objects.filter(created_at__date__gte=week_ago).count()
        posts_last_week = Post.objects.filter(
            created_at__date__gte=week_ago - timedelta(days=7),
            created_at__date__lt=week_ago
        ).count()
        
        # Calculate engagement rate
        recent_posts = Post.objects.filter(created_at__gte=timezone.now() - timedelta(days=7))
        if recent_posts.exists():
            avg_engagement = recent_posts.aggregate(
                avg_likes=Avg('likes_count'),
                avg_comments=Avg('comments_count'),
                avg_shares=Avg('shares_count')
            )
            engagement_rate = (
                (avg_engagement['avg_likes'] or 0) + 
                (avg_engagement['avg_comments'] or 0) * 2 + 
                (avg_engagement['avg_shares'] or 0) * 3
            ) / 10
        else:
            engagement_rate = 0
        
        # Find trending category
        trending_category = Post.objects.filter(
            created_at__gte=timezone.now() - timedelta(days=7)
        ).values('type').annotate(
            count=Count('id')
        ).order_by('-count').first()
        
        # Calculate weekly growth
        if posts_last_week > 0:
            growth_rate = ((posts_this_week - posts_last_week) / posts_last_week) * 100
            weekly_growth = f"+{growth_rate:.1f}%" if growth_rate > 0 else f"{growth_rate:.1f}%"
        else:
            weekly_growth = "+100%" if posts_this_week > 0 else "0%"
        
        stats = {
            'total_posts': total_posts,
            'total_users': total_users,
            'posts_today': posts_today,
            'engagement_rate': round(engagement_rate, 1),
            'trending_category': trending_category['type'].title() if trending_category else 'Wellness',
            'weekly_growth': weekly_growth
        }
        
        # Cache for 5 minutes
        cache.set(cache_key, stats, 300)
    
    serializer = CommunityStatsSerializer(stats)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_trending_topics(request):
    """Get trending hashtags"""
    cache_key = 'trending_topics'
    topics = cache.get(cache_key)
    
    if not topics:
        # Get hashtags from recent posts
        recent_hashtags = Hashtag.objects.filter(
            posthashtag__created_at__gte=timezone.now() - timedelta(days=7)
        ).annotate(
            recent_posts=Count('posthashtag')
        ).order_by('-recent_posts', '-posts_count')[:10]
        
        topics = TrendingTopicSerializer(recent_hashtags, many=True).data
        
        # Cache for 10 minutes
        cache.set(cache_key, topics, 600)
    
    return Response(topics)

# ===================== DISCOVER PAGE VIEWS =====================

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def discover_posts(request):
    """Get posts for discover page with search and filters"""
    search_query = request.query_params.get('search', '').strip()
    category = request.query_params.get('category', 'all')
    sort_by = request.query_params.get('sort', 'trending')
    
    queryset = Post.objects.select_related('user').prefetch_related(
        'media',
        'metrics',
        Prefetch('posthashtag_set', queryset=PostHashtag.objects.select_related('hashtag')),
        Prefetch('reactions', queryset=Reaction.objects.filter(user=request.user)),
        Prefetch('bookmarks', queryset=Bookmark.objects.filter(user=request.user)),
    )
    
    # Apply search
    if search_query:
        queryset = queryset.filter(
            Q(content__icontains=search_query) |
            Q(posthashtag__hashtag__name__icontains=search_query.replace('#', ''))
        ).distinct()
    
    # Apply category filter
    if category != 'all':
        queryset = queryset.filter(type=category)
    
    # Apply sorting
    if sort_by == 'trending':
        queryset = queryset.order_by('-engagement_score', '-created_at')
    elif sort_by == 'popular':
        queryset = queryset.order_by('-likes_count', '-loves_count', '-created_at')
    elif sort_by == 'discussed':
        queryset = queryset.order_by('-comments_count', '-created_at')
    else:  # recent
        queryset = queryset.order_by('-created_at')
    
    paginator = StandardResultsSetPagination()
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = PostSerializer(result_page, many=True, context={'request': request})
    
    return paginator.get_paginated_response(serializer.data)

# ===================== REAL-TIME NOTIFICATIONS =====================

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_notifications(request):
    """Get user notifications"""
    notifications = Notification.objects.filter(user=request.user).select_related(
        'from_user', 'post', 'comment'
    ).order_by('-created_at')
    
    # Mark as read
    unread_ids = request.query_params.get('mark_read', '').split(',')
    if unread_ids and unread_ids[0]:
        Notification.objects.filter(
            id__in=unread_ids, 
            user=request.user
        ).update(is_read=True)
    
    paginator = StandardResultsSetPagination()
    result_page = paginator.paginate_queryset(notifications, request)
    serializer = NotificationSerializer(result_page, many=True, context={'request': request})
    
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_unread_count(request):
    """Get count of unread notifications"""
    count = Notification.objects.filter(user=request.user, is_read=False).count()
    return Response({'unread_count': count})