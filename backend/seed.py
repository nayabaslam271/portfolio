"""
Seed script — populates the database with demo data.
Run: python seed.py
"""

import sys
from sqlalchemy.orm import Session

# Make sure app package is importable from this directory
sys.path.insert(0, ".")

from app.database.session import SessionLocal, engine
from app.database.base import Base
from app.models.project import Project
from app.models.testimonial import Testimonial
from app.models.contact import Contact

# Create all tables
Base.metadata.create_all(bind=engine)


PROJECTS = [
    {
        "title": "E-Commerce Platform",
        "slug": "ecommerce-platform",
        "category": "Next.js & Python",
        "description": "A full-stack e-commerce platform built with Next.js frontend and Python/FastAPI backend, featuring product management, cart, and checkout.",
        "cover_image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
        "gallery_images": [
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
        ],
        "year": 2024,
        "client": "Confidential",
        "featured": True,
    },
    {
        "title": "WordPress Business Site",
        "slug": "wordpress-business-site",
        "category": "WordPress CMS",
        "description": "Custom WordPress theme and plugin development for a service-based business, with SEO optimisation and lead capture integration.",
        "cover_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "gallery_images": [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        ],
        "year": 2024,
        "client": "Confidential",
        "featured": True,
    },
    {
        "title": "Marketing Dashboard",
        "slug": "marketing-dashboard",
        "category": "Digital Marketing",
        "description": "A data-driven marketing analytics dashboard tracking campaign performance, social media metrics and lead generation KPIs.",
        "cover_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "gallery_images": [],
        "year": 2024,
        "client": "Confidential",
        "featured": True,
    },
    {
        "title": "PHP Inventory System",
        "slug": "php-inventory-system",
        "category": "PHP & SQL",
        "description": "A web-based inventory management system built with PHP and MySQL for a retail business.",
        "cover_image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
        "gallery_images": [],
        "year": 2023,
        "client": "Confidential",
        "featured": False,
    },
]

TESTIMONIALS = [
    {
        "client_name": "Ahmed Raza",
        "role": "Founder",
        "company": "TechStart PK",
        "testimonial": "Nayab built our entire web platform from scratch. The combination of solid development skills and marketing thinking meant we launched with a product that actually converts.",
        "rating": 5,
    },
    {
        "client_name": "Sara Khan",
        "role": "Marketing Director",
        "company": "GrowthLab",
        "testimonial": "What sets Nayab apart is the ability to think like a developer and a marketer at the same time. Our campaign results improved significantly after working together.",
        "rating": 5,
    },
    {
        "client_name": "James Whitfield",
        "role": "CEO",
        "company": "Ecom Ventures",
        "testimonial": "The e-commerce site Nayab delivered was clean, fast and well-structured. The handoff was smooth and the code quality was excellent throughout.",
        "rating": 5,
    },
    {
        "client_name": "Mia Hoffmann",
        "role": "Brand Manager",
        "company": "Studio Nord",
        "testimonial": "From WordPress build to social media strategy — Nayab handled everything professionally. One point of contact for both tech and marketing is genuinely rare.",
        "rating": 5,
    },
]


def seed():
    db: Session = SessionLocal()
    try:
        # Clear existing
        db.query(Project).delete()
        db.query(Testimonial).delete()
        db.commit()

        # Seed projects
        for p in PROJECTS:
            db.add(Project(**p))

        # Seed testimonials
        for t in TESTIMONIALS:
            db.add(Testimonial(**t))

        db.commit()
        print(f"✓ Seeded {len(PROJECTS)} projects")
        print(f"✓ Seeded {len(TESTIMONIALS)} testimonials")
        print("Seed complete.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
