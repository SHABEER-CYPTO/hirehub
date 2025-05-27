from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from typing import List
from database import get_db
from models import SavedJobModel, JobModel
from pydantic import BaseModel

router = APIRouter()

# ✅ Brief job data returned inside saved jobs
class JobBrief(BaseModel):
    id: int
    title: str
    location: str
    type: str
    salary: int

    class Config:
        from_attributes = True

# ✅ Response schema
class SavedJobOut(BaseModel):
    id: int
    job_id: int
    user_id: int
    job: JobBrief  # Nested job

    class Config:
        from_attributes = True

# ✅ Save a job (POST)
@router.post("/saved-jobs")
def save_job(user_id: int, job_id: int, db: Session = Depends(get_db)):
    existing = db.query(SavedJobModel).filter_by(user_id=user_id, job_id=job_id).first()
    if existing:
        raise HTTPException(status_code=409, detail="Job already saved.")
    saved = SavedJobModel(user_id=user_id, job_id=job_id)
    db.add(saved)
    db.commit()
    return {"success": True, "message": "Job saved."}

# ✅ Get all saved jobs for a user
@router.get("/saved-jobs", response_model=List[SavedJobOut])
def get_saved_jobs(user_id: int = Query(...), db: Session = Depends(get_db)):
    return (
        db.query(SavedJobModel)
        .options(joinedload(SavedJobModel.job))
        .filter_by(user_id=user_id)
        .all()
    )

# ✅ Remove a saved job
@router.delete("/saved-jobs/{job_id}")
def delete_saved_job(job_id: int, user_id: int, db: Session = Depends(get_db)):
    saved = db.query(SavedJobModel).filter_by(job_id=job_id, user_id=user_id).first()
    if not saved:
        raise HTTPException(status_code=404, detail="Job not found in saved list.")
    db.delete(saved)
    db.commit()
    return {"success": True, "message": "Job removed from saved."}
