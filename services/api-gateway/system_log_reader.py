import subprocess
import time
import requests
from datetime import datetime

print("📂 Reading Real System Logs (macOS)...")

while True:
    try:
        # Mac par system logs check karne ke liye (last 1 min)
        result = subprocess.run(['log', 'show', '--last', '1m', '--style', 'compact'], capture_output=True, text=True, timeout=10)
        if result.stdout:
            lines = result.stdout.strip().split('\n')[-5:] # Last 5 lines
            for line in lines:
                if len(line) > 20:
                    log_data = {
                        "service": "system",
                        "level": "WARNING" if "error" in line.lower() else "INFO",
                        "message": line[:100] # Truncate to 100 chars
                    }
                    requests.post("http://localhost:8000/api/v1/logs/ingest", json=log_data)
                    print(f"✅ Sent: {line[:50]}...")
    except Exception as e:
        print(f"❌ Error: {e}")
    time.sleep(10)
