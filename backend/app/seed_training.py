from pymongo import MongoClient
from dotenv import load_dotenv
import os
from datetime import datetime

# Load env variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["cyber_db"]

# Collections
training_progress = db["training_progress"]
training_scores = db["training_scores"]

# Clear existing training data
training_progress.delete_many({})
training_scores.delete_many({})

# Training modules data
training_modules = [
    {
        "module_id": "phishing",
        "module_title": "Phishing Awareness",
        "description": "Learn to identify and avoid phishing attacks",
        "duration": "4 minutes",
        "difficulty": "Beginner"
    },
    {
        "module_id": "password",
        "module_title": "Password Security",
        "description": "Master the art of creating and managing secure passwords",
        "duration": "4 minutes",
        "difficulty": "Beginner"
    },
    {
        "module_id": "social-engineering",
        "module_title": "Social Engineering",
        "description": "Recognize and defend against human-based attacks",
        "duration": "5 minutes",
        "difficulty": "Intermediate"
    },
    {
        "module_id": "mfa",
        "module_title": "Multi-Factor Authentication",
        "description": "Understand and implement additional security layers",
        "duration": "3 minutes",
        "difficulty": "Beginner"
    },
    {
        "module_id": "ransomware",
        "module_title": "Ransomware Protection",
        "description": "Defend against digital extortion and malware",
        "duration": "4 minutes",
        "difficulty": "Intermediate"
    },
    {
        "module_id": "data-privacy",
        "module_title": "Data Privacy Laws",
        "description": "Navigate compliance requirements and regulations",
        "duration": "6 minutes",
        "difficulty": "Advanced"
    }
]

# Sample training progress data for users
sample_training_progress = [
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
    {
        "user_id": "alice@securecorp.com",
        "module_id": "ransomware",
        "module_title": "Ransomware Protection",
        "completion_status": "not_started",
        "completion_percentage": 0,
        "time_spent_seconds": 0,
        "created_at": datetime(2024, 1, 19, 8, 0, 0),
        "updated_at": datetime(2024, 1, 19, 8, 0, 0)
    },
    {
        "user_id": "alice@securecorp.com",
        "module_id": "data-privacy",
        "module_title": "Data Privacy Laws",
        "completion_status": "not_started",
        "completion_percentage": 0,
        "time_spent_seconds": 0,
        "created_at": datetime(2024, 1, 19, 8, 0, 0),
        "updated_at": datetime(2024, 1, 19, 8, 0, 0)
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
    {
        "user_id": "kwame@securecorp.com",
        "module_id": "mfa",
        "module_title": "Multi-Factor Authentication",
        "completion_status": "not_started",
        "completion_percentage": 0,
        "time_spent_seconds": 0,
        "created_at": datetime(2024, 1, 22, 8, 0, 0),
        "updated_at": datetime(2024, 1, 22, 8, 0, 0)
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
    {
        "user_id": "ama@cyberghana.com",
        "module_id": "ransomware",
        "module_title": "Ransomware Protection",
        "completion_status": "in_progress",
        "completion_percentage": 75,
        "time_spent_seconds": 225,
        "started_at": datetime(2024, 1, 14, 10, 0, 0),
        "answers": {"quiz1": "correct"},
        "created_at": datetime(2024, 1, 14, 10, 0, 0),
        "updated_at": datetime(2024, 1, 14, 10, 3, 45)
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

# Sample training scores data
sample_training_scores = [
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

# Insert training progress data
print("Seeding training progress data...")
for progress in sample_training_progress:
    result = training_progress.insert_one(progress)
    print(f"Inserted training progress: {progress['user_id']} - {progress['module_title']} ({progress['completion_status']})")

# Insert training scores data
print("Seeding training scores data...")
for score in sample_training_scores:
    result = training_scores.insert_one(score)
    print(f"Inserted training score: {score['user_id']} - {score['module_title']} ({score['percentage']}%)")

print("Training data seeding completed successfully!")
