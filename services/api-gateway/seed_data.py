import sqlite3
from datetime import datetime, timedelta
import random

conn = sqlite3.connect("aiops.db")
c = conn.cursor()

# 1. Seed Incidents
print("Seeding Incidents...")
incidents = [
    ("Database Connection Timeout", "Primary DB not responding to queries.", "P0", "aryan", "resolved"),
    ("Payment Gateway Latency", "Stripe API taking > 5s to respond.", "P1", "rahul", "open"),
    ("K8s Node Disk Full", "Node-02 disk usage at 95%.", "P0", "aryan", "open"),
    ("Auth Service 500 Errors", "Intermittent 500 errors on /login.", "P1", "rahul", "resolved"),
    ("High Memory Usage", "Redis cache consuming 8GB.", "P2", "aryan", "open"),
]
for inc in incidents:
    c.execute("INSERT INTO incidents (title, description, severity, assignee, status, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
              (*inc, (datetime.now() - timedelta(hours=random.randint(1, 48))).isoformat()))

# 2. Seed Logs
print("Seeding Logs...")
services = ["auth-service", "payment-service", "user-service", "api-gateway", "mysql", "redis"]
levels = ["INFO", "WARNING", "ERROR", "CRITICAL"]
for _ in range(100):
    c.execute("INSERT INTO logs (timestamp, service, level, message) VALUES (?, ?, ?, ?)",
              ((datetime.now() - timedelta(minutes=random.randint(1, 1440))).isoformat(),
               random.choice(services), random.choice(levels), f"Simulated system log event {random.randint(1000,9999)}"))

# 3. Seed Settings
print("Seeding Settings...")
c.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('api_url', 'http://localhost:8000')")
c.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('kafka_url', 'localhost:9092')")

conn.commit()
conn.close()
print("✅ Demo data seeded successfully!")
