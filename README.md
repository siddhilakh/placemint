# PlaceMint

AI-powered placement companion for Indian engineering students.

## What it does

PlaceMint analyses your resume against your profile — branch, CGPA, college tier — and gives you an ATS score, a list of roles you're realistically eligible for, and a specific gap report with actionable fixes. Built for the Indian campus hiring context, not generic US tech hiring.

Every analysis is saved to your account so you can track your improvement over time — upload again after making changes and see your score go up.

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma (Week 3)
- NextAuth.js — email based login (Week 3)
- Gemini API (Week 4)

## Pages

| Route | What it does |
|-------|-------------|
| `/` | Landing page — hero, features, how it works |
| `/upload` | Resume upload with PDF validation |
| `/profile` | Student profile form with validation |
| `/dashboard` | Analysis results — ATS score, role cards, gap report |

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
- Email based auth planned for Week 3 — history tied to user account

## Why PlaceMint over just asking an AI

Generic AI tools can review a resume but they don't know your college tier, your placement season timeline, or the difference between TCS Ninja and TCS Digital. PlaceMint combines your resume with your full profile to give output that's specific to the Indian campus hiring reality. Saved history means you can track improvement over multiple uploads — something no general AI tool does out of the box.

## Author

Siddhi Lakhotia — [GitHub](https://github.com/siddhilakh) · [LinkedIn](https://linkedin.com/in/siddhi-lakhotia-2b6138336)