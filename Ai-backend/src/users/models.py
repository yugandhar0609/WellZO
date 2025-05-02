from django.db import models
import uuid

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, role='student', **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, role=role, **extra_fields)
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_user(email, password, role='admin', is_staff=True, is_superuser=True, **extra_fields)

    def get_or_create_google_user(self, google_data):
        user = None
        email = google_data.get('email')
        
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
            user.save()
        else:
            # Create new user
            user = self.create_user(
                email=email,
                name=google_data.get('name', ''),
                google_id=google_data.get('sub'),
                profile_picture_url=google_data.get('picture'),
                password=None  # No password for Google users
            )
        
        return user

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('pg_owner', 'PG Owner'),
        ('admin', 'Admin'),
    )

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    google_id = models.CharField(max_length=255, null=True, blank=True, unique=True)
    profile_picture_url = models.URLField(max_length=500, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email



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



