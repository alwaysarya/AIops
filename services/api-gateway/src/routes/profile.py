from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.database import get_db_connection
from src.auth import get_password_hash, verify_password

router = APIRouter()

class ProfileUpdate(BaseModel):
    username: str
    email: str

class PasswordChange(BaseModel):
    old_password: str
    new_password: str

@router.get("/{username}")
async def get_profile(username: str):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return {"username": row["username"], "email": "admin@opsmind.com"}

@router.post("/change-password/{username}")
async def change_password(username: str, req: PasswordChange):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    if not row or not verify_password(req.old_password, row["hashed_password"]):
        conn.close()
        raise HTTPException(status_code=400, detail="Invalid old password")
    
    new_hash = get_password_hash(req.new_password)
    conn.execute("UPDATE users SET hashed_password = ? WHERE username = ?", (new_hash, username))
    conn.commit()
    conn.close()
    return {"message": "Password changed successfully"}
