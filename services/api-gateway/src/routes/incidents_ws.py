from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import random
import json
from datetime import datetime

router = APIRouter()

@router.websocket("/ws")
async def incidents_ws(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            incident = {
                "id": random.randint(1000, 9999),
                "title": random.choice(["Database Down", "Payment Gateway Latency", "Auth Service 500 Errors", "K8s Node Disk Full", "High Memory Usage"]),
                "severity": random.choice(["P0", "P1", "P2"]),
                "assignee": random.choice(["aryan", "rahul"]),
                "status": random.choice(["open", "resolved"]),
                "timestamp": datetime.utcnow().isoformat()
            }
            await websocket.send_text(json.dumps(incident))
            await asyncio.sleep(10) # New incident every 10 seconds
    except WebSocketDisconnect:
        print("Incidents client disconnected")
