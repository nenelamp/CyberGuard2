from fastapi import APIRouter, HTTPException, Depends, Security
from fastapi.responses import JSONResponse
from typing import List, Optional, Dict, Any
from app.models.training import (
    TrainingProgress, 
    TrainingProgressCreate, 
    TrainingProgressUpdate, 
    TrainingProgressResponse,
    TrainingScore,
    TrainingScoreCreate,
    TrainingScoreResponse,
    UserTrainingSummary
)
from app.database import db
from bson import ObjectId
from datetime import datetime
from app.routes.auth import get_current_user

router = APIRouter(tags=["Training"])

# Training Progress Endpoints

@router.post("/progress", response_model=TrainingProgressResponse)
async def create_training_progress(progress: TrainingProgressCreate, current_user: dict = Security(get_current_user)):
    """Create new training progress entry"""
    progress_dict = progress.dict()
    progress_dict["user_id"] = current_user["email"]
    progress_dict["completion_status"] = "not_started"
    progress_dict["completion_percentage"] = 0.0
    progress_dict["time_spent_seconds"] = 0
    progress_dict["created_at"] = datetime.utcnow()
    progress_dict["updated_at"] = datetime.utcnow()
    
    result = await db.training_progress.insert_one(progress_dict)
    created_progress = await db.training_progress.find_one({"_id": result.inserted_id})
    
    return TrainingProgressResponse(
        id=str(created_progress["_id"]),
        user_id=created_progress["user_id"],
        module_id=created_progress["module_id"],
        module_title=created_progress["module_title"],
        completion_status=created_progress["completion_status"],
        score=created_progress.get("score"),
        max_score=created_progress.get("max_score"),
        completion_percentage=created_progress["completion_percentage"],
        time_spent_seconds=created_progress["time_spent_seconds"],
        started_at=created_progress.get("started_at"),
        completed_at=created_progress.get("completed_at"),
        created_at=created_progress["created_at"],
        updated_at=created_progress["updated_at"]
    )

@router.get("/progress", response_model=List[TrainingProgressResponse])
async def get_user_training_progress(current_user: dict = Security(get_current_user)):
    """Get all training progress for the current user"""
    cursor = db.training_progress.find({"user_id": current_user["email"]})
    progress_list = []
    
    async for progress in cursor:
        progress_list.append(TrainingProgressResponse(
            id=str(progress["_id"]),
            user_id=progress["user_id"],
            module_id=progress["module_id"],
            module_title=progress["module_title"],
            completion_status=progress["completion_status"],
            score=progress.get("score"),
            max_score=progress.get("max_score"),
            completion_percentage=progress["completion_percentage"],
            time_spent_seconds=progress["time_spent_seconds"],
            started_at=progress.get("started_at"),
            completed_at=progress.get("completed_at"),
            created_at=progress["created_at"],
            updated_at=progress["updated_at"]
        ))
    
    return progress_list

@router.get("/progress/module/{module_id}", response_model=TrainingProgressResponse)
async def get_user_module_progress(module_id: str, current_user: dict = Security(get_current_user)):
    """Get specific module progress for the current user"""
    progress = await db.training_progress.find_one({"user_id": current_user["email"], "module_id": module_id})
    
    if not progress:
        raise HTTPException(status_code=404, detail="Training progress not found")
    
    return TrainingProgressResponse(
        id=str(progress["_id"]),
        user_id=progress["user_id"],
        module_id=progress["module_id"],
        module_title=progress["module_title"],
        completion_status=progress["completion_status"],
        score=progress.get("score"),
        max_score=progress.get("max_score"),
        completion_percentage=progress["completion_percentage"],
        time_spent_seconds=progress["time_spent_seconds"],
        started_at=progress.get("started_at"),
        completed_at=progress.get("completed_at"),
        created_at=progress["created_at"],
        updated_at=progress["updated_at"]
    )

