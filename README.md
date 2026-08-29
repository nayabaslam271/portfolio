# Vision Cinematics

A premium cinematic production studio website — dark, editorial, immersive.

Built with **Next.js 14 + TypeScript + Tailwind CSS + Framer Motion** (frontend) and **FastAPI + PostgreSQL + SQLAlchemy** (backend).

---

## Project Structure

```
vision-cinematics/
├── frontend/          # Next.js App Router
│   ├── app/           # Layouts, pages, global styles
│   ├── components/    # Reusable UI components
│   ├── sections/      # Full-page sections
│   ├── lib/           # API helpers, utils
│   └── types/         # TypeScript types
└── backend/           # FastAPI
    ├── app/
    │   ├── api/routes/    # Endpoints
    │   ├── models/        # SQLAlchemy models
    │   ├── schemas/       # Pydantic schemas
    │   ├── services/      # Business logic
    │   ├── database/      # DB session & base
    │   └── core/          # Config / settings
    ├── alembic/           # Migrations
    └── seed.py            # Demo data
```

---

## Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 14+

---

## 1 — PostgreSQL Setup

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE vision_cinematics;"
```

---

## 2 — Backend Setup

```bash
cd vision-cinematics/backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy env file and edit as needed
copy .env.example .env        # Windows
cp .env.example .env          # macOS/Linux
```

Edit `.env`:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/vision_cinematics
SECRET_KEY=your-random-secret-key
CORS_ORIGINS=http://localhost:3000
```

```bash
# Run migrations
alembic upgrade head

# Seed demo data
python seed.py

# Start the API server
uvicorn app.main:app --reload --port 8000
```

API docs available at: http://localhost:8000/docs

---

## 3 — Frontend Setup

```bash
cd vision-cinematics/frontend

# Install dependencies
npm install

# Copy env file
copy .env.local.example .env.local   # Windows
cp .env.local.example .env.local     # macOS/Linux

# Start development server
npm run dev
```

Open: http://localhost:3000

---

## 4 — Environment Variables

### Frontend (`frontend/.env.local`)
| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000` |

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `SECRET_KEY` | App secret key |
| `CORS_ORIGINS` | Comma-separated allowed origins |

---

## 5 — API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | All projects |
| GET | `/api/projects/featured` | Featured projects |
| GET | `/api/projects/{slug}` | Single project |
| POST | `/api/projects` | Create project |
| GET | `/api/testimonials` | All testimonials |
| POST | `/api/testimonials` | Create testimonial |
| POST | `/api/contact` | Submit contact form |

---

## 6 — Production Build

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend (use gunicorn in production)
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

---

## 7 — Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis smooth scroll
- Lucide React icons
- React Hook Form + Zod

**Backend**
- Python 3.11+
- FastAPI
- SQLAlchemy 2.0
- Alembic (migrations)
- Pydantic v2
- PostgreSQL

---

## Design System

| Token | Value |
|---|---|
| Background base | `#030604` |
| Green primary | `#20E56A` |
| Green secondary | `#159447` |
| Text primary | `#F1F1EA` |
| Text secondary | `#A7ADA5` |
| Text muted | `#59635B` |
| Border green | `rgba(40,230,105,0.12)` |
| Heading font | Cormorant Garamond (serif) |
| Body font | Inter (sans-serif) |
"# Portfolio" 
