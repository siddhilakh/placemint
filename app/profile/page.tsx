"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { StudentProfile } from "@/types"

export default function ProfilePage() {
  const [name, setName]                       = useState<string>("")
  const [branch, setBranch]                   = useState<string>("")
  const [cgpa, setCgpa]                       = useState<string>("")
  const [collegeTier, setCollegeTier]         = useState<string>("")
  const [graduationYear, setGraduationYear]   = useState<string>("")
  const [errors, setErrors]                   = useState<Record<string, string>>({})
  const [loading, setLoading]                 = useState<boolean>(false)
  const router = useRouter()

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!name.trim())        newErrors.name = "Name is required"
    if (!branch)             newErrors.branch = "Please select your branch"
    if (!cgpa)               newErrors.cgpa = "CGPA is required"
    else if (Number(cgpa) < 0 || Number(cgpa) > 10)
                             newErrors.cgpa = "CGPA must be between 0 and 10"
    if (!collegeTier)        newErrors.collegeTier = "Please select your college tier"
    if (!graduationYear)     newErrors.graduationYear = "Please select your graduation year"
    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          branch,
          cgpa,
          collegeTier,
          graduationYear,
        })
      })

      if (!response.ok) {
        setErrors({ submit: 'Failed to save profile. Please try again.' })
        setLoading(false)
        return
      }

      router.push('/upload')
    } catch (error) {
      console.error(error)
      setErrors({ submit: 'Something went wrong. Please try again.' })
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-500 text-sm mb-8">
          Tell us about yourself so we can personalise your analysis.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: "" })) }}
              placeholder="e.g. Siddhi Lakhotia"
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Branch</label>
            <select
              value={branch}
              onChange={(e) => { setBranch(e.target.value); setErrors(prev => ({ ...prev, branch: "" })) }}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select your branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="Mech">Mech</option>
              <option value="Civil">Civil</option>
              <option value="Other">Other</option>
            </select>
            {errors.branch && <p className="text-red-500 text-xs">{errors.branch}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">CGPA</label>
            <input
              type="number"
              value={cgpa}
              onChange={(e) => { setCgpa(e.target.value); setErrors(prev => ({ ...prev, cgpa: "" })) }}
              placeholder="e.g. 7.8"
              min="0"
              max="10"
              step="0.1"
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.cgpa && <p className="text-red-500 text-xs">{errors.cgpa}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">College Tier</label>
            <select
              value={collegeTier}
              onChange={(e) => { setCollegeTier(e.target.value); setErrors(prev => ({ ...prev, collegeTier: "" })) }}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select college tier</option>
              <option value="IIT/NIT">IIT / NIT</option>
              <option value="Tier 2">Tier 2</option>
              <option value="Tier 3">Tier 3</option>
            </select>
            {errors.collegeTier && <p className="text-red-500 text-xs">{errors.collegeTier}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Graduation Year</label>
            <select
              value={graduationYear}
              onChange={(e) => { setGraduationYear(e.target.value); setErrors(prev => ({ ...prev, graduationYear: "" })) }}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select year</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
            </select>
            {errors.graduationYear && <p className="text-red-500 text-xs">{errors.graduationYear}</p>}
          </div>

          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Continue →"}
          </button>

        </form>
      </div>
    </main>
  )
}