from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import os

router = APIRouter()

class SlackMessage(BaseModel):
    webhook_url: str
    message: str

@router.post("/slack")
async def send_slack_notification(req: SlackMessage):
    try:
        payload = {"text": req.message}
        response = requests.post(req.webhook_url, json=payload)
        
        if response.status_code == 200:
            return {"status": "success", "message": "Notification sent to Slack"}
        else:
            raise HTTPException(status_code=400, detail="Slack webhook failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/test-alert")
async def test_alert():
    # This simulates a critical alert triggering a notification
    # In real app, this would be triggered by the alert service
    return {
        "status": "triggered",
        "message": "🚨 CRITICAL: High CPU Usage detected on production-server-01",
        "channels": ["slack", "email"]
    }
