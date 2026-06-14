import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_analyze_rejects_short_text():
    response = client.post("/api/analyze", json={"text": "corto"})
    assert response.status_code == 422
