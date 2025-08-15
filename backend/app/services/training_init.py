#!/usr/bin/env python3
"""
Training initialization service for new users
"""

from datetime import datetime
from app.database import db

async def initialize_user_training_data(user_email: str):
    """Initialize default training data for a new user"""
    # Define default training modules
    default_modules = [
        {
            "module_id": "phishing",
            "module_title": "Phishing Awareness",
            "completion_status": "not_started",
            "completion_percentage": 0.0,
            "time_spent_seconds": 0,
            "score": 0,
            "max_score": 100,
            "started_at": None,
            "completed_at": None,
            "answers": {},
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "module_id": "password-security",
            "module_title": "Password Security",
            "completion_status": "not_started",
            "completion_percentage": 0.0,
            "time_spent_seconds": 0,
            "score": 0,
            "max_score": 100,
            "started_at": None,
            "completed_at": None,
            "answers": {},
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "module_id": "mfa",
            "module_title": "Multi-Factor Authentication",
            "completion_status": "not_started",
            "completion_percentage": 0.0,
            "time_spent_seconds": 0,
            "score": 0,
            "max_score": 100,
            "started_at": None,
            "completed_at": None,
            "answers": {},
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "module_id": "social-engineering",
            "module_title": "Social Engineering",
            "completion_status": "not_started",
            "completion_percentage": 0.0,
            "time_spent_seconds": 0,
            "score": 0,
            "max_score": 100,
            "started_at": None,
            "completed_at": None,
            "answers": {},
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "module_id": "data-privacy",
            "module_title": "Data Privacy Laws",
            "completion_status": "not_started",
            "completion_percentage": 0.0,
            "time_spent_seconds": 0,
            "score": 0,
            "max_score": 100,
            "started_at": None,
            "completed_at": None,
            "answers": {},
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "module_id": "ransomware",
            "module_title": "Ransomware Protection",
            "completion_status": "not_started",
            "completion_percentage": 0.0,
            "time_spent_seconds": 0,
            "score": 0,
            "max_score": 100,
            "started_at": None,
            "completed_at": None,
            "answers": {},
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    # Insert default training progress for new user
    for module in default_modules:
        await db.training_progress.insert_one({
            **module,
            "user_id": user_email
        })
    
    
    return {
        "message": "Default training data initialized successfully",
        "user_id": user_email,
        "modules_initialized": len(default_modules)
    }
