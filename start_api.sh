#!/bin/bash
echo "🚀 Starting OpsMind API (Auth & Agents) on Port 8005..."
python3 -m uvicorn api.main:app --reload --port 8005
