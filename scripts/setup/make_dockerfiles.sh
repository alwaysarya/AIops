echo "FROM python:3.10-slim" > services/api-gateway/Dockerfile
echo "WORKDIR /app" >> services/api-gateway/Dockerfile
echo "COPY requirements.txt ." >> services/api-gateway/Dockerfile
echo "RUN pip install --no-cache-dir -r requirements.txt" >> services/api-gateway/Dockerfile
echo "COPY . ." >> services/api-gateway/Dockerfile
echo "EXPOSE 8000" >> services/api-gateway/Dockerfile
echo 'CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]' >> services/api-gateway/Dockerfile

echo "FROM python:3.10-slim" > services/log-ingestion-service/Dockerfile
echo "WORKDIR /app" >> services/log-ingestion-service/Dockerfile
echo "COPY requirements.txt ." >> services/log-ingestion-service/Dockerfile
echo "RUN pip install --no-cache-dir -r requirements.txt" >> services/log-ingestion-service/Dockerfile
echo "COPY . ." >> services/log-ingestion-service/Dockerfile
echo "EXPOSE 8000" >> services/log-ingestion-service/Dockerfile
echo 'CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]' >> services/log-ingestion-service/Dockerfile

echo "FROM python:3.10-slim" > services/ai-anomaly-detector/Dockerfile
echo "WORKDIR /app" >> services/ai-anomaly-detector/Dockerfile
echo "COPY requirements.txt ." >> services/ai-anomaly-detector/Dockerfile
echo "RUN pip install --no-cache-dir -r requirements.txt" >> services/ai-anomaly-detector/Dockerfile
echo "COPY . ." >> services/ai-anomaly-detector/Dockerfile
echo "EXPOSE 8000" >> services/ai-anomaly-detector/Dockerfile
echo 'CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]' >> services/ai-anomaly-detector/Dockerfile

echo "FROM python:3.10-slim" > services/alert-service/Dockerfile
echo "WORKDIR /app" >> services/alert-service/Dockerfile
echo "COPY requirements.txt ." >> services/alert-service/Dockerfile
echo "RUN pip install --no-cache-dir -r requirements.txt" >> services/alert-service/Dockerfile
echo "COPY . ." >> services/alert-service/Dockerfile
echo "EXPOSE 8000" >> services/alert-service/Dockerfile
echo 'CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]' >> services/alert-service/Dockerfile

echo "FROM python:3.10-slim" > services/auto-remediation-service/Dockerfile
echo "WORKDIR /app" >> services/auto-remediation-service/Dockerfile
echo "COPY requirements.txt ." >> services/auto-remediation-service/Dockerfile
echo "RUN pip install --no-cache-dir -r requirements.txt" >> services/auto-remediation-service/Dockerfile
echo "COPY . ." >> services/auto-remediation-service/Dockerfile
echo "EXPOSE 8000" >> services/auto-remediation-service/Dockerfile
echo 'CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]' >> services/auto-remediation-service/Dockerfile

echo "FROM python:3.10-slim" > services/root-cause-analyzer/Dockerfile
echo "WORKDIR /app" >> services/root-cause-analyzer/Dockerfile
echo "COPY requirements.txt ." >> services/root-cause-analyzer/Dockerfile
echo "RUN pip install --no-cache-dir -r requirements.txt" >> services/root-cause-analyzer/Dockerfile
echo "COPY . ." >> services/root-cause-analyzer/Dockerfile
echo "EXPOSE 8000" >> services/root-cause-analyzer/Dockerfile
echo 'CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]' >> services/root-cause-analyzer/Dockerfile

echo "FROM python:3.10-slim" > services/notification-service/Dockerfile
echo "WORKDIR /app" >> services/notification-service/Dockerfile
echo "COPY requirements.txt ." >> services/notification-service/Dockerfile
echo "RUN pip install --no-cache-dir -r requirements.txt" >> services/notification-service/Dockerfile
echo "COPY . ." >> services/notification-service/Dockerfile
echo "EXPOSE 8000" >> services/notification-service/Dockerfile
echo 'CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]' >> services/notification-service/Dockerfile

echo "✅ Saare Dockerfiles ready!"
