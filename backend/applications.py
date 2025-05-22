from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Query, Path
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import ApplicationModel
from pydantic import BaseModel
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ✅ Pydantic schema for response
class ApplicationOut(BaseModel):
    id: int
    job_id: int
    jobseeker_id: int
    cover_letter: str
    resume_path: str
    status: str

    class Config:
        from_attributes = True

# ✅ POST /api/applications
@router.post("/applications")
async def submit_application(
    job_id: int = Form(...),
    jobseeker_id: int = Form(...),
    cover_letter: str = Form(""),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        # Save resume to disk
        filename = f"{jobseeker_id}_{job_id}_{resume.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        # Insert into DB
        new_app = ApplicationModel(
            job_id=job_id,
            jobseeker_id=jobseeker_id,
            cover_letter=cover_letter,
            resume_path=file_path,
            status="Pending"
        )
        db.add(new_app)
        db.commit()
        db.refresh(new_app)

        return {"success": True, "message": "Application submitted successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ GET /api/applications?jobseeker_id=...
@router.get("/applications", response_model=List[ApplicationOut])
def get_applications(
    jobseeker_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    try:
        if jobseeker_id:
            return db.query(ApplicationModel).filter(ApplicationModel.jobseeker_id == jobseeker_id).all()
        return db.query(ApplicationModel).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ PUT /api/applications/{id}/status
@router.put("/applications/{application_id}/status")
def update_application_status(
    application_id: int = Path(...),
    new_status: str = Form(...),  # e.g., "Accepted", "Rejected"
    db: Session = Depends(get_db)
):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    app.status = new_status
    db.commit()
    db.refresh(app)

    return {"success": True, "message": "Application status updated.", "application": app}
