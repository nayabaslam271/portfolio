from sqlalchemy.orm import Session
from typing import List
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate


def get_all_testimonials(db: Session) -> List[Testimonial]:
    return db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()


def create_testimonial(db: Session, testimonial: TestimonialCreate) -> Testimonial:
    db_t = Testimonial(**testimonial.model_dump())
    db.add(db_t)
    db.commit()
    db.refresh(db_t)
    return db_t
