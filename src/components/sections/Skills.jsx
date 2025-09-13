import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skillsData } from '@/lib/data';
import { Code, Database, Brush, Settings } from 'lucide-react'; // Example icons

// --- Mapped Data ---
const levelStyles = {
    Advanced: {
        badge: 'bg-primary/15 text-primary border-primary/40',
        progress: 'bg-yellow-400',
    },
    Intermediate: {
        badge: 'bg-accent/20 text-foreground border-accent/40',
        progress: 'bg-yellow-300',
    },
};

const categoryIcons = {
    'Front-End': <Brush className="h-5 w-5" />,
    'Back-End': <Database className="h-5 w-5" />,
    'Programming Languages': <Code className="h-5 w-5" />,
    'Tools & Platforms': <Settings className="h-5 w-5" />,
};

// --- Animation Variants ---
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const skillItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

// --- Sub-components ---
const SkillItem = ({ skill }) => {
    const styles = levelStyles[skill.level] || levelStyles.Beginner;

    return (
        <motion.li variants={skillItemVariants} className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
                <p className="font-medium text-foreground/90">{skill.name}</p>
                <Badge variant="outline" className={`text-xs font-semibold ${styles.badge}`}>
                    {skill.level}
                </Badge>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${styles.progress}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.progress }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                />
            </div>
        </motion.li>
    );
};

const SkillCategoryCard = ({ categoryData }) => (
    <motion.div variants={cardVariants}>
        <Card className="h-full border-border/40 bg-background/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                    <span className="text-primary">{categoryIcons[categoryData.category] || <Code className="h-5 w-5" />}</span>
                    {categoryData.category}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {categoryData.skills.map((skill) => (
                        <SkillItem key={skill.name} skill={skill} />
                    ))}
                </motion.ul>
            </CardContent>
        </Card>
    </motion.div>
);

// --- Main Component ---
const Skills = () => (
    <section id="skills" className="w-full py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center mb-12 md:mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">My Technical Skills</h2>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    A collection of technologies I use to build modern, robust, and scalable web applications.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-2"
            >
                {skillsData.map((category) => (
                    <SkillCategoryCard key={category.category} categoryData={category} />
                ))}
            </motion.div>
        </div>
    </section>
);

export default Skills;
