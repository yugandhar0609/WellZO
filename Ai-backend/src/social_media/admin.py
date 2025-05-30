from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Post, PostMedia, PostMetrics, Hashtag, PostHashtag, Reaction, Comment,
    CommentLike, Follow, Bookmark, Share, Message, UserProfile, Report,
    Notification, PostView
)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'posts_count', 'followers_count', 'following_count', 'is_verified']
    list_filter = ['is_verified', 'created_at']
    search_fields = ['user__username', 'user__first_name', 'user__last_name']
    readonly_fields = ['created_at', 'updated_at']

class PostMediaInline(admin.TabularInline):
    model = PostMedia
    extra = 0

class PostMetricsInline(admin.StackedInline):
    model = PostMetrics
    extra = 0

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'type', 'content_preview', 'likes_count', 'comments_count', 'created_at']
    list_filter = ['type', 'created_at', 'user']
    search_fields = ['content', 'user__username']
    readonly_fields = ['id', 'created_at', 'updated_at', 'engagement_score']
    inlines = [PostMediaInline, PostMetricsInline]
    
    def content_preview(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content Preview'

@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = ['name', 'posts_count', 'trending_score', 'created_at']
    search_fields = ['name']
    readonly_fields = ['created_at']
    ordering = ['-trending_score', '-posts_count']

@admin.register(Reaction)
class ReactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'post', 'reaction_type', 'created_at']
    list_filter = ['reaction_type', 'created_at']
    search_fields = ['user__username', 'post__content']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'post', 'parent', 'content_preview', 'likes_count', 'created_at']
    list_filter = ['created_at']
    search_fields = ['content', 'user__username']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    def content_preview(self, obj):
        return obj.content[:30] + "..." if len(obj.content) > 30 else obj.content
    content_preview.short_description = 'Content Preview'

@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ['follower', 'following', 'created_at']
    list_filter = ['created_at']
    search_fields = ['follower__username', 'following__username']

@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ['user', 'post', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'post__content']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['sender', 'recipient', 'content_preview', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['sender__username', 'recipient__username', 'content']
    readonly_fields = ['id', 'created_at']
    
    def content_preview(self, obj):
        return obj.content[:30] + "..." if len(obj.content) > 30 else obj.content
    content_preview.short_description = 'Content Preview'

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'notification_type', 'title', 'is_read', 'created_at']
    list_filter = ['notification_type', 'is_read', 'created_at']
    search_fields = ['user__username', 'title', 'message']
    readonly_fields = ['id', 'created_at']

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['reporter', 'reason', 'get_reported_content', 'is_resolved', 'created_at']
    list_filter = ['reason', 'is_resolved', 'created_at']
    search_fields = ['reporter__username', 'description']
    readonly_fields = ['created_at']
    
    def get_reported_content(self, obj):
        if obj.post:
            return f"Post: {obj.post.content[:30]}..."
        elif obj.comment:
            return f"Comment: {obj.comment.content[:30]}..."
        elif obj.user_reported:
            return f"User: {obj.user_reported.username}"
        return "N/A"
    get_reported_content.short_description = 'Reported Content'

# Register remaining models with basic admin
admin.site.register(PostMedia)
admin.site.register(PostMetrics)
admin.site.register(PostHashtag)
admin.site.register(CommentLike)
admin.site.register(Share)
admin.site.register(PostView)
