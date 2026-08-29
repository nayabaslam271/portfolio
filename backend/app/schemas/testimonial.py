from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TestimonialBase(BaseModel):
    client_name: str
    role: Optional[str] = None
    company: Optional[str] = None
    avatar: Optional[str] = None
    testimonial: str
    rating: int = Field(default=5, ge=1, le=5)


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialResponse(TestimonialBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
