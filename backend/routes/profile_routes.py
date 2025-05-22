from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from dependencies import get_current_user
from database import get_db
from models import UserModel
import os, shutil

router = APIRouter()
UPLOAD_DIR = "uploads/profile"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ✅ Corrected: No /api here
@router.get("/profile")
def get_profile(user=Depends(get_current_user), db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user["id"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "name": db_user.name,
        "email": db_user.email,
        "phone": db_user.phone,
        "job_preference": db_user.job_preference,
        "resume_url": db_user.resume_path,
        "profile_pic_url": db_user.profile_picture,
    }

@router.post("/profile/update")  # ✅ Fixed
async def update_profile(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    job_preference: str = Form(...),
    resume: UploadFile = File(None),
    profile_pic: UploadFile = File(None),
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db_user = db.query(UserModel).filter(UserModel.id == user["id"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.name = name
    db_user.email = email
    db_user.phone = phone
    db_user.job_preference = job_preference

    if resume:
        resume_path = os.path.join(UPLOAD_DIR, f"{user['id']}_resume_{resume.filename}")
        with open(resume_path, "wb") as f:
            shutil.copyfileobj(resume.file, f)
        db_user.resume_path = resume_path

    if profile_pic:
        profile_path = os.path.join(UPLOAD_DIR, f"{user['id']}_pic_{profile_pic.filename}")
        with open(profile_path, "wb") as f:
            shutil.copyfileobj(profile_pic.file, f)
        db_user.profile_picture = profile_path

    db.commit()
    db.refresh(db_user)
    return {
        "message": "Profile updated",
        "user": {
            "name": db_user.name,
            "resume": db_user.resume_path,
            "profile_picture": db_user.profile_picture
        }
    }

@router.delete("/profile")  # ✅ Fixed
def delete_profile(user=Depends(get_current_user), db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user["id"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"message": "Profile deleted successfully"}
