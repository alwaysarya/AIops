from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS agents
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, status TEXT, created_at TEXT)''')
    conn.commit()
    conn.close()

init_db()

class Agent(BaseModel):
    name: str
    type: str

@app.post("/api/v1/agents")
def create_agent(agent: Agent):
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("INSERT INTO agents (name, type, status, created_at) VALUES (?, ?, ?, ?)",
              (agent.name, agent.type, "Active", datetime.now().isoformat()))
    conn.commit()
    agent_id = c.lastrowid
    conn.close()
    return {"id": agent_id, "message": "Agent created successfully"}

@app.get("/api/v1/agents")
def get_agents():
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("SELECT id, name, type, status, created_at FROM agents ORDER BY id DESC")
    agents = [{"id": r[0], "name": r[1], "type": r[2], "status": r[3], "created_at": r[4]} for r in c.fetchall()]
    conn.close()
    return agents
