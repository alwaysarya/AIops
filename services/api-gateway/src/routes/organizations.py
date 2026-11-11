from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.database import get_db_connection
from datetime import datetime

router = APIRouter()

class OrganizationCreate(BaseModel):
    name: str

@router.post("/create")
async def create_organization(org: OrganizationCreate):
    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT INTO organizations (name, plan, created_at) VALUES (?, ?, ?)",
            (org.name, "enterprise", datetime.utcnow().isoformat())
        )
        conn.commit()
        return {"status": "success", "message": f"Organization '{org.name}' created"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Organization already exists")
    finally:
        conn.close()

@router.get("/list")
async def list_organizations():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM organizations").fetchall()
    conn.close()
    return {"organizations": [dict(row) for row in rows]}
