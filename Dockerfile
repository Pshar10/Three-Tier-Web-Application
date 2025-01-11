FROM python:3.9-alpine

# Set the working directory
WORKDIR /app

# Install PostgreSQL client and dependencies for Django
RUN apk add --no-cache gcc musl-dev libffi-dev postgresql-dev && \
    apk del gcc musl-dev libffi-dev && \
    rm -rf /var/cache/apk/*

# Copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application
COPY . /app/

# Expose the necessary port
EXPOSE 8000

# Run database migrations and start Django app
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
