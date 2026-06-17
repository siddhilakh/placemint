type Props = {
  title: string
  match: number
  reasoning: string
}

export default function RoleCard({
  title,
  match,
  reasoning,
}: Props) {
  function getBadgeStyle() {
    if (match >= 75)
      return "bg-[#42E8D8]/10 text-[#42E8D8] border border-[#42E8D8]/20"

    if (match >= 50)
      return "bg-amber-500/10 text-amber-400 border border-amber-500/20"

    return "bg-red-500/10 text-red-400 border border-red-500/20"
  }

  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-6
      hover:-translate-y-1
      hover:border-[#42E8D8]/30
      hover:shadow-[0_0_40px_rgba(66,232,216,0.12)]
      transition-all
      duration-300
    "
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">
          {title}
        </h3>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${getBadgeStyle()}`}
        >
          {match}% match
        </span>
      </div>

      <p className="text-[#8f9399] leading-relaxed">
        {reasoning}
      </p>
    </div>
  )
}