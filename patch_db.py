import re

with open('api/main.py', 'r') as f:
    content = f.read()

# Database connection logic replace karo
db_logic = """
import os
import psycopg2
import sqlite3
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.getenv("DATABASE_URL", "aiops.db")

def get_db():
    if os.getenv("ENVIRONMENT") == "production":
        # PostgreSQL Connection (Docker)
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    else:
        # SQLite Connection (Local)
        conn = sqlite3.connect(DATABASE_URL)
        return conn
"""

# Purane sqlite3.connect() ko get_db() se replace karo
content = content.replace("import sqlite3", db_logic)
content = content.replace("sqlite3.connect('aiops.db')", "get_db()")
content = content.replace("sqlite3.connect(DATABASE_URL)", "get_db()")

with open('api/main.py', 'w') as f:
    f.write(content)

print("✅ Database code updated for PostgreSQL & SQLite!")
