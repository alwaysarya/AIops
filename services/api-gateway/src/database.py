import sqlite3
import os

def get_db_connection():
    conn = sqlite3.connect("aiops.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute("CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT UNIQUE, value TEXT)")
    conn.commit()
    conn.close()
