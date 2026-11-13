import sqlite3

conn = sqlite3.connect('aiops.db')
c = conn.cursor()

# Users table mein organization column add karo
try:
    c.execute("ALTER TABLE users ADD COLUMN organization TEXT DEFAULT 'Default Org'")
    print("✅ Multi-tenancy column added!")
except sqlite3.OperationalError:
    print("⚠️ Column already exists.")

conn.commit()
conn.close()