@router.put("/progress/module/{module_id}", response_model=TrainingProgressResponse)
async def update_user_module_progress(module_id: str, progress: TrainingProgressUpdate, current_user: dict = Security(get_current_user)):
    """Update specific module progress for the current user"""
    update_data = progress.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.training_progress.update_one(
        {"user_id": current_user["email"], "module_id": module_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Training progress not found")
    
    updated_progress = await db.training_progress.find_one({"user_id": current_user["email"], "module_id": module_id})
    
    return TrainingProgressResponse(
        id=str(updated_progress["_id"]),
        user_id=updated_progress["user_id"],
        module_id=updated_progress["module_id"],
        module_title=updated_progress["module_title"],
        completion_status=updated_progress.get("completion_status", "not_started"),
        score=updated_progress.get("score"),
        max_score=updated_progress.get("max_score"),
        completion_percentage=updated_progress.get("completion_percentage", 0.0),
        time_spent_seconds=updated_progress.get("time_spent_seconds", 0),
        started_at=updated_progress.get("started_at"),
        completed_at=updated_progress.get("completed_at"),
        created_at=updated_progress["created_at"],
        updated_at=updated_progress["updated_at"]
    )

# Training Score Endpoints

@router.post("/scores", response_model=TrainingScoreResponse)
async def create_training_score(score: TrainingScoreCreate, current_user: dict = Security(get_current_user)):
    """Create new training score entry"""
    score_dict = score.dict()
    score_dict["user_id"] = current_user["email"]
    score_dict["percentage"] = (score.score / max(score.max_score, 1)) * 100
    score_dict["submitted_at"] = datetime.utcnow()
    
    result = await db.training_scores.insert_one(score_dict)
    created_score = await db.training_scores.find_one({"_id": result.inserted_id})
    
    return TrainingScoreResponse(
        id=str(created_score["_id"]),
        user_id=created_score["user_id"],
        module_id=created_score["module_id"],
        module_title=created_score["module_title"],
        score=created_score["score"],
        max_score=created_score["max_score"],
        percentage=created_score["percentage"],
        answers=created_score["answers"],
        submitted_at=created_score["submitted_at"]
    )

@router.get("/scores", response_model=List[TrainingScoreResponse])
async def get_user_training_scores(current_user: dict = Security(get_current_user)):
    """Get all training scores for the current user"""
    cursor = db.training_scores.find({"user_id": current_user["email"]}).sort("submitted_at", -1)
    scores_list = []
    
    async for score in cursor:
        scores_list.append(TrainingScoreResponse(
            id=str(score["_id"]),
            user_id=score["user_id"],
            module_id=score["module_id"],
            module_title=score["module_title"],
            score=score["score"],
            max_score=score["max_score"],
            percentage=score["percentage"],
            answers=score["answers"],
            submitted_at=score["submitted_at"]
        ))
    
    return scores_list

@router.get("/scores/module/{module_id}", response_model=TrainingScoreResponse)
async def get_user_module_score(module_id: str, current_user: dict = Security(get_current_user)):
    """Get specific module score for the current user"""
    score = await db.training_scores.find_one({"user_id": current_user["email"], "module_id": module_id})
    
    if not score:
        raise HTTPException(status_code=404, detail="Training score not found")
    
    return TrainingScoreResponse(
        id=str(score["_id"]),
        user_id=score["user_id"],
        module_id=score["module_id"],
        module_title=score["module_title"],
        score=score["score"],
        max_score=score["max_score"],
        percentage=score["percentage"],
        answers=score["answers"],
        submitted_at=score["submitted_at"]
    )

# Dashboard Endpoints

@router.get("/dashboard", response_model=Dict[str, Any])
async def get_user_training_dashboard(current_user: dict = Security(get_current_user)):
    try:
        # Get training progress summary
        progress_pipeline = [
            {"$match": {"user_id": current_user["email"]}},
            {"$group": {
                "_id": "$user_id",
                "total_modules": {"$sum": 1},
                "completed_modules": {"$sum": {"$cond": [{"$eq": ["$completion_status", "completed"]}, 1, 0]}},
                "in_progress_modules": {"$sum": {"$cond": [{"$eq": ["$completion_status", "in_progress"]}, 1, 0]}},
                "not_started_modules": {"$sum": {"$cond": [{"$eq": ["$completion_status", "not_started"]}, 1, 0]}},
                "average_score": {"$avg": "$score"},
                "total_time_spent": {"$sum": "$time_spent_seconds"},
                "last_activity": {"$max": "$updated_at"}
            }}
        ]
        
        progress_summary = await db.training_progress.aggregate(progress_pipeline).to_list(1)
        
        # Get recent scores
        recent_scores = await db.training_scores.find({"user_id": current_user["email"]}).sort("submitted_at", -1).limit(5).to_list(None)
        
        # Get all modules with progress
        all_modules = await db.training_progress.find({"user_id": current_user["email"]}).sort("updated_at", -1).to_list(None)
        
        # Format recent scores
        formatted_scores = []
        for score in recent_scores:
            formatted_scores.append({
                "id": str(score["_id"]),
                "module_title": score["module_title"],
                "score": score["score"],
                "max_score": score["max_score"],
                "percentage": score["percentage"],
                "submitted_at": score["submitted_at"]
            })
        
        # Format all modules
        formatted_modules = []
        for module in all_modules:
            formatted_modules.append({
                "id": str(module["_id"]),
                "module_id": module["module_id"],
                "module_title": module["module_title"],
                "completion_status": module.get("completion_status", "not_started"),
                "score": module.get("score"),
                "completion_percentage": module.get("completion_percentage", 0.0),
                "time_spent_seconds": module.get("time_spent_seconds", 0),
                "updated_at": module.get("updated_at")
            })
        
        summary = progress_summary[0] if progress_summary else {
            "total_modules": 0,
            "completed_modules": 0,
            "in_progress_modules": 0,
            "not_started_modules": 0,
            "average_score": 0.0,
            "total_time_spent": 0,
            "last_activity": None
        }
        
        # Handle None values in average_score
        avg_score = summary.get("average_score")
        if avg_score is None:
            avg_score = 0.0
        else:
            avg_score = float(avg_score)
        
        return {
            "user_id": current_user["email"],
            "summary": {
                "total_modules": summary.get("total_modules", 0),
                "completed_modules": summary.get("completed_modules", 0),
                "in_progress_modules": summary.get("in_progress_modules", 0),
                "not_started_modules": summary.get("not_started_modules", 0),
                "average_score": round(avg_score, 2),
                "total_time_spent": summary.get("total_time_spent", 0),
                "last_activity": summary.get("last_activity")
            },
            "recent_scores": formatted_scores,
            "all_modules": formatted_modules
        }
    except Exception as e:
        print(f"Error in dashboard endpoint: {e}")
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/leaderboard", response_model=List[Dict[str, Any]])
async def get_training_leaderboard():
    """Get training leaderboard across all users"""
    pipeline = [
        {"$group": {
            "_id": "$user_id",
            "total_score": {"$sum": "$score"},
            "total_max_score": {"$sum": "$max_score"},
            "completed_modules": {"$sum": 1},
            "average_percentage": {"$avg": "$percentage"}
        }},
        {"$sort": {"average_percentage": -1}},
        {"$limit": 10}
    ]
    
    leaderboard = await db.training_scores.aggregate(pipeline).to_list(10)
    
    formatted_leaderboard = []
    for entry in leaderboard:
        formatted_leaderboard.append({
            "user_id": entry["_id"],
            "total_score": entry["total_score"],
            "total_max_score": entry["total_max_score"],
            "completed_modules": entry["completed_modules"],
            "average_percentage": round(entry["average_percentage"], 2)
        })
    
    return formatted_leaderboard
