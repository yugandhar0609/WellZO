from django.urls import path
from .views import (
    UserRegistrationView, VerifyOTPView, LoginView,
    UserProfileView, GoogleLoginView, RequestPasswordResetOTPView,
    ConfirmPasswordResetView, DeleteUserAccountView, ExtendSessionView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('request-password-reset/', RequestPasswordResetOTPView.as_view(), name='request-password-reset'),
    path('confirm-password-reset/', ConfirmPasswordResetView.as_view(), name='confirm-password-reset'),
    path('delete-account/', DeleteUserAccountView.as_view(), name='delete-account'),
    path('extend-session/', ExtendSessionView.as_view(), name='extend-session'),
]
