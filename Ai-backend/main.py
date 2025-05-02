import requests

# Your access token from login
access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1MTI3Njk2LCJpYXQiOjE3NDUxMjczOTYsImp0aSI6IjJmOWNhZDMzYjMxMDQ4ODViZDM1MTM2NmRmMDkwNDg5IiwidXNlcl9pZCI6Mn0.4OjLYU_cR0KFd1TiNF1tmSqXgYt1WjqGzEI0ZHfzstA"

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
    "full_name": "Your Full Name",
    "age": 25,
    "date_of_birth": "1998-01-01",  # YYYY-MM-DD format
    "gender": "male",  # or "female" or any other value
    "nationality": "Indian",
    "state": "Karnataka",
    "city": "Bangalore",
    "preferred_language": "English",
    "bio": "Your bio here",
    "location": "Your location"
}

# Send PUT request to update profile
response = requests.put(profile_url, json=update_data, headers=headers, files=files)
print("Updated Profile:", response.json())

# Verify by getting the profile again
get_response = requests.get(profile_url, headers=headers)
print("\nVerified Profile:", get_response.json())