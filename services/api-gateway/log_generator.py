import requests
import time
import random

services = ["auth-service", "payment-service", "user-service", "api-gateway"]
levels = ["INFO", "WARNING", "ERROR"]

print("🚀 Log Generator started! Press Ctrl+C to stop.")
while True:
    log_data = {
        "service": random.choice(services),
        "level": random.choice(levels),
        "message": f"Simulated event #{random.randint(1000, 9999)} processed."
    }
    try:
        response = requests.post("http://localhost:8000/api/v1/logs/ingest", json=log_data)
        if response.status_code == 200:
            print(f"✅ Sent: {log_data['level']} from {log_data['service']}")
    except Exception as e:
        print(f"❌ Error: {e}")
    time.sleep(3)
