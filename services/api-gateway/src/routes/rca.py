from fastapi import APIRouter
from pydantic import BaseModel
from src.database import get_db_connection
import psutil
import os
import httpx
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class RCARequest(BaseModel):
    service: str

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

@router.post("/analyze")
async def analyze_root_cause(req: RCARequest):
    conn = get_db_connection()
    
    # 1. Gather Real System Context
    cpu = psutil.cpu_percent()
    mem = psutil.virtual_memory().percent
    recent_logs = conn.execute("SELECT * FROM logs WHERE service = ? ORDER BY timestamp DESC LIMIT 10", (req.service,)).fetchall()
    total_incidents = conn.execute("SELECT COUNT(*) FROM incidents WHERE status = 'open'").fetchone()[0]
    conn.close()

    logs_text = "\n".join([f"[{log['level']}] {log['message']}" for log in recent_logs])

    # 2. Prepare AI Prompt
    system_prompt = "You are OpsMind AI, an enterprise RCA expert. Analyze the system state and logs to find the root cause."
    user_prompt = f"""
    Service: {req.service}
    CPU Usage: {cpu}%
    Memory Usage: {mem}%
    Open Incidents: {total_incidents}
    
    Recent Logs:
    {logs_text}
    
    Task: Provide a JSON response with:
    1. root_cause (string)
    2. confidence (number 0-100)
    3. recommendation (string)
    """

    # 3. Call Groq LLM
    if GROQ_API_KEY:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    GROQ_URL,
                    headers={"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"},
                    json={
                        "model": "qwen/qwen3.8-27b",
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": user_prompt}
                        ],
                        "response_format": {"type": "json_object"}
                    },
                    timeout=60.0
                )
                if response.status_code == 200:
                    data = response.json()
                    ai_reply = data["choices"][0]["message"]["content"]
                    return {
                        "service": req.service,
                        "ai_analysis": ai_reply,
                        "source": "Groq LLM (Qwen)",
                        "analyzed_logs": len(recent_logs)
                    }
        except Exception as e:
            print(f"LLM Error: {e}")

    # 4. Fallback
    return {
        "service": req.service,
        "ai_analysis": '{"root_cause": "Insufficient data for AI analysis", "confidence": 0, "recommendation": "Check backend logs"}',
        "source": "Rule-based",
        "analyzed_logs": len(recent_logs)
    }
