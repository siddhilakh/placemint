export default function Hero() {
  return (
    <section
className="w-full px-6 pt-24 pb-28 flex flex-col items-center text-center relative overflow-hidden"      style={{ backgroundColor: "#0b0f0e" }}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 20%, rgba(45, 212, 191, 0.18), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          className="inline-flex items-center backdrop-blur-md text-sm font-medium px-4 py-1.5 rounded-full mb-8"
          style={{
            backgroundColor: "rgba(45, 212, 191, 0.08)",
            border: "1px solid rgba(45, 212, 191, 0.2)",
            color: "#2dd4bf",
            boxShadow: "0 0 20px rgba(45, 212, 191, 0.15)",
          }}
        >
          Built for Indian engineering students
        </div>

        <h1
  className="text-4xl md:text-[4rem] font-bold max-w-4xl leading-[1.1] mb-6"
  style={{ color: "#f4f4f5" }}
>
  Know exactly where
  <br />
  <span className="bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
    you stand.
  </span>
</h1>

        <p
          className="text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: "#a1a1aa" }}
        >
          Upload your resume, tell us your profile — get an ATS score,
          role matches, and a specific gap report. No generic advice.
          No fluff.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="/upload"
            className="text-black text-base font-semibold px-8 py-4 rounded-xl transition-all hover:scale-[1.03]"
            style={{
              backgroundColor: "#2dd4bf",
              boxShadow: "0 0 30px rgba(45, 212, 191, 0.35)",
            }}
          >
            Analyse My Resume →
          </a>

          <a
            href="#how-it-works"
            className="backdrop-blur-md text-base font-medium px-8 py-4 rounded-xl transition-all hover:border-white/20"
            style={{
              color: "#a1a1aa",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}