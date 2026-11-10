#!/bin/bash

echo "🚀 Starting AIOps Platform..."

# 1. API Gateway (Backend)
cd services/api-gateway
export PYTHONPATH=.
python src/main.py > /tmp/gateway.log 2>&1 &
echo "✅ API Gateway started (Port 8000)"

# 2. AI Detector
cd ../ai-anomaly-detector
export PYTHONPATH=.
python src/main.py > /tmp/ai.log 2>&1 &
echo "✅ AI Detector started (Port 8001)"

# 3. Log Generator
cd ../api-gateway
python log_generator.py > /tmp/loggen.log 2>&1 &
echo "✅ Log Generator started"

# 4. Log Reader
python log_reader.py > /tmp/logreader.log 2>&1 &
echo "✅ Log Reader started"

# 5. Frontend
cd ../../frontend
npm run dev > /tmp/frontend.log 2>&1 &
echo "✅ Frontend started (Port 3000)"

echo ""
echo "🎉 All services are running!"
echo "🌐 Open Dashboard: http://localhost:3000"
echo "🛑 Press Ctrl+C to stop all services."

trap "echo 'Stopping all...'; kill $GATEWAY_PID $AI_PID $LOG_PID $READER_PID $FRONTEND_PID; exit" INT
wait
