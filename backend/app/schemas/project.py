from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class ProjectBase(BaseModel):
    title: str
    slug: str
    category: str
    description: Optional[str] = None
    cover_image: Optional[str] = None
    gallery_images: Optional[List[str]] = []
    year: Optional[int] = None
    client: Optional[str] = None
    featured: bool = False


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
