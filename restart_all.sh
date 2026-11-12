#!/bin/bash
echo "🛑 Stopping all services..."
lsof -ti:8000,8001,3000,8005 | xargs kill -9 2>/dev/null
sleep 2

echo "🚀 Starting all services..."
./start_all.sh
