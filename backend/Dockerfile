FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the actual backend code
COPY . .

# Expose the API port
EXPOSE 8000

# Run the app
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
