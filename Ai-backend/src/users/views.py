from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from django.core.mail import send_mail
from .serializers import (
    UserRegistrationSerializer,
    VerifyOTPSerializer,
    LoginSerializer, UserProfileSerializer,
    GoogleAuthSerializer, UserSerializer,
    RequestPasswordResetOTPSerializer, ConfirmPasswordResetSerializer
)
from .models import User, UserProfile

def send_otp_email(user_email, otp):
    subject = 'WellZO - Your Account Verification OTP'
    message = f'''
Hello!

Your OTP code for WellZO account verification is: {otp}

This code is valid for {settings.OTP_EXPIRY_MINUTES} minutes.

If you didn't request this code, please ignore this email.

Best regards,
WellZO Team
    '''
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user_email]
    
    try:
        # Check if email settings are configured
        if not settings.EMAIL_HOST_PASSWORD or settings.EMAIL_HOST_PASSWORD == 'xxxx xxxx xxxx xxxx':
            print("Email password not configured. Please set EMAIL_APP_PASSWORD with the Gmail App Password.")
            return False
            
        if not settings.EMAIL_HOST_USER:
            print("Email user not configured. Please set EMAIL_HOST_USER.")
            return False

        print(f"Attempting to send email from {email_from} to {recipient_list}")
        print(f"Using SMTP server: {settings.EMAIL_HOST}:{settings.EMAIL_PORT}")
        
        send_mail(
            subject,
            message,
            email_from,
            recipient_list,
            fail_silently=False
        )
        print(f"✓ OTP email sent successfully to {user_email}")
        return True
    except Exception as e:
        print(f"✗ Error sending OTP email to {user_email}")
        print(f"Error details: {str(e)}")
        print("Email configuration:")
        print(f"- HOST: {settings.EMAIL_HOST}")
        print(f"- PORT: {settings.EMAIL_PORT}")
        print(f"- USER: {settings.EMAIL_HOST_USER}")
        print(f"- TLS: {settings.EMAIL_USE_TLS}")
        print(f"- FROM: {email_from}")
        return False

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def get_or_create_profile(user):
    profile, created = UserProfile.objects.get_or_create(user=user)
    return UserProfileSerializer(profile).data

