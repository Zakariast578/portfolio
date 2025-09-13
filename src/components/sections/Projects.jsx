import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectsData, projectImageMap } from "@/lib/data";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const itemVariants = { hidden: { y: 28, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 16 } } };

const ProjectCard = ({ project }) => {
  const isPending = project.status === "In Progress";

  return (
    <motion.div variants={itemVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} className="h-full">
      <Card className={`h-full flex flex-col overflow-hidden transition-all duration-300 border-slate-800/70 bg-slate-900/60 backdrop-blur hover:border-sky-500/50 hover:shadow-lg ${isPending ? 'border-dashed' : ''}`}>
        <CardHeader>
          <div className="relative mb-4">
            <div className={`group aspect-video rounded-lg border border-slate-800 bg-slate-800/40 overflow-hidden ${isPending ? 'grayscale' : ''}`}> 
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Construction className="w-12 h-12 mb-2" />
                  <p>Image Coming Soon</p>
                </div>
              )}
            </div>
            <Badge className={`absolute top-2 right-2 border ${isPending ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
              {project.status}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
          <CardDescription className="text-base min-h-[3em] text-slate-300">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-sky-500/20 hover:text-sky-300 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-start gap-4 pt-4">
          {project.liveLink && (
            <Button asChild>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
              >
                View Demo <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.githubLink && (
            <Button variant="outline" asChild>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
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

  const filteredProjects = projectsData
    .map((p) => ({ ...p, image: images[p.title] }))
    .filter((project) => {
      if (activeTab === "all") return true;
      return project.status.toLowerCase().replace(" ", "-") === activeTab;
    });

  return (
    <section id="projects" className="relative w-full py-24 bg-background">
      <div className="absolute inset-0 pointer-events-none opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.85))] bg-accent/30" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Projects & Case Studies</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">A selection of work highlighting product thinking, technical breadth and attention to UX detail.</p>
        </div>
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full mb-10">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-background/60 backdrop-blur border border-accent/40">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="complete">Complete</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          </TabsList>
        </Tabs>
        <motion.div key={activeTab} variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};