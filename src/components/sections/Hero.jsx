import { useEffect, useMemo, useState, useId } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AvatarSrc from "@/assets/me.jpeg";
import { socialLinks,heroContent } from "@/lib/data";
import { TypeAnimation } from "react-type-animation";

/* -------------------------------- Content Config -------------------------------- */

// const heroContent = {
//   badge: "Full-Stack • Data • AI",
//   roles: [
//     "Data Scientist & MERN Stack Developer",
//     2200,
//     "AI & ML Enthusiast",
//     2000,
//     "Web & Data Solutions Architect",
//     2400,
//   ],
//   intro:
//     "I craft intelligent, scalable applications that merge data science, modern web engineering, and AI-driven experiences to deliver measurable impact.",
//   ctas: [
//     { label: "View My Work", href: "#projects", primary: true },
//     { label: "Contact Me", href: "#contact", primary: false },
//   ],
//   name: "Zakaria Said",
// };

/* ------------------------------- Decorative Orbs -------------------------------- */
const orbs = [
  {
    className:
      "absolute top-[-90px] left-[-70px] w-72 h-72 bg-gradient-to-br from-amber-400/10 to-yellow-500/10 opacity-60 blur-3xl rounded-full pointer-events-none",
    animate: { y: [0, 30, 0], x: [0, 22, 0] },
    transition: { duration: 16, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className:
      "absolute bottom-[-140px] right-[-120px] w-[32rem] h-[32rem] bg-gradient-to-tr from-sky-400/10 to-cyan-300/10 opacity-50 blur-3xl rounded-full pointer-events-none",
    animate: { y: [0, -40, 0], x: [0, -30, 0] },
    transition: { duration: 22, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className:
      "absolute top-1/2 left-[-110px] w-64 h-64 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 opacity-60 blur-2xl rounded-full pointer-events-none",
    animate: { y: [0, 22, 0], x: [0, 16, 0] },
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut" },
  },
];

/* -------------------------------- Grid Overlay --------------------------------- */
const GridOverlay = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12] mix-blend-soft-light"
    aria-hidden="true"
  >
    <defs>
      <pattern id="gridPattern" width="54" height="54" patternUnits="userSpaceOnUse">
        <path d="M 54 0 L 0 0 0 54" fill="none" stroke="#334155" strokeWidth="0.5" />
      </pattern>
      <radialGradient id="fadeMask" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="white" stopOpacity="0.55" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#gridPattern)" />
    <rect width="100%" height="100%" fill="url(#fadeMask)" />
  </svg>
);

/* ------------------------------- Motion Variants -------------------------------- */
const variants = {
  parent: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.25 },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
  },
  primaryHover: {
    scale: 1.03,
    boxShadow: [
      "0 0 0px rgba(255,195,0,0)",
      "0 0 20px rgba(255,195,0,0.45)",
      "0 0 36px rgba(255,195,0,0.35)",
    ],
    transition: { duration: 0.6 },
  },
  secondaryHover: {
    scale: 1.04,
    backgroundColor: "rgba(255,255,255,0.08)",
    transition: { duration: 0.4 },
  },
  socialHover: {
    scale: 1.18,
    color: "#38bdf8",
    transition: { type: "spring", stiffness: 420, damping: 18 },
  },
};

