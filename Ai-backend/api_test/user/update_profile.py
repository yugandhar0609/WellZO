import requests

# Your access token from login
access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1MTI4MzIxLCJpYXQiOjE3NDUxMjgwMjEsImp0aSI6IjAzMTc1MDUwZjUyYTQyZWQ4ZjM5YWFhNzhlYjA3M2ZjIiwidXNlcl9pZCI6Mn0.2TOHWZO0cEkD3GvpbJkJIKszWwD6yenZgNt8n3QbikM"

# Update profile data
profile_url = 'http://localhost:8000/api/users/profile/'
headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}

files = {
    'profile_picture': ('virat.jpeg', open('C:/surya/6 Startup/Development/Development/WellZO/Ai-backend/src/virat.jpeg', 'rb'), 'image/jpeg')
}
update_data = {
    "full_name": "Surya",
    "age": 27,
    "date_of_birth": "1995-05-15",  # YYYY-MM-DD format
    "gender": "male",  # or "female" or any other value
    "nationality": "Indian",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "preferred_language": "English",
    "bio": "I am a software engineer",
    "location": "Chennai"
}

# Send PUT request to update profile
response = requests.put(profile_url, json=update_data, headers=headers, files=files)
print("Updated Profile:", response.json())

# Verify by getting the profile again
get_response = requests.get(profile_url, headers=headers)
print("\nVerified Profile:", get_response.json())


delete_response = requests.delete(profile_url, headers=headers)
print("\nDelete Status:", delete_response.status_code)  # Should be 204