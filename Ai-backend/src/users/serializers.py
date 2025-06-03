from rest_framework import serializers
from .models import User, UserProfile
from django.contrib.auth import authenticate
from django.utils import timezone
from django.conf import settings
from datetime import timedelta

# Remove or comment out the old RegisterSerializer if it exists
# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
# 
#     class Meta:
#         model = User
#         fields = ('email', 'name', 'password', 'role') # Role might be removed depending on model changes
# 
#     def create(self, validated_data):
#         # Old way: user = User.objects.create_user(**validated_data)
#         # New way will handle password hashing and OTP generation in the view or a dedicated service
#         # For now, just pass data along, assuming create_user handles hashing
#         user = User.objects.create_user(**validated_data)
#         return user

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('name', 'email', 'password')

    def create(self, validated_data):
        # Use the custom manager's create_user method which handles password hashing
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
            # No role is passed here
        )
        # OTP generation and email sending will be handled in the view
        return user

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        email = data.get('email')
        otp_code = data.get('otp')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")

        if not user.is_otp_valid(otp_code):
            raise serializers.ValidationError("Invalid or expired OTP.")

        # Pass user to the view for activation
        data['user'] = user
        return data

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = authenticate(
                email=data.get('email'),
                password=data.get('password')
            )
            
            if not user:
                raise serializers.ValidationError({
                    'detail': 'Invalid email or password.'
                })

            if not user.is_verified:
                raise serializers.ValidationError({
                    'detail': 'Account not verified. Please verify your OTP.',
                    'requires_verification': True,
                    'email': user.email
                })

            if not user.is_active:
                raise serializers.ValidationError({
                    'detail': 'Account is inactive. Please contact support.'
                })

            return user
            
        except Exception as e:
            raise serializers.ValidationError({
                'detail': str(e)
            })

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

class RequestPasswordResetOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # It's generally better not to reveal if an email is registered or not for security.
        # The view will handle the logic to send an email only if the user exists and is active.
        # If a user doesn't exist, the view can return a generic success message to prevent enumeration.
        # No explicit validation for existence here to avoid leaking info through error messages.
        return value

class ConfirmPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True, style={'input_type': 'password'}, min_length=8)
    # confirm_new_password = serializers.CharField(write_only=True, style={'input_type': 'password'}) # Uncomment if you want confirm field

    # def validate(self, data):
    #     if data['new_password'] != data['confirm_new_password']:
    #         raise serializers.ValidationError({"new_password": "Passwords do not match."})
    #     return data

    def validate(self, data):
        email = data.get('email')
        otp_code = data.get('otp')
        new_password = data.get('new_password')

        try:
            user = User.objects.get(email=email, is_active=True) # Ensure user is active
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or OTP.") # Generic error for security

        if user.is_otp_blocked():
            # Calculate remaining block time for a more user-friendly message
            # This assumes OTP_BLOCK_DURATION_MINUTES is defined in settings, defaulting to 30
            block_duration = getattr(settings, 'OTP_BLOCK_DURATION_MINUTES', 30)
            raise serializers.ValidationError(f"Account blocked due to too many attempts. Try again in {block_duration} minutes.")

        if not user.is_otp_valid(otp_code):
            # is_otp_valid handles attempts and blocking logic internally in the model
            if user.is_otp_blocked(): # Check again if blocked after the last attempt
                block_duration = getattr(settings, 'OTP_BLOCK_DURATION_MINUTES', 30)
                raise serializers.ValidationError(f"Account blocked due to too many attempts. Try again in {block_duration} minutes.")
            raise serializers.ValidationError("Invalid or expired OTP. Please check the code or request a new one.")
        
        # OTP is valid, proceed to set password
        # Django's User.set_password() handles hashing.
        # Additional password strength validation can be configured in Django settings (AUTH_PASSWORD_VALIDATORS)
        user.set_password(new_password)
        
        # Clear OTP fields after successful reset and verification
        user.otp = None
        user.otp_created_at = None
        user.otp_attempts = 0
        user.otp_blocked_until = None
        # The view will call user.save()

        data['user'] = user # Pass user to the view to be saved
        return data
