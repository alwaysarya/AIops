#!/bin/bash

echo "🎬 OpsMind Live Demo Script"
echo "============================"
echo ""
echo "Step 1: Starting all services..."
./restart_all.sh
sleep 10

echo ""
echo "Step 2: Opening Dashboard..."
open http://localhost:3000

echo ""
echo "✅ Demo Ready!"
echo ""
echo "📋 Demo Checklist:"
echo "1. Login page → Register a new account"
echo "2. Dashboard → Show real-time CPU/Memory chart and Predictive AI Forecast"
echo "3. Logs → Show live WebSocket streaming"
echo "4. RCA → Select payment-service and Run Analysis"
echo "5. Incidents → Create a P0 incident and Mark Resolved"
echo "6. Security → Run Scan and show vulnerabilities"
echo "7. FinOps → Show cost breakdown and savings recommendations"
echo "8. Approvals → Show pending runbook and Approve"
echo "9. AI Copilot (bottom-right) → Ask 'What is the system status?'"
echo "10. Cmd+K → Show Command Palette navigation"
