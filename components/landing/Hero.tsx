export default function Hero() {
  return (
    <section className="w-full px-6 py-24 flex flex-col items-center text-center bg-white">
      <div className="inline-block bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
        Built for Indian engineering students
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-3xl leading-tight mb-6">
        Know exactly where you stand before placement season
      </h1>
      <p className="text-lg text-gray-500 max-w-xl mb-10">
        Upload your resume, tell us your profile — get an ATS score, role matches, and a specific gap report. No generic advice. No fluff.
      </p>
      <a href="/upload" className="bg-green-600 text-white text-base font-medium px-8 py-4 rounded-xl hover:bg-green-700 transition-colors">
        Analyse My Resume →
      </a>
    </section>
  )
}