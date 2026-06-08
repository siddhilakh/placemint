export default function Footer() {
  return (
    <footer className="w-full px-6 py-10 border-t border-gray-100 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-lg font-bold text-green-600">PlaceMint</span>
        <p className="text-sm text-gray-400">Built for Indian engineering students</p>
        <a href="https://github.com/siddhilakh/placemint" target="_blank" className="text-sm text-gray-400 hover:text-gray-600">GitHub →</a>
      </div>
    </footer>
  )
}