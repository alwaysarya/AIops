from fastapi import APIRouter
from src.database import get_db_connection

router = APIRouter()

@router.get("/costs")
async def get_cloud_costs():
    conn = get_db_connection()
    
    # Real data from database
    total_logs = conn.execute("SELECT COUNT(*) FROM logs").fetchone()[0]
    total_incidents = conn.execute("SELECT COUNT(*) FROM incidents").fetchone()[0]
    
    # Calculate costs based on real usage (simulated cloud pricing)
    log_cost = round(total_logs * 0.0001, 2)  # $0.0001 per log
    incident_cost = round(total_incidents * 0.50, 2)  # $0.50 per incident
    
    services = [
        {"name": "Log Processing (Compute)", "cost": log_cost, "trend": "+5%", "status": "warning"},
        {"name": "Incident Management", "cost": incident_cost, "trend": "-2%", "status": "healthy"},
        {"name": "Database Storage", "cost": 25.00, "trend": "+12%", "status": "critical"},
        {"name": "Kubernetes Cluster", "cost": 150.00, "trend": "0%", "status": "healthy"},
        {"name": "Data Transfer", "cost": 12.50, "trend": "+8%", "status": "warning"},
    ]
    
    total = sum(s["cost"] for s in services)
    
    recommendations = [
        {"id": 1, "title": "Archive old logs to S3", "savings": "$15/mo"},
        {"id": 2, "title": "Resolve open incidents faster", "savings": "$10/mo"},
        {"id": 3, "title": "Optimize database queries", "savings": "$25/mo"},
    ]

    conn.close()

    return {
        "total_monthly_spend": round(total, 2),
        "forecasted_spend": round(total * 1.1, 2),
        "services": services,
        "recommendations": recommendations
    }
