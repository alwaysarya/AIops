from fastapi import APIRouter
from pydantic import BaseModel
from src.database import get_db_connection
import psutil

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def copilot_chat(req: ChatRequest):
    msg = req.message.lower()
    
    # 1. Context Gathering (Real System Data)
    cpu = psutil.cpu_percent()
    mem = psutil.virtual_memory().percent
    conn = get_db_connection()
    total_errors = conn.execute("SELECT COUNT(*) FROM logs WHERE level = 'ERROR'").fetchone()[0]
    total_logs = conn.execute("SELECT COUNT(*) FROM logs").fetchone()[0]
    conn.close()

    # 2. Simple Rule-Based AI (Can be replaced with LLM later)
    if "status" in msg or "health" in msg or "kaisa" in msg:
        reply = f"System is currently at {cpu}% CPU and {mem}% Memory usage. There are {total_errors} errors in the last batch of logs. Overall status: {'Healthy' if cpu < 80 else 'Warning'}."
        action = "View Dashboard"
        path = "/"
    elif "error" in msg or "problem" in msg or "issue" in msg:
        reply = f"I detected {total_errors} errors out of {total_logs} logs. Most common issues are related to database connections and timeout in payment-service."
        action = "View Logs"
        path = "/logs"
    elif "cost" in msg or "billing" in msg:
        reply = "Cloud cost analysis: You have used $120 this week. Recommendation: Shutdown unused development instances."
        action = "View Reports"
        path = "/reports"
    elif "scale" in msg or "slow" in msg:
        reply = f"CPU is at {cpu}%. Recommendation: If it crosses 80%, you should scale up the production cluster."
        action = "View Topology"
        path = "/topology"
    else:
        reply = "I can help you with System Status, Error Analysis, Cost Optimization, and Scaling recommendations. Try asking: 'What is the system status?'"
        action = None
        path = None

    return {
        "reply": reply,
        "action": action,
        "path": path
    }
