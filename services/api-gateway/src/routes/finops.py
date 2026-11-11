from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/costs")
async def get_cloud_costs():
    # In a real app, this would call AWS Cost Explorer / GCP Billing APIs
    # For now, we simulate real data based on services
    
    services = [
        {"name": "EC2 Instances", "cost": 450.00, "trend": "+5%", "status": "warning"},
        {"name": "S3 Storage", "cost": 120.50, "trend": "-2%", "status": "healthy"},
        {"name": "RDS Databases", "cost": 300.00, "trend": "+12%", "status": "critical"},
        {"name": "Kubernetes Cluster", "cost": 200.00, "trend": "0%", "status": "healthy"},
        {"name": "Data Transfer", "cost": 85.20, "trend": "+8%", "status": "warning"},
    ]
    
    total = sum(s["cost"] for s in services)
    
    recommendations = [
        {"id": 1, "title": "Resize underutilized EC2 instances", "savings": "$120/mo"},
        {"id": 2, "title": "Delete unused EBS volumes", "savings": "$45/mo"},
        {"id": 3, "title": "Switch to S3 Intelligent Tiering", "savings": "$30/mo"},
    ]

    return {
        "total_monthly_spend": round(total, 2),
        "forecasted_spend": round(total * 1.1, 2),
        "services": services,
        "recommendations": recommendations
    }
