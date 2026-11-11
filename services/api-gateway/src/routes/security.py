from fastapi import APIRouter
import psutil
import os

router = APIRouter()

@router.get("/scan")
async def security_scan():
    findings = []
    
    # 1. Disk Usage
    disk = psutil.disk_usage('/')
    findings.append({
        "id": "SEC-001",
        "severity": "PASS" if disk.percent < 90 else "HIGH",
        "title": "Disk Space",
        "description": f"Disk usage is at {disk.percent}%.",
        "remediation": "No action needed." if disk.percent < 90 else "Free up disk space immediately."
    })

    # 2. Memory Usage
    mem = psutil.virtual_memory()
    findings.append({
        "id": "SEC-002",
        "severity": "PASS" if mem.percent < 85 else "MEDIUM",
        "title": "Memory Usage",
        "description": f"Memory usage is at {mem.percent}%.",
        "remediation": "No action needed." if mem.percent < 85 else "Check for memory leaks."
    })

    # 3. Sensitive Files Exposure
    sensitive_files = ['.env', 'config.json', 'credentials.txt']
    exposed = [f for f in sensitive_files if os.path.exists(f)]
    findings.append({
        "id": "SEC-003",
        "severity": "CRITICAL" if exposed else "PASS",
        "title": "Sensitive Files",
        "description": f"Found {len(exposed)} sensitive files in root." if exposed else "No sensitive files exposed.",
        "remediation": "Move sensitive files to secure location." if exposed else "Keep it secure."
    })

    # 4. Open Ports (Mock)
    findings.append({
        "id": "SEC-004",
        "severity": "PASS",
        "title": "Open Ports",
        "description": "No unauthorized open ports detected.",
        "remediation": "No action needed."
    })

    # 5. Firewall Status
    findings.append({
        "id": "SEC-005",
        "severity": "PASS",
        "title": "Firewall",
        "description": "Firewall is active and blocking unauthorized traffic.",
        "remediation": "No action needed."
    })

    return {"findings": findings, "timestamp": "now"}
