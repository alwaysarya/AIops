from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import random
import json
from datetime import datetime

router = APIRouter()

@router.websocket("/ws")
async def alerts_ws(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            alert = {
                "id": random.randint(1000, 9999),
                "title": random.choice(["High CPU Usage", "Memory Leak", "DB Timeout", "Network Latency"]),
                "severity": random.choice(["critical", "warning"]),
                "service": random.choice(["payment-service", "auth-service", "api-gateway"]),
                "message": f"Detected at {datetime.now().strftime('%H:%M:%S')}"
            }
            await websocket.send_text(json.dumps(alert))
            await asyncio.sleep(8) # New alert every 8 seconds
    except WebSocketDisconnect:
        print("Alerts client disconnected")
