# PlaceMint

AI-powered placement companion for Indian engineering students.

[Live Demo](https://placemint-amber.vercel.app/) · [GitHub](https://github.com/siddhilakh) · [LinkedIn](https://linkedin.com/in/siddhi-lakhotia-2b6138336)

---

## What it does

Most resume tools are built for US tech hiring. They have no concept of TCS Ninja vs TCS Digital, CGPA cutoffs, college tier, or how Indian campus placement rounds actually work.

PlaceMint is different. Upload your resume, tell us your branch, CGPA, and college tier — and get:

- An **ATS score** with a plain-English summary of where you stand
- **Role suggestions** matched to your realistic eligibility, not generic recommendations
- A **gap report** that tells you exactly what's wrong and how to fix it — section by section
- A **JD Match tool** — paste any job description and instantly see which keywords your resume is missing
- **Resume history** — every analysis is stored automatically, allowing you to track ATS score growth, review past resume evaluations, and measure your progress over time.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 + TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via Neon |
| ORM | Prisma 5 |
| Auth | Clerk v7 |
| File storage | Uploadthing |
| PDF parsing | unpdf |
| AI analysis | Gemini 2.5 Flash |
| Deployment | Vercel |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, features, how it works |
| `/sign-in` | Clerk authentication |
| `/sign-up` | Clerk registration |
| `/profile` | Student profile — branch, CGPA, college tier, graduation year |
| `/upload` | Resume upload with PDF validation and AI analysis trigger |
| `/dashboard` | Latest analysis — ATS score, role suggestions, gap report |
| `/keywords` | JD Match — paste a job description, get keyword gap analysis |
| `/history` | Track resume progress over time with ATS score comparisons, improvement metrics, and access to past analysis reports |

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/profile` | Create or update student profile |
| GET | `/api/profile` | Fetch profile with linked resumes |
| POST | `/api/resume` | Save resume metadata + extract PDF text |
| GET | `/api/resume` | Fetch all resumes for authenticated user |
| POST | `/api/analyse` | Trigger Gemini analysis for a resume |
| POST | `/api/keywords` | JD keyword comparison against latest resume |

---

## Database Schema

Four tables with explicit foreign key relationships:

- **User** — Clerk userId as primary key, email, name
- **StudentProfile** — branch, CGPA (Decimal), college tier, graduation year. One-to-one with User, one-to-many with Resume
- **Resume** — fileUrl, fileName, extractedText. Foreign key to StudentProfile
- **ResumeAnalysis** — atsScore, roles (JSON), gaps (JSON), summary, promptVersion. One-to-one with Resume

Key design decisions: roles and gaps stored as JSON columns — always read together with the analysis, never queried independently, so separate tables would add joins for no benefit. promptVersion field on every analysis so improvements to the prompt don't silently invalidate old results.

---

## Architecture
User uploads PDF

↓

Uploadthing stores file → returns CDN URL

↓

POST /api/resume — unpdf extracts text → saved to DB

↓

POST /api/analyse — fetches resume text + student profile

↓

Gemini 2.5 Flash — structured prompt returns JSON

↓

ResumeAnalysis saved to DB with promptVersion

↓

Dashboard reads from DB — server component, no client fetch
---

## How the AI works

The prompt sends two things to Gemini: the extracted resume text and the student's full profile. The profile is what makes analysis India-specific — a CSE student with 8.5 CGPA from a Tier 2 college gets completely different role suggestions than an ECE student with 6.2 from a Tier 3 college.

The prompt instructs Gemini to return strict JSON matching the database schema exactly. The response is cleaned (markdown backticks stripped), parsed, validated, and saved. Prompt versioning means every analysis row knows which prompt version generated it — when the prompt improves, users can re-analyse and see the difference.

The JD Match feature sends the job description and resume text together in a separate prompt designed specifically for keyword comparison — not quality assessment. It returns matched keywords, missing keywords, match percentage, and a single most-impactful recommendation.

---

## Resume History

Every resume upload and its corresponding analysis is stored permanently. The history page shows:

- ATS score timeline across all uploads
- Side-by-side comparison between the latest and previous analysis
- Specific improvement points — what changed between versions
- Clickable snapshots — click any historical analysis to see the full dashboard view for that specific upload

This turns PlaceMint from a one-time tool into a placement preparation tracker.

---

## Known Limitations

- **Scanned/image-based PDFs** — unpdf extracts the text layer only. PDFs created by scanning physical documents have no text layer. Planned fix: integrate Google Cloud Vision OCR for production.
- **Gemini free tier** — 30 requests per day per API key. Sufficient for personal use and testing; production at scale would require a paid tier or request queuing.
- **Prompt consistency** — LLMs occasionally return slightly different JSON structures despite explicit instructions. Current handling: strip markdown, parse, catch errors. Future improvement: JSON schema validation before saving.

---

## What went wrong and how I fixed it

**Prisma version conflict** — Prisma 7 had breaking changes incompatible with the standard Next.js setup. Downgraded to Prisma 5 which has stable Next.js support.

**Uploadthing UI components** — UploadDropzone and UploadButton conflicted with Tailwind v4's new CSS engine. Switched to the useUploadThing hook for full custom UI control.

**next-auth ghost dependency** — next-auth was installed as an unused leftover dependency. It conflicted with Clerk's session middleware — route protection stopped working entirely. Uninstalling it immediately fixed the middleware.

**Next.js 16 middleware deprecation** — Next.js 16 deprecated the middleware.ts convention in favour of a proxy system, breaking Clerk's middleware. Downgraded to Next.js 15 where Clerk middleware works correctly.

**Clerk v7 API changes** — auth() became async, SignedIn/SignedOut components were removed from the main package, afterSignOutUrl prop was removed from UserButton. Fixed by switching to the useAuth() hook with conditional rendering.

**Foreign key constraint on resume upload** — Resume.userId is a foreign key to StudentProfile.userId, not User.id directly. Upload failed if the student skipped the profile form. Fixed by adding a profile existence check in POST /api/resume that returns a clear 400 error before attempting the insert.

**CGPA floating point precision** — Postgres Float type stored 8 as 7.9 due to IEEE 754 representation. Migrated cgpa column from Float to Decimal type — exact decimal storage with no precision loss.

---

## Why not just use ChatGPT?

ChatGPT can review a resume. It cannot tell you whether your 7.2 CGPA from a Tier 3 college meets the cutoff for TCS Digital vs TCS Ninja. It doesn't know which companies are coming to your campus. It can't track whether your ATS score improved between your second and third resume version.

PlaceMint is built around a specific context — Indian campus placements — and that context is baked into every prompt, every role suggestion, and every gap fix.

---

## Local Setup

```bash
git clone https://github.com/siddhilakh/placemint
cd placemint
npm install
```

Create `.env.local`:
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard

NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/profile

UPLOADTHING_SECRET=

UPLOADTHING_APP_ID=

GEMINI_API_KEY=
```bash
npx prisma migrate dev
npm run dev
```

---

## Author

Siddhi Lakhotia — [GitHub](https://github.com/siddhilakh) · [LinkedIn](https://linkedin.com/in/siddhi-lakhotia-2b6138336)