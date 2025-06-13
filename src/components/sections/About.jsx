import { RevealOnScroll } from "../RevealOnScroll.jsx";

export const About = () => {
  const frontendSkills = [
    "React",
    "Next.js",
    "TailwindCSS",
    "TypeScript",
  ];

  const backendSkills = [
    "Node.js",
    "Django",
    "PostgreSQL",
    "MongoDB",
  ];

  const otherSkills = [
    "Git",
    "Docker",
    "Firebase",
    "REST API",
    "GraphQL",
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-gray-300 mb-6">
              I'm Zakaria Said, a full-stack developer who enjoys turning ideas into robust digital solutions. I specialize in building modern, scalable web apps using tools like React, Node.js, and Tailwind CSS. I love solving real-world problems through tech and strive for accessible, performant user experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-cyan-500/10 text-cyan-500 py-1 px-3 rounded-full text-sm hover:bg-cyan-500/20 hover:shadow-[0_2px_8px_rgba(6,182,212,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Others</h3>
                <div className="flex flex-wrap gap-2">
                  {otherSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-amber-500/10 text-amber-500 py-1 px-3 rounded-full text-sm hover:bg-amber-500/20 hover:shadow-[0_2px_8px_rgba(245,158,11,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">🏫 Education</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>B.S. in Computer Science</strong> - Somali National University (Graduating 2026)
                </li>
                <li>
                  Relevant Coursework: Data Structures, Web Development, Databases, Software Engineering
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">💼 Work & Project Experience</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold">
                    Freelance Web Developer (2023 - Present)
                  </h4>
                  <ul className="list-disc list-inside ml-4">
                    <li>Built custom websites and admin panels for small businesses using MERN stack and Django.</li>
                    <li>Developed job portal prototype connecting Somali youth with employers (TalentLink).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};