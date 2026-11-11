from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.database import get_db_connection
from src.auth import get_password_hash

router = APIRouter()

class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "Viewer"

@router.get("/list")
async def list_users():
    conn = get_db_connection()
    rows = conn.execute("SELECT id, username, org_id FROM users").fetchall()
    conn.close()
    return {"users": [dict(row) for row in rows]}

@router.post("/create")
async def create_user(user: UserCreate):
    conn = get_db_connection()
    hashed = get_password_hash(user.password)
    try:
        conn.execute(
            "INSERT INTO users (username, hashed_password) VALUES (?, ?)",
            (user.username, hashed)
        )
        conn.commit()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=400, detail="Username exists or error occurred")
    conn.close()
    return {"status": "success", "message": f"User {user.username} created"}
