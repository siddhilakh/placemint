import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full px-6 py-12 border-t"
      style={{
        backgroundColor: "#0b0f0e",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
  <Image
    src="/logo.png"
    alt="PlaceMint"
    width={42}
    height={42}
    className="w-10 h-10"
  />

  <span className="text-2xl font-bold tracking-tight">
    <span className="text-white">Place</span>
    <span className="bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
      Mint
    </span>
  </span>
</Link>

          {/* Center */}
          <p className="text-sm text-[#8f9399] text-center">
            Built for Indian engineering students.
          </p>

          {/* Right */}
          <a
            href="https://github.com/siddhilakh/placemint"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8f9399] hover:text-[#2dd4bf] transition-colors"
          >
            GitHub →
          </a>
        </div>

        {/* Bottom line */}
        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "#6b7280",
          }}
        >
          © 2026 PlaceMint. All rights reserved.
        </div>
      </div>
    </footer>
  );
}