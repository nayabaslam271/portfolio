from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime
import html


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    project_type: Optional[str] = None
    budget: Optional[str] = None
    message: str

    @field_validator("name", "message", mode="before")
    @classmethod
    def sanitize_text(cls, v: str) -> str:
        if isinstance(v, str):
            return html.escape(v.strip())
        return v

    @field_validator("company", "project_type", "budget", mode="before")
    @classmethod
    def sanitize_optional(cls, v: Optional[str]) -> Optional[str]:
        if isinstance(v, str):
            return html.escape(v.strip())
        return v


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    company: Optional[str]
    project_type: Optional[str]
    budget: Optional[str]
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}
