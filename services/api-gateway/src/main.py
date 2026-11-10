from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from src.routes import health, auth, logs, anomalies, alerts, metrics, settings, remediation, ai_proxy, websocket
from src.middleware.logging import LoggingMiddleware
from src.database import init_db

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="AIOps API Gateway", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

init_db()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.add_middleware(LoggingMiddleware)

app.include_router(health.router, prefix="/api/v1/health", tags=["Health"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(logs.router, prefix="/api/v1/logs", tags=["Logs"])
app.include_router(anomalies.router, prefix="/api/v1/anomalies", tags=["Anomalies"])
app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["Alerts"])
app.include_router(metrics.router, prefix="/api/v1/metrics", tags=["Metrics"])
app.include_router(settings.router, prefix="/api/v1/settings", tags=["Settings"])
app.include_router(remediation.router, prefix="/api/v1/remediation", tags=["Remediation"])
app.include_router(ai_proxy.router, prefix="/api/v1/ai", tags=["AI"])
app.include_router(websocket.router, prefix="/api/v1/ws", tags=["WebSocket"])

Instrumentator().instrument(app).expose(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)

from src.routes import profile
app.include_router(profile.router, prefix="/api/v1/profile", tags=["Profile"])

from src.routes import backup
app.include_router(backup.router, prefix="/api/v1/backup", tags=["Backup"])
