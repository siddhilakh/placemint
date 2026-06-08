type Props = {
  score: number
}

export default function AtsScoreCard({ score }: Props) {
  function getColor() {
    if (score >= 75) return "text-green-600"
    if (score >= 50) return "text-amber-500"
    return "text-red-500"
  }

  function getLabel() {
    if (score >= 75) return "Strong"
    if (score >= 50) return "Needs Work"
    return "Poor"
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <p className="text-sm font-medium text-gray-500 mb-2">ATS Score</p>
      <p className={`text-6xl font-bold mb-2 ${getColor()}`}>{score}<span className="text-2xl text-gray-300">/100</span></p>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full ${score >= 75 ? "bg-green-500" : score >= 50 ? "bg-amber-500" : "bg-red-500"}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className={`text-sm font-medium ${getColor()}`}>{getLabel()} — </p>
    </div>
  )
}