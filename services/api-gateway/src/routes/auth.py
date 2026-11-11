from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.database import get_db_connection
from src.auth import get_password_hash, verify_password, create_access_token
import sqlite3
from datetime import datetime

router = APIRouter()

class UserAuth(BaseModel):
    username: str
    password: str
    org_name: str = None

@router.post("/register")
async def register(user: UserAuth):
    conn = get_db_connection()
    hashed = get_password_hash(user.password)
    
    # Create org if not exists
    org_id = None
    if user.org_name:
        cursor = conn.execute("SELECT id FROM organizations WHERE name = ?", (user.org_name,))
        row = cursor.fetchone()
        if row:
            org_id = row["id"]
        else:
            cursor = conn.execute("INSERT INTO organizations (name, plan, created_at) VALUES (?, ?, ?)", (user.org_name, "free", datetime.utcnow().isoformat()))
            org_id = cursor.lastrowid
    
    try:
        conn.execute("INSERT INTO users (username, hashed_password, org_id) VALUES (?, ?, ?)", (user.username, hashed, org_id))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Username already exists")
    
    conn.close()
    return {"message": "User created successfully"}

@router.post("/login")
async def login(user: UserAuth):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM users WHERE username = ?", (user.username,)).fetchone()
    conn.close()
    
    if not row or not verify_password(user.password, row["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": user.username, "org_id": row["org_id"]})
    return {"access_token": token, "token_type": "bearer", "org_id": row["org_id"]}
