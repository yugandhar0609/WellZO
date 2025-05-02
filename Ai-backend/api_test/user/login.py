import requests

# 1. Login first
login_url = 'http://localhost:8000/api/users/login/'
login_data = {
    "email": "test@example.com",
    "password": "testpass123"
}

# Get token
response = requests.post(login_url, json=login_data)
if response.status_code == 200:
    access_token = response.json()['tokens']['access']
    print(access_token)
    # 2. Now get profile with token
    profile_url = 'http://localhost:8000/api/users/profile/'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    profile_response = requests.get(profile_url, headers=headers)
    print("Profile Response:", profile_response.json())
else:
    print("Login failed:", response.json())