import numpy as np
from sklearn.ensemble import IsolationForest
import logging

logger = logging.getLogger(__name__)

class AnomalyPredictor:
    def __init__(self):
        # Isolation Forest model initialize karo
        self.model = IsolationForest(
            contamination=0.1,  # Expect 10% anomalies
            random_state=42,
            n_estimators=100
        )
        self.is_trained = False
        self._train_dummy_model()

    def _train_dummy_model(self):
        # Model ko normal data par train karo (dummy training data)
        # In production, ye data database se aayega
        logger.info("Training Isolation Forest model with dummy data...")
        normal_data = np.array([
            [1, 0, 0], [1, 0, 0], [0, 1, 0], 
            [0, 0, 1], [1, 1, 0], [0, 0, 0],
            [1, 0, 0], [0, 1, 0], [0, 0, 1],
        ])
        self.model.fit(normal_data)
        self.is_trained = True
        logger.info("Model trained successfully!")

    def calculate_score(self, log_data: dict) -> float:
        if not self.is_trained:
            return 0.0

        # Log level ko numerical feature mein convert karo
        level_map = {"INFO": 0, "WARNING": 1, "ERROR": 2, "CRITICAL": 3}
        level_num = level_map.get(log_data.get("level", "INFO"), 0)
        
        # Service ko encoded feature mein convert karo
        service = log_data.get("service", "")
        service_num = 1 if "payment" in service else 0
        
        # Message length ko feature banao
        msg_len = min(len(log_data.get("message", "")) / 100, 1.0)

        features = np.array([[level_num, service_num, msg_len]])
        
        # Isolation Forest anomaly score predict karo
        # -1 = anomaly, 1 = normal
        prediction = self.model.predict(features)[0]
        
        # Score ko 0-1 ke beech map karo (higher = more anomalous)
        if prediction == -1:
            return float(np.random.uniform(0.7, 1.0))
        else:
            return float(np.random.uniform(0.0, 0.3))
