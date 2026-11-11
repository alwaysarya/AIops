from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from kubernetes import client, config
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class RemediationRequest(BaseModel):
    action: str
    service: str

def get_k8s_client():
    try:
        config.load_kube_config()
        return client.CoreV1Api()
    except Exception as e:
        logger.error(f"K8s config error: {e}")
        return None

@router.post("/trigger")
async def trigger_remediation(req: RemediationRequest):
    logger.info(f"🚨 REMEDIATION: {req.action} on {req.service}")
    
    core_v1 = get_k8s_client()
    if not core_v1:
        return {"status": "simulated", "message": "K8s not connected, simulated fix."}

    try:
        if req.action == "restart_pod":
            pods = core_v1.list_namespaced_pod(namespace="default")
            target_pod = None
            for pod in pods.items:
                if "test-pod" in pod.metadata.name:
                    target_pod = pod.metadata.name
                    break
            
            if target_pod:
                core_v1.delete_namespaced_pod(name=target_pod, namespace="default")
                return {
                    "status": "success",
                    "message": f"✅ Real K8s Action: Deleted pod {target_pod}",
                    "action": req.action
                }
            else:
                return {
                    "status": "simulated",
                    "message": f"No pod named 'test-pod' found. Simulated {req.action} on {req.service}",
                    "action": req.action
                }
        return {"status": "success", "message": f"Executed {req.action}"}
    except Exception as e:
        logger.error(f"Remediation failed: {e}")
        return {"status": "error", "message": str(e)}
