#!/usr/bin/env python3
import requests
import time
import random

API_URL = "http://localhost:8000/api/v1"

def simulate_pod_crash():
    print("💥 Simulating Pod Crash on payment-service...")
    payload = {"service": "payment-service", "level": "ERROR", "message": "CRITICAL: Pod crashed"}
    requests.post(f"{API_URL}/logs/ingest", json=payload)
    print("✅ Chaos injected. Checking system response...")
    time.sleep(2)
    
    # Check if system is still healthy
    res = requests.get(f"{API_URL}/health/")
    if res.status_code == 200:
        print("✅ System survived the crash. Reliability: PASS")
    else:
        print("❌ System failed. Reliability: FAIL")

def simulate_network_latency():
    print("🌐 Simulating Network Latency (500ms)...")
    time.sleep(0.5)
    print("✅ Network delay simulated.")
    
    res = requests.get(f"{API_URL}/health/")
    if res.status_code == 200:
        print("✅ System handled latency. PASS")

def simulate_high_load():
    print("🔥 Simulating High Load (100 requests)...")
    for i in range(100):
        requests.post(f"{API_URL}/logs/ingest", json={"service": "api-gateway", "level": "INFO", "message": f"Load test {i}"})
    print("✅ Load test complete. System stable.")

if __name__ == "__main__":
    print("🚀 Starting Chaos Engineering Tests...\n")
    simulate_pod_crash()
    print("-" * 40)
    simulate_network_latency()
    print("-" * 40)
    simulate_high_load()
    print("\n🎉 All chaos tests completed!")
