from django.urls import path
from . import views

urlpatterns = [
    # Post endpoints
    path('posts/', views.PostListView.as_view(), name='post_list'),
    path('posts/create/', views.create_post, name='create_post'),
    path('posts/<uuid:post_id>/reaction/', views.toggle_reaction, name='toggle_reaction'),
    path('posts/<uuid:post_id>/bookmark/', views.toggle_bookmark, name='toggle_bookmark'),
    path('posts/<uuid:post_id>/share/', views.share_post, name='share_post'),
    
    # Comment endpoints
    path('posts/<uuid:post_id>/comments/', views.get_post_comments, name='post_comments'),
    path('posts/<uuid:post_id>/comments/create/', views.create_comment, name='create_comment'),
    
    # Follow endpoints
    path('users/<int:user_id>/follow/', views.toggle_follow, name='toggle_follow'),
    path('users/suggested/', views.get_suggested_users, name='suggested_users'),
    
    # Community data endpoints
    path('community/stats/', views.get_community_stats, name='community_stats'),
    path('community/trending/', views.get_trending_topics, name='trending_topics'),
    
    # Discover endpoints
    path('discover/', views.discover_posts, name='discover_posts'),
    
    # Notification endpoints
    path('notifications/', views.get_notifications, name='notifications'),
    path('notifications/unread-count/', views.get_unread_count, name='unread_count'),
]
