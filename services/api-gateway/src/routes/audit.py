from fastapi import APIRouter
from pydantic import BaseModel
from src.database import get_db_connection
from datetime import datetime

router = APIRouter()

class AuditLogCreate(BaseModel):
    user: str
    action: str
    resource: str

@router.post("/log")
async def create_audit_log(log: AuditLogCreate):
    conn = get_db_connection()
    conn.execute(
        "INSERT INTO audit_logs (user_id, action, resource, timestamp) VALUES (?, ?, ?, ?)",
        (log.user, log.action, log.resource, datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()
    return {"status": "success"}

@router.get("/")
async def get_audit_logs():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 50").fetchall()
    conn.close()
    return {"logs": [dict(row) for row in rows]}
