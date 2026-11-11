#!/bin/bash

ROOT_DIR=$(pwd)

echo "🧪 Running Backend Tests..."
cd "$ROOT_DIR/services/api-gateway"
export PYTHONPATH=.
pytest tests/test_api.py -q

if [ $? -ne 0 ]; then
    echo "❌ Tests failed! Aborting startup."
    exit 1
fi
echo "✅ Tests passed!"

echo "🚀 Starting AIOps Platform (8 Services)..."

cd "$ROOT_DIR/services/api-gateway"
export PYTHONPATH=.
export $(cat .env | xargs) 2>/dev/null
python src/main.py > /tmp/gateway.log 2>&1 &
echo "✅ 1/8 API Gateway started (Port 8000)"

cd "$ROOT_DIR/services/ai-anomaly-detector"
export PYTHONPATH=.
python src/main.py > /tmp/ai.log 2>&1 &
echo "✅ 2/8 AI Detector started (Port 8001)"

cd "$ROOT_DIR/services/api-gateway"
python log_generator.py > /tmp/loggen.log 2>&1 &
python log_reader.py > /tmp/logreader.log 2>&1 &
python log_ingester.py > /tmp/logingester.log 2>&1 &
python system_log_reader.py > /tmp/syslogreader.log 2>&1 &
echo "✅ 3-6/8 Log Services started"

cd "$ROOT_DIR/frontend"
npm run dev > /tmp/frontend.log 2>&1 &
echo "✅ 7/8 Frontend started (Port 3000)"

echo "✅ 8/8 Tests integrated in pipeline"
echo "🎉 All services are running!"
echo "🌐 Open Dashboard: http://localhost:3000"

trap "echo 'Stopping all...'; kill %1 %2 %3 %4 %5 %6 %7; exit" INT
wait
