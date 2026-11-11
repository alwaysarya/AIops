from fastapi import APIRouter
from src.database import get_db_connection
import psutil
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats():
    conn = get_db_connection()
    
    # 1. Total Incidents (real)
    total_incidents = conn.execute("SELECT COUNT(*) FROM incidents").fetchone()[0]
    open_incidents = conn.execute("SELECT COUNT(*) FROM incidents WHERE status = 'open'").fetchone()[0]
    resolved_incidents = total_incidents - open_incidents
    
    # 2. Total Logs & Errors (real)
    total_logs = conn.execute("SELECT COUNT(*) FROM logs").fetchone()[0]
    total_errors = conn.execute("SELECT COUNT(*) FROM logs WHERE level = 'ERROR'").fetchone()[0]
    
    # 3. Success Rate (based on resolved vs total incidents)
    success_rate = round((resolved_incidents / total_incidents * 100), 1) if total_incidents > 0 else 100.0
    
    # 4. Real System Metrics
    cpu = psutil.cpu_percent()
    mem = psutil.virtual_memory().percent
    
    # 5. Latency (simulated as P95 based on CPU load - higher CPU = higher latency)
    p95_latency = int(200 + (cpu * 2))
    
    # 6. Token Usage (simulated from logs count as proxy)
    token_usage = total_logs * 100  # Each log ~100 tokens
    
    # 7. Total Cost (based on logs + incidents)
    total_cost = round((total_logs * 0.001) + (total_incidents * 0.5), 2)
    
    # 8. Cost Forecast (30-day projection)
    cost_forecast = round(total_cost * 30, 2)
    
    # 9. Live Runs (recent services)
    recent_services = conn.execute("SELECT DISTINCT service FROM logs LIMIT 5").fetchall()
    live_runs = []
    for s in recent_services:
        live_runs.append({
            "name": s["service"],
            "latency": f"{round(1.0 + (cpu/100), 1)}s",
            "status": "Live"
        })
    
    conn.close()
    
    return {
        "success_rate": success_rate,
        "p95_latency": p95_latency,
        "token_usage": f"{round(token_usage/1000000, 1)}M",
        "total_cost": f"${total_cost}",
        "cost_forecast": f"${cost_forecast}",
        "total_incidents": total_incidents,
        "open_incidents": open_incidents,
        "resolved_incidents": resolved_incidents,
        "total_logs": total_logs,
        "total_errors": total_errors,
        "cpu_usage": cpu,
        "memory_usage": mem,
        "live_runs": live_runs
    }
