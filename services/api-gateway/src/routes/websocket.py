from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
from datetime import datetime
import random

router = APIRouter()

@router.websocket("/ws")
async def websocket_logs(websocket: WebSocket):
    await websocket.accept()
    services = ["auth-service", "payment-service", "user-service", "api-gateway"]
    levels = ["INFO", "WARNING", "ERROR"]
    try:
        while True:
            log = {
                "timestamp": datetime.utcnow().isoformat(),
                "service": random.choice(services),
                "level": random.choice(levels),
                "message": f"Real-time log event #{random.randint(1000, 9999)}"
            }
            await websocket.send_json(log)
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        print("Client disconnected")
