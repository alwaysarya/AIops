from fastapi import APIRouter, HTTPException
from src.database import get_db_connection
from datetime import datetime
import shutil
import os

router = APIRouter()

BACKUP_DIR = "backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

@router.post("/create")
async def create_backup():
    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = f"{BACKUP_DIR}/aiops_backup_{timestamp}.db"
        
        if os.path.exists("aiops.db"):
            shutil.copy("aiops.db", backup_path)
            size = os.path.getsize(backup_path) / 1024
            return {
                "status": "success",
                "backup_name": f"aiops_backup_{timestamp}.db",
                "size_kb": f"{size:.2f} KB"
            }
        else:
            raise HTTPException(status_code=404, detail="Database not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_backups():
    backups = []
    if os.path.exists(BACKUP_DIR):
        for file in os.listdir(BACKUP_DIR):
            if file.endswith(".db"):
                path = os.path.join(BACKUP_DIR, file)
                size = os.path.getsize(path) / 1024
                backups.append({"name": file, "size_kb": f"{size:.2f} KB"})
    return {"backups": backups}

@router.post("/restore/{backup_name}")
async def restore_backup(backup_name: str):
    backup_path = os.path.join(BACKUP_DIR, backup_name)
    if not os.path.exists(backup_path):
        raise HTTPException(status_code=404, detail="Backup file not found")
    
    try:
        shutil.copy(backup_path, "aiops.db")
        return {"status": "success", "message": f"Database restored from {backup_name}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
