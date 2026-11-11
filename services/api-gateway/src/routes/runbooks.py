from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.database import get_db_connection
from datetime import datetime
import uuid

router = APIRouter()

class RunbookRequest(BaseModel):
    incident_id: int
    action: str
    requested_by: str

@router.post("/request")
async def request_runbook(req: RunbookRequest):
    conn = get_db_connection()
    run_id = str(uuid.uuid4())[:8]
    
    conn.execute(
        "INSERT INTO runbooks (run_id, incident_id, action, requested_by, status, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
        (run_id, req.incident_id, req.action, req.requested_by, "PENDING_APPROVAL", datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()
    
    return {
        "status": "pending",
        "run_id": run_id,
        "message": f"Runbook {run_id} requested. Waiting for Admin approval."
    }

@router.get("/pending")
async def get_pending_runbooks():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM runbooks WHERE status = 'PENDING_APPROVAL'").fetchall()
    conn.close()
    return {"runbooks": [dict(row) for row in rows]}

@router.post("/approve/{run_id}")
async def approve_runbook(run_id: str):
    conn = get_db_connection()
    conn.execute("UPDATE runbooks SET status = 'APPROVED' WHERE run_id = ?", (run_id,))
    conn.commit()
    conn.close()
    return {"status": "success", "message": f"Runbook {run_id} approved and executing."}
