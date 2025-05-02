from rest_framework import serializers
from .models import User, UserProfile
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'name', 'password', 'role')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'full_name', 'age', 'date_of_birth', 'gender', 'nationality', 
                 'state', 'city', 'preferred_language', 'created_at', 'profile_picture', 
                 'bio', 'location')
        read_only_fields = ('id', 'created_at')


class GoogleAuthSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'role', 'profile_picture_url')
        read_only_fields = ('id', 'email', 'profile_picture_url')
