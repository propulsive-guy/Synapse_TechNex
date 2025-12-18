# ================================
# Base Image
# ================================
FROM python:3.10-slim

# Prevent Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ================================
# Install system dependencies
# ================================
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# ================================
# Set working directory
# ================================
WORKDIR /app

# ================================
# Copy requirements & install
# ================================
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ================================
# Copy application files
# ================================
COPY app.py .
COPY saved_models ./saved_models

# ================================
# Expose port (Cloud Run compatible)
# ================================
EXPOSE 8080

# ================================
# Run FastAPI
# ================================
CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port ${PORT:-8080}"]
