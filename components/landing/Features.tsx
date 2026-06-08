const features = [
  {
    icon: "📊",
    title: "ATS Score",
    description: "See exactly how your resume scores against Applicant Tracking Systems used by top Indian companies.",
  },
  {
    icon: "🎯",
    title: "Role Matching",
    description: "Find out which roles — TCS Digital, product startups, service companies — you're realistically eligible for.",
  },
  {
    icon: "📋",
    title: "Gap Report",
    description: "Get a specific list of what's missing from your resume and exactly how to fix each gap.",
  },
]

export default function Features() {
  return (
    <section id="features" className="w-full px-6 py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Everything you need before placement season
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Built specifically for the Indian campus hiring context.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}