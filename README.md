# Biometric Data Admin Dashboard

## Frontend Setup (Next.js)

1.  Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`
2.  Run the development server:
    \`\`\`bash
    npm run dev
    \`\`\`
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Setup (Django + MySQL)

### Prerequisites
- Python 3.8+
- MySQL Server running locally

### Installation

1.  Create a virtual environment:
    \`\`\`bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    \`\`\`

2.  Install Python packages:
    \`\`\`bash
    pip install django djangorestframework mysqlclient django-cors-headers
    \`\`\`

3.  Create a new Django project:
    \`\`\`bash
    django-admin startproject biosecure_project .
    python manage.py startapp api
    \`\`\`

4.  **Configuration**:
    - Copy the code from `backend/models.py`, `backend/serializers.py`, and `backend/views.py` into your `api` app.
    - Update your project's `settings.py` using the snippets in `backend/settings_snippet.py`.
    - Configure `urls.py` to include the `api` URLs.

5.  **Database Setup**:
    - Create a MySQL database named `biosecure_db`.
    - Run migrations:
    \`\`\`bash
    python manage.py makemigrations
    python manage.py migrate
    \`\`\`

6.  **Run Server**:
    \`\`\`bash
    python manage.py runserver
    \`\`\`

The API will be available at `http://localhost:8000/api/personnel/`.
\`\`\`
