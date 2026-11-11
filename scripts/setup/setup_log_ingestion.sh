mkdir -p aiops-intelligent-observability-platform/services/log-ingestion-service/src/models
mkdir -p aiops-intelligent-observability-platform/services/log-ingestion-service/src/utils
cd aiops-intelligent-observability-platform/services/log-ingestion-service

touch src/models/__init__.py src/utils/__init__.py src/__init__.py

cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn[standard]==0.24.0
confluent-kafka==2.3.0
elasticsearch==8.11.0
pydantic==2.5.2
python-dotenv==1.0.0
prometheus-client==0.19.0
pydantic-settings==2.1.0
EOF

cat > .env << 'EOF'
APP_NAME=Log-Ingestion-Service
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
KAFKA_TOPIC=aiops-logs
KAFKA_GROUP_ID=log-ingestion-group
ELASTICSEARCH_URL=http://localhost:9200
ELASTICSEARCH_INDEX=aiops-logs
LOG_LEVEL=INFO
EOF

cat > src/main.py << 'EOF'
import asyncio
import logging
from src.kafka_consumer import KafkaLogConsumer
from src.utils.config import settings

logging.basicConfig(level=settings.LOG_LEVEL)
logger = logging.getLogger(__name__)

async def main():
    logger.info("Starting Log Ingestion Service...")
    consumer = KafkaLogConsumer()
    await consumer.start()

if __name__ == "__main__":
    asyncio.run(main())
EOF

cat > src/kafka_consumer.py << 'EOF'
import json
import logging
from confluent_kafka import Consumer, KafkaError
from src.log_parser import LogParser
from src.elasticsearch_writer import ElasticsearchWriter
from src.utils.config import settings

logger = logging.getLogger(__name__)

class KafkaLogConsumer:
    def __init__(self):
        self.consumer = Consumer({
            'bootstrap.servers': settings.KAFKA_BOOTSTRAP_SERVERS,
            'group.id': settings.KAFKA_GROUP_ID,
            'auto.offset.reset': 'earliest'
        })
        self.parser = LogParser()
        self.es_writer = ElasticsearchWriter()

    async def start(self):
        self.consumer.subscribe([settings.KAFKA_TOPIC])
        logger.info(f"Subscribed to topic: {settings.KAFKA_TOPIC}")
        
        try:
            while True:
                msg = self.consumer.poll(1.0)
                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        continue
                    else:
                        logger.error(f"Kafka error: {msg.error()}")
                        break
                
                log_data = json.loads(msg.value().decode('utf-8'))
                parsed_log = self.parser.parse(log_data)
                self.es_writer.write(parsed_log)
                
        except KeyboardInterrupt:
            pass
        finally:
            self.consumer.close()
EOF

cat > src/log_parser.py << 'EOF'
from datetime import datetime
import uuid

class LogParser:
    def parse(self, log_data: dict) -> dict:
        return {
            "id": str(uuid.uuid4()),
            "timestamp": log_data.get("timestamp", datetime.utcnow().isoformat()),
            "level": log_data.get("level", "INFO"),
            "service": log_data.get("service", "unknown"),
            "message": log_data.get("message", ""),
            "metadata": log_data.get("metadata", {})
        }
EOF

cat > src/elasticsearch_writer.py << 'EOF'
from elasticsearch import Elasticsearch
from src.utils.config import settings
import logging

logger = logging.getLogger(__name__)

class ElasticsearchWriter:
    def __init__(self):
        self.es = Elasticsearch([settings.ELASTICSEARCH_URL])
        self.index = settings.ELASTICSEARCH_INDEX

    def write(self, doc: dict):
        try:
            self.es.index(index=self.index, document=doc)
        except Exception as e:
            logger.error(f"Failed to write to ES: {e}")
EOF

cat > src/utils/config.py << 'EOF'
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Log-Ingestion-Service"
    LOG_LEVEL: str = "INFO"
    KAFKA_BOOTSTRAP_SERVERS: str = "localhost:9092"
    KAFKA_TOPIC: str = "aiops-logs"
    KAFKA_GROUP_ID: str = "log-ingestion-group"
    ELASTICSEARCH_URL: str = "http://localhost:9200"
    ELASTICSEARCH_INDEX: str = "aiops-logs"

    class Config:
        env_file = ".env"

settings = Settings()
EOF

echo "✅ Log Ingestion Service Ready!"
