const steps = [
  {
    number: "01",
    title: "Upload your resume",
    description:
      "Upload your resume in PDF format. We'll extract and analyse every section.",
  },
  {
    number: "02",
    title: "Tell us your profile",
    description:
      "Enter your branch, CGPA, college tier, and graduation year for personalised results.",
  },
  {
    number: "03",
    title: "Get your report",
    description:
      "Receive your ATS score, matched roles, and a specific gap report with fixes.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full px-6 py-24"
      style={{ backgroundColor: "#0b0f0e" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
  <span className="text-white">How it </span>
  <span className="bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
    Works
  </span>
</h2>

          <p className="text-[#8f9399] text-lg">
            Three steps. Under two minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.number}
              className="group relative rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                boxShadow: `
  0 0 20px rgba(45,212,191,0.08),
  0 0 50px rgba(45,212,191,0.08)
`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center text-lg font-bold"
                style={{
                  backgroundColor: "rgba(45,212,191,0.12)",
                  color: "#2dd4bf",
                  border: "1px solid rgba(45,212,191,0.2)",
                }}
              >
                {s.number}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">
                {s.title}
              </h3>

              <p className="text-[#8f9399] leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}