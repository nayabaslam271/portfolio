from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import projects, testimonials, contact

app = FastAPI(
    title="Vision Cinematics API",
    description="Backend API for Vision Cinematics — cinematic production studio",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Routes
app.include_router(projects.router, prefix="/api")
app.include_router(testimonials.router, prefix="/api")
app.include_router(contact.router, prefix="/api")


@app.get("/", tags=["health"])
def root():
    return {"status": "ok", "service": "Vision Cinematics API"}


@app.get("/health", tags=["health"])
def health():
    return {"status": "healthy"}
