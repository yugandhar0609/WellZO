from django.urls import path
from .views import RegisterView, LoginView, UserProfileView, GoogleLoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
]
