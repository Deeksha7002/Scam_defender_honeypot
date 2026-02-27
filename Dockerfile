FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend source code
COPY backend/ .

# Create the data directory for SQLite persistence
RUN mkdir -p /data

# Expose the port Render provides via $PORT
EXPOSE 8000

# Start the server
CMD uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}
