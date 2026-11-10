from fastapi import APIRouter, Query
from pydantic import BaseModel
from datetime import datetime
from src.database import get_db_connection

router = APIRouter()

class LogEntry(BaseModel):
    service: str
    level: str
    message: str

@router.get("/")
async def get_logs(
    search: str = Query(None),
    level: str = Query(None),
    limit: int = Query(50)
):
    conn = get_db_connection()
    query = "SELECT * FROM logs WHERE 1=1"
    params = []
    
    if search:
        query += " AND (message LIKE ? OR service LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%"])
    
    if level and level != "ALL":
        query += " AND level = ?"
        params.append(level)
    
    query += " ORDER BY timestamp DESC LIMIT ?"
    params.append(limit)
    
    rows = conn.execute(query, params).fetchall()
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
