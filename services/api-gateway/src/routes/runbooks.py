from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.database import get_db_connection
from datetime import datetime
import uuid
from kubernetes import client, config
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class RunbookRequest(BaseModel):
    incident_id: int
    action: str
    requested_by: str

def get_k8s_client():
    try:
        config.load_kube_config()
        return client.CoreV1Api()
    except Exception as e:
        logger.error(f"K8s error: {e}")
        return None

@router.post("/request")
async def request_runbook(req: RunbookRequest):
    conn = get_db_connection()
    run_id = str(uuid.uuid4())[:8]
    conn.execute(
        "INSERT INTO runbooks (run_id, incident_id, action, requested_by, status, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
        (run_id, req.incident_id, req.action, req.requested_by, "PENDING_APPROVAL", datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()
    return {"status": "pending", "run_id": run_id, "message": f"Runbook {run_id} requested. Waiting for Admin approval."}

@router.get("/pending")
async def get_pending_runbooks():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM runbooks WHERE status = 'PENDING_APPROVAL'").fetchall()
    conn.close()
    return {"runbooks": [dict(row) for row in rows]}

@router.post("/approve/{run_id}")
async def approve_runbook(run_id: str):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM runbooks WHERE run_id = ?", (run_id,)).fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Runbook not found")
    
    # Execute Real K8s Action
    core_v1 = get_k8s_client()
    action_status = "simulated"
    
    if core_v1 and row["action"] == "restart_pod":
        try:
            pods = core_v1.list_namespaced_pod(namespace="default")
            for pod in pods.items:
                if "test-pod" in pod.metadata.name:
                    core_v1.delete_namespaced_pod(name=pod.metadata.name, namespace="default")
                    action_status = f"✅ Real K8s Action: Deleted {pod.metadata.name}"
                    break
        except Exception as e:
            logger.error(f"K8s action failed: {e}")
    
    conn.execute("UPDATE runbooks SET status = 'EXECUTED' WHERE run_id = ?", (run_id,))
    conn.commit()
    conn.close()
    
    return {"status": "success", "message": f"Runbook {run_id} approved. {action_status}"}
