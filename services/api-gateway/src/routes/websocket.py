from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
import asyncio
import random
from datetime import datetime
import jwt
from src.auth import SECRET_KEY, ALGORITHM

router = APIRouter()

@router.websocket("/ws")
async def websocket_logs(websocket: WebSocket, token: str = Query(...)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            await websocket.close(code=1008)
            return
    except Exception:
        await websocket.close(code=1008)
        return

    await websocket.accept()
    services = ["auth-service", "payment-service", "user-service", "api-gateway"]
    levels = ["INFO", "WARNING", "ERROR"]
    try:
        while True:
            log = {
                "timestamp": datetime.utcnow().isoformat(),
                "service": random.choice(services),
                "level": random.choice(levels),
                "message": f"Generated log event #{random.randint(1000, 9999)}"
            }
            await websocket.send_json(log)
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        print("Client disconnected")