/* -------------------------------- Social Links --------------------------------- */
const SocialLinks = ({ motionVariant }) => {
  return (
    <motion.div className="flex items-center gap-6" variants={motionVariant}>
      <span className="text-sm text-slate-400">Find me on</span>
      <div className="flex gap-5">
        {socialLinks.map((s) => {
          const Icon =
            s.label.includes("LinkedIn")
              ? Linkedin
              : s.label.includes("GitHub")
              ? Github
              : Twitter;
          return (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={variants.socialHover}
              className="transition-colors text-slate-400 hover:text-amber-400"
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ------------------------------------ Hero ------------------------------------- */
export const Hero = () => {
  const [init, setInit] = useState(false);
  const typedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesOptions = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" } },
        modes: { repulse: { distance: 110, duration: 0.6 } },
      },
      particles: {
        color: { value: "#FFC300" },
        links: {
          color: "#FFC300",
            distance: 115,
          enable: true,
          opacity: 0.08,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          speed: 0.55,
        },
        number: { density: { enable: true }, value: 72 },
        opacity: { value: 0.18 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.6 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center bg-[#0f172a] text-slate-100 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Background Base Gradient */}
      <div className="absolute inset-0 -z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,195,0,0.08),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#0f172a,#0b1322,#0f172a)]" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 -z-40 pointer-events-none">
        <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.78))] bg-slate-900/60" />
      </div>

      {/* Particles */}
      <Particles id="tsparticles" options={particlesOptions} className="absolute inset-0 -z-30" />

      {/* Orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={orb.className}
          aria-hidden="true"
          animate={orb.animate}
          transition={orb.transition}
        />
      ))}

      {/* Grid Overlay */}
      <GridOverlay />

      <div className="container mx-auto px-5 md:px-8 z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20 items-center min-h-[80vh]"
          initial="hidden"
          animate="visible"
          variants={variants.parent}
        >
          {/* Left Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-1 relative">
            {/* Glass Accent Behind */}
            <div className="absolute -inset-x-6 -inset-y-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_24px_-4px_rgba(0,0,0,0.4)] pointer-events-none -z-10" />

            <motion.div variants={variants.fadeUp} className="mb-6">
              <Badge
                variant="outline"
                className="border-amber-400/40 text-amber-300 bg-amber-400/10 font-medium px-4 py-2 text-[0.72rem] md:text-xs tracking-wide backdrop-blur-md shadow-inner shadow-amber-300/10 rounded-full"
              >
                {heroContent.badge}
              </Badge>
            </motion.div>

            <motion.h1
              variants={variants.fadeUp}
              className="relative font-extrabold tracking-tight mb-5 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-amber-300 via-amber-200 to-amber-500/70 text-3xl md:text-5xl xl:text-6xl drop-shadow-[0_4px_18px_rgba(255,195,0,0.08)]"
              aria-live="polite"
              id={typedId}
            >
              <span className="sr-only">{heroContent.name} - Professional Roles</span>
              <TypeAnimation
                sequence={heroContent.roles}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block"
                aria-label="Rotating professional roles"
              />
            </motion.h1>

            <motion.p
              variants={variants.fadeUp}
              className="text-lg md:text-xl text-slate-300/90 max-w-xl mb-10 leading-relaxed"
            >
              {heroContent.intro}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-5 mb-10 w-full sm:w-auto justify-center lg:justify-start"
              variants={variants.fadeUp}
            >
              {heroContent.ctas.map((cta) => (
                <motion.div
                  key={cta.label}
                  whileHover={cta.primary ? variants.primaryHover : variants.secondaryHover}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className={
                      cta.primary
                        ? [
                            "group relative overflow-hidden font-semibold rounded-full px-9 py-5",
                            "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500",
                            "text-slate-900 shadow-[0_6px_28px_-6px_rgba(255,195,0,0.55)]",
                            "hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400",
                            "transition-all duration-300 ease-out",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
                          ].join(" ")
                        : [
                            "rounded-full px-9 py-5 font-semibold text-amber-200",
                            "border border-amber-300/30 bg-white/5 backdrop-blur-md",
                            "hover:text-amber-300 hover:border-amber-300/50",
                            "hover:bg-white/10 transition-all duration-300 ease-out",
                            "shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_24px_-4px_rgba(0,0,0,0.35)]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40",
                          ].join(" ")
                    }
                  >
                    <a href={cta.href} aria-label={cta.label}>
                      <span className="relative z-10 flex items-center">
                        {cta.label}
                        {cta.primary && (
                          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        )}
                      </span>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            <SocialLinks motionVariant={variants.fadeUp} />
          </div>

          {/* Right Column: Avatar */}
          <motion.div
            className="flex items-center justify-center lg:justify-end order-2 lg:order-2 relative"
            variants={variants.fadeUp}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -16, 0],
              filter: ["brightness(1)", "brightness(1.08)", "brightness(1)"],
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
              filter: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.05,
              rotate: [0, 2.8, -2.8, 0],
              boxShadow: "0 0 70px 10px rgba(56,189,248,0.6)",
              transition: { duration: 0.9 },
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-sky-400/30 via-amber-300/20 to-transparent opacity-70 blur-2xl group-hover:blur-3xl transition-all duration-700" />
              <div className="p-[3px] rounded-[2rem] bg-gradient-to-tr from-sky-400 via-amber-300 to-sky-500 shadow-[0_0_34px_-6px_rgba(56,189,248,0.45)] group-hover:shadow-[0_0_54px_-4px_rgba(56,189,248,0.75)] transition-all duration-500">
                <div className="relative rounded-[1.7rem] bg-[#0f1c34]/80 backdrop-blur-xl overflow-hidden">
                  <Avatar className="w-72 h-72 md:w-[22rem] md:h-[22rem] rounded-[1.6rem] shadow-2xl shadow-sky-300/10 ring-1 ring-white/10">
                    <AvatarImage
                      src={AvatarSrc}
                      alt="Portrait of Zakaria Said"
                      className="object-cover scale-[1.01]"
                    />
                    <AvatarFallback className="text-4xl bg-slate-800/80">ZS</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_25%,rgba(255,195,0,0.25),transparent_55%)] mix-blend-overlay" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};