from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.project import Project
from app.schemas.project import ProjectCreate


def get_all_projects(db: Session) -> List[Project]:
    return db.query(Project).order_by(Project.created_at.desc()).all()


def get_featured_projects(db: Session) -> List[Project]:
    return (
        db.query(Project)
        .filter(Project.featured == True)  # noqa: E712
        .order_by(Project.created_at.desc())
        .all()
    )


def get_project_by_slug(db: Session, slug: str) -> Optional[Project]:
    return db.query(Project).filter(Project.slug == slug).first()


def create_project(db: Session, project: ProjectCreate) -> Project:
    db_project = Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project
