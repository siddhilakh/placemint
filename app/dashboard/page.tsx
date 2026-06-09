 import GapReport from "@/components/analysis/GapReport"
 import AtsScoreCard from "@/components/analysis/AtsScoreCard"
import RoleCard from "@/components/analysis/RoleCard"
import { ResumeAnalysis } from "@/types"

const fakeData: ResumeAnalysis = {
  atsScore: 67,
  summary: "Your resume has a decent foundation but is missing key technical keywords and quantified impact in your project descriptions.",
  roles: [
    {
      title: "SDE Intern — Tier 2 Startup",
      match: 82,
      reasoning: "Your React and Node.js projects align well with what early-stage startups look for in interns."
    },
    {
      title: "QA Engineer — TCS",
      match: 74,
      reasoning: "Strong fundamentals and consistent academics make you a solid fit for TCS QA roles."
    },
    {
      title: "SDE — Product Company",
      match: 41,
      reasoning: "Missing DSA depth and system design exposure that product companies expect even at intern level."
    }
  ],
  gaps: [
    {
      section: "Projects",
      issue: "No quantified impact in bullet points",
      fix: "Add metrics — e.g. 'Reduced load time by 40%' instead of 'Improved performance'"
    },
    {
      section: "Skills",
      issue: "Missing DSA keywords expected by ATS for SDE roles",
      fix: "Add a DSA section listing data structures you're comfortable with — Arrays, LinkedList, Trees, Graphs"
    }
  ]
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Analysis</h1>
        <p className="text-gray-500 text-sm mb-8">{fakeData.summary}</p>

        <div className="mb-8">
          <AtsScoreCard score={fakeData.atsScore} />
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Roles</h2>
        <div className="flex flex-col gap-4 mb-8">
          {fakeData.roles.map((role) => (
            <RoleCard
              key={role.title}
              title={role.title}
              match={role.match}
              reasoning={role.reasoning}
            />
          ))}
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Gaps</h2>
<GapReport gaps={fakeData.gaps} />
      </div>
    </main>
  )
}
