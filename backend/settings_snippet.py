# Add these to your Django settings.py

# 1. Database Configuration for MySQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'biosecure_db',
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# 2. Installed Apps
INSTALLED_APPS = [
    # ... existing apps
    'rest_framework',
    'corsheaders',
    'backend', # Assuming your app is named 'backend' or similar
]

# 3. Middleware (for CORS)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Must be at the top
    # ... existing middleware
]

# 4. CORS Settings (Allow React frontend)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
