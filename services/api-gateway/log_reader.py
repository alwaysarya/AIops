import time
import requests
import random

# Simulating reading system logs (like /var/log/syslog)
# In real production, use "tail -f /var/log/nginx/access.log" etc.

services = ["nginx", "mysql", "redis", "app-server"]
levels = ["INFO", "WARNING", "ERROR", "CRITICAL"]
messages = [
    "Request processed successfully in 45ms",
    "Database connection timeout",
    "Cache miss for user_id=1234",
    "Disk space warning: 85% used",
    "API rate limit exceeded for IP 192.168.1.1",
    "Service restarted successfully"
]

print("📂 File Log Reader started! (Simulating /var/log/syslog)")
while True:
    log_data = {
        "service": random.choice(services),
        "level": random.choice(levels),
        "message": random.choice(messages)
    }
    try:
        requests.post("http://localhost:8000/api/v1/logs/ingest", json=log_data)
        print(f"📄 Read from system: [{log_data['level']}] {log_data['message']}")
    except Exception as e:
        pass
    time.sleep(2)
