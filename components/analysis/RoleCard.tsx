type Props = {
  title: string
  match: number
  reasoning: string
}

export default function RoleCard({ title, match, reasoning }: Props) {
  function getColor() {
    if (match >= 75) return "bg-green-100 text-green-700"
    if (match >= 50) return "bg-amber-100 text-amber-700"
    return "bg-red-100 text-red-600"
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getColor()}`}>
          {match}% match
        </span>
      </div>
      <p className="text-sm text-gray-500">{reasoning}</p>
    </div>
  )
}