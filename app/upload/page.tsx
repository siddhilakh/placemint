"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUploadThing } from "@/lib/uploadthing"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const [loadingMessage, setLoadingMessage] = useState<string>("Uploading...")
  const [analysisStep, setAnalysisStep] = useState(1)

  const { startUpload } = useUploadThing("resumeUploader", {
    onClientUploadComplete: async (res) => {
  const fileUrl  = res[0].ufsUrl
  const fileName = res[0].name

  try {
    // Step 1 — Save resume to DB
    const resumeResponse = await fetch('/api/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileUrl, fileName })
    })

    if (!resumeResponse.ok) {
      const data = await resumeResponse.json()
      setError(data.error ?? "Failed to save resume. Please try again.")
      setLoading(false)
      return
    }

    const resume = await resumeResponse.json()
    setAnalysisStep(2)

    // Step 2 — Trigger AI analysis
    setLoadingMessage("Analysing your resume...")
    setAnalysisStep(3)

    const analyseResponse = await fetch('/api/analyse', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ resumeId: resume.id })
})

setAnalysisStep(4)

if (!analyseResponse.ok) {
  const data = await analyseResponse.json()

  setError(
    data.error ??
    "Analysis failed. Please try again."
  )

  setLoading(false)
  return
}

setAnalysisStep(5)

setTimeout(() => {
  router.push('/dashboard')
}, 800)

   
    

  } catch (err) {
    console.error(err)
    setError("Something went wrong. Please try again.")
    setLoading(false)
  }
},
    onUploadError: (err) => {
      setError(err.message)
      setLoading(false)
    }
  })

  function handleFile(selected: File) {
    if (selected.type !== "application/pdf") {
      setError("Only PDF files are accepted")
      return
    }
    if (selected.size > 4 * 1024 * 1024) {
      setError("File must be under 4MB")
      return
    }
    setError("")
    setFile(selected)
  }

  async function handleSubmit() {
    if (!file) return
    setLoading(true)
setAnalysisStep(1)

setTimeout(() => setAnalysisStep(2), 1200)
setTimeout(() => setAnalysisStep(3), 2500)
setTimeout(() => setAnalysisStep(4), 4000)

await startUpload([file])
  }

  return (
  <main
    className="min-h-screen px-6 py-22 relative overflow-hidden"
    style={{ backgroundColor: "#0b0f0e" }}
  >
    {/* Background Glow */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(45,212,191,0.18), transparent 60%)",
      }}
    />

    <div className="relative z-10 max-w-2xl mx-auto">
      {/* Badge */}
      <div
        className="w-fit mx-auto mb-8 px-5 py-2 rounded-full"
        style={{
          backgroundColor: "rgba(45,212,191,0.08)",
          border: "1px solid rgba(45,212,191,0.2)",
          color: "#2dd4bf",
        }}
      >
        Resume Analysis
      </div>

      {/* Heading */}
      <h1 className="text-center text-5xl font-bold mb-4">
  <span className="text-white">Upload</span>{" "}
  <span className="bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
    Your Resume
  </span>
</h1>

      <p className="text-center text-lg text-[#8f9399] mb-12">
        Get your ATS score, role matches, and a detailed gap report.
      </p>

      {/* Upload Card */}
      {loading ? (
  <div
    className="rounded-3xl p-10 backdrop-blur-xl"
    style={{
      backgroundColor: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 0 40px rgba(45,212,191,0.08)",
    }}
  >
    <h2 className="text-3xl font-bold text-white mb-3">
      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden mb-8">
  <div
    className="h-full bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] transition-all duration-500"
    style={{
      width: `${analysisStep * 20}%`,
    }}
  />
</div>
      Analysing Your Resume
    </h2>

    <p className="text-[#8f9399] mb-8">
      This usually takes less than a minute.
    </p>

    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <span className="text-green-400">
          {analysisStep >= 1 ? "✓" : "○"}
        </span>

        <span className="text-white">
          Uploading Resume
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-green-400">
          {analysisStep >= 2 ? "✓" : "○"}
        </span>

        <span className="text-white">
          Extracting Resume Content
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={
            analysisStep === 3
              ? "text-[#42E8D8]"
              : "text-green-400"
          }
        >
          {analysisStep > 3 ? "✓" : "⟳"}
        </span>

        <span className="text-white">
          Calculating ATS Score
        </span>
      </div>

      <div className="flex items-center gap-4">
  <span
    className={
      analysisStep === 5
        ? "text-[#42E8D8]"
        : "text-[#8f9399]"
    }
  >
    {analysisStep >= 5 ? "✓" : "○"}
  </span>

  <span className="text-white">
    Preparing Dashboard
  </span>
</div>
    </div>
  </div>
) : (
  <div
    className="rounded-3xl p-8 backdrop-blur-xl"
    style={{
      backgroundColor: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 0 40px rgba(45,212,191,0.08)",
    }}
  >
    <label
      className="
        flex flex-col items-center justify-center
        w-full h-72
        rounded-2xl
        cursor-pointer
        transition-all duration-300
        hover:scale-[1.01]
      "
      style={{
        border: "2px dashed rgba(45,212,191,0.25)",
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) =>
          e.target.files?.[0] && handleFile(e.target.files[0])
        }
      />

      {file ? (
        <div className="text-center">
          <p className="text-[#2dd4bf] font-semibold text-lg">
            {file.name}
          </p>

          <p className="text-[#8f9399] text-sm mt-2">
            Click to choose another file
          </p>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-5xl mb-4">📄</div>

          <p className="text-white text-lg font-medium">
            Click or drag your PDF here
          </p>

          <p className="text-[#8f9399] text-sm mt-2">
            PDF only • Maximum 4MB
          </p>
        </div>
      )}
    </label>

    {error && (
      <p className="text-red-400 text-sm mt-4 text-center">
        {error}
      </p>
    )}

    <button
      onClick={handleSubmit}
      disabled={!file || loading}
      className="
        w-full mt-8
        py-4
        rounded-2xl
        text-black
        font-semibold
        transition-all duration-300
        hover:scale-[1.02]
        disabled:opacity-40
        disabled:cursor-not-allowed
      "
      style={{
        background:
          "linear-gradient(135deg,#42E8D8 0%,#20C9D8 100%)",
        boxShadow: "0 0 30px rgba(45,212,191,0.25)",
      }}
    >
      Analyse Resume →
    </button>
  </div>
)}
    </div>
  </main>
)
}