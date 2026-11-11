from fastapi import APIRouter
from src.database import get_db_connection

router = APIRouter()

@router.get("/summary")
async def get_analytics_summary():
    conn = get_db_connection()
    
    # 1. Total logs and errors
    total_logs = conn.execute("SELECT COUNT(*) FROM logs").fetchone()[0]
    total_errors = conn.execute("SELECT COUNT(*) FROM logs WHERE level = 'ERROR'").fetchone()[0]
    total_warnings = conn.execute("SELECT COUNT(*) FROM logs WHERE level = 'WARNING'").fetchone()[0]
    
    # 2. Anomalies by service (Pie Chart data)
    service_breakdown = conn.execute(
        "SELECT service, COUNT(*) as count FROM logs WHERE level = 'ERROR' GROUP BY service"
    ).fetchall()
    
    # 3. Weekly trend (Bar Chart data)
    # For demo, we group by date
    weekly_trend = conn.execute(
        "SELECT substr(timestamp, 1, 10) as date, COUNT(*) as count FROM logs WHERE level = 'ERROR' GROUP BY date ORDER BY date DESC LIMIT 7"
    ).fetchall()
    
    conn.close()

    return {
        "total_logs": total_logs,
        "total_errors": total_errors,
        "total_warnings": total_warnings,
        "service_breakdown": [dict(row) for row in service_breakdown],
        "weekly_trend": [dict(row) for row in weekly_trend]
    }
