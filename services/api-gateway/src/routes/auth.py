from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import sqlite3
from src.database import get_db_connection
from src.auth import get_password_hash, verify_password, create_access_token

router = APIRouter()

class UserAuth(BaseModel):
    username: str
    password: str

@router.post("/register")
async def register(user: UserAuth):
    conn = get_db_connection()
    hashed = get_password_hash(user.password)
    try:
        conn.execute("INSERT INTO users (username, hashed_password) VALUES (?, ?)", (user.username, hashed))
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
    token = create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
