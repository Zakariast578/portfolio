import { RevealOnScroll } from "../RevealOnScroll.jsx";

// SVG icons for stack
const icons = {
  React: (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
      <g>
        <ellipse
          stroke="#61DAFB"
          strokeWidth="2"
          cx="20"
          cy="20"
          rx="18"
          ry="7.5"
        />
        <ellipse
          stroke="#61DAFB"
          strokeWidth="2"
          cx="20"
          cy="20"
          rx="7.5"
          ry="18"
          transform="rotate(60 20 20)"
        />
        <ellipse
          stroke="#61DAFB"
          strokeWidth="2"
          cx="20"
          cy="20"
          rx="7.5"
          ry="18"
          transform="rotate(120 20 20)"
        />
        <circle fill="#61DAFB" cx="20" cy="20" r="3.5" />
      </g>
    </svg>
  ),
  "Next.js": (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 0C7.163 0 0 7.163 0 16c0 8.837 7.163 16 16 16s16-7.163 16-16c0-8.837-7.163-16-16-16zm0 29.333C8.636 29.333 2.667 23.364 2.667 16S8.636 2.667 16 2.667 29.333 8.636 29.333 16 23.364 29.333 16 29.333z"
        fill="#fff"
      />
      <path d="M22.667 9.333h-2.667v13.334h2.667V9.333z" fill="#fff" />
    </svg>
  ),
  TailwindCSS: (
    <svg width="20" height="20" viewBox="0 0 48 28" fill="none">
      <path
        d="M13.5 14C13.5 7.648 18.648 2.5 25 2.5c4.5 0 8.5 2.5 10.5 7.5-2-2-4.5-3-7.5-3-6.352 0-11.5 5.148-11.5 11.5 0 4.5 2.5 8.5 7.5 10.5-2-2-3-4.5-3-7.5z"
        fill="#38bdf8"
      />
    </svg>
  ),
  TypeScript: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#3178C6" />
      <path
        d="M10.5 14.5h11v2h-4.5v7h-2v-7H10.5v-2z"
        fill="#fff"
      />
    </svg>
  ),
  "Node.js": (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#68A063" />
      <path d="M16 8l7 4v8l-7 4-7-4V12l7-4z" fill="#fff" />
    </svg>
  ),
  Django: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#092E20" />
      <text
        x="7"
        y="23"
        fontSize="16"
        fill="#fff"
        fontFamily="Arial"
      >
        Dj
      </text>
    </svg>
  ),
  PostgreSQL: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#336791" />
      <text
        x="7"
        y="23"
        fontSize="16"
        fill="#fff"
        fontFamily="Arial"
      >
        PG
      </text>
    </svg>
  ),
  MongoDB: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#47A248" />
      <text
        x="7"
        y="23"
        fontSize="16"
        fill="#fff"
        fontFamily="Arial"
      >
        MG
      </text>
    </svg>
  ),
  MySQL: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#00758F" />
      <text
        x="7"
        y="23"
        fontSize="16"
        fill="#fff"
        fontFamily="Arial"
      >
        🐬
      </text>
    </svg>
  ),
  Git: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#F05032" />
      <text
        x="7"
        y="23"
        fontSize="16"
        fill="#fff"
        fontFamily="Arial"
      >
        Git
      </text>
    </svg>
  ),
  Docker: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#2496ED" />
      <text
        x="7"
        y="23"
        fontSize="16"
        fill="#fff"
        fontFamily="Arial"
      >
        🐳
      </text>
    </svg>
  ),
  Firebase: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#FFCA28" />
      <text
        x="7"
        y="23"
        fontSize="16"
        fill="#fff"
        fontFamily="Arial"
      >
        🔥
      </text>
    </svg>
  ),
  "REST API": (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#0ea5e9" />
      <text
        x="3"
        y="23"
        fontSize="16"
        fill="#fff"
        fontFamily="Arial"
      >
        REST
      </text>
    </svg>
  ),
  GraphQL: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#E535AB" />
      <text
        x="3"
        y="23"
        fontSize="16"
        fill="#fff"
        fontFamily="Arial"
      >
        GraphQL
      </text>
    </svg>
  ),
};

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
    "MySQL",
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
              I'm Zakaria Said, a full-stack developer who enjoys turning ideas
              into robust digital solutions. I specialize in building modern,
              scalable web apps using tools like React, Node.js, and Tailwind CSS.
              I love solving real-world problems through tech and strive for
              accessible, performant user experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  {frontendSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm flex items-center gap-1 hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {icons[tech]} {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  {backendSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-cyan-500/10 text-cyan-500 py-1 px-3 rounded-full text-sm flex items-center gap-1 hover:bg-cyan-500/20 hover:shadow-[0_2px_8px_rgba(6,182,212,0.2)] transition"
                    >
                      {icons[tech]} {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Data & Tools</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  {otherSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-amber-500/10 text-amber-500 py-1 px-3 rounded-full text-sm flex items-center gap-1 hover:bg-amber-500/20 hover:shadow-[0_2px_8px_rgba(245,158,11,0.2)] transition"
                    >
                      {icons[tech]} {tech}
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
                  <strong>
                    B.S. in Computer Science
                  </strong>{" "}
                  - Somali National University (Graduating 2026)
                </li>
                <li>
                  Relevant Coursework: Data Structures, Web Development,
                  Databases, Software Engineering
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">
                💼 Work & Project Experience
              </h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold">
                    Freelance Web Developer (2023 - Present)
                  </h4>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Built custom websites and admin panels for small businesses
                      using MERN stack and Django.
                    </li>
                    <li>
                      Developed job portal prototype connecting Somali youth with
                      employers (TalentLink).
                    </li>
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