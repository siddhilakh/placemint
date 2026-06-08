export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100">
      <span className="text-xl font-bold text-green-600">PlaceMint</span>
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
        <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
      </div>
      
        <a href="/profile"
        className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Get Started
      </a>
    </nav>
  )
}