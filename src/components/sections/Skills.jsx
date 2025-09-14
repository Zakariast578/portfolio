import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skillsData } from '@/lib/data';
import { Code, Database, Brush, Settings } from 'lucide-react';

// Level-based styles
const levelStyles = {
    Advanced: {
        badge: 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-300 border-yellow-400/40',
        bar: 'from-yellow-400 to-yellow-500',
        glow: 'shadow-[0_0_12px_-2px_rgba(250,204,21,0.55)]',
    },
    Intermediate: {
        badge: 'bg-gradient-to-r from-sky-400/15 to-sky-500/15 text-sky-300 border-sky-400/40',
        bar: 'from-sky-400 to-sky-500',
        glow: 'shadow-[0_0_10px_-2px_rgba(56,189,248,0.45)]',
    },
    Beginner: {
        badge: 'bg-gradient-to-r from-slate-500/15 to-slate-400/15 text-slate-300 border-slate-400/40',
        bar: 'from-slate-500 to-slate-400',
        glow: '',
    },
};

const categoryIcons = {
    'Front-End': <Brush className="h-5 w-5" />,
    'Back-End': <Database className="h-5 w-5" />,
    'Programming Languages': <Code className="h-5 w-5" />,
    'Tools & Platforms': <Settings className="h-5 w-5" />,
};

// Motion variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] } },
};

const skillItemVariants = {
    hidden: { opacity: 0, x: -18 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

// Skill Item
const SkillItem = ({ skill }) => {
    const styles = levelStyles[skill.level] || levelStyles.Beginner;
    return (
        <motion.li
            variants={skillItemVariants}
            className="group mb-5 rounded-lg px-2 py-1.5 transition-all duration-300 hover:bg-white/5 hover:shadow-[0_2px_12px_-2px_rgba(255,255,255,0.06)] hover:-translate-y-0.5"
        >
            <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm md:text-[15px] text-slate-200">{skill.name}</p>
                <Badge
                        variant="outline"
                        className={`text-[10px] md:text-xs font-semibold tracking-wide backdrop-blur-sm border ${styles.badge} rounded-md px-2 py-0.5`}
                        aria-label={`${skill.level} level`}
                >
                    {skill.level}
                </Badge>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-600/25 overflow-hidden">
                <motion.div
                    className={`h-full bg-gradient-to-r ${styles.bar} rounded-full ${styles.glow}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.progress }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
                />
            </div>
        </motion.li>
    );
};

// Category Card
const SkillCategoryCard = ({ categoryData }) => (
    <motion.div variants={cardVariants} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
        <Card className="group h-full border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl shadow-lg shadow-black/30 hover:shadow-[0_10px_32px_-4px_rgba(0,0,0,0.55)] transition-all duration-500 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_30%_20%,rgba(255,195,0,0.12),transparent_60%)]" />
            <CardHeader className="relative z-10">
                <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-3">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-400/5 border border-yellow-400/30 text-yellow-300 shadow-[0_0_14px_-2px_rgba(255,195,0,0.3)]">
                        {categoryIcons[categoryData.category] || <Code className="h-5 w-5" />}
                    </span>
                    <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
                        {categoryData.category}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    aria-label={`${categoryData.category} skills`}
                >
                    {categoryData.skills.map(skill => (
                        <SkillItem key={skill.name} skill={skill} />
                    ))}
                </motion.ul>
            </CardContent>
        </Card>
    </motion.div>
);

// Main Component
const Skills = () => (
    <section
        id="skills"
        className="w-full py-24 md:py-32 bg-[#0f172a] relative overflow-hidden"
        aria-labelledby="skills-heading"
    >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,0.12),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(255,195,0,0.08),transparent_65%)]" />
        <div className="container relative mx-auto px-5 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
                className="flex flex-col items-center text-center mb-14 md:mb-20"
            >
                <h2
                    id="skills-heading"
                    className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 via-yellow-400 to-sky-400 bg-clip-text text-transparent drop-shadow-lg"
                >
                    Technical Skills
                </h2>
                <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-300/90">
                    Technologies and tools I use to craft modern, performant, and scalable digital experiences.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid gap-8 sm:gap-10 md:grid-cols-2 xl:grid-cols-3"
            >
                {skillsData.map(category => (
                    <SkillCategoryCard key={category.category} categoryData={category} />
                ))}
            </motion.div>
        </div>
    </section>
);

export default Skills;
