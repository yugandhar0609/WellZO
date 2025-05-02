from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from .serializers import (
    RegisterSerializer, LoginSerializer, UserProfileSerializer,
    GoogleAuthSerializer, UserSerializer
)
from .models import User, UserProfile

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def get_or_create_profile(user):
    profile, created = UserProfile.objects.get_or_create(user=user)
    return UserProfileSerializer(profile).data

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            profile_data = get_or_create_profile(user)
            return Response({
                'user': RegisterSerializer(user).data, 
                'tokens': tokens,
                'profile': profile_data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            tokens = get_tokens_for_user(user)
            profile_data = get_or_create_profile(user)
            return Response({
                'user': RegisterSerializer(user).data, 
                'tokens': tokens,
                'profile': profile_data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
                idinfo = id_token.verify_oauth2_token(
                    token, 
                    requests.Request(), 
                    settings.GOOGLE_OAUTH2_CLIENT_ID
                )

                if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                    raise ValueError('Wrong issuer.')

                # Get or create user
                user = User.objects.get_or_create_google_user(idinfo)
                
                # Create profile if it doesn't exist
                profile_data = get_or_create_profile(user)
                
                # Generate JWT tokens
                tokens = get_tokens_for_user(user)
                
                return Response({
                    'user': UserSerializer(user).data,
                    'tokens': tokens,
                    'profile': profile_data
                })

            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
