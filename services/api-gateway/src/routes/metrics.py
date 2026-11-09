from fastapi import APIRouter
router = APIRouter()
@router.get("/")
async def get_metrics():
    return {"message": "Metrics endpoint working", "metrics": {}}
