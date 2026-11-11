from fastapi import APIRouter
from pydantic import BaseModel
from src.database import get_db_connection
import psutil
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

@router.post("/chat")
async def copilot_chat(req: ChatRequest):
    cpu = psutil.cpu_percent()
    mem = psutil.virtual_memory().percent
    conn = get_db_connection()
    total_errors = conn.execute("SELECT COUNT(*) FROM logs WHERE level = 'ERROR'").fetchone()[0]
    total_logs = conn.execute("SELECT COUNT(*) FROM logs").fetchone()[0]
    conn.close()

    system_prompt = "You are OpsMind AI, an enterprise AIOps assistant. Be concise and professional."
    user_prompt = f"System State: CPU {cpu}%, Memory {mem}%, Total Logs {total_logs}, Errors {total_errors}. User asks: {req.message}"

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
                        ]
                    },
                    timeout=60.0
                )
                if response.status_code == 200:
                    data = response.json()
                    reply = data["choices"][0]["message"]["content"]
                    return {"reply": reply, "source": "Groq LLM (Qwen)"}
                else:
                    print(f"Groq API Error: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"LLM Error: {e}")

    msg = req.message.lower()
    if "status" in msg or "health" in msg:
        reply = f"System is at {cpu}% CPU and {mem}% Memory. Total errors: {total_errors}. Status: {'Healthy' if cpu < 80 else 'Warning'}."
    elif "error" in msg or "problem" in msg:
        reply = f"I detected {total_errors} errors out of {total_logs} logs."
    else:
        reply = "I can help with System Status, Errors, and Scaling. Set GROQ_API_KEY for full LLM capabilities."

    return {"reply": reply, "source": "Rule-based"}
