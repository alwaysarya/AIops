from fastapi import APIRouter
import psutil
import random
from datetime import datetime

router = APIRouter()

@router.get("/forecast")
async def get_forecast():
    cpu = psutil.cpu_percent()
    mem = psutil.virtual_memory().percent
    disk = psutil.disk_usage('/').percent
    
    # Simple Predictive Logic (Can be replaced with real ML model)
    forecast = []
    
    if cpu > 60:
        forecast.append({
            "service": "api-gateway",
            "metric": "CPU",
            "current": cpu,
            "predicted": min(cpu + 15, 99),
            "timeframe": "15 mins",
            "risk": "HIGH",
            "action": "Scale up replicas to 3"
        })
    if mem > 65:
        forecast.append({
            "service": "database",
            "metric": "Memory",
            "current": mem,
            "predicted": min(mem + 10, 99),
            "timeframe": "30 mins",
            "risk": "MEDIUM",
            "action": "Check for memory leaks"
        })
    if disk > 80:
        forecast.append({
            "service": "storage",
            "metric": "Disk",
            "current": disk,
            "predicted": min(disk + 5, 99),
            "timeframe": "2 hours",
            "risk": "HIGH",
            "action": "Cleanup old logs or add storage"
        })

    return {
        "current_state": {
            "cpu": cpu,
            "memory": mem,
            "disk": disk
        },
        "predictions": forecast,
        "timestamp": datetime.utcnow().isoformat()
    }
