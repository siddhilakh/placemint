# PlaceMint

AI-powered placement companion for Indian engineering students.

## What it does

PlaceMint analyses your resume against your profile — branch, CGPA, college tier — and gives you an ATS score, a list of roles you're realistically eligible for, and a specific gap report with actionable fixes. Built for the Indian campus hiring context, not generic US tech hiring.

Every analysis is saved to your account so you can track your improvement over time — upload again after making changes and see your score go up.

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS
- PostgreSQL (Neon) + Prisma 5
- NextAuth.js — email based login (Week 5)
- Gemini API (Week 4)

## Pages

| Route | What it does |
|-------|-------------|
| `/` | Landing page — hero, features, how it works |
| `/upload` | Resume upload with PDF validation |
| `/profile` | Student profile form with validation |
| `/dashboard` | Analysis results — ATS score, role cards, gap report |

## API Routes

| Method | Route | What it does |
|--------|-------|-------------|
| POST | `/api/profile` | Save or update student profile |
| GET | `/api/profile` | Fetch student profile with resumes |
| POST | `/api/resume` | Save resume metadata |
| GET | `/api/resume` | Fetch all resumes for a user |

## Database Schema

Three tables — User, StudentProfile, Resume, ResumeAnalysis. StudentProfile → Resume is one-to-many (a student uploads many resumes over time). Resume → ResumeAnalysis is one-to-one (each resume gets exactly one analysis).

## Week 1 — Foundation
- Next.js + TypeScript + Tailwind project setup
- Full folder structure for all 8 weeks
- Core TypeScript types — StudentProfile, ResumeAnalysis, RoleSuggestion, ResumeGap
- Landing page — Navbar, Hero, Features, How it works, Footer

## Week 2 — UI Shell
- Resume upload page with file type and size validation
- Dashboard with ATS score display, role suggestion cards, gap report
- Profile form with controlled inputs and inline validation
- Full user flow connected — landing → upload → profile → dashboard
- Email based auth planned for Week 5 — history tied to user account

## Week 3 — Database
- Neon PostgreSQL database with 4 tables
- Prisma 5 ORM — schema, migrations, client singleton
- Profile API route — POST saves to DB, GET fetches with related resumes
- Resume API route — POST saves metadata, GET fetches all resumes
- Profile form wired to real API — data persists in database on submit

## What went wrong and how I fixed it
Prisma 7 was installed by default with create-next-app. It has a completely different configuration format — driver adapters, prisma.config.ts, no url field in schema.prisma. None of the standard Prisma documentation applies to it yet. Downgraded to Prisma 5 which is stable, widely documented, and works exactly as expected. Lesson: always check the version of a tool before following any tutorial or documentation.

## Why PlaceMint over just asking an AI
Generic AI tools can review a resume but they don't know your college tier, your placement season timeline, or the difference between TCS Ninja and TCS Digital. PlaceMint combines your resume with your full profile to give output specific to the Indian campus hiring reality. Saved history means you can track improvement over multiple uploads — something no general AI tool does out of the box.

## Author

Siddhi Lakhotia — [GitHub](https://github.com/siddhilakh) · [LinkedIn](https://linkedin.com/in/siddhi-lakhotia-2b6138336)