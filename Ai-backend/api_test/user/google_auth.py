import requests

# Replace with the token you get from Google Sign-In
google_token = "your_google_token"

# Test Google login
response = requests.post(
    'http://localhost:8000/api/users/google-login/',
    json={'token': google_token}
)

print("Response:", response.json())

# If login successful, test profile access
if response.status_code == 200:
    access_token = response.json()['tokens']['access']
    
    # Test profile access
    profile_response = requests.get(
        'http://localhost:8000/api/users/profile/',
        headers={'Authorization': f'Bearer {access_token}'}
    )
    
    print("\nProfile:", profile_response.json())