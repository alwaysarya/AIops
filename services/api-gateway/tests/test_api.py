from fastapi.testclient import TestClient
from src.main import app
import pytest

client = TestClient(app)

def test_health_check():
    response = client.get("/api/v1/health/")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_metrics_endpoint():
    response = client.get("/api/v1/metrics/system")
    assert response.status_code == 200
    assert "cpu" in response.json()
    assert "memory" in response.json()

def test_login_invalid_credentials():
    response = client.post("/api/v1/auth/login", json={"username": "wrong", "password": "wrong"})
    assert response.status_code == 401

def test_register_and_login():
    import random
    username = f"testuser_{random.randint(1000,9999)}"
    # Register
    res = client.post("/api/v1/auth/register", json={"username": username, "password": "testpass", "org_name": "TestOrg"})
    assert res.status_code == 200
    # Login
    res = client.post("/api/v1/auth/login", json={"username": username, "password": "testpass"})
    assert res.status_code == 200
    assert "access_token" in res.json()
