from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.database import get_db_connection
from datetime import datetime

router = APIRouter()

class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: str # P0, P1, P2, P3, P4
    assignee: str

@router.get("/")
async def get_incidents():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM incidents ORDER BY timestamp DESC").fetchall()
    conn.close()
    return {"incidents": [dict(row) for row in rows]}

@router.post("/create")
async def create_incident(inc: IncidentCreate):
    conn = get_db_connection()
    conn.execute(
        "INSERT INTO incidents (title, description, severity, assignee, status, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
        (inc.title, inc.description, inc.severity, inc.assignee, "open", datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()
    return {"status": "success"}

@router.post("/resolve/{incident_id}")
async def resolve_incident(incident_id: int):
    conn = get_db_connection()
    conn.execute("UPDATE incidents SET status = 'resolved' WHERE id = ?", (incident_id,))
    conn.commit()
    conn.close()
    return {"status": "success"}
