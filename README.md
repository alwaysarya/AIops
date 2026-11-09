# AIOps Intelligent Observability Platform

## Overview
An end-to-end AIOps platform with AI-powered log anomaly detection, predictive alerting, auto-remediation & full observability.

## Tech Stack
- **Frontend:** React, TailwindCSS, WebSockets
- **Backend:** Python (FastAPI), JWT Authentication
- **AI/ML:** Anomaly Detection logic (Scikit-learn/PyTorch ready)
- **DevOps:** Docker, Kubernetes, Terraform, GitHub Actions, Prometheus, Grafana

## Local Setup
1. `cd frontend && npm install && npm run dev`
2. `cd services/api-gateway && pip install -r requirements.txt && uvicorn src.main:app --reload`
3. `cd services/ai-anomaly-detector && python src/main.py`

## Features
- ✅ Real-time Log Streaming via WebSockets
- ✅ JWT Authentication & Protected Routes
- ✅ AI-based Anomaly Detection
- ✅ CI/CD Pipelines for Build & Security Scan
- ✅ Infrastructure as Code (Terraform & K8s)
