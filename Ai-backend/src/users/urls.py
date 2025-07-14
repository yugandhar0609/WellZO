from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserRegistrationView,
    VerifyOTPView,
    LoginView,
    UserProfileView,
    GoogleLoginView,
    RequestPasswordResetOTPView, 
    ConfirmPasswordResetView,
    DeleteUserAccountView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('password-reset-request/', RequestPasswordResetOTPView.as_view(), name='password-reset-request'),
    path('password-reset-confirm/', ConfirmPasswordResetView.as_view(), name='password-reset-confirm'),
    path('account/delete/', DeleteUserAccountView.as_view(), name='account-delete'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
