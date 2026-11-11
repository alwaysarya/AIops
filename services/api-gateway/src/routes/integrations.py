from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import os

router = APIRouter()

class SlackWebhook(BaseModel):
    webhook_url: str
    message: str

class PagerDutyAlert(BaseModel):
    routing_key: str
    summary: str
    severity: str

class JiraTicket(BaseModel):
    domain: str
    email: str
    api_token: str
    project_key: str
    summary: str
    description: str

@router.post("/slack")
async def send_slack(req: SlackWebhook):
    async with httpx.AsyncClient() as client:
        res = await client.post(req.webhook_url, json={"text": req.message})
        if res.status_code == 200:
            return {"status": "success", "message": "Slack notification sent"}
        raise HTTPException(status_code=400, detail="Slack webhook failed")

@router.post("/pagerduty")
async def send_pagerduty(req: PagerDutyAlert):
    payload = {
        "routing_key": req.routing_key,
        "event_action": "trigger",
        "payload": {
            "summary": req.summary,
            "severity": req.severity,
            "source": "OpsMind"
        }
    }
    async with httpx.AsyncClient() as client:
        res = await client.post("https://events.pagerduty.com/v2/enqueue", json=payload)
        if res.status_code == 202:
            return {"status": "success", "message": "PagerDuty alert triggered"}
        raise HTTPException(status_code=400, detail="PagerDuty failed")

@router.post("/jira")
async def create_jira_ticket(req: JiraTicket):
    url = f"https://{req.domain}.atlassian.net/rest/api/3/issue"
    auth = (req.email, req.api_token)
    payload = {
        "fields": {
            "project": {"key": req.project_key},
            "summary": req.summary,
            "description": req.description,
            "issuetype": {"name": "Bug"}
        }
    }
    async with httpx.AsyncClient() as client:
        res = await client.post(url, json=payload, auth=auth)
        if res.status_code == 201:
            return {"status": "success", "message": "Jira ticket created"}
        raise HTTPException(status_code=400, detail=f"Jira failed: {res.text}")
