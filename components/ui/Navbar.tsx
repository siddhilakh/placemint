"use client"
import Link from "next/link"
import { UserButton, useAuth } from "@clerk/nextjs"

export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100">
      <Link href="/" className="text-xl font-bold text-green-600">PlaceMint</Link>

      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
        <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
      </div>

      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              href="/upload"
              className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              New Analysis
            </Link>
            <UserButton />
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}