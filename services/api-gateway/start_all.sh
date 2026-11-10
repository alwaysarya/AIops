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

# 3. Start Log Generator (Fake logs)
cd ../api-gateway
python log_generator.py > /tmp/loggen.log 2>&1 &
LOG_PID=$!
echo "✅ Log Generator started"

# 4. Start System Log Reader (Real logs simulation)
python log_reader.py > /tmp/logreader.log 2>&1 &
READER_PID=$!
echo "✅ System Log Reader started"

# 5. Start Frontend
cd ../../frontend
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started (Port 3000)"

echo ""
echo "🎉 All services are running!"
echo "🌐 Open Dashboard: http://localhost:3000"
echo "🛑 Press Ctrl+C to stop all services."

# Trap Ctrl+C to kill all background processes
trap "echo 'Stopping all services...'; kill $GATEWAY_PID $AI_PID $LOG_PID $READER_PID $FRONTEND_PID; exit" INT
wait
