#!/bin/bash

echo "🚀 Starting AIOps Platform..."

# 1. Start API Gateway
cd services/api-gateway
export PYTHONPATH=.
python src/main.py > /dev/null 2>&1 &
GATEWAY_PID=$!
echo "✅ API Gateway started (PID: $GATEWAY_PID)"

# 2. Start AI Detector
cd ../ai-anomaly-detector
export PYTHONPATH=.
python src/main.py > /dev/null 2>&1 &
AI_PID=$!
echo "✅ AI Detector started (PID: $AI_PID)"

# 3. Start Log Generator
cd ../api-gateway
python log_generator.py > /dev/null 2>&1 &
LOG_PID=$!
echo "✅ Log Generator started (PID: $LOG_PID)"

# 4. Start Frontend
cd ../../frontend
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo "🎉 All services are running!"
echo "Frontend: http://localhost:3002"
echo "API Gateway: http://localhost:8000"
echo "AI Detector: http://localhost:8001"

# Keep script alive
wait
# Abhi ke liye K8s commands manual hain (kubectl apply -f kubernetes/)
