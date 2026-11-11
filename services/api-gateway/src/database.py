import sqlite3

def get_db_connection():
    conn = sqlite3.connect("aiops.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    # Existing Tables
    conn.execute("CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT UNIQUE, value TEXT)")
    conn.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, hashed_password TEXT)")
    conn.execute("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT, service TEXT, level TEXT, message TEXT)")
    
    # NEW: Enterprise Tables
    # 1. Organizations (Multi-tenancy)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS organizations (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT UNIQUE, 
            plan TEXT DEFAULT 'free',
            created_at TEXT
        )
    """)
    
    # 2. Teams & Roles (RBAC)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            org_id INTEGER,
            name TEXT,
            FOREIGN KEY(org_id) REFERENCES organizations(id)
        )
    """)
    
    # 3. Audit Logs
    conn.execute("""
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            org_id INTEGER,
            user_id INTEGER,
            action TEXT,
            resource TEXT,
            timestamp TEXT,
            ip_address TEXT
        )
    """)
    
    conn.commit()
    conn.close()
    print("✅ Enterprise Database Schema Initialized")
