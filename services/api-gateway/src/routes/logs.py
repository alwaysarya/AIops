from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from src.database import get_db_connection

router = APIRouter()

class LogEntry(BaseModel):
    service: str
    level: str
    message: str

@router.get("/")
async def get_logs():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM logs ORDER BY timestamp DESC LIMIT 50").fetchall()
    conn.close()
    return {"logs": [dict(row) for row in rows]}

@router.post("/ingest")
async def ingest_log(log: LogEntry):
    conn = get_db_connection()
    timestamp = datetime.utcnow().isoformat()
    conn.execute(
        "INSERT INTO logs (timestamp, service, level, message) VALUES (?, ?, ?, ?)",
        (timestamp, log.service, log.level, log.message)
    )
    conn.commit()
    conn.close()
    return {"status": "success"}
