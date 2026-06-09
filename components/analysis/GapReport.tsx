"use client"
import { useState } from "react"
import { ResumeGap } from "@/types"

type Props = {
  gaps: ResumeGap[]
}

export default function GapReport({ gaps }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  function getSeverityColor(index: number) {
    return index === 0 ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"
  }

  function getSeverityBadge(index: number) {
    return index === 0
      ? "bg-red-100 text-red-600"
      : "bg-amber-100 text-amber-600"
  }

  function getSeverityLabel(index: number) {
    return index === 0 ? "Critical" : "Improvement"
  }

  return (
    <div className="flex flex-col gap-3">
      {gaps.map((gap, index) => (
        <div
          key={gap.section}
          className={`border rounded-2xl overflow-hidden ${getSeverityColor(index)}`}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSeverityBadge(index)}`}>
                {getSeverityLabel(index)}
              </span>
              <span className="text-sm font-medium text-gray-900">{gap.section}</span>
            </div>
            <span className="text-gray-400 text-sm">{openIndex === index ? "▲" : "▼"}</span>
          </button>

          {openIndex === index && (
            <div className="px-5 pb-4 flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Issue: </span>{gap.issue}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Fix: </span>{gap.fix}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}