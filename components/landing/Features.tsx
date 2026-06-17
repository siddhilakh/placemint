import { BarChart3, Target, FileSearch } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "ATS Score",
    description:
      "See exactly how your resume scores against Applicant Tracking Systems used by top Indian companies.",
  },
  {
    icon: Target,
    title: "Role Matching",
    description:
      "Find out which roles — TCS Digital, product startups, service companies — you're realistically eligible for.",
  },
  {
    icon: FileSearch,
    title: "Gap Report",
    description:
      "Get a specific list of what's missing from your resume and exactly how to fix each gap.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="w-full px-6 py-24"
      style={{ backgroundColor: "#0b0f0e" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need before
            <span className="block bg-gradient-to-r from-[#42E8D8] via-[#1FD5D5] to-[#13B9E8] bg-clip-text text-transparent">
              placement season
            </span>
          </h2>

          <p className="text-[#8f9399] text-lg max-w-2xl mx-auto">
            Built specifically for the Indian campus hiring context.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  rounded-3xl
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-[#42E8D8]/20
                "
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
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                  style={{
                    backgroundColor: "rgba(45,212,191,0.10)",
                    border: "1px solid rgba(45,212,191,0.20)",
                  }}
                >
                  <Icon
                    size={28}
                    strokeWidth={2}
                    className="text-[#42E8D8]"
                  />
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-[#8f9399] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}