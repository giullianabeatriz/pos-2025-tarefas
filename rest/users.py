import requests

api_url = "https://jsonplaceholder.typicode.com/users"

def list():
    response = requests.get(api_url)
    response.raise_for_status()
    return response.json()

def create(data):
    response = requests.post(api_url, json=data)
    response.raise_for_status()
    return response.json()

def read(user_id):
    response = requests.get(f"{api_url}/{user_id}")
    response.raise_for_status()
    return response.json()

def update(user_id, data):
    response = requests.put(f"{api_url}/{user_id}", json=data)
    response.raise_for_status()
    return response.json()

def delete(user_id):
    response = requests.delete(f"{api_url}/{user_id}")
    response.raise_for_status()
    return {"status": "deleted", "id": user_id}
