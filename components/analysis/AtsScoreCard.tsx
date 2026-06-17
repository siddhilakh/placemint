type Props = {
  score: number
}

export default function AtsScoreCard({ score }: Props) {
  function getLabel() {
    if (score >= 80) return "Strong Match"
    if (score >= 50) return "Needs Improvement"
    return "Needs Work"
  }

  function getScoreColor() {
    if (score >= 80)
      return "bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8]"

    if (score >= 50)
      return "text-amber-400"

    return "text-red-400"
  }

  function getProgressBar() {
    if (score >= 80)
      return `
        bg-gradient-to-r
        from-[#42E8D8]
        via-[#1FD5D5]
        to-[#13B9E8]
        shadow-[0_0_20px_rgba(66,232,216,0.6)]
      `

    if (score >= 50)
      return `
        bg-gradient-to-r
        from-amber-500
        to-amber-400
        shadow-[0_0_20px_rgba(245,158,11,0.6)]
      `

    return `
      bg-gradient-to-r
      from-red-500
      to-red-400
      shadow-[0_0_20px_rgba(239,68,68,0.6)]
    `
  }

  function getBadgeStyles() {
    if (score >= 80)
      return "border-[#42E8D8]/20 bg-[#42E8D8]/10 text-[#42E8D8]"

    if (score >= 50)
      return "border-amber-500/20 bg-amber-500/10 text-amber-400"

    return "border-red-500/20 bg-red-500/10 text-red-400"
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8
        shadow-[0_0_40px_rgba(66,232,216,0.08)]
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,232,216,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#8f9399]">
              ATS Score
            </p>
          </div>

          <div
            className={`px-4 py-2 rounded-full border text-sm font-medium ${getBadgeStyles()}`}
          >
            {getLabel()}
          </div>
        </div>

        <div className="flex items-end gap-2 mb-6">
          <span
            className={`text-7xl font-bold ${
              score >= 80
                ? `${getScoreColor()} bg-clip-text text-transparent`
                : getScoreColor()
            }`}
          >
            {score}
          </span>

          <span className="text-3xl text-[#8f9399] mb-2">
            /100
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden mb-6">
          <div
            className={`h-full rounded-full transition-all duration-700 ${getProgressBar()}`}
            style={{ width: `${score}%` }}
          />
        </div>

        <div className="flex justify-end">
          <p className="text-sm text-[#8f9399]">
            ATS Compatibility Score
          </p>
        </div>
      </div>
    </div>
  )
}