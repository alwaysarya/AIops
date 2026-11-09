mkdir -p aiops-intelligent-observability-platform/services/alert-service/src/channels
mkdir -p aiops-intelligent-observability-platform/services/alert-service/src/utils
cd aiops-intelligent-observability-platform/services/alert-service

touch src/__init__.py src/channels/__init__.py src/utils/__init__.py

cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn[standard]==0.24.0
requests==2.31.0
python-dotenv==1.0.0
pydantic==2.5.2
pydantic-settings==2.1.0
EOF

cat > .env << 'EOF'
APP_NAME=Alert-Service
LOG_LEVEL=INFO
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/dummy
TELEGRAM_BOT_TOKEN=dummy
TELEGRAM_CHAT_ID=123456
EOF

cat > src/main.py << 'EOF'
from fastapi import FastAPI
from src.alert_manager import AlertManager
from src.utils.config import settings
import logging

logging.basicConfig(level=settings.LOG_LEVEL)
logger = logging.getLogger(__name__)

app = FastAPI(title="Alert Service", version="1.0.0")
alert_manager = AlertManager()

@app.post("/api/v1/alerts/send")
async def send_alert(alert_data: dict):
    logger.info(f"Received alert: {alert_data}")
    result = await alert_manager.process_alert(alert_data)
    return {"status": "success", "result": result}

@app.get("/api/v1/alerts/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8002, reload=True)
EOF

cat > src/alert_manager.py << 'EOF'
import logging
from src.channels.slack import SlackChannel
from src.channels.telegram import TelegramChannel

logger = logging.getLogger(__name__)

class AlertManager:
    def __init__(self):
        self.slack = SlackChannel()
        self.telegram = TelegramChannel()
        
    async def process_alert(self, alert_data: dict):
        # Deduplication and Prioritization logic would go here
        results = {}
        
        # Send to Slack
        try:
            results['slack'] = self.slack.send(alert_data)
        except Exception as e:
            logger.error(f"Slack failed: {e}")
            results['slack'] = "failed"
            
        # Send to Telegram
        try:
            results['telegram'] = self.telegram.send(alert_data)
        except Exception as e:
            logger.error(f"Telegram failed: {e}")
            results['telegram'] = "failed"
            
        return results
EOF

cat > src/channels/slack.py << 'EOF'
import requests
from src.utils.config import settings
import logging

logger = logging.getLogger(__name__)

class SlackChannel:
    def __init__(self):
        self.webhook_url = settings.SLACK_WEBHOOK_URL

    def send(self, alert_data: dict):
        if "dummy" in self.webhook_url:
            logger.info(f"[MOCK] Sending to Slack: {alert_data}")
            return "mocked"
            
        payload = {
            "text": f"🚨 *{alert_data.get('severity', 'ALERT')}*: {alert_data.get('message', 'No message')}"
        }
        response = requests.post(self.webhook_url, json=payload)
        return response.status_code
EOF

cat > src/channels/telegram.py << 'EOF'
import requests
from src.utils.config import settings
import logging

logger = logging.getLogger(__name__)

class TelegramChannel:
    def __init__(self):
        self.token = settings.TELEGRAM_BOT_TOKEN
        self.chat_id = settings.TELEGRAM_CHAT_ID

    def send(self, alert_data: dict):
        if "dummy" in self.token:
            logger.info(f"[MOCK] Sending to Telegram: {alert_data}")
            return "mocked"
            
        url = f"https://api.telegram.org/bot{self.token}/sendMessage"
        payload = {
            "chat_id": self.chat_id,
            "text": f"🚨 {alert_data.get('severity', 'ALERT')}: {alert_data.get('message', 'No message')}"
        }
        response = requests.post(url, json=payload)
        return response.status_code
EOF

cat > src/utils/config.py << 'EOF'
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Alert-Service"
    LOG_LEVEL: str = "INFO"
    SLACK_WEBHOOK_URL: str = ""
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_CHAT_ID: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
EOF

echo "✅ Alert Service Ready!"
