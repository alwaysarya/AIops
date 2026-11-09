from fastapi import FastAPI
from pydantic import BaseModel
from src.inference.predictor import AnomalyPredictor

app = FastAPI(title="AI Anomaly Detector API")
predictor = AnomalyPredictor()

class LogEntry(BaseModel):
    service: str
    level: str
    message: str

@app.post("/api/v1/detect")
async def detect_anomaly(log: LogEntry):
    score = predictor.calculate_score(log.dict())
    return {
        "is_anomaly": score > 0.7,
        "anomaly_score": score,
        "reason": "High error frequency detected" if score > 0.7 else "Normal"
    }

@app.get("/api/v1/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8001, reload=True)
