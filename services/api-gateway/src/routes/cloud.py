from fastapi import APIRouter
import random
from datetime import datetime

router = APIRouter()

@router.get("/resources")
async def get_cloud_resources():
    # Simulating real cloud provider APIs (AWS/GCP/Azure)
    providers = ["AWS", "GCP", "Azure"]
    regions = ["us-east-1", "us-central1", "eastus", "ap-south-1", "eu-west-1"]
    resource_types = ["EC2", "VM", "Kubernetes", "RDS", "S3", "Lambda"]
    
    resources = []
    for i in range(8):
        resources.append({
            "id": f"i-{random.randint(10000, 99999)}",
            "provider": random.choice(providers),
            "region": random.choice(regions),
            "type": random.choice(resource_types),
            "status": random.choice(["running", "stopped", "warning"]),
            "cpu": random.randint(10, 95),
            "memory": random.randint(20, 90),
            "cost_per_hour": round(random.uniform(0.1, 2.5), 2)
        })
    
    return {
        "total_resources": len(resources),
        "resources": resources,
        "last_sync": datetime.utcnow().isoformat()
    }
