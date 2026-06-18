import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function HistoryPage() {
  const { userId } = await auth()

  if (!userId) redirect("/sign-in")

  const resumes = await prisma.resume.findMany({
    where: {
      userId,
    },
    include: {
      analysis: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  const scores = resumes
  .filter((r) => r.analysis)
  .map((r) => r.analysis!.atsScore)

const latestScore = scores[0] ?? 0
const previousScore = scores[1] ?? latestScore

const improvement = latestScore - previousScore
  function getScoreBadge(score: number) {
  if (score >= 80) {
    return {
      border: "1px solid rgba(66,232,216,0.20)",
      backgroundColor: "rgba(66,232,216,0.10)",
      color: "#42E8D8",
    }
  }

  if (score >= 50) {
    return {
      border: "1px solid rgba(245,158,11,0.20)",
      backgroundColor: "rgba(245,158,11,0.10)",
      color: "#fbbf24",
    }
  }

  return {
    border: "1px solid rgba(239,68,68,0.20)",
    backgroundColor: "rgba(239,68,68,0.10)",
    color: "#f87171",
  }
  
}


  return (
    <main className="min-h-screen py-20 px-6 relative overflow-hidden bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,232,216,0.12),transparent_55%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
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
              mb-6
            "
          >
            Resume History
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Previous
            <span className="bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
              {" "}Analyses
            </span>
          </h1>

          <p className="text-[#8f9399] text-lg">
  Track your resume improvements over time.
</p>

<div
  className="
    mt-8
    rounded-3xl
    border
    border-white/10
    bg-white/[0.03]
    backdrop-blur-xl
    p-6
    shadow-[0_0_30px_rgba(66,232,216,0.08)]
  "
>
  <div className="grid md:grid-cols-3 gap-6">

    <div>
      <p className="text-[#8f9399] text-sm mb-2">
        Total Analyses
      </p>

      <p className="text-3xl font-bold text-white">
        {resumes.length}
      </p>
    </div>

    <div>
      <p className="text-[#8f9399] text-sm mb-2">
        Latest ATS Score
      </p>

      <p className="text-3xl font-bold text-[#42E8D8]">
  {latestScore}/100
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

  </div>
</div>
        </div>


        {/* Empty State */}
        {resumes.length === 0 ? (
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-10
              text-center
            "
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              No resumes uploaded yet
            </h2>

            <p className="text-[#8f9399] mb-8">
              Upload your first resume to begin tracking progress.
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
              "
              style={{
                background:
                  "linear-gradient(135deg,#42E8D8 0%,#1FD5D5 50%,#13B9E8 100%)",
              }}
            >
              Upload Resume →
            </a>
          </div>
        ) : (
          <div className="grid gap-5">
  {resumes.map((resume) => (
    <Link
      key={resume.id}
      href={`/analysis/${resume.id}`}
      className="
        block
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-6
        shadow-[0_0_30px_rgba(66,232,216,0.08)]
        hover:border-[#42E8D8]/30
        hover:-translate-y-1
        hover:shadow-[0_0_40px_rgba(66,232,216,0.12)]
        transition-all
        duration-300
        cursor-pointer
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">
            {resume.fileName}
          </h3>

          <p className="text-[#8f9399] text-sm mt-1">
            {new Date(resume.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div
          className="
            px-4
            py-2
            rounded-full
            font-semibold
          "
          style={
            resume.analysis
              ? getScoreBadge(resume.analysis.atsScore)
              : {}
          }
        >
          {resume.analysis?.atsScore ?? "--"}/100
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-[#8f9399] text-sm">
          View full analysis
        </span>

        <span className="text-[#42E8D8] text-sm font-medium">
          Open →
        </span>
      </div>
    </Link>
  ))}
</div>
        )}

        <div className="mt-12 text-center">
          <a
            href="/dashboard"
            className="
              text-[#42E8D8]
              hover:text-white
              transition-colors
            "
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </main>
  )
}