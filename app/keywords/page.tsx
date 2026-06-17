"use client"
import { useState } from "react"

export default function KeywordsPage() {
  const [jd, setJd] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<null | {
    matchPercentage: number
    matched: string[]
    missing: string[]
    suggestion: string
  }>(null)

  function getMatchColor(score: number) {
    if (score >= 80)
      return "bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent"

    if (score >= 50)
      return "text-amber-400"

    return "text-red-400"
  }

  function getProgressBar(score: number) {
    if (score >= 80)
      return `
        bg-gradient-to-r
        from-[#42E8D8]
        via-[#1FD5D5]
        to-[#13B9E8]
      `

    if (score >= 50)
      return `
        bg-gradient-to-r
        from-amber-500
        to-amber-400
      `

    return `
      bg-gradient-to-r
      from-red-500
      to-red-400
    `
  }

  async function handleAnalyse() {
    if (!jd.trim()) {
      setError("Please paste a job description first")
      return
    }

    setError("")
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/keywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: jd,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error ?? "Something went wrong. Please try again.")
        setLoading(false)
        return
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-20 px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,232,216,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(19,185,232,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">

        <div className="mb-12">
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
            Job Description Analysis
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            JD
            <span className="bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
              {" "}Match
            </span>
          </h1>

          <p className="text-[#8f9399] text-lg">
            Compare your resume against a job description and uncover missing keywords.
          </p>
        </div>

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-8
            mb-8
            shadow-[0_0_30px_rgba(66,232,216,0.08)]
          "
        >
          <label className="text-white font-medium block mb-4">
            Paste Job Description
          </label>

          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={10}
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-black/20
              text-white
              px-5
              py-4
              resize-none
              focus:outline-none
              focus:border-[#42E8D8]/40
            "
          />

          {error && (
            <p className="text-red-400 text-sm mt-3">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={handleAnalyse}
          disabled={loading || !jd.trim()}
          className="
            w-full
            py-4
            rounded-2xl
            font-semibold
            text-black
            transition-all
            duration-300
            hover:scale-[1.01]
            disabled:opacity-40
            mb-8
          "
          style={{
            background:
              "linear-gradient(135deg,#42E8D8 0%,#1FD5D5 50%,#13B9E8 100%)",
            boxShadow: "0 0 25px rgba(66,232,216,0.3)",
          }}
        >
          {loading ? "Analysing keywords..." : "Extract Keywords →"}
        </button>

        {result && (
          <div className="flex flex-col gap-6">

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                shadow-[0_0_30px_rgba(66,232,216,0.08)]
              "
            >
              <p className="text-sm uppercase tracking-[0.15em] text-[#8f9399] mb-3">
                JD Match
              </p>

              <div
                className={`text-7xl font-bold mb-5 ${getMatchColor(
                  result.matchPercentage
                )}`}
              >
                {result.matchPercentage}%
              </div>

              <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${getProgressBar(
                    result.matchPercentage
                  )}`}
                  style={{
                    width: `${result.matchPercentage}%`,
                  }}
                />
              </div>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
              "
            >
              <h2 className="text-white font-medium mb-4">
                ✓ Keywords in your resume ({result.matched.length})
              </h2>

              <div className="flex flex-wrap gap-3">
                {result.matched.map((keyword) => (
                  <span
                    key={keyword}
                    className="
                      px-4
                      py-2
                      rounded-full
                      border
                      border-[#42E8D8]/20
                      bg-[#42E8D8]/10
                      text-[#42E8D8]
                      text-sm
                    "
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
              "
            >
              <h2 className="text-white font-medium mb-4">
                ✗ Missing Keywords ({result.missing.length})
              </h2>

              <div className="flex flex-wrap gap-3">
                {result.missing.map((keyword) => (
                  <span
                    key={keyword}
                    className="
                      px-4
                      py-2
                      rounded-full
                      border
                      border-red-500/20
                      bg-red-500/10
                      text-red-400
                      text-sm
                    "
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-[#42E8D8]/20
                bg-[#42E8D8]/5
                backdrop-blur-xl
                p-8
              "
            >
              <h2 className="text-[#42E8D8] font-semibold mb-3">
                Recommendation
              </h2>

              <p className="text-[#d9d9d9] leading-relaxed">
                {result.suggestion}
              </p>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}