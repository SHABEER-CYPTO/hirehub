from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List
import pdfplumber, docx, tempfile, os, spacy, logging, re
from magic import Magic
from pdf2image import convert_from_path
import pytesseract
import language_tool_python
import asyncio
from spacy.matcher import PhraseMatcher
from sentence_transformers import SentenceTransformer, util

# ----------------- Initialization ----------------- #
router = APIRouter()
nlp = spacy.load("en_core_web_sm")
grammar_tool = language_tool_python.LanguageTool("en-US")
model = SentenceTransformer("all-MiniLM-L6-v2")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ----------------- Skill Setup ----------------- #
SKILL_LIST = [
    "python", "java", "c++", "javascript", "react", "node.js", "angular",
    "html", "css", "sql", "mongodb", "mysql", "postgresql",
    "aws", "azure", "docker", "kubernetes", "git", "github",
    "machine learning", "deep learning", "data science",
    "autocad", "solidworks", "ansys", "matlab", "catia",
    "illustrator", "photoshop", "figma", "xd", "sketch"
]
skill_patterns = [nlp.make_doc(skill.lower()) for skill in SKILL_LIST]
matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
matcher.add("SKILLS", skill_patterns)

# ----------------- Utility Functions ----------------- #
def validate_file(file: UploadFile):
    mime = Magic(mime=True)
    file.file.seek(0)
    mime_type = mime.from_buffer(file.file.read(1024))
    file.file.seek(0)
    suffix = file.filename.split('.')[-1].lower()
    if suffix not in ["pdf", "doc", "docx"] or mime_type not in [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]:
        raise HTTPException(status_code=400, detail="Unsupported or invalid file format.")
    return suffix

def extract_text(file: UploadFile):
    suffix = validate_file(file)
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{suffix}") as tmp:
        tmp.write(file.file.read())
        tmp_path = tmp.name
    text = ""
    try:
        if suffix == "pdf":
            with pdfplumber.open(tmp_path) as pdf:
                for page in pdf.pages:
                    text += page.extract_text() or ""
            if not text.strip():
                images = convert_from_path(tmp_path)
                for image in images:
                    text += pytesseract.image_to_string(image) + "\n"
        else:
            doc = docx.Document(tmp_path)
            for para in doc.paragraphs:
                text += para.text + "\n"
            for table in doc.tables:
                for row in table.rows:
                    for cell in row.cells:
                        text += cell.text + "\n"
    finally:
        os.remove(tmp_path)
    if not text.strip():
        raise HTTPException(status_code=400, detail="No text could be extracted.")
    return text

def extract_skills(doc):
    matches = matcher(doc)
    return list({doc[start:end].text.lower() for _, start, end in matches})

def calculate_match_score(found, required_skills):
    if not required_skills: return None
    matched = set(found) & set([s.lower() for s in required_skills])
    return round(len(matched) / len(required_skills) * 100, 1)

def semantic_match(resume_text, job_skills, threshold=0.6):
    if not job_skills: return [], None
    job_embeddings = model.encode(job_skills, convert_to_tensor=True)
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(resume_embedding, job_embeddings)[0]
    matched_skills = [skill for score, skill in zip(scores, job_skills) if score >= threshold]
    match_percentage = round(len(matched_skills) / len(job_skills) * 100, 1)
    return matched_skills, match_percentage

def check_grammar(text):
    matches = grammar_tool.check(text)
    return max(25 - len(matches) * 2, 0)

def classify_resume_domain(text):
    text = text.lower()
    if "javascript" in text or "react" in text or "python" in text:
        return "Software Developer"
    elif "autocad" in text or "mechanical" in text:
        return "Mechanical Engineer"
    elif "nursing" in text or "pharmacy" in text:
        return "Healthcare"
    elif "illustrator" in text or "figma" in text:
        return "UI/UX Designer"
    else:
        return "General"

def extract_entities(doc):
    entities = {"name": None, "email": None, "phone": None, "location": None, "education": [], "companies": []}
    email_match = re.search(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}\b", doc.text)
    phone_match = re.search(r"\+?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}", doc.text)
    if email_match: entities["email"] = email_match.group(0)
    if phone_match: entities["phone"] = phone_match.group(0)
    for ent in doc.ents:
        if ent.label_ == "PERSON" and not entities["name"]:
            entities["name"] = ent.text
        elif ent.label_ == "GPE" and not entities["location"]:
            entities["location"] = ent.text
        elif ent.label_ == "ORG":
            if any(w in ent.text.lower() for w in ["university", "college", "institute"]):
                entities["education"].append(ent.text)
            else:
                entities["companies"].append(ent.text)
    return entities

def summarize_text(doc, max_points=5):
    return [sent.text.strip() for sent in doc.sents if len(sent.text.split()) > 8][:max_points]

# ------------------- Core Resume Analyzer ------------------- #
async def analyze_text(text, required_skills):
    loop = asyncio.get_event_loop()
    doc = await loop.run_in_executor(None, nlp, text)

    skills = extract_skills(doc)
    match_score = calculate_match_score(skills, required_skills)
    semantic_skills, semantic_score = semantic_match(text, required_skills)
    domain = classify_resume_domain(text)

    length_score = min(len(text.split()) / 500 * 25, 25)
    skills_score = len(skills) / len(SKILL_LIST) * 50
    grammar_score = check_grammar(text)

    return {
        "score": round(length_score + skills_score + grammar_score, 1),
        "length_score": round(length_score, 1),
        "skills_score": round(skills_score, 1),
        "grammar_score": round(grammar_score, 1),
        "skills_found": skills,
        "match_score": match_score,
        "semantic_skills_matched": semantic_skills,
        "semantic_match_score": semantic_score,
        "resume_domain": domain,
        "entities": extract_entities(doc),
        "summary_points": summarize_text(doc)
    }

# ------------------- API Endpoint ------------------- #
@router.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...),
    required_skills: List[str] = Form(default=[])
):
    logger.info(f"Received file: {file.filename}")
    try:
        text = extract_text(file)
        result = await analyze_text(text, required_skills)
        return result
    except Exception as e:
        logger.error(f"Failed to process resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Resume processing failed.")
