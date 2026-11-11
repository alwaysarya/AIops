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
            response = await client.post("http://localhost:8001/api/v1/detect", json=log.dict())
            return response.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
