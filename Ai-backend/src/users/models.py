from django.db import models
import uuid
import random
from django.utils import timezone
from datetime import timedelta

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        # Remove role assignment, set user inactive and unverified by default
        extra_fields.setdefault('is_active', False)
        extra_fields.setdefault('is_verified', False)
        user = self.model(email=email, name=name, **extra_fields)
        if password:
            user.set_password(password)
        else:
            # Ensure users created without a password (e.g., Google login) cannot log in via password
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True) # Superusers are active by default
        extra_fields.setdefault('is_verified', True) # Superusers are verified by default


        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        # No role for superuser creation either, handled by flags
        return self.create_user(email, name, password, **extra_fields)

    def get_or_create_google_user(self, google_data):
        user = None
        email = google_data.get('email')
        
        if not email:
            raise ValueError("Email is required from Google data")
        
        # Try to find user by google_id first
        if google_data.get('sub'):
            user = self.filter(google_id=google_data['sub']).first()
        
        # If not found by google_id, try email
        if not user and email:
            user = self.filter(email=email).first()
            
        if user:
            # Update existing user's Google info
            user.google_id = google_data.get('sub')
            user.name = google_data.get('name', user.name)
            user.profile_picture_url = google_data.get('picture', user.profile_picture_url)
            # Ensure Google users are active and verified
            user.is_active = True
            user.is_verified = True
            user.save()
        else:
            # Create new user from Google data - they are active and verified immediately
            user = self.create_user(
                email=email,
                name=google_data.get('name', ''),
                google_id=google_data.get('sub'),
                profile_picture_url=google_data.get('picture'),
                password=None, # Set unusable password
                is_active=True, # Google users are active by default
                is_verified=True # Google users are verified by default
            )
            # Explicitly save to ensure the user is persisted
            user.save()
        
        return user

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('pg_owner', 'PG Owner'),
        ('admin', 'Admin'),
    )

    # Basic fields
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, null=True, blank=True)
    
    # Status fields
    is_active = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    # Social auth fields
    google_id = models.CharField(max_length=255, null=True, blank=True, unique=True)
    profile_picture_url = models.URLField(max_length=500, null=True, blank=True)

    # OTP fields
    otp = models.CharField(max_length=6, null=True, blank=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    otp_attempts = models.IntegerField(default=0)
    otp_max_attempts = models.IntegerField(default=3)
    otp_blocked_until = models.DateTimeField(null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    def generate_otp(self):
        # Check if user is blocked from generating OTP
        if self.is_otp_blocked():
            return False
            
        self.otp = str(random.randint(100000, 999999))
        self.otp_created_at = timezone.now()
        self.otp_attempts = 0
        self.otp_blocked_until = None
        self.save()
        return True

    def is_otp_blocked(self):
        if self.otp_blocked_until and timezone.now() < self.otp_blocked_until:
            return True
        return False

    def is_otp_valid(self, otp_code):
        # Check if user is blocked
        if self.is_otp_blocked():
            return False
            
        # Increment attempt counter
        self.otp_attempts += 1
        
        # Check if max attempts reached
        if self.otp_attempts >= self.otp_max_attempts:
            self.otp_blocked_until = timezone.now() + timedelta(minutes=30)
            self.save()
            return False
            
        # Basic validation
        if not self.otp or not self.otp_created_at:
            self.save()
            return False
            
        # Check OTP match
        if self.otp != otp_code:
            self.save()
            return False
            
        # Check expiry
        if timezone.now() > self.otp_created_at + timedelta(minutes=settings.OTP_EXPIRY_MINUTES):
            self.save()
            return False
            
        return True

    def verify_user(self):
        self.is_verified = True
        self.is_active = True
        self.otp = None
        self.otp_created_at = None
        self.otp_attempts = 0
        self.otp_blocked_until = None
        self.save()

    def update_last_login(self):
        self.last_login = timezone.now()
        self.save(update_fields=['last_login'])

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=255, blank=True)
    age = models.IntegerField(null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=50, blank=True)
    nationality = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    preferred_language = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.user.email}'s profile"

class UserSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions')
    session_token = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    last_activity = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    device_info = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.session_token}"

    def is_expired(self):
        return timezone.now() > self.expires_at

    def extend_session(self):
        """Extend session by 30 days from last activity"""
        self.expires_at = timezone.now() + timedelta(days=30)
        self.save(update_fields=['expires_at', 'last_activity'])

    def invalidate(self):
        """Invalidate the session"""
        self.is_active = False
        self.save(update_fields=['is_active'])

    class Meta:
        indexes = [
            models.Index(fields=['user', 'session_token']),
            models.Index(fields=['expires_at']),
        ]



