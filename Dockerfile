# Use an official Python runtime as a parent image
FROM python:3.9-slim AS backend

# Set the working directory for the backend
WORKDIR /app/backend

RUN apt-get update && apt-get install -y \
    build-essential \
    libmariadb-dev-compat \
    libmariadb-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the backend code into the container
COPY my-backend/ .

# Install backend dependencies

RUN pip install --no-cache-dir -r requirements.txt

# Collect static files
RUN python manage.py collectstatic --noinput

# Build the React frontend
FROM node:14 AS frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend code into the container
COPY my-frontend/ .

# Install frontend dependencies
RUN npm install

# Build the frontend
RUN npm run build

# Create the final image
FROM python:3.9-slim

# Set the working directory for the final image
WORKDIR /app

# Copy the backend code from the first stage
COPY --from=backend /app/backend /app/backend

# Copy the frontend build files from the second stage
COPY --from=frontend /app/frontend/build /app/backend/static

# Copy the shell script into the container
COPY start.sh /start.sh

# Ensure the shell script has execution permissions
RUN chmod +x /start.sh

# Expose port 8000 for the Django server
EXPOSE 8000

# Start the server using the shell script
CMD ["/start.sh"]