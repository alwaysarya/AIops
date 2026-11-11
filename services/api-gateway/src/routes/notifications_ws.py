from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import random
import json
from datetime import datetime

router = APIRouter()

@router.websocket("/ws")
async def notification_ws(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate real-time alerts (In production, this listens to Kafka/Redis)
            alert = {
                "type": "alert",
                "severity": random.choice(["critical", "warning"]),
                "title": random.choice(["High CPU Usage", "Memory Leak", "DB Timeout"]),
                "message": f"Detected at {datetime.now().strftime('%H:%M:%S')}"
            }
            await websocket.send_text(json.dumps(alert))
            await asyncio.sleep(15) # Send an alert every 15 seconds
    except WebSocketDisconnect:
        print("Notification client disconnected")
