const steps = [
  {
    number: "01",
    title: "Upload your resume",
    description: "Upload your resume in PDF format. We'll extract and analyse every section.",
  },
  {
    number: "02",
    title: "Tell us your profile",
    description: "Enter your branch, CGPA, college tier, and graduation year for personalised results.",
  },
  {
    number: "03",
    title: "Get your report",
    description: "Receive your ATS score, matched roles, and a specific gap report with fixes.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          How it works
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Three steps. Under two minutes.
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          {steps.map((s) => (
            <div key={s.number} className="flex-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 font-bold text-lg flex items-center justify-center mb-4">
                {s.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}