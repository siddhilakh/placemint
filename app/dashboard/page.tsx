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
    where:   { userId },
    orderBy: { createdAt: 'desc' },
    include: { analysis: true }
  })

  if (!latestResume || !latestResume.analysis) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No analysis yet</h1>
          <p className="text-gray-500 mb-6">Upload your resume to get started</p>
          
          <a href="/upload"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
          
            Upload Resume
          </a>
        </div>
      </main>
    )
  }

  const analysis = latestResume.analysis
  const roles = analysis.roles as any[]
  const gaps  = analysis.gaps  as any[]

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Analysis</h1>
        <p className="text-gray-500 text-sm mb-8">{analysis.summary}</p>

        <div className="mb-8">
          <AtsScoreCard score={analysis.atsScore} />
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Roles</h2>
        <div className="flex flex-col gap-4 mb-8">
          {roles.map((role: any) => (
            <RoleCard
              key={role.title}
              title={role.title}
              match={role.match}
              reasoning={role.reasoning}
            />
          ))}
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Gaps</h2>
        <GapReport gaps={gaps} />

        <div className="mt-8 text-center">
          
          <a href="/upload"
            className="text-sm text-green-600 hover:text-green-700 font-medium">
          
            Upload a new resume →
          </a>
        </div>
      </div>
    </main>
  )
}