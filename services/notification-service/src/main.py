from fastapi import FastAPI, WebSocket
from src.websocket_server import WebSocketManager

app = FastAPI(title="Notification Service", version="1.0.0")
ws_manager = WebSocketManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await ws_manager.broadcast(f"Message text was: {data}")
    except Exception:
        ws_manager.disconnect(websocket)

@app.get("/api/v1/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8005, reload=True)
