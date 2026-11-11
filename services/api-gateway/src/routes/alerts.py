from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.database import get_db_connection
from datetime import datetime

router = APIRouter()

class AlertCreate(BaseModel):
    title: str
    description: str
    severity: str
    service: str

@router.get("/")
async def get_alerts():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM alerts ORDER BY timestamp DESC LIMIT 50").fetchall()
    conn.close()
    return {"alerts": [dict(row) for row in rows]}

@router.post("/create")
async def create_alert(alert: AlertCreate):
    conn = get_db_connection()
    conn.execute(
        "INSERT INTO alerts (title, description, severity, service, status, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
        (alert.title, alert.description, alert.severity, alert.service, "open", datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()
    return {"status": "success"}
