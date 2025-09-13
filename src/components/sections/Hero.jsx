import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AvatarSrc from "@/assets/me.jpeg";
import { heroContent, socialLinks } from "@/lib/data";

// Subtle decorative orbs (solid palette, no gradients)
const orbs = [
  {
    className:
      "absolute top-[-80px] left-[-80px] w-72 h-72 bg-primary/10 opacity-60 blur-3xl rounded-full pointer-events-none",
    animate: { y: [0, 25, 0], x: [0, 18, 0] },
    transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className:
      "absolute bottom-[-100px] right-[-60px] w-80 h-80 bg-accent/15 opacity-50 blur-3xl rounded-full pointer-events-none",
    animate: { y: [0, -30, 0], x: [0, -22, 0] },
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className:
      "absolute top-1/2 left-[-100px] w-60 h-60 bg-secondary/10 opacity-60 blur-2xl rounded-full pointer-events-none",
    animate: { y: [0, 18, 0], x: [0, 12, 0] },
    transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
  },
];

// Subtle grid overlay SVG
const GridOverlay = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="grid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="#64748b"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

export const Hero = () => {
  const [init, setInit] = useState(false);

  // tsParticles config
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
        modes: { repulse: { distance: 100, duration: 0.4 } },
      },
      particles: {
        color: { value: "#FFC300" },
        links: {
          color: "#FFC300",
          distance: 110,
          enable: true,
          opacity: 0.05,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          speed: 0.6,
        },
        number: { density: { enable: true }, value: 55 },
        opacity: { value: 0.12 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.2 } },
      },
      detectRetina: true,
    }),
    []
  );

  // Framer Motion variants
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  const socialHover = {
    scale: 1.18,
    color: "#60a5fa",
    transition: { type: "spring", stiffness: 400 },
  };
  const buttonSparkle = {
    boxShadow: [
      "0 0 0px #FFC300",
      "0 0 10px #FFC30055",
      "0 0 0px #FFC300",
    ],
    transition: { duration: 0.6 },
  };

  if (!init) return null;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden"
    >
      {/* Subtle accent vignette (solid palette approximation) */}
      <div
        className="absolute inset-0 -z-30 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.8))] bg-accent/30" />
      </div>
  {/* Particle Background */}
      <Particles
        id="tsparticles"
        options={particlesOptions}
        className="absolute inset-0 -z-20"
      />

      {/* Gradient Orbs */}
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

      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-center min-h-[80vh]"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {/* Left Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <motion.div variants={item} className="mb-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shadow-sm border border-primary/30">
                <div className="h-2 w-2 rounded-full bg-yellow-500 animate-ping [animation-duration:2s]" />
                <span aria-label="Availability">Open to opportunities</span>
              </div>
            </motion.div>
            <motion.div variants={item}>
              <Badge variant="outline" className="mb-5 border-primary/50 text-primary bg-primary/10 font-semibold px-4 py-2 text-base shadow">
                {heroContent.badge}
              </Badge>
            </motion.div>
            <motion.h1 variants={item} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-primary">
              <span className="block">{heroContent.name}</span>
            </motion.h1>
            <motion.h2 variants={item} className="text-xl md:text-3xl font-semibold mb-6 text-foreground">
              {heroContent.title}
            </motion.h2>
            <motion.p variants={item} className="text-lg md:text-xl text-slate-300 max-w-xl mb-8">
              {heroContent.intro}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto justify-center lg:justify-start"
              variants={item}
            >
              {heroContent.ctas.map((cta) => (
                <motion.div key={cta.label} whileHover={cta.primary ? buttonSparkle : { scale: 1.04 }}>
                  <Button
                    asChild
                    size="lg"
                    variant={cta.primary ? 'default' : 'outline'}
                    className={
                      cta.primary
                        ? 'group bg-primary text-primary-foreground font-bold rounded-full px-8 py-4 shadow-lg hover:bg-primary/90 transition-transform duration-200 focus:ring-2 focus:ring-primary'
                        : 'rounded-full border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-colors duration-200 font-semibold px-8 py-4'
                    }
                  >
                    <a href={cta.href} aria-label={cta.label}>
                      {cta.label}
                      {cta.primary && (
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                      )}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-6"
              variants={item}
            >
              <span className="text-sm text-slate-400">Find me on</span>
              <div className="flex gap-4">
                {socialLinks.map((s) => {
                  const Icon = s.label.includes('LinkedIn') ? Linkedin : s.label.includes('GitHub') ? Github : Twitter;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      whileHover={socialHover}
                      className="transition-colors text-foreground/70 hover:text-primary"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Avatar */}
          <motion.div
            className="flex items-center justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -18, 0],
              boxShadow: [
                "0 0 0px #38bdf8",
                "0 0 32px 8px #a21caf55",
                "0 0 0px #38bdf8",
              ],
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              boxShadow: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.04,
              rotate: [0, 4, -4, 0],
              boxShadow: "0 0 48px 12px #38bdf8cc",
              transition: { duration: 0.7 },
            }}
            variants={item}
          >
            <div className="p-1 bg-primary rounded-3xl">
              <Avatar className="w-96 h-96 md:w-80 md:h-80 shadow-2xl shadow-primary/30 rounded-2xl bg-background overflow-hidden">
                <AvatarImage src={AvatarSrc} alt="Dev Zakaria" />
                <AvatarFallback className="text-4xl bg-slate-800/80">ZD</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};