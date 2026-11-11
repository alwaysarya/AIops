from fastapi import APIRouter
import psutil
import os

router = APIRouter()

@router.get("/scan")
async def security_scan():
    findings = []
    
    # 1. Check Disk Usage (Risk if > 90%)
    disk = psutil.disk_usage('/')
    if disk.percent > 90:
        findings.append({
            "id": "SEC-001",
            "severity": "HIGH",
            "title": "Disk Space Critical",
            "description": f"Disk usage is at {disk.percent}%. This can lead to system crash.",
            "remediation": "Free up disk space or add more storage."
        })
    else:
        findings.append({
            "id": "SEC-001",
            "severity": "PASS",
            "title": "Disk Space Normal",
            "description": f"Disk usage is at {disk.percent}%. System is safe.",
            "remediation": "No action needed."
        })

    # 2. Check Memory Usage (Risk if > 85%)
    mem = psutil.virtual_memory()
    if mem.percent > 85:
        findings.append({
            "id": "SEC-002",
            "severity": "MEDIUM",
            "title": "High Memory Usage",
            "description": f"Memory usage is at {mem.percent}%. Performance degradation expected.",
            "remediation": "Check for memory leaks or add more RAM."
        })
    else:
        findings.append({
            "id": "SEC-002",
            "severity": "PASS",
            "title": "Memory Usage Normal",
            "description": f"Memory usage is at {mem.percent}%.",
            "remediation": "No action needed."
        })

    # 3. Check for Sensitive Files Exposure (Mock check)
    sensitive_files = ['.env', 'config.json', 'credentials.txt']
    exposed = [f for f in sensitive_files if os.path.exists(f)]
    if exposed:
        findings.append({
            "id": "SEC-003",
            "severity": "CRITICAL",
            "title": "Sensitive File Exposure",
            "description": f"Found {len(exposed)} sensitive files in root directory. They might be accessible publicly.",
            "remediation": "Move sensitive files to a secure location or use environment variables."
        })
    else:
        findings.append({
            "id": "SEC-003",
            "severity": "PASS",
            "title": "No Sensitive Files Exposed",
            "description": "No .env or credential files found in public root.",
            "remediation": "Keep it secure."
        })

    return {"findings": findings, "timestamp": "now"}
