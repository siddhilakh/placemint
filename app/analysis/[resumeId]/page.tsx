import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect, notFound } from "next/navigation"

import AtsScoreCard from "@/components/analysis/AtsScoreCard"
import RoleCard from "@/components/analysis/RoleCard"
import GapReport from "@/components/analysis/GapReport"

type Props = {
  params: Promise<{
    resumeId: string
  }>
}
export default async function AnalysisPage({ params }: Props) {
  const { userId } = await auth()

  if (!userId) redirect("/sign-in")

  const { resumeId } = await params

  const resume = await prisma.resume.findUnique({
    where: {
      id: resumeId,
    },
    include: {
      analysis: true,
    },
  })

  if (!resume) notFound()

  if (resume.userId !== userId) {
    redirect("/dashboard")
  }

  if (!resume.analysis) {
    redirect("/dashboard")
  }

  const analysis = resume.analysis
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
    <main className="min-h-screen py-20 px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,232,216,0.12),transparent_55%)] pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(19,185,232,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14">
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
            Historical Analysis
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Resume
            <span className="bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
              {" "}Snapshot
            </span>
          </h1>

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
              shadow-[0_0_30px_rgba(66,232,216,0.08)]
            "
          >
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold text-lg">
                {resume.fileName}
              </p>

              <p className="text-[#8f9399] text-sm">
                Uploaded on{" "}
                {new Date(resume.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* ATS Score */}
        <div className="mb-14">
          <AtsScoreCard score={analysis.atsScore} />
        </div>

        {/* Suggested Roles */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-white">Suggested</span>{" "}
            <span className="bg-gradient-to-r from-[#42E8D8] to-[#13B9E8] bg-clip-text text-transparent">
              Roles
            </span>
          </h2>

          <div className="flex flex-col gap-5">
            {roles.map((role: Role) => (
              <RoleCard
                key={role.title}
                title={role.title}
                match={role.match}
                reasoning={role.reasoning}
              />
            ))}
          </div>
        </div>

        {/* Resume Gaps */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-white">Resume</span>{" "}
            <span className="bg-gradient-to-r from-[#42E8D8] to-[#13B9E8] bg-clip-text text-transparent">
              Gaps
            </span>
          </h2>

          <GapReport gaps={gaps} />
        </div>

        {/* Back Button */}
        <div className="text-center">
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
            ← Back to History
          </a>
        </div>
      </div>
    </main>
  )
}