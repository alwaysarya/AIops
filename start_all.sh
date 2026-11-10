#!/bin/bash
echo "🚀 Starting AIOps Platform..."

# 1. Start Backend
cd services/api-gateway
export PYTHONPATH=.
python src/main.py &
GATEWAY_PID=$!
echo "✅ API Gateway running (PID: $GATEWAY_PID)"

# 2. Start AI Detector
cd ../ai-anomaly-detector
export PYTHONPATH=.
python src/main.py &
AI_PID=$!
echo "✅ AI Detector running (PID: $AI_PID)"

# 3. Start Log Generator
cd ../api-gateway
python log_generator.py &
LOG_PID=$!
echo "✅ Log Generator running (PID: $LOG_PID)"

# 4. Start Frontend
cd ../../frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend running (PID: $FRONTEND_PID)"

echo "🎉 All services are running!"
wait
