from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx

router = APIRouter()

class LogEntry(BaseModel):
    service: str
    level: str
    message: str

@router.post("/analyze")
async def analyze_log(log: LogEntry):
    async with httpx.AsyncClient() as client:
        try:
            # AI Detector (port 8001) ko request bhej raha hai
            response = await client.post("http://localhost:8001/api/v1/detect", json=log.dict())
            return response.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"AI Detector connection failed: {str(e)}")
