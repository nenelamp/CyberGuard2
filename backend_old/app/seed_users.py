from pymongo import MongoClient
from passlib.context import CryptContext
from dotenv import load_dotenv
import os
from datetime import datetime

# Load env variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["cyber_db"]
users_collection = db["users"]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Sample user data
users = [
    {
        "full_name": "Alice Mensah",
        "email": "alice@securecorp.com",
        "password": pwd_context.hash("password123"),
        "role": "admin",
        "organization": "SecureCorp",
        "created_at": datetime.utcnow()
    },
    {
        "full_name": "Kwame Boateng",
        "email": "kwame@securecorp.com",
        "password": pwd_context.hash("employee456"),
        "role": "employee",
        "organization": "SecureCorp",
        "created_at": datetime.utcnow()
    },
    {
        "full_name": "Ama Osei",
        "email": "ama@cyberghana.com",
        "password": pwd_context.hash("admin789"),
        "role": "admin",
        "organization": "CyberGhana",
        "created_at": datetime.utcnow()
    },
    {
        "full_name": "Yaw Mensimah",
        "email": "yaw@cyberghana.com",
        "password": pwd_context.hash("pass4321"),
        "role": "employee",
        "organization": "CyberGhana",
        "created_at": datetime.utcnow()
    }
]

# Insert data (avoid duplicates)
for user in users:
    if not users_collection.find_one({"email": user["email"]}):
        users_collection.insert_one(user)
        print(f"Inserted: {user['email']}")
    else:
        print(f"Skipped (already exists): {user['email']}")
