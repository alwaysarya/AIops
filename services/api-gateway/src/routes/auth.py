from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
router = APIRouter()
class LoginRequest(BaseModel):
    username: str
    password: str
@router.post("/login")
async def login(req: LoginRequest):
    if req.username == "admin" and req.password == "admin":
        return {"access_token": "dummy-jwt-token", "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
