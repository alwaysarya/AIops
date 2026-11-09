cd services/notification-service

printf 'fastapi==0.104.1\nuvicorn[standard]==0.24.0\nwebsockets==12.0\npython-dotenv==1.0.0\npydantic==2.5.2\npydantic-settings==2.1.0\n' > requirements.txt

printf 'APP_NAME=Notification-Service\nLOG_LEVEL=INFO\n' > .env

cat > src/main.py << 'EOF'
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
EOF

cat > src/websocket_server.py << 'EOF'
from fastapi import WebSocket
from typing import List

class WebSocketManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
EOF

cat > src/utils/config.py << 'EOF'
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Notification-Service"
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"

settings = Settings()
EOF
echo "✅ Notification Service Ready!"
