from fastapi import APIRouter
from pydantic import BaseModel
from src.database import get_db_connection

router = APIRouter()

class SettingItem(BaseModel):
    key: str
    value: str

@router.get("/")
async def get_settings():
    conn = get_db_connection()
    rows = conn.execute("SELECT key, value FROM settings").fetchall()
    conn.close()
    return {row["key"]: row["value"] for row in rows}

@router.post("/")
async def save_setting(item: SettingItem):
    conn = get_db_connection()
    conn.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (item.key, item.value))
    conn.commit()
    conn.close()
    return {"status": "success", "message": f"Setting {item.key} saved."}
