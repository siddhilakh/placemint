"use client"

import Link from "next/link"
import Image from "next/image"
import { UserButton, useAuth } from "@clerk/nextjs"

export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
  backgroundColor: "rgba(10,10,10,0.8)",
  borderColor: "rgba(255,255,255,0.08)",
}}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-18 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="PlaceMint"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />

          <span className="text-xl md:text-2xl font-bold tracking-tight">
            <span className="text-white">Place</span>
            <span className="bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
              Mint
            </span>
          </span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-12">
          <a
            href="#features"
            className="text-[#8f9399] hover:text-white transition-all duration-300"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-[#8f9399] hover:text-white transition-all duration-300"
          >
            How it works
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-5">
          {isSignedIn ? (
            <>
              <Link
  href="/dashboard"
  className="hidden md:block text-[#8f9399] hover:text-white transition-all duration-300"
>
  Dashboard
</Link>

              <Link
  href="/keywords"
  className="hidden md:block text-[#8f9399] hover:text-white transition-all duration-300"
>
  JD Match
</Link>

              <Link
  href="/upload"
  className="
    px-3 md:px-6
    py-2 md:py-3
                  rounded-xl
                  font-medium
                  text-black
                  transition-all
                  duration-300
                  hover:scale-105
                "
                style={{
                  background:
                    "linear-gradient(135deg, #42E8D8 0%, #20C9D8 100%)",
                  boxShadow: "0 0 20px rgba(66,232,216,0.25)",
                }}
              >
                <span className="hidden md:inline">
  New Analysis
</span>

<span className="md:hidden">
  +
</span>
              </Link>

              <UserButton />
            </>
          ) : (
            <>
              <Link
  href="/sign-in"
  className="hidden sm:block text-[#8f9399] hover:text-white transition-all duration-300"
>
  Sign In
</Link>

              <Link
                href="/sign-up"
                className="
                  px-3 sm:px-6
py-2 sm:py-3
text-sm sm:text-base
                  rounded-xl
                  font-medium
                  text-black
                  transition-all
                  duration-300
                  hover:scale-105
                "
                style={{
                  background:
                    "linear-gradient(135deg, #42E8D8 0%, #20C9D8 100%)",
                  boxShadow: "0 0 20px rgba(66,232,216,0.25)",
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}