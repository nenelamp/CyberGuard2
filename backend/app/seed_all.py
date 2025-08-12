#!/usr/bin/env python3
"""
Comprehensive seeder for CyberGuard2 application
Seeds both users and training data for testing the module completion feature
"""

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

# Collections
users_collection = db["users"]
training_progress = db["training_progress"]
training_scores = db["training_scores"]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_users():
    """Seed sample users"""
    print("🌱 Seeding users...")
    
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
    
    user_ids = []
    for user in users:
        existing = users_collection.find_one({"email": user["email"]})
        if not existing:
            result = users_collection.insert_one(user)
            user_ids.append(user["email"])
            print(f"✅ Inserted: {user['email']}")
        else:
            user_ids.append(user["email"])
            print(f"⚠️  Skipped (already exists): {user['email']}")
    
    return user_ids

def seed_training_data():
    """Seed training progress and scores for testing module completion"""
    print("\n🌱 Seeding training data...")
    
    # Clear existing training data
    training_progress.delete_many({})
    training_scores.delete_many({})
    
    # Training progress data
    training_progress_data = [
        # Alice Mensah (admin) - completed 3 modules
        {
            "user_id": "alice@securecorp.com",
            "module_id": "phishing",
            "module_title": "Phishing Awareness",
            "completion_status": "completed",
            "score": 95,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 240,
            "started_at": datetime(2024, 1, 15, 10, 0, 0),
            "completed_at": datetime(2024, 1, 15, 10, 4, 0),
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "created_at": datetime(2024, 1, 15, 10, 0, 0),
            "updated_at": datetime(2024, 1, 15, 10, 4, 0)
        },
        {
            "user_id": "alice@securecorp.com",
            "module_id": "password",
            "module_title": "Password Security",
            "completion_status": "completed",
            "score": 88,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 260,
            "started_at": datetime(2024, 1, 16, 9, 30, 0),
            "completed_at": datetime(2024, 1, 16, 9, 34, 20),
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "created_at": datetime(2024, 1, 16, 9, 30, 0),
            "updated_at": datetime(2024, 1, 16, 9, 34, 20)
        },
        {
            "user_id": "alice@securecorp.com",
            "module_id": "mfa",
            "module_title": "Multi-Factor Authentication",
            "completion_status": "completed",
            "score": 92,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 180,
            "started_at": datetime(2024, 1, 17, 14, 0, 0),
            "completed_at": datetime(2024, 1, 17, 14, 3, 0),
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "created_at": datetime(2024, 1, 17, 14, 0, 0),
            "updated_at": datetime(2024, 1, 17, 14, 3, 0)
        },
        {
            "user_id": "alice@securecorp.com",
            "module_id": "social-engineering",
            "module_title": "Social Engineering",
            "completion_status": "in_progress",
            "completion_percentage": 45,
            "time_spent_seconds": 135,
            "started_at": datetime(2024, 1, 18, 11, 0, 0),
            "answers": {"quiz1": "correct"},
            "created_at": datetime(2024, 1, 18, 11, 0, 0),
            "updated_at": datetime(2024, 1, 18, 11, 2, 15)
        },
        
        # Kwame Boateng (employee) - completed 2 modules
        {
            "user_id": "kwame@securecorp.com",
            "module_id": "phishing",
            "module_title": "Phishing Awareness",
            "completion_status": "completed",
            "score": 78,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 300,
            "started_at": datetime(2024, 1, 20, 9, 0, 0),
            "completed_at": datetime(2024, 1, 20, 9, 5, 0),
            "answers": {"quiz1": "correct", "quiz2": "incorrect"},
            "created_at": datetime(2024, 1, 20, 9, 0, 0),
            "updated_at": datetime(2024, 1, 20, 9, 5, 0)
        },
        {
            "user_id": "kwame@securecorp.com",
            "module_id": "password",
            "module_title": "Password Security",
            "completion_status": "completed",
            "score": 85,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 280,
            "started_at": datetime(2024, 1, 21, 10, 30, 0),
            "completed_at": datetime(2024, 1, 21, 10, 34, 40),
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "created_at": datetime(2024, 1, 21, 10, 30, 0),
            "updated_at": datetime(2024, 1, 21, 10, 34, 40)
        },
        
        # Ama Osei (admin) - completed 4 modules
        {
            "user_id": "ama@cyberghana.com",
            "module_id": "phishing",
            "module_title": "Phishing Awareness",
            "completion_status": "completed",
            "score": 100,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 220,
            "started_at": datetime(2024, 1, 10, 14, 0, 0),
            "completed_at": datetime(2024, 1, 10, 14, 3, 40),
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "created_at": datetime(2024, 1, 10, 14, 0, 0),
            "updated_at": datetime(2024, 1, 10, 14, 3, 40)
        },
        {
            "user_id": "ama@cyberghana.com",
            "module_id": "password",
            "module_title": "Password Security",
            "completion_status": "completed",
            "score": 95,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 250,
            "started_at": datetime(2024, 1, 11, 9, 0, 0),
            "completed_at": datetime(2024, 1, 11, 9, 4, 10),
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "created_at": datetime(2024, 1, 11, 9, 0, 0),
            "updated_at": datetime(2024, 1, 11, 9, 4, 10)
        },
        {
            "user_id": "ama@cyberghana.com",
            "module_id": "social-engineering",
            "module_title": "Social Engineering",
            "completion_status": "completed",
            "score": 90,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 310,
            "started_at": datetime(2024, 1, 12, 11, 0, 0),
            "completed_at": datetime(2024, 1, 12, 11, 5, 10),
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "created_at": datetime(2024, 1, 12, 11, 0, 0),
            "updated_at": datetime(2024, 1, 12, 11, 5, 10)
        },
        {
            "user_id": "ama@cyberghana.com",
            "module_id": "mfa",
            "module_title": "Multi-Factor Authentication",
            "completion_status": "completed",
            "score": 98,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 190,
            "started_at": datetime(2024, 1, 13, 15, 0, 0),
            "completed_at": datetime(2024, 1, 13, 15, 3, 10),
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "created_at": datetime(2024, 1, 13, 15, 0, 0),
            "updated_at": datetime(2024, 1, 13, 15, 3, 10)
        },
        
        # Yaw Mensimah (employee) - completed 1 module
        {
            "user_id": "yaw@cyberghana.com",
            "module_id": "phishing",
            "module_title": "Phishing Awareness",
            "completion_status": "completed",
            "score": 82,
            "max_score": 100,
            "completion_percentage": 100,
            "time_spent_seconds": 290,
            "started_at": datetime(2024, 1, 25, 13, 0, 0),
            "completed_at": datetime(2024, 1, 25, 13, 4, 50),
            "answers": {"quiz1": "correct", "quiz2": "incorrect"},
            "created_at": datetime(2024, 1, 25, 13, 0, 0),
            "updated_at": datetime(2024, 1, 25, 13, 4, 50)
        }
    ]
    
    # Training scores data
    training_scores_data = [
        {
            "user_id": "alice@securecorp.com",
            "module_id": "phishing",
            "module_title": "Phishing Awareness",
            "score": 95,
            "max_score": 100,
            "percentage": 95,
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "submitted_at": datetime(2024, 1, 15, 10, 4, 0)
        },
        {
            "user_id": "alice@securecorp.com",
            "module_id": "password",
            "module_title": "Password Security",
            "score": 88,
            "max_score": 100,
            "percentage": 88,
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "submitted_at": datetime(2024, 1, 16, 9, 34, 20)
        },
        {
            "user_id": "alice@securecorp.com",
            "module_id": "mfa",
            "module_title": "Multi-Factor Authentication",
            "score": 92,
            "max_score": 100,
            "percentage": 92,
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "submitted_at": datetime(2024, 1, 17, 14, 3, 0)
        },
        {
            "user_id": "kwame@securecorp.com",
            "module_id": "phishing",
            "module_title": "Phishing Awareness",
            "score": 78,
            "max_score": 100,
            "percentage": 78,
            "answers": {"quiz1": "correct", "quiz2": "incorrect"},
            "submitted_at": datetime(2024, 1, 20, 9, 5, 0)
        },
        {
            "user_id": "kwame@securecorp.com",
            "module_id": "password",
            "module_title": "Password Security",
            "score": 85,
            "max_score": 100,
            "percentage": 85,
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "submitted_at": datetime(2024, 1, 21, 10, 34, 40)
        },
        {
            "user_id": "ama@cyberghana.com",
            "module_id": "phishing",
            "module_title": "Phishing Awareness",
            "score": 100,
            "max_score": 100,
            "percentage": 100,
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "submitted_at": datetime(2024, 1, 10, 14, 3, 40)
        },
        {
            "user_id": "ama@cyberghana.com",
            "module_id": "password",
            "module_title": "Password Security",
            "score": 95,
            "max_score": 100,
            "percentage": 95,
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "submitted_at": datetime(2024, 1, 11, 9, 4, 10)
        },
        {
            "user_id": "ama@cyberghana.com",
            "module_id": "social-engineering",
            "module_title": "Social Engineering",
            "score": 90,
            "max_score": 100,
            "percentage": 90,
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "submitted_at": datetime(2024, 1, 12, 11, 5, 10)
        },
        {
            "user_id": "ama@cyberghana.com",
            "module_id": "mfa",
            "module_title": "Multi-Factor Authentication",
            "score": 98,
            "max_score": 100,
            "percentage": 98,
            "answers": {"quiz1": "correct", "quiz2": "correct"},
            "submitted_at": datetime(2024, 1, 13, 15, 3, 10)
        },
        {
            "user_id": "yaw@cyberghana.com",
            "module_id": "phishing",
            "module_title": "Phishing Awareness",
            "score": 82,
            "max_score": 100,
            "percentage": 82,
            "answers": {"quiz1": "correct", "quiz2": "incorrect"},
            "submitted_at": datetime(2024, 1, 25, 13, 4, 50)
        }
    ]
    
    # Insert training progress
    for progress in training_progress_data:
        result = training_progress.insert_one(progress)
        print(f"✅ Training progress: {progress['user_id']} - {progress['module_title']} ({progress['completion_status']})")
    
    # Insert training scores
    for score in training_scores_data:
        result = training_scores.insert_one(score)
        print(f"✅ Training score: {score['user_id']} - {score['module_title']} ({score['percentage']}%)")

def main():
    """Main seeding function"""
    print("🚀 Starting comprehensive seeding for CyberGuard2...")
    
    # Seed users
    user_ids = seed_users()
    
    # Seed training data
    seed_training_data()
    
    print("\n🎉 Seeding completed successfully!")
    print("\n📊 Summary:")
    print("   - Users seeded with sample data")
    print("   - Training progress and scores seeded")
    print("   - Ready for testing module completion feature")
    print("\n💡 Next steps:")
    print("   1. Start the backend server: python main.py")
    print("   2. Login with test credentials:")
    print("      - alice@securecorp.com / password123")
    print("      - kwame@securecorp.com / employee456")
    print("   3. Navigate to training modules to test completion tracking")

if __name__ == "__main__":
    main()
