import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowUpRight, Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectsData, projectImageMap } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 140, damping: 18 } }
};

const statusStyles = {
  complete: "bg-gradient-to-r from-emerald-500 to-emerald-400 text-emerald-50 shadow-sm",
  "in-progress": "bg-gradient-to-r from-amber-500 to-amber-400 text-amber-900 shadow-sm"
};

const accentGradients = [
  "from-sky-500/30 to-sky-400/10 text-sky-300 border-sky-500/30",
  "from-violet-500/30 to-violet-400/10 text-violet-300 border-violet-500/30",
  "from-rose-500/30 to-rose-400/10 text-rose-300 border-rose-500/30",
  "from-amber-500/30 to-amber-400/10 text-amber-300 border-amber-500/30",
  "from-emerald-500/30 to-emerald-400/10 text-emerald-300 border-emerald-500/30",
  "from-fuchsia-500/30 to-fuchsia-400/10 text-fuchsia-300 border-fuchsia-500/30"
];

const getTagClass = (i) =>
  `bg-gradient-to-br ${accentGradients[i % accentGradients.length]} border text-xs font-medium px-2.5 py-1 rounded-md backdrop-blur-sm hover:from-gold-400/30 hover:to-gold-300/10 transition-colors`;

const ProjectCard = ({ project }) => {
  const isPending = project.status === "In Progress";
  const statusKey = project.status.toLowerCase().replace(" ", "-");
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="relative h-full"
    >
      <Card
        className={`group h-full flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md 
        shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_18px_-4px_rgba(0,0,0,0.55),0_10px_35px_-6px_rgba(0,0,0,0.35)]
        transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_28px_-6px_rgba(0,0,0,0.65),0_28px_60px_-10px_rgba(0,0,0,0.55)]
        ${isPending ? "border-dashed" : ""}`}
      >
        <CardHeader className="pb-4">
          <div className="relative mb-5">
            <div
              className={`aspect-video overflow-hidden rounded-lg border border-white/10 bg-slate-800/30 
              ${isPending ? "grayscale opacity-90" : ""}`}
            >
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    onLoad={() => setImgLoaded(true)}
                    className={`w-full h-full object-cover transform transition-all duration-[900ms] ease-[cubic-bezier(.19,1,.22,1)] 
                      group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0 scale-105"}`}
                  />
                  {!imgLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-700/30 to-slate-600/10" />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Construction className="w-12 h-12 mb-2 opacity-70" />
                  <p className="text-sm">Image Coming Soon</p>
                </div>
              )}
            </div>
            <Badge
              className={`absolute top-2 right-2 rounded-md px-3 py-1 text-xs font-semibold tracking-wide border border-white/10 shadow
                ${statusStyles[statusKey] || ""}`}
            >
              {project.status}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-50 via-slate-100 to-slate-300 bg-clip-text text-transparent">
            {project.title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-slate-300/80 mt-2">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t, i) => (
                <span key={t} className={getTagClass(i)}>
                  {t}
                </span>
              ))}
            </div>
        </CardContent>

        <CardFooter className="flex gap-3 pt-2">
          {project.liveLink && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Button
                asChild
                className="relative bg-gradient-to-r from-[#FFC300] to-amber-400 text-slate-900 font-semibold hover:from-amber-400 hover:to-[#FFC300] shadow-md"
              >
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${project.title}`}
                >
                  View Demo <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          )}
          {project.githubLink && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Button
                variant="outline"
                asChild
                className="border-white/15 bg-white/5 hover:bg-white/10 text-slate-200"
              >
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View GitHub repository for ${project.title}`}
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>

      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-xl ring-1 ring-[#FFC300]/40/0 group-hover:ring-[#FFC300]/30" />
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [images, setImages] = useState({});
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    (async () => {
      const entries = await Promise.all(
        projectsData.map(async (p) => {
          if (p.imageKey && projectImageMap[p.imageKey]) {
            try {
              const mod = await projectImageMap[p.imageKey]();
              return [p.title, mod.default];
            } catch {
              return [p.title, null];
            }
          }
          return [p.title, null];
        })
      );
      setImages(Object.fromEntries(entries));
    })();
  }, []);

  const filteredProjects = useMemo(
    () =>
      projectsData
        .map((p) => ({ ...p, image: images[p.title] }))
        .filter((project) => {
          if (activeTab === "all") return true;
          return project.status.toLowerCase().replace(" ", "-") === activeTab;
        }),
    [activeTab, images]
  );

  return (
    <section
      id="projects"
      className="relative w-full py-24 bg-[#0f172a] overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[34rem] h-[34rem] rounded-full bg-gradient-to-tr from-amber-500/10 via-amber-400/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <header className="text-center mb-14">
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-slate-50 via-slate-100 to-slate-300 bg-clip-text text-transparent"
          >
            Projects & Case Studies
          </h2>
          <p className="mt-4 text-lg text-slate-300/80 max-w-2xl mx-auto">
            A selection of work highlighting product thinking, technical breadth and attention to UX detail.
          </p>
        </header>

        <Tabs
          defaultValue="all"
            onValueChange={setActiveTab}
            className="w-full mb-12"
        >
          <TabsList
            className="relative mx-auto grid w-full max-w-md grid-cols-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-1"
          >
            {["all", "complete", "in-progress"].map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFC300] data-[state=active]:to-amber-400 data-[state=active]:text-slate-900
                rounded-lg text-sm font-medium transition-all duration-300"
              >
                {key === "all" ? "All" : key === "complete" ? "Complete" : "In Progress"}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 
              md:[&>*:nth-child(3n+2)]:translate-y-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};