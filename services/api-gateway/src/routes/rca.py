from fastapi import APIRouter
from pydantic import BaseModel
from src.database import get_db_connection
from datetime import datetime, timedelta

router = APIRouter()

class RCARequest(BaseModel):
    service: str

@router.post("/analyze")
async def analyze_root_cause(req: RCARequest):
    conn = get_db_connection()
    
    # 1. Get recent logs for this service (last 15 mins)
    fifteen_mins_ago = (datetime.utcnow() - timedelta(minutes=15)).isoformat()
    logs = conn.execute(
        "SELECT * FROM logs WHERE service = ? AND timestamp > ? ORDER BY timestamp DESC LIMIT 10",
        (req.service, fifteen_mins_ago)
    ).fetchall()
    conn.close()

    # 2. AI Logic (Rule-based for now, can be replaced with ML model later)
    error_count = sum(1 for log in logs if log["level"] == "ERROR")
    warning_count = sum(1 for log in logs if log["level"] == "WARNING")
    
    root_cause = "No significant issues detected."
    confidence = 95
    recommendation = "System is operating normally."

    if error_count > 3:
        root_cause = f"High error rate detected in {req.service} (Database connection timeouts)."
        confidence = 88
        recommendation = f"Check database connection pool and restart {req.service} pods."
    elif warning_count > 5:
        root_cause = f"Memory pressure detected in {req.service} (Frequent GC pauses)."
        confidence = 75
        recommendation = f"Scale up {req.service} memory limits."
    elif len(logs) == 0:
        root_cause = "No logs found for this service."
        confidence = 50

    return {
        "service": req.service,
        "root_cause": root_cause,
        "confidence": confidence,
        "recommendation": recommendation,
        "analyzed_logs": len(logs),
        "timestamp": datetime.utcnow().isoformat()
    }
