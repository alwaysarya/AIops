import requests
import time
import random
from datetime import datetime

services = ["auth-service", "payment-service", "user-service", "api-gateway", "mysql", "redis"]
levels = ["INFO", "WARNING", "ERROR"]

print("🚀 Log Ingester started! Sending logs to database...")
while True:
    log_data = {
        "service": random.choice(services),
        "level": random.choice(levels),
        "message": f"System event processed at {datetime.now().strftime('%H:%M:%S')}"
    }
    try:
        response = requests.post("http://localhost:8000/api/v1/logs/ingest", json=log_data)
        if response.status_code == 200:
            print(f"✅ Inserted: [{log_data['level']}] {log_data['service']}")
    except Exception as e:
        print(f"❌ Error: {e}")
    time.sleep(2)
