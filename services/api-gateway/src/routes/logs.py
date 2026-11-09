from fastapi import APIRouter
router = APIRouter()
@router.get("/")
async def get_logs():
    return {"message": "Logs endpoint working", "logs": []}
