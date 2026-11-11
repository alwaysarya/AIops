from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
async def get_compliance_status():
    # In a real enterprise app, this data comes from automated audits
    # For now, we simulate the compliance controls
    controls = [
        {"id": "SOC2-CC1", "framework": "SOC 2", "control": "Access Control", "status": "PASS", "evidence": "JWT + RBAC implemented"},
        {"id": "SOC2-CC2", "framework": "SOC 2", "control": "Audit Logging", "status": "PASS", "evidence": "Audit logs table + API"},
        {"id": "SOC2-CC3", "framework": "SOC 2", "control": "Data Encryption", "status": "PASS", "evidence": "HTTPS + password hashing"},
        {"id": "ISO-27001-A1", "framework": "ISO 27001", "control": "Risk Assessment", "status": "WARNING", "evidence": "Manual review needed"},
        {"id": "ISO-27001-A2", "framework": "ISO 27001", "control": "Asset Management", "status": "PASS", "evidence": "Cloud resources tracked"},
        {"id": "GDPR-ART32", "framework": "GDPR", "control": "Data Protection", "status": "PASS", "evidence": "Encryption + access control"},
        {"id": "GDPR-ART17", "framework": "GDPR", "control": "Right to Erasure", "status": "FAIL", "evidence": "Delete API missing"},
        {"id": "DPDP-1", "framework": "India DPDP", "control": "Consent Management", "status": "PASS", "evidence": "User registration with org"},
    ]
    
    total = len(controls)
    passed = len([c for c in controls if c["status"] == "PASS"])
    warning = len([c for c in controls if c["status"] == "WARNING"])
    failed = len([c for c in controls if c["status"] == "FAIL"])
    
    return {
        "total_controls": total,
        "passed": passed,
        "warning": warning,
        "failed": failed,
        "compliance_score": round((passed / total) * 100, 1),
        "controls": controls
    }
