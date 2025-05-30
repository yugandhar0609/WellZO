# Generated manually to safely remove fields
from django.db import migrations, connection


def safe_remove_fields(apps, schema_editor):
    """
    Safely remove fields that may or may not exist in the database
    """
    with connection.cursor() as cursor:
        # Check if the table exists
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users_userprofile'
            );
        """)
        table_exists = cursor.fetchone()[0]
        
        if not table_exists:
            return
        
        # Get existing columns
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'users_userprofile';
        """)
        existing_columns = [row[0] for row in cursor.fetchall()]
        
        # Fields to remove
        fields_to_remove = [
            'activity_level',
            'allergies', 
            'bed_time',
            'dietary_preferences',
            'favorite_activities',
            'height_cm',
            'medical_conditions',
            'primary_goal',
            'profession',
            'wake_up_time',
            'weight_kg'
        ]
        
        # Remove fields that actually exist
        for field in fields_to_remove:
            if field in existing_columns:
                cursor.execute(f'ALTER TABLE users_userprofile DROP COLUMN IF EXISTS {field};')


def reverse_safe_remove_fields(apps, schema_editor):
    """
    This is irreversible - we can't add back the fields without knowing their exact definitions
    """
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(safe_remove_fields, reverse_safe_remove_fields),
    ] 