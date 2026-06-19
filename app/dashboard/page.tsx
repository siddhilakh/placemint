import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AtsScoreCard from '@/components/analysis/AtsScoreCard'
import RoleCard from '@/components/analysis/RoleCard'
import GapReport from '@/components/analysis/GapReport'

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) redirect('/sign-in')

  const latestResume = await prisma.resume.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { analysis: true }
  })

  if (!latestResume || !latestResume.analysis) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-3">
            No analysis yet
          </h1>

          <p className="text-[#8f9399] mb-8">
            Upload your resume to get started.
          </p>

          <a
            href="/upload"
            className="
              inline-flex
              items-center
              px-6
              py-3
              rounded-xl
              font-medium
              text-black
              bg-gradient-to-r
              from-[#42E8D8]
              via-[#1FD5D5]
              to-[#13B9E8]
              shadow-[0_0_25px_rgba(66,232,216,0.35)]
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >
            Upload Resume →
          </a>
        </div>
      </main>
    )
  }
  const allResumes = await prisma.resume.findMany({
  where: {
    userId,
    analysis: {
      isNot: null,
    },
  },
  include: {
    analysis: true,
  },
  orderBy: {
    createdAt: "asc",
  },
})

const totalAnalyses = allResumes.length

const firstScore =
  allResumes[0]?.analysis?.atsScore ?? latestResume.analysis.atsScore

const latestScore = latestResume.analysis.atsScore

const improvement = latestScore - firstScore

  const analysis = latestResume.analysis
  type Role = {
  title: string
  match: number
  reasoning: string
}

type Gap = {
  section: string
  issue: string
  fix: string
}

const roles = analysis.roles as Role[]
const gaps = analysis.gaps as Gap[]

  return (
    <main className="min-h-screen pt-8 pb-20 px-6 relative overflow-hidden bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,232,216,0.12),transparent_55%)] pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(19,185,232,0.08),transparent_60%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-8">
  <div
    className="
      inline-flex
      items-center
      px-5
      py-2
      rounded-full
      border
      border-[#42E8D8]/20
      bg-[#42E8D8]/5
      text-[#42E8D8]
      text-sm
      font-medium
      mb-4
    "
  >
    Resume Progress
  </div>

  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
    <p className="text-[#8f9399] text-lg mb-4">
  Track how your ATS score, role matches, and resume quality evolve over time.
</p>
  Latest {" "}
  <span className="bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
    Resume Snapshot
  </span>
</h1>

  <div
    className="
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-4 md:p-5
      shadow-[0_0_30px_rgba(66,232,216,0.08)]
    "
  >
    <p className="text-[#b0b4ba] text-base md:text-lg leading-relaxed">
      {analysis.summary}
    </p>
  </div>
</div>
<div
  className="
    mb-14
    rounded-3xl
    border
    border-white/10
    bg-white/[0.03]
    backdrop-blur-xl
    p-5 md:p-6
    shadow-[0_0_30px_rgba(66,232,216,0.08)]
  "
>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">

    <div>
      <p className="text-[#8f9399] text-sm mb-2">
        Total Analyses
      </p>

      <p className="text-3xl font-bold text-white">
        {totalAnalyses}
      </p>
    </div>

    <div>
      <p className="text-[#8f9399] text-sm mb-2">
        Latest ATS
      </p>

      <p className="text-3xl font-bold text-[#42E8D8]">
        {latestScore}
      </p>
    </div>

    <div>
      <p className="text-[#8f9399] text-sm mb-2">
        Improvement
      </p>

      <p
        className={`text-3xl font-bold ${
          improvement >= 0
            ? "text-[#42E8D8]"
            : "text-red-400"
        }`}
      >
        {improvement >= 0 ? "+" : ""}
        {improvement}
      </p>
    </div>

    <div className="md:text-right">
      <a
        href="/history"
        className="
          inline-flex
          items-center
          gap-2
          text-[#42E8D8]
          font-medium
          hover:text-white
          transition-all
          duration-300
        "
      >
        View History →
      </a>
    </div>

  </div>
</div>

        {/* ATS */}
        <div className="mb-10">
          <AtsScoreCard score={analysis.atsScore} />
        </div>

        {/* Roles */}
        <h2 className="text-3xl font-bold mb-6">
  <span className="text-white">Suggested</span>{" "}
  <span className="bg-gradient-to-r from-[#42E8D8] to-[#13B9E8] bg-clip-text text-transparent">
    Roles
  </span>
</h2>

        <div className="flex flex-col gap-5 mb-14">
          {roles.map((role: Role) => (
            <RoleCard
              key={role.title}
              title={role.title}
              match={role.match}
              reasoning={role.reasoning}
            />
          ))}
        </div>

        {/* Gaps */}
        <h2 className="text-3xl font-bold mb-6">
  <span className="text-white">Resume</span>{" "}
  <span className="bg-gradient-to-r from-[#42E8D8] to-[#13B9E8] bg-clip-text text-transparent">
    Gaps
  </span>
</h2>

        <GapReport gaps={gaps} />

        {/* CTA */}
<div
  className="
    mt-16
    rounded-3xl
    border
    border-white/10
    bg-white/[0.03]
    backdrop-blur-xl
    p-10
    text-center
    shadow-[0_0_30px_rgba(66,232,216,0.08)]
  "
>
  <h3 className="text-3xl font-bold text-white mb-4">
    Ready for another review?
  </h3>

  <p className="text-[#8f9399] text-lg max-w-2xl mx-auto mb-8">
    Update your resume, add new projects, improve your skills,
    and see how your ATS score changes over time.
  </p>

  <a
    href="/upload"
    className="
      inline-flex
      items-center
      px-8
      py-4
      rounded-2xl
      text-black
      font-semibold
      transition-all
      duration-300
      hover:scale-[1.02]
    "
    style={{
      background:
        "linear-gradient(135deg,#42E8D8 0%,#1FD5D5 50%,#13B9E8 100%)",
      boxShadow: "0 0 30px rgba(66,232,216,0.25)",
    }}
  >
    Start New Analysis →
  </a>
  <div className="mt-8 pt-8 border-t border-white/10">
  <p className="text-[#8f9399] text-sm mb-4">
    Want to compare your progress over time?
  </p>

  <a
    href="/history"
    className="
      inline-flex
      items-center
      gap-2
      text-[#42E8D8]
      font-medium
      hover:text-white
      transition-all
      duration-300
    "
  >
    View Previous Analyses →
  </a>
</div>
</div>
      </div>
    </main>
  )
}