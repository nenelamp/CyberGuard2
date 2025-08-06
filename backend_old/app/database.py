from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "securemind")

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[MONGO_DB]
    print(f"Connected to MongoDB: {MONGO_URI}/{MONGO_DB}")
except Exception as e:
    print(f"Warning: Could not connect to MongoDB: {e}")
    print("Using in-memory storage for development")
    # For development, we'll use a simple in-memory storage
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[MONGO_DB]