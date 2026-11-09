mkdir -p aiops-intelligent-observability-platform/services/api-gateway/src/routes
mkdir -p aiops-intelligent-observability-platform/services/api-gateway/src/middleware
mkdir -p aiops-intelligent-observability-platform/services/api-gateway/src/utils
cd aiops-intelligent-observability-platform/services/api-gateway

touch src/routes/__init__.py src/middleware/__init__.py src/utils/__init__.py

cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn[standard]==0.24.0
httpx==0.25.0
python-dotenv==1.0.0
pydantic-settings==2.1.0
prometheus-fastapi-instrumentator==6.1.0
opentelemetry-api==1.21.0
opentelemetry-sdk==1.21.0
opentelemetry-instrumentation-fastapi==0.42b0
EOF

cat > .env << 'EOF'
APP_NAME=API-Gateway
PORT=8000
LOG_LEVEL=INFO
EOF

cat > src/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from src.routes import health, auth, logs, anomalies, alerts, metrics
from src.middleware.logging import LoggingMiddleware

app = FastAPI(title="AIOps API Gateway", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(LoggingMiddleware)

app.include_router(health.router, prefix="/api/v1/health", tags=["Health"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(logs.router, prefix="/api/v1/logs", tags=["Logs"])
app.include_router(anomalies.router, prefix="/api/v1/anomalies", tags=["Anomalies"])
app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["Alerts"])
app.include_router(metrics.router, prefix="/api/v1/metrics", tags=["Metrics"])

Instrumentator().instrument(app).expose(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
EOF

cat > src/routes/health.py << 'EOF'
from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}
EOF

cat > src/routes/auth.py << 'EOF'
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(req: LoginRequest):
    if req.username == "admin" and req.password == "admin":
        return {"access_token": "dummy-jwt-token", "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
EOF

cat > src/routes/logs.py << 'EOF'
from fastapi import APIRouter
router = APIRouter()
@router.get("/")
async def get_logs():
    return {"message": "Logs endpoint working"}
EOF

cat > src/routes/anomalies.py << 'EOF'
from fastapi import APIRouter
router = APIRouter()
@router.get("/")
async def get_anomalies():
    return {"message": "Anomalies endpoint working"}
EOF

cat > src/routes/alerts.py << 'EOF'
from fastapi import APIRouter
router = APIRouter()
@router.get("/")
async def get_alerts():
    return {"message": "Alerts endpoint working"}
EOF

cat > src/routes/metrics.py << 'EOF'
from fastapi import APIRouter
router = APIRouter()
@router.get("/")
async def get_metrics():
    return {"message": "Metrics endpoint working"}
EOF

cat > src/middleware/logging.py << 'EOF'
import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.time()
        response = await call_next(request)
        process_time = time.time() - start
        logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.3f}s")
        return response
EOF

echo "✅ API Gateway Ready!"
