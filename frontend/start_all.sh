#!/bin/bash

echo "🚀 Starting AIOps Platform (All Services)..."

# 1. Start API Gateway (Backend)
cd services/api-gateway
export PYTHONPATH=.
python src/main.py > /tmp/gateway.log 2>&1 &
GATEWAY_PID=$!
echo "✅ API Gateway started (Port 8000)"

# 2. Start AI Anomaly Detector
cd ../ai-anomaly-detector
export PYTHONPATH=.
python src/main.py > /tmp/ai.log 2>&1 &
AI_PID=$!
echo "✅ AI Detector started (Port 8001)"

# 3. Start Log Generator
cd ../api-gateway
python log_generator.py > /tmp/loggen.log 2>&1 &
LOG_PID=$!
echo "✅ Log Generator started"

# 4. Start Frontend
cd ../../frontend
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started (Port 3001/3002)"

echo ""
echo "🎉 All services are running!"
echo "🌐 Open Dashboard: http://localhost:3001 (ya jo terminal mein dikhe)"
echo "🛑 Press Ctrl+C to stop all services."

# Trap Ctrl+C to kill all background processes
trap "echo 'Stopping all services...'; kill $GATEWAY_PID $AI_PID $LOG_PID $FRONTEND_PID; exit" INT
wait
