"use client"
import { useState } from "react"

export default function KeywordsPage() {
  const [jd, setJd]           = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")
  const [result, setResult]   = useState<null | {
    matchPercentage: number
    matched: string[]
    missing: string[]
    suggestion: string
  }>(null)

  async function handleAnalyse() {
    if (!jd.trim()) {
      setError("Please paste a job description first")
      return
    }
    setError("")
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jd })
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
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-900 mb-2">JD Match</h1>
        <p className="text-gray-500 text-sm mb-8">
          Paste a job description and we'll tell you which keywords your resume is missing.
        </p>

        {/* Job Description Input */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <label className="text-sm font-medium text-gray-700 block mb-3">
            Paste Job Description
          </label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={10}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          onClick={handleAnalyse}
          disabled={loading || !jd.trim()}
          className="w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-8"
        >
          {loading ? "Analysing keywords..." : "Extract Keywords →"}
        </button>

        {/* Results */}
        {result && (
          <div className="flex flex-col gap-6">

            {/* Match Percentage */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">JD Match</p>
              <div className="text-5xl font-bold text-green-600">{result.matchPercentage}%</div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${result.matchPercentage}%` }}
                />
              </div>
            </div>

            {/* Matched Keywords */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-sm font-medium text-gray-700 mb-3">
                ✓ Keywords in your resume ({result.matched.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.matched.map((keyword) => (
                  <span
                    key={keyword}
                    className="text-xs px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-sm font-medium text-gray-700 mb-3">
                ✗ Missing keywords ({result.missing.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.missing.map((keyword) => (
                  <span
                    key={keyword}
                    className="text-xs px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggestion */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h2 className="text-sm font-medium text-green-800 mb-2">Recommendation</h2>
              <p className="text-sm text-green-700">{result.suggestion}</p>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}