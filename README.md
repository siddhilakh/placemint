# PlaceMint

AI-powered placement companion for Indian engineering students.

## What it does

PlaceMint analyses your resume against your profile — branch, CGPA, college tier — and gives you an ATS score, a list of roles you're realistically eligible for, and a specific gap report with actionable fixes. Built for the Indian campus hiring context, not generic US tech hiring.

Every analysis is saved to your account so you can track your improvement over time — upload again after making changes and see your score go up.

## Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS
- PostgreSQL (Neon) + Prisma 5
- Uploadthing — file storage
- unpdf — PDF text extraction
- Clerk — email based auth (Week 5)
- Gemini API — AI analysis (Week 6)

## Pages

| Route | What it does |
|-------|-------------|
| `/` | Landing page — hero, features, how it works |
| `/upload` | Resume upload with PDF validation |
| `/profile` | Student profile form with validation |
| `/dashboard` | Analysis results — ATS score, role cards, gap report |
| `/sign-in` | Clerk sign-in page |
| `/sign-up` | Clerk sign-up page |

## API Routes

| Method | Route | What it does |
|--------|-------|-------------|
| POST | `/api/profile` | Save or update student profile |
| GET | `/api/profile` | Fetch student profile with resumes |
| POST | `/api/resume` | Save resume + extract PDF text |
| GET | `/api/resume` | Fetch all resumes for a user |

## Database Schema

Four tables — User, StudentProfile, Resume, ResumeAnalysis. StudentProfile → Resume is one-to-many. Resume → ResumeAnalysis is one-to-one. ResumeAnalysis has a `promptVersion` field for prompt versioning.

## Week 1 — Foundation
- Next.js + TypeScript + Tailwind project setup
- Full folder structure
- Core TypeScript types
- Landing page — 5 sections

## Week 2 — UI Shell
- Resume upload page with file validation
- Dashboard with ATS score, role cards, gap report
- Profile form with controlled inputs and validation
- Full user flow connected end to end

## Week 3 — Database
- Neon PostgreSQL with 4 tables
- Prisma 5 ORM
- Profile and Resume API routes
- Profile form saves to database

## Week 4 — File Upload + PDF Extraction
- Uploadthing integration for real file storage
- Custom upload UI using useUploadThing hook
- PDF text extraction using unpdf
- Extracted text saved to database alongside file URL
- Prompt versioning added — lib/prompts.ts with v1 prompt

## Week 5 — Authentication
- Clerk integration with email and Google sign-in
- Route protection via middleware — all routes protected by default
- Real Clerk userId replacing placeholder in all API routes and Uploadthing
- Per-user data isolation — every Prisma query filtered by userId
- UserButton in navbar with conditional signed-in/signed-out states
- Full user flow: sign up → profile → upload → dashboard

## Known Limitations
- Image-based PDFs (scanned documents) return limited text. Planned fix: Google Cloud Vision OCR for production.
- Upload page shows guidance: "For best results, upload a PDF created from Word, Google Docs, or Canva."

## What went wrong and how I fixed it
- **Prisma 7 → 5 downgrade**: Prisma 7 has breaking changes incompatible with standard Next.js setup. Downgraded to Prisma 5.
- **Uploadthing UI components**: UploadDropzone and UploadButton conflicted with Tailwind v4 styles. Switched to useUploadThing hook for full UI control.
- **Tesseract.js on Windows**: Worker script path issues in Next.js on Windows. Deferred OCR to production using Google Cloud Vision.
- **next-auth conflict**: next-auth was installed as an unused dependency and conflicted with Clerk's session handling — middleware wasn't intercepting requests at all. Uninstalled next-auth completely and middleware worked immediately.
- **Next.js 16 middleware deprecation**: Next.js 16 deprecated the middleware.ts convention in favour of a proxy system. Downgraded to Next.js 15 where Clerk middleware works correctly.
- **Clerk v7 API changes**: Several Clerk APIs changed in v7 — auth() is now async, SignedIn/SignedOut components moved, afterSignOutUrl prop removed from UserButton. Fixed by using useAuth() hook with conditional rendering instead of SignedIn/SignedOut components.
- **Foreign key constraint on resume upload**: Resume table foreign key points to StudentProfile, not User directly. Upload failed if profile wasn't completed first. Fixed by adding a profile existence check in POST /api/resume that returns a clear error if profile is missing.
- **Float precision on CGPA**: Postgres Float type stored 8 as 7.9 due to IEEE 754 floating point representation. Fixed by migrating cgpa column from Float to Decimal type.

## Why PlaceMint over just asking an AI
Generic AI tools can review a resume but they don't know your college tier, your placement season timeline, or the difference between TCS Ninja and TCS Digital. PlaceMint combines your resume with your full profile to give output specific to the Indian campus hiring reality. Saved history means you can track improvement over multiple uploads.

## Author

Siddhi Lakhotia — [GitHub](https://github.com/siddhilakh) · [LinkedIn](https://linkedin.com/in/siddhi-lakhotia-2b6138336)