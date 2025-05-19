 # 💼 HireHub - Smart Job Portal with AI Features

HireHub is a full-stack job portal built with **React + FastAPI**, enabling **Job Seekers**, **Employers**, and **Admins** to interact on a role-based platform. Includes smart features like **AI Resume Analyzer**, **job filtering**, **dashboards**, and **admin moderation**.

---

## 📌 Features by Role

### 👤 Job Seeker
- Register, login, and manage profile
- Browse & filter job listings
- Apply for jobs with resume & cover letter
- Save & bookmark jobs
- Track application status
- AI Resume Analyzer
- Notifications for job updates

### 🏢 Employer
- Register, login, and set up company profile
- Post and manage job listings
- View and filter applicants
- Contact candidates
- Employer dashboard
- Messages module (chat with candidates)

### 🛠️ Admin
- Admin dashboard with analytics
- Manage users (block/approve)
- Moderate job listings
- Review reported profiles or spam

---

## 🧱 Tech Stack

| Layer         | Tech Used                      |
|---------------|--------------------------------|
| Frontend      | React, Tailwind CSS, Lucide Icons, Framer Motion |
| Backend       | FastAPI (Python)               |
| Authentication| JWT, Context API               |
| AI/NLP        | spaCy, pdfplumber, pytesseract, LanguageTool |
| Database      | MySQL (or SQLite for dev)      |

---

## 🚀 Setup Instructions

### 🔧 Backend (FastAPI)
```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
