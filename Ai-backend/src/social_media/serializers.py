from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import Exists, OuterRef
from .models import (
    Post, PostMedia, PostMetrics, Hashtag, PostHashtag, Reaction, Comment,
    CommentLike, Follow, Bookmark, Share, Message, UserProfile, Report,
    Notification
)

User = get_user_model()

class UserBasicSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    verified = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'username', 'first_name', 'last_name', 'avatar', 'verified', 'title']
    
    def get_username(self, obj):
        # Generate username from email (part before @)
        return obj.email.split('@')[0] if obj.email else f"user_{obj.id}"
    
    def get_first_name(self, obj):
        # Split name into first and last name
        if obj.name:
            name_parts = obj.name.split()
            return name_parts[0] if name_parts else ''
        return ''
    
    def get_last_name(self, obj):
        # Split name into first and last name
        if obj.name:
            name_parts = obj.name.split()
            return ' '.join(name_parts[1:]) if len(name_parts) > 1 else ''
        return ''
    
    def get_avatar(self, obj):
        # Try to get avatar from profile_picture_url first, then generate one
        if hasattr(obj, 'profile_picture_url') and obj.profile_picture_url:
            return obj.profile_picture_url
        
        # Try to get from social profile
        try:
            if hasattr(obj, 'social_profile') and obj.social_profile.avatar_url:
                return obj.social_profile.avatar_url
        except:
            pass
        
        # Generate avatar using name
        name = obj.name or f"User {obj.id}"
        return f"https://ui-avatars.com/api/?name={name.replace(' ', '+')}&background=10b981&color=ffffff"
    
    def get_verified(self, obj):
        # Check if user is verified
        if hasattr(obj, 'is_verified'):
            return obj.is_verified
        
        # Try to get from social profile
        try:
            return obj.social_profile.is_verified
        except:
            return False
    
    def get_title(self, obj):
        # You can customize this based on user role or profile
        if hasattr(obj, 'role') and obj.role:
            role_map = {
                'student': 'Student',
                'pg_owner': 'PG Owner',
                'admin': 'Admin'
            }
            return role_map.get(obj.role, 'Community Member')
        return "Community Member"

class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = ['id', 'media_type', 'file_url', 'thumbnail_url', 'order']

class PostMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMetrics
        fields = ['data']

class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = ['name', 'posts_count', 'trending_score']

class CommentSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = [
            'id', 'user', 'content', 'created_at', 'updated_at',
            'likes_count', 'replies', 'user_liked'
        ]
    
    def get_replies(self, obj):
        if hasattr(obj, 'replies'):
            return CommentSerializer(obj.replies.all()[:3], many=True, context=self.context).data
        return []
    
    def get_user_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return CommentLike.objects.filter(user=request.user, comment=obj).exists()
        return False

class PostSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)
    media = PostMediaSerializer(many=True, read_only=True)
    metrics = PostMetricsSerializer(read_only=True)
    tags = serializers.SerializerMethodField()
    reactions = serializers.SerializerMethodField()
    bookmarked = serializers.SerializerMethodField()
    comments_preview = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = [
            'id', 'user', 'type', 'content', 'created_at', 'timestamp',
            'likes_count', 'loves_count', 'motivates_count', 'comments_count',
            'shares_count', 'bookmarks_count', 'views_count', 'media',
            'metrics', 'tags', 'reactions', 'bookmarked', 'comments_preview'
        ]
    
    def get_tags(self, obj):
        return list(obj.posthashtag_set.select_related('hashtag').values_list('hashtag__name', flat=True))
    
    def get_reactions(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                user_reaction = obj.reactions.get(user=request.user)
                return {
                    'liked': user_reaction.reaction_type == 'liked',
                    'loved': user_reaction.reaction_type == 'loved',
                    'motivated': user_reaction.reaction_type == 'motivated'
                }
            except Reaction.DoesNotExist:
                pass
        
        return {'liked': False, 'loved': False, 'motivated': False}
    
    def get_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Bookmark.objects.filter(user=request.user, post=obj).exists()
        return False
    
    def get_comments_preview(self, obj):
        # Get the first 2 comments that are already prefetched
        comments = [comment for comment in obj.comments.all() if comment.parent is None][:2]
        return CommentSerializer(comments, many=True, context=self.context).data
    
    def get_timestamp(self, obj):
        from django.utils import timezone
        from django.utils.timesince import timesince
        return timesince(obj.created_at, timezone.now()) + " ago"

class CreatePostSerializer(serializers.ModelSerializer):
    media_files = serializers.ListField(
        child=serializers.FileField(), 
        write_only=True, 
        required=False
    )
    hashtags = serializers.ListField(
        child=serializers.CharField(max_length=100), 
        write_only=True, 
        required=False
    )
    metrics_data = serializers.JSONField(write_only=True, required=False)
    
    class Meta:
        model = Post
        fields = ['type', 'content', 'media_files', 'hashtags', 'metrics_data']
    
    def to_internal_value(self, data):
        # Handle hashtags sent as separate form fields
        if hasattr(data, 'getlist'):
            # FormData format - get all hashtag values
            hashtags = data.getlist('hashtags')
            if hashtags:
                # Convert to a proper list for the serializer
                mutable_data = data.copy()
                mutable_data.setlist('hashtags', hashtags)
                data = mutable_data
        
        return super().to_internal_value(data)
    
    def create(self, validated_data):
        media_files = validated_data.pop('media_files', [])
        hashtags = validated_data.pop('hashtags', [])
        metrics_data = validated_data.pop('metrics_data', {})
        
        # Handle hashtags from request if not in validated_data
        if not hashtags and hasattr(self.context['request'], 'data'):
            request_data = self.context['request'].data
            if hasattr(request_data, 'getlist'):
                hashtags = request_data.getlist('hashtags')
        
        # Create post
        post = Post.objects.create(user=self.context['request'].user, **validated_data)
        
        # Handle media files (you'll need to implement file upload logic)
        for i, media_file in enumerate(media_files):
            # This is a placeholder - implement actual file upload
            PostMedia.objects.create(
                post=post,
                media_type='image' if media_file.content_type.startswith('image') else 'video',
                file_url=f"/media/posts/{post.id}/{media_file.name}",  # Implement proper upload
                order=i
            )
        
        # Handle hashtags
        for hashtag_name in hashtags:
            if hashtag_name.startswith('#'):
                hashtag_name = hashtag_name[1:]
            
            hashtag, created = Hashtag.objects.get_or_create(name=hashtag_name)
            PostHashtag.objects.create(post=post, hashtag=hashtag)
            
            # Update hashtag count
            hashtag.posts_count += 1
            hashtag.save()
        
        # Handle metrics
        if metrics_data:
            PostMetrics.objects.create(post=post, data=metrics_data)
        
        return post

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ['reaction_type']

class FollowSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(source='following', read_only=True)
    
    class Meta:
        model = Follow
        fields = ['user', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserBasicSerializer(read_only=True)
    recipient = UserBasicSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'content', 'created_at', 'is_read']

class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['recipient', 'content']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)
    is_following = serializers.SerializerMethodField()
    is_followed_by = serializers.SerializerMethodField()
    mutual_connections = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProfile
        fields = [
            'user', 'bio', 'avatar_url', 'is_verified', 'wellness_goals',
            'posts_count', 'followers_count', 'following_count',
            'is_following', 'is_followed_by', 'mutual_connections'
        ]
    
    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated and request.user != obj.user:
            return Follow.objects.filter(follower=request.user, following=obj.user).exists()
        return False
    
    def get_is_followed_by(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated and request.user != obj.user:
            return Follow.objects.filter(follower=obj.user, following=request.user).exists()
        return False
    
    def get_mutual_connections(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated and request.user != obj.user:
            # Find users that both the current user and profile user follow
            current_user_following = Follow.objects.filter(follower=request.user).values_list('following', flat=True)
            profile_user_following = Follow.objects.filter(follower=obj.user).values_list('following', flat=True)
            mutual = set(current_user_following) & set(profile_user_following)
            return len(mutual)
        return 0

class NotificationSerializer(serializers.ModelSerializer):
    from_user = UserBasicSerializer(read_only=True)
    
    class Meta:
        model = Notification
        fields = [
            'id', 'notification_type', 'title', 'message', 'from_user',
            'is_read', 'created_at'
        ]

class TrendingTopicSerializer(serializers.ModelSerializer):
    growth = serializers.SerializerMethodField()
    
    class Meta:
        model = Hashtag
        fields = ['name', 'posts_count', 'growth']
    
    def get_growth(self, obj):
        # Calculate growth percentage (placeholder logic)
        return f"+{min(25, max(5, obj.trending_score * 10))}%"

class SuggestedUserSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)
    mutual_connections = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProfile
        fields = ['user', 'mutual_connections', 'is_following']
    
    def get_mutual_connections(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            current_user_following = Follow.objects.filter(follower=request.user).values_list('following', flat=True)
            suggested_user_followers = Follow.objects.filter(following=obj.user).values_list('follower', flat=True)
            mutual = set(current_user_following) & set(suggested_user_followers)
            return len(mutual)
        return 0
    
    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Follow.objects.filter(follower=request.user, following=obj.user).exists()
        return False

class CommunityStatsSerializer(serializers.Serializer):
    total_posts = serializers.IntegerField()
    total_users = serializers.IntegerField()
    posts_today = serializers.IntegerField()
    engagement_rate = serializers.FloatField()
    trending_category = serializers.CharField()
    weekly_growth = serializers.CharField() 