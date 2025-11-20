# Biometric Data Admin Dashboard

## Frontend Setup (Next.js)

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Setup (Django + MySQL)

### Prerequisites
- Python 3.8+
- MySQL Server running locally

### Installation

1.  Create a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

2.  Install Python packages:
    ```bash
    pip install django djangorestframework mysqlclient django-cors-headers
    ```

3.  Create a new Django project:
    ```bash
    django-admin startproject biosecure_project .
    python manage.py startapp api
    ```

4.  **Configuration**:
    - Copy the code from `backend/models.py`, `backend/serializers.py`, and `backend/views.py` into your `api` app.
    - Update your project's `settings.py` using the snippets in `backend/settings_snippet.py`.
    - Configure `urls.py` to include the `api` URLs.

5.  **Database Setup**:
    - Create a MySQL database named `biosecure_db`.
    - Run migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

6.  **Run Server**:
    ```bash
    python manage.py runserver
    ```

The API will be available at `http://localhost:8000/api/personnel/`.



# API Testing Guide

This guide shows you how to interact with the Django API without using the frontend.

## Prerequisites

Ensure your Django backend is running:
```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000/api/`

---

## Method 1: Using curl (Command Line)

### Create a New Personnel Record

```bash
curl -X POST http://localhost:8000/api/personnel/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "department": "Engineering",
    "face_encoding": "[0.1234, 0.5678, 0.9101, 0.1122]"
  }'
```

### Get All Personnel Records

```bash
curl -X GET http://localhost:8000/api/personnel/
```

### Get Statistics

```bash
curl -X GET http://localhost:8000/api/statistics/
```

---

## Method 2: Using Python Script

Create a file called `test_api.py`:

```python
import requests
import json

BASE_URL = "http://localhost:8000/api/"

# Create a new personnel
def create_personnel():
    url = f"{BASE_URL}personnel/"
    data = {
        "name": "Jane Smith",
        "department": "HR",
        "face_encoding": "[0.2345, 0.6789, 0.1234, 0.5566]"
    }
    response = requests.post(url, json=data)
    print(f"Create Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

# Get all personnel
def get_all_personnel():
    url = f"{BASE_URL}personnel/"
    response = requests.get(url)
    print(f"Get All Status: {response.status_code}")
    print(f"Total Records: {len(response.json())}\n")

# Get statistics
def get_statistics():
    url = f"{BASE_URL}statistics/"
    response = requests.get(url)
    print(f"Statistics Status: {response.status_code}")
    print(f"Stats: {json.dumps(response.json(), indent=2)}\n")

if __name__ == "__main__":
    print("=== Creating Personnel ===")
    create_personnel()
    
    print("=== Getting All Personnel ===")
    get_all_personnel()
    
    print("=== Getting Statistics ===")
    get_statistics()
```

Run it:
```bash
python test_api.py
```

---

## Method 3: Using VS Code REST Client Extension

1. Install the "REST Client" extension by Huachao Mao
2. Create a file called `api-requests.http`
3. Add this content:


### Create new personnel
```bash
POST http://localhost:8000/api/personnel/
Content-Type: application/json

{
  "name": "Alice Johnson",
  "department": "Marketing",
  "face_encoding": "[0.3456, 0.7890, 0.2345, 0.6677]"
}
```

### Get all personnel
```bash
GET http://localhost:8000/api/personnel/
```

### Get statistics
```bash
GET http://localhost:8000/api/statistics/
```

### Create multiple personnel (run this multiple times)
```bash
POST http://localhost:8000/api/personnel/
Content-Type: application/json

{
  "name": "Bob Wilson",
  "department": "IT",
  "face_encoding": "[0.4567, 0.8901, 0.3456, 0.7788]"
}
```

4. Click "Send Request" above each request to execute

---

## Method 4: Using Postman

1. Download Postman from https://www.postman.com/
2. Create a new request:
   - **Method**: POST
   - **URL**: `http://localhost:8000/api/personnel/`
   - **Headers**: 
     - Key: `Content-Type`
     - Value: `application/json`
   - **Body** (raw, JSON):
     ```json
     {
       "name": "Test User",
       "department": "Testing",
       "face_encoding": "[0.1, 0.2, 0.3, 0.4]"
     }
     ```
3. Click "Send"

---

## Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/personnel/` | Get all personnel records |
| POST | `/api/personnel/` | Create a new personnel record |
| GET | `/api/statistics/` | Get dashboard statistics |

---

## Sample Bulk Insert Script

Create `bulk_insert.py` to add multiple records:

```python
import requests

BASE_URL = "http://localhost:8000/api/personnel/"

personnel_list = [
    {"name": "Emma Brown", "department": "Engineering", "face_encoding": "[0.11, 0.22, 0.33]"},
    {"name": "Michael Chen", "department": "Sales", "face_encoding": "[0.44, 0.55, 0.66]"},
    {"name": "Sarah Davis", "department": "HR", "face_encoding": "[0.77, 0.88, 0.99]"},
    {"name": "David Lee", "department": "Marketing", "face_encoding": "[0.12, 0.34, 0.56]"},
    {"name": "Lisa Wang", "department": "Engineering", "face_encoding": "[0.78, 0.90, 0.12]"},
]

for person in personnel_list:
    response = requests.post(BASE_URL, json=person)
    if response.status_code == 201:
        print(f"✓ Added: {person['name']}")
    else:
        print(f"✗ Failed: {person['name']}")

print(f"\nCompleted! Added {len(personnel_list)} personnel records.")
```

Run it:
```bash
python bulk_insert.py