class UserRegistrationView(APIView):
    def post(self, request):
        try:
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                user.generate_otp()

                # Try to send OTP email
                if send_otp_email(user.email, user.otp):
                    return Response({
                        'success': True,
                        'message': 'User registered successfully. Please check your email for OTP verification.',
                        'email': user.email
                    }, status=status.HTTP_201_CREATED)
                else:
                    # If email fails, still return success but with a warning
                    return Response({
                        'success': True,
                        'message': 'User registered successfully but failed to send OTP email. Please try again or contact support.',
                        'email': user.email,
                        'warning': 'Failed to send OTP email'
                    }, status=status.HTTP_201_CREATED)
            
            return Response({
                'success': False,
                'message': 'Invalid registration data',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(f"Registration error: {str(e)}")
            return Response({
                'success': False,
                'message': 'Registration failed due to an unexpected error',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerifyOTPView(APIView):
    def post(self, request):
        try:
            serializer = VerifyOTPSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.validated_data['user']
                user.verify_user()

                tokens = get_tokens_for_user(user)
                profile_data = get_or_create_profile(user)
                user_data = UserSerializer(user).data

                return Response({
                    'success': True,
                    'message': 'OTP verified successfully. Account activated.',
                    'user': user_data,
                    'tokens': tokens,
                    'profile': profile_data
                }, status=status.HTTP_200_OK)

            return Response({
                'success': False,
                'message': 'Invalid OTP data',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(f"OTP verification error: {str(e)}")
            return Response({
                'success': False,
                'message': 'OTP verification failed due to an unexpected error',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(APIView):
    def post(self, request):
        try:
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.validated_data
                tokens = get_tokens_for_user(user)
                profile_data = get_or_create_profile(user)
                user_data = UserSerializer(user).data

                return Response({
                    'success': True,
                    'message': 'Login successful',
                    'user': user_data,
                    'tokens': tokens,
                    'profile': profile_data
                }, status=status.HTTP_200_OK)

            return Response({
                'success': False,
                'message': 'Login failed',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(f"Login error: {str(e)}")
            return Response({
                'success': False,
                'message': 'Login failed due to an unexpected error',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        profile = get_object_or_404(UserProfile, user=request.user)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GoogleLoginView(APIView):
    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            try:
                # Verify the Google token
                if not settings.GOOGLE_OAUTH2_CLIENT_ID:
                    return Response({
                        'success': False,
                        'message': 'Google authentication is not configured properly.'
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                idinfo = id_token.verify_oauth2_token(
                    token, 
                    requests.Request(), 
                    settings.GOOGLE_OAUTH2_CLIENT_ID
                )

                if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                    raise ValueError('Invalid token issuer.')

                # Get or create user
                user = User.objects.get_or_create_google_user(idinfo)
                
                # Create profile if it doesn't exist
                profile_data = get_or_create_profile(user)
                
                # Generate JWT tokens
                tokens = get_tokens_for_user(user)
                
                # Check if profile is complete
                is_profile_complete = all([
                    profile_data.get('full_name'),
                    profile_data.get('age'),
                    profile_data.get('gender'),
                    profile_data.get('city')
                ])
                
                return Response({
                    'success': True,
                    'message': 'Google authentication successful',
                    'user': UserSerializer(user).data,
                    'tokens': tokens,
                    'profile': profile_data,
                    'isProfileComplete': is_profile_complete
                }, status=status.HTTP_200_OK)

            except ValueError as e:
                return Response({
                    'success': False,
                    'message': 'Google authentication failed',
                    'error': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(f"Google auth error: {str(e)}")
                return Response({
                    'success': False,
                    'message': 'Google authentication failed due to an unexpected error',
                    'error': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        return Response({
            'success': False,
            'message': 'Invalid request data',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

# You might want to customize the email content for password reset
def send_password_reset_otp_email(user_email, otp):
    subject = 'WellZO - Your Password Reset Code'
    message = f'''
Hello!

A request has been made to reset the password for your WellZO account.
Your OTP code for password reset is: {otp}

This code is valid for {settings.OTP_EXPIRY_MINUTES if hasattr(settings, 'OTP_EXPIRY_MINUTES') else 10} minutes.

If you didn't request this code, please ignore this email or contact support if you have concerns.

Best regards,
WellZO Team
    '''
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user_email]
    
    # Reusing the try-except block from your existing send_otp_email
    try:
        if not settings.EMAIL_HOST_PASSWORD or settings.EMAIL_HOST_PASSWORD == 'xxxx xxxx xxxx xxxx':
            print("Email password not configured. Please set EMAIL_APP_PASSWORD.")
            return False
        if not settings.EMAIL_HOST_USER:
            print("Email user not configured. Please set EMAIL_HOST_USER.")
            return False
        
        send_mail(
            subject, message, email_from, recipient_list, fail_silently=False
        )
        print(f"✓ Password Reset OTP email sent successfully to {user_email}")
        return True
    except Exception as e:
        print(f"✗ Error sending Password Reset OTP email to {user_email}: {str(e)}")
        return False

class RequestPasswordResetOTPView(APIView):
    def post(self, request):
        serializer = RequestPasswordResetOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email, is_active=True) # Only for active users
                if user.is_otp_blocked():
                    block_duration = getattr(settings, 'OTP_BLOCK_DURATION_MINUTES', 30)
                    return Response({
                        'success': False,
                        'message': f"Account blocked due to too many OTP requests. Try again in {block_duration} minutes."
                    }, status=status.HTTP_429_TOO_MANY_REQUESTS)

                if user.generate_otp(): # This saves the user model with new OTP
                    if send_password_reset_otp_email(user.email, user.otp):
                        return Response({
                            'success': True,
                            'message': f'If an account with {email} exists and is active, an OTP has been sent.'
                        }, status=status.HTTP_200_OK)
                    else:
                        # OTP generated but email failed. This is an internal server issue.
                        return Response({
                            'success': False,
                            'message': 'Failed to send OTP email. Please try again later or contact support.'
                        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                else: # Should only happen if is_otp_blocked was true, but double check.
                    return Response({
                        'success': False,
                        'message': "Could not generate OTP. Account may be blocked."
                    }, status=status.HTTP_429_TOO_MANY_REQUESTS)

            except User.DoesNotExist:
                # Do not reveal that the user does not exist.
                # Still return a generic success message.
                return Response({
                    'success': True, # Pretend success
                    'message': f'If an account with {email} exists and is active, an OTP has been sent.'
                }, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"RequestPasswordResetOTPView error: {str(e)}")
                return Response({
                    'success': False,
                    'message': 'An unexpected error occurred. Please try again.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({
            'success': False,
            'message': 'Invalid data.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class ConfirmPasswordResetView(APIView):
    def post(self, request):
        serializer = ConfirmPasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            # The serializer already sets the new password and clears OTP fields.
            # We just need to save the user.
            user.save()
            return Response({
                'success': True,
                'message': 'Your password has been reset successfully. Please log in with your new password.'
            }, status=status.HTTP_200_OK)
        
        # Serializer errors will include messages for invalid OTP, blocked account, etc.
        return Response({
            'success': False,
            'message': 'Password reset failed.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
