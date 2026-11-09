import json
import time
from confluent_kafka import Producer

def delivery_report(err, msg):
    if err is not None:
        print(f'Message delivery failed: {err}')
    else:
        print(f'Message delivered to {msg.topic()} [{msg.partition()}]')

conf = {'bootstrap.servers': 'localhost:9092'}
producer = Producer(conf)
topic = 'aiops-logs'

print("Starting log producer...")
try:
    for i in range(5):
        log_data = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "level": "ERROR" if i % 2 == 0 else "INFO",
            "service": "payment-service",
            "message": f"Test log message {i}"
        }
        producer.produce(topic, key=str(i), value=json.dumps(log_data), callback=delivery_report)
        producer.poll(0)
        time.sleep(1)
except KeyboardInterrupt:
    pass
finally:
    producer.flush()
    print("Producer closed.")