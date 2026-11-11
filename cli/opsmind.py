#!/usr/bin/env python3
import sys
import requests
import json

API_URL = "http://localhost:8000/api/v1"

def show_help():
    print("""
    OpsMind CLI Tool
    ----------------
    Usage: opsmind <command>
    
    Commands:
      status        - Check system health
      metrics       - Show CPU/Memory/Disk usage
      anomalies     - List detected anomalies
      incidents     - List active incidents
      cloud         - Show cloud resources
    """)

def get_status():
    try:
        res = requests.get(f"{API_URL}/health/")
        print(f"✅ System Status: {res.json()['status']}")
        print(f"   Timestamp: {res.json()['timestamp']}")
    except Exception as e:
        print(f"❌ Error: Could not connect to backend ({e})")

def get_metrics():
    try:
        res = requests.get(f"{API_URL}/metrics/system")
        data = res.json()
        print(f"🖥️  CPU:    {data['cpu']['usage_percent']}%")
        print(f"🧠 Memory: {data['memory']['usage_percent']}% ({data['memory']['used_gb']} GB / {data['memory']['total_gb']} GB)")
        print(f"💾 Disk:   {data['disk']['usage_percent']}% ({data['disk']['used_gb']} GB / {data['disk']['total_gb']} GB)")
    except Exception as e:
        print(f"❌ Error: {e}")

def get_incidents():
    try:
        res = requests.get(f"{API_URL}/incidents/")
        incidents = res.json()['incidents']
        print(f"🚨 Active Incidents ({len(incidents)}):")
        for inc in incidents[:5]:
            print(f"  [{inc['severity']}] {inc['title']} - {inc['status']}")
    except Exception as e:
        print(f"❌ Error: {e}")

def get_cloud():
    try:
        res = requests.get(f"{API_URL}/cloud/resources")
        data = res.json()
        print(f"☁️  Cloud Resources ({data['total_resources']}):")
        for r in data['resources']:
            print(f"  [{r['provider']}] {r['type']} in {r['region']} - {r['status']}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        show_help()
    else:
        cmd = sys.argv[1].lower()
        if cmd == "status": get_status()
        elif cmd == "metrics": get_metrics()
        elif cmd == "incidents": get_incidents()
        elif cmd == "cloud": get_cloud()
        else: show_help()
