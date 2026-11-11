from fastapi import APIRouter
from src.database import get_db_connection

router = APIRouter()

@router.get("/graph")
async def get_topology():
    conn = get_db_connection()
    services = conn.execute("SELECT DISTINCT service FROM logs").fetchall()
    conn.close()

    nodes = [
        {"id": "frontend", "label": "Frontend", "status": "healthy", "type": "ui"},
        {"id": "api-gateway", "label": "API Gateway", "status": "healthy", "type": "api"}
    ]
    
    for s in services:
        nodes.append({
            "id": s["service"], 
            "label": s["service"], 
            "status": "healthy" if "auth" in s["service"] else "warning", 
            "type": "service"
        })

    nodes.append({"id": "postgres", "label": "PostgreSQL", "status": "healthy", "type": "db"})
    nodes.append({"id": "redis", "label": "Redis Cache", "status": "healthy", "type": "cache"})

    edges = [
        {"from": "frontend", "to": "api-gateway"},
        {"from": "api-gateway", "to": "postgres"},
        {"from": "api-gateway", "to": "redis"}
    ]
    
    for s in services:
        edges.append({"from": "api-gateway", "to": s["service"]})

    return {"nodes": nodes, "edges": edges}
