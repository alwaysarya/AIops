from fastapi import APIRouter, HTTPException
from kubernetes import client, config
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

def get_k8s_client():
    try:
        config.load_kube_config()
        return client.CoreV1Api()
    except Exception as e:
        logger.error(f"K8s config error: {e}")
        return None

@router.get("/cluster-status")
async def get_cluster_status():
    core_v1 = get_k8s_client()
    if not core_v1:
        raise HTTPException(status_code=500, detail="Kubernetes not connected")
    
    try:
        nodes = core_v1.list_node()
        pods = core_v1.list_pod_for_all_namespaces()
        
        return {
            "nodes": len(nodes.items),
            "pods": len(pods.items),
            "status": "healthy",
            "node_names": [node.metadata.name for node in nodes.items]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
