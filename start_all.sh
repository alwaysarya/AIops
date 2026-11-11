#!/bin/bash

echo "🚀 Starting AIOps Platform..."

cd services/api-gateway
export PYTHONPATH=.
python src/main.py > /tmp/gateway.log 2>&1 &
echo "✅ API Gateway started (Port 8000)"

cd ../ai-anomaly-detector
export PYTHONPATH=.
python src/main.py > /tmp/ai.log 2>&1 &
echo "✅ AI Detector started (Port 8001)"

cd ../api-gateway
python log_generator.py > /tmp/loggen.log 2>&1 &
python log_reader.py > /tmp/logreader.log 2>&1 &
python log_ingester.py > /tmp/logingester.log 2>&1 &
python system_log_reader.py > /tmp/syslogreader.log 2>&1 &
echo "✅ All Log Services started"

cd ../../frontend
npm run dev > /tmp/frontend.log 2>&1 &
echo "✅ Frontend started (Port 3000)"

echo "🎉 All services are running!"
echo "🌐 Open Dashboard: http://localhost:3000"

trap "echo 'Stopping all...'; kill %1 %2 %3 %4 %5 %6 %7; exit" INT
wait
