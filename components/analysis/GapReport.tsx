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

  function getContainerStyle(index: number) {
    return index === 0
      ? "border-red-500/20 bg-red-500/[0.04]"
      : "border-white/10 bg-white/[0.03]"
  }

  function getBadgeStyle(index: number) {
    return index === 0
      ? "bg-red-500/10 text-red-400 border border-red-500/20"
      : "bg-[#42E8D8]/10 text-[#42E8D8] border border-[#42E8D8]/20"
  }

  function getLabel(index: number) {
    return index === 0 ? "Critical" : "Improvement"
  }

  return (
    <div className="flex flex-col gap-4">
      {gaps.map((gap, index) => (
        <div
          key={gap.section}
          className={`
            relative
            overflow-hidden
            rounded-3xl
            border
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-[#42E8D8]/20
            hover:shadow-[0_0_30px_rgba(66,232,216,0.08)]
            ${getContainerStyle(index)}
          `}
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,232,216,0.04),transparent_70%)] pointer-events-none" />

          <button
            onClick={() => toggle(index)}
            className="
              relative
              z-10
              w-full
              flex
              items-center
              justify-between
              px-6
              py-5
              text-left
            "
          >
            <div className="flex items-center gap-4">
              <span
                className={`
                  text-xs
                  font-medium
                  px-3
                  py-1.5
                  rounded-full
                  ${getBadgeStyle(index)}
                `}
              >
                {getLabel(index)}
              </span>

              <span className="text-white font-medium text-base">
                {gap.section}
              </span>
            </div>

            <span className="text-[#8f9399] text-sm">
              {openIndex === index ? "▲" : "▼"}
            </span>
          </button>

          {openIndex === index && (
            <div className="relative z-10 px-6 pb-6 flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-white mb-1">
                  Issue
                </p>

                <p className="text-sm leading-relaxed text-[#b0b4ba]">
                  {gap.issue}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-[#42E8D8] mb-1">
                  Recommended Fix
                </p>

                <p className="text-sm leading-relaxed text-[#b0b4ba]">
                  {gap.fix}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}