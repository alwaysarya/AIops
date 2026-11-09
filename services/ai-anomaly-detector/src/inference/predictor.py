import numpy as np
import random

class AnomalyPredictor:
    def calculate_score(self, log_data: dict) -> float:
        # Simple heuristic: ERROR logs have higher anomaly score
        base_score = 0.2
        if log_data.get("level") == "ERROR":
            base_score = 0.85
        elif log_data.get("level") == "WARNING":
            base_score = 0.5
        
        # Add some random noise to simulate ML model
        noise = random.uniform(-0.05, 0.05)
        return min(max(base_score + noise, 0.0), 1.0)
