from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "super_secret_key_opsmind"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def init_db():
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS agents
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, status TEXT, created_at TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS incidents (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, severity TEXT, description TEXT, status TEXT, created_at TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT, role TEXT)''')
    conn.commit()
    conn.close()

init_db()

class UserCreate(BaseModel):
    email: str
    password: str
    role: str = "admin"

class Agent(BaseModel):
    name: str
    type: str

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/api/v1/signup")
def signup(user: UserCreate):
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email = ?", (user.email,))
    if c.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = get_password_hash(user.password)
    c.execute("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", (user.email, hashed_pw, user.role))
    conn.commit()
    conn.close()
    return {"message": "User created successfully"}

@app.post("/api/v1/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("SELECT email, password, role FROM users WHERE email = ?", (form_data.username,))
    user = c.fetchone()
    conn.close()
    
    if not user or not verify_password(form_data.password, user[1]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": user[0], "role": user[2]})
    return {"access_token": access_token, "token_type": "bearer", "role": user[2]}

@app.post("/api/v1/agents")
def create_agent(agent: Agent):
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("INSERT INTO agents (name, type, status, created_at) VALUES (?, ?, ?, ?)",
              (agent.name, agent.type, "Active", datetime.now().isoformat()))
    conn.commit()
    agent_id = c.lastrowid
    log_audit("CREATE_AGENT", f"Created new agent: {agent.name}")
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

# --- Dashboard Mock Data (Taaki frontend na toote) ---
@app.get("/api/v1/dashboard/stats")
def get_dashboard_stats():
    return {
        "success_rate": 98.5,
        "p95_latency": 124,
        "token_usage": "1.2M",
        "total_cost": "$24.50",
        "cost_forecast": "$850.00",
        "total_incidents": 12,
        "open_incidents": 2,
        "resolved_incidents": 10,
        "total_logs": 152000,
        "total_errors": 450,
        "cpu_usage": 45.2,
        "memory_usage": 62.1,
        "live_runs": [
            {"name": "user-service", "latency": "1.1s", "status": "Live"},
            {"name": "auth-service", "latency": "0.9s", "status": "Live"},
            {"name": "api-gateway", "latency": "0.4s", "status": "Live"},
            {"name": "payment-service", "latency": "2.1s", "status": "Live"},
            {"name": "mysql", "latency": "0.2s", "status": "Live"}
        ]
    }

import psutil

@app.get("/api/v1/system/metrics")
def get_system_metrics():
    return {
        "cpu_percent": psutil.cpu_percent(interval=0.5),
        "memory_percent": psutil.virtual_memory().percent,
        "disk_percent": psutil.disk_usage('/').percent,
        "boot_time": psutil.boot_time()
    }

import psutil

@app.get("/api/v1/system/metrics")
def get_system_metrics():
    return {
        "cpu_percent": psutil.cpu_percent(interval=0.5),
        "memory_percent": psutil.virtual_memory().percent,
        "disk_percent": psutil.disk_usage('/').percent,
        "boot_time": psutil.boot_time()
    }

class Incident(BaseModel):
    title: str
    severity: str
    description: str

@app.post("/api/v1/incidents")
def create_incident(incident: Incident):
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("INSERT INTO incidents (title, severity, description, status, created_at) VALUES (?, ?, ?, ?, ?)",
              (incident.title, incident.severity, incident.description, "Open", datetime.now().isoformat()))
    conn.commit()
    incident_id = c.lastrowid
    conn.close()
    return {"id": incident_id, "message": "Incident created successfully"}

@app.get("/api/v1/incidents")
def get_incidents():
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("SELECT id, title, severity, description, status, created_at FROM incidents ORDER BY id DESC")
    incidents = [{"id": r[0], "title": r[1], "severity": r[2], "description": r[3], "status": r[4], "created_at": r[5]} for r in c.fetchall()]
    conn.close()
    return incidents

class ChatRequest(BaseModel):
    message: str

@app.post("/api/v1/ai/chat")
def ai_chat(req: ChatRequest):
    msg = req.message.lower()
    if "health" in msg or "status" in msg:
        reply = "System health is currently stable. CPU usage is low, but memory usage is around 70%. No critical alerts found."
    elif "incident" in msg:
        reply = "I see 1 open incident: 'API gateway down'. It's a P1 priority. Would you like me to run a diagnostic?"
    elif "fix" in msg or "resolve" in msg:
        reply = "I can run an automated runbook to restart the API Gateway. Should I proceed?"
    else:
        reply = "I'm your AI Copilot. I can check system health, list incidents, or recommend fixes. How can I help?"
    
    return {"reply": reply}

class CloudConnector(BaseModel):
    provider: str
    access_key: str
    region: str

@app.post("/api/v1/connectors")
def add_connector(conn: CloudConnector):
    conn_db = sqlite3.connect('aiops.db')
    c = conn_db.cursor()
    c.execute("INSERT INTO connectors (provider, access_key, region, status) VALUES (?, ?, ?, ?)",
              (conn.provider, conn.access_key[:4] + "****" + conn.access_key[-4:], conn.region, "Connected"))
    conn_db.commit()
    conn_db.close()
    return {"message": "Cloud account connected successfully"}

@app.get("/api/v1/connectors")
def get_connectors():
    conn_db = sqlite3.connect('aiops.db')
    c = conn_db.cursor()
    c.execute("SELECT id, provider, access_key, region, status FROM connectors")
    conns = [{"id": r[0], "provider": r[1], "access_key": r[2], "region": r[3], "status": r[4]} for r in c.fetchall()]
    conn_db.close()
    return conns

class CloudConnector(BaseModel):
    provider: str
    access_key: str
    region: str

@app.post("/api/v1/connectors")
def add_connector(conn: CloudConnector):
    conn_db = sqlite3.connect('aiops.db')
    c = conn_db.cursor()
    c.execute("INSERT INTO connectors (provider, access_key, region, status) VALUES (?, ?, ?, ?)",
              (conn.provider, conn.access_key[:4] + "****" + conn.access_key[-4:], conn.region, "Connected"))
    conn_db.commit()
    conn_db.close()
    return {"message": "Cloud account connected successfully"}

@app.get("/api/v1/connectors")
def get_connectors():
    conn_db = sqlite3.connect('aiops.db')
    c = conn_db.cursor()
    c.execute("SELECT id, provider, access_key, region, status FROM connectors")
    conns = [{"id": r[0], "provider": r[1], "access_key": r[2], "region": r[3], "status": r[4]} for r in c.fetchall()]
    conn_db.close()
    return conns

def log_audit(action: str, details: str):
    conn_db = sqlite3.connect('aiops.db')
    c = conn_db.cursor()
    c.execute("INSERT INTO audit_logs (action, details, timestamp, actor) VALUES (?, ?, ?, ?)",
              (action, details, datetime.now().isoformat(), "Admin"))
    conn_db.commit()
    conn_db.close()

@app.get("/api/v1/audit-logs")
def get_audit_logs():
    conn_db = sqlite3.connect('aiops.db')
    c = conn_db.cursor()
    c.execute("SELECT id, action, details, timestamp FROM audit_logs ORDER BY id DESC")
    logs = [{"id": r[0], "action": r[1], "details": r[2], "timestamp": r[3]} for r in c.fetchall()]
    conn_db.close()
    return logs

default_policies = [
    {"id": 1, "name": "Enforce MFA", "desc": "All users must have MFA enabled.", "status": "Active", "severity": "Critical"},
    {"id": 2, "name": "No Public S3 Buckets", "desc": "S3 buckets must not be publicly accessible.", "status": "Active", "severity": "High"},
    {"id": 3, "name": "Require Encryption at Rest", "desc": "All databases must be encrypted.", "status": "Active", "severity": "High"},
    {"id": 4, "name": "Root Account Access", "desc": "Root account should not have active access keys.", "status": "Inactive", "severity": "Critical"},
    {"id": 5, "name": "Max Pod Limit", "desc": "Kubernetes cluster should not exceed 100 pods.", "status": "Active", "severity": "Medium"}
]

@app.get("/api/v1/policies")
def get_policies():
    return default_policies

@app.put("/api/v1/policies/{policy_id}")
def toggle_policy(policy_id: int):
    global default_policies
    for p in default_policies:
        if p["id"] == policy_id:
            p["status"] = "Inactive" if p["status"] == "Active" else "Active"
            log_audit("TOGGLE_POLICY", f"Policy '{p['name']}' changed to {p['status']}")
            return p
    raise HTTPException(status_code=404, detail="Policy not found")

@app.get("/api/v1/security/threats")
def get_threats():
    return [
        {"id": 1, "type": "Vulnerability", "severity": "High", "resource": "api-gateway:v1.2", "status": "Open"},
        {"id": 2, "type": "Secret Exposure", "severity": "Critical", "resource": "AWS_ACCESS_KEY", "status": "In Progress"},
        {"id": 3, "type": "Misconfiguration", "severity": "Medium", "resource": "S3_Bucket_Logs", "status": "Resolved"}
    ]

class Approval(BaseModel):
    title: str
    requested_by: str

@app.post("/api/v1/approvals")
def create_approval(app_req: Approval):
    conn_db = sqlite3.connect('aiops.db')
    c = conn_db.cursor()
    c.execute("INSERT INTO approvals (title, requested_by, status) VALUES (?, ?, ?)",
              (app_req.title, app_req.requested_by, "Pending"))
    conn_db.commit()
    conn_db.close()
    log_audit("CREATE_APPROVAL", f"Requested approval for: {app_req.title}")
    return {"message": "Approval requested"}

@app.get("/api/v1/approvals")
def get_approvals():
    conn_db = sqlite3.connect('aiops.db')
    c = conn_db.cursor()
    c.execute("SELECT id, title, requested_by, status FROM approvals ORDER BY id DESC")
    res = [{"id": r[0], "title": r[1], "requested_by": r[2], "status": r[3]} for r in c.fetchall()]
    conn_db.close()
    return res

@app.put("/api/v1/approvals/{app_id}")
def update_approval(app_id: int, status: str):
    conn_db = sqlite3.connect('aiops.db')
    c = conn_db.cursor()
    c.execute("UPDATE approvals SET status = ? WHERE id = ?", (status, app_id))
    conn_db.commit()
    conn_db.close()
    log_audit("UPDATE_APPROVAL", f"Approval {app_id} marked as {status}")
    return {"message": f"Approval {status}"}

# --- Multi-Tenancy Support ---
# Users table mein organization column add karna
try:
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("ALTER TABLE users ADD COLUMN organization TEXT DEFAULT 'Default Org'")
    conn.commit()
    conn.close()
except:
    pass

class OrgUpdate(BaseModel):
    email: str
    organization: str

@app.post("/api/v1/update-org")
def update_org(data: OrgUpdate):
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("UPDATE users SET organization = ? WHERE email = ?", (data.organization, data.email))
    conn.commit()
    conn.close()
    return {"message": "Organization updated"}

@app.get("/api/v1/user/{email}")
def get_user_info(email: str):
    conn = sqlite3.connect('aiops.db')
    c = conn.cursor()
    c.execute("SELECT email, role, organization FROM users WHERE email = ?", (email,))
    user = c.fetchone()
    conn.close()
    if user:
        return {"email": user[0], "role": user[1], "organization": user[2]}
    return {"error": "User not found"}
