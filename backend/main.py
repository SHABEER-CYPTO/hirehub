from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from saved_jobs import router as saved_jobs_router

# Routers
from jobs import router as jobs_router
from applications import router as applications_router
from resume_analyzer import router as resume_router 
from routes.chat import router as chat_router
from routes.profile_routes import router as profile_router  # ✅ FIXED

# ✅ Auto-create all tables from models
Base.metadata.create_all(bind=engine)

# ✅ Initialize FastAPI app
app = FastAPI(
    title="HireHub API",
    version="1.0.0",
    description="Backend for job posting, job applications, resume analysis, and user management."
)

# ✅ CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register all routers with prefixes and tags
app.include_router(jobs_router, prefix="/api", tags=["Jobs"])
app.include_router(applications_router, prefix="/api", tags=["Applications"])
app.include_router(resume_router, prefix="/api", tags=["Resume Analyzer"])
app.include_router(chat_router, prefix="/api", tags=["Chat"])
app.include_router(profile_router, prefix="/api", tags=["Profile"])
app.include_router(saved_jobs_router, prefix="/api", tags=["Saved Jobs"])
