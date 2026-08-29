from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.testimonial import TestimonialResponse, TestimonialCreate
from app.services import testimonial_service

router = APIRouter(prefix="/testimonials", tags=["testimonials"])


@router.get("/", response_model=List[TestimonialResponse])
def list_testimonials(db: Session = Depends(get_db)):
    return testimonial_service.get_all_testimonials(db)


@router.post("/", response_model=TestimonialResponse, status_code=201)
def create_testimonial(
    testimonial: TestimonialCreate, db: Session = Depends(get_db)
):
    return testimonial_service.create_testimonial(db, testimonial)
