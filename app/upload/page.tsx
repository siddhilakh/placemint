"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  function handleFile(selected: File) {
    if (selected.type !== "application/pdf") {
      setError("Only PDF files are accepted")
      return
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError("File must be under 5MB")
      return
    }
    setError("")
    setFile(selected)
  }

  async function handleSubmit() {
    if (!file) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/profile")
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload your resume</h1>
        <p className="text-gray-500 text-sm mb-8">PDF only, maximum 5MB.</p>

        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          {file ? (
            <div className="text-center">
              <p className="text-green-600 font-medium text-sm">{file.name}</p>
              <p className="text-gray-400 text-xs mt-1">Click to change file</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-400 text-sm">Click or drag your PDF here</p>
              <p className="text-gray-300 text-xs mt-1">Maximum 5MB</p>
            </div>
          )}
        </label>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="w-full mt-6 bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Analysing..." : "Analyse Resume →"}
        </button>
      </div>
    </main>
  )
}