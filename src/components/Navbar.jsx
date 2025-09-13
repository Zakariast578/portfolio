import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { navLinks, socialLinks } from "@/lib/data";

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
};

const Navbar = () => {
    const [active, setActive] = useState("hero");
    const [scrolled, setScrolled] = useState(false);
    const [hovered, setHovered] = useState(null);
    const observersRef = useRef([]);

    // Scroll listener for bg transition
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Smooth scroll handler
    const handleNavClick = (e, id) => {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // IntersectionObserver to highlight active section
    useEffect(() => {
        const options = { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 };
        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        };
        const io = new IntersectionObserver(callback, options);
        navLinks.forEach((l) => {
            const node = document.getElementById(l.id);
            if (node) io.observe(node);
        });
        observersRef.current.push(io);
        return () => io.disconnect();
    }, []);

    const headerVariants = {
        hidden: { y: -60, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-colors duration-300 border-b ${
                scrolled ? "bg-slate-900/85 border-slate-800 shadow-lg" : "bg-transparent border-transparent"
            }`}
            role="navigation"
            aria-label="Primary"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex h-16 items-center justify-between gap-6">
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        aria-label="Go to Hero section"
                    >
                        <span className="font-semibold text-lg tracking-tight text-white">
                            Dev<span className="text-yellow-400 font-bold">Zakaria</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                                        <nav className="hidden md:flex items-center gap-1" aria-label="Section links">
                                            {navLinks.map((link) => (
                                                <motion.div
                                                    key={link.id}
                                                    className="relative"
                                                    onMouseEnter={() => setHovered(link.id)}
                                                    onMouseLeave={() => setHovered(null)}
                                                >
                                                    <a
                                                        href={link.href}
                                                        onClick={(e) => handleNavClick(e, link.href)}
                                                        className={`px-4 py-2 rounded-md font-medium text-sm relative z-10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                                                            active === link.id || active === "hero" ? 'text-white' : 'text-slate-300 hover:text-white'
                                                        }`}
                                                        aria-current={active == link.id ? 'page' : undefined}
                                                    >
                                                        {link.name}
                                                    </a>
                                                    <AnimatePresence>
                                                        {(hovered === link.id || active === link.id) && (
                                                            <motion.span
                                                                layoutId="nav-hover-bg"
                                                                className="absolute inset-0 rounded-md bg-slate-800/70 backdrop-blur-sm border border-slate-700"
                                                                initial={{ opacity: 0, scale: 0.92 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.92 }}
                                                                transition={{ duration: 0.18 }}
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            ))}
                                        </nav>

                                        {/* Social Links (desktop) */}
                    <div className="hidden md:flex items-center gap-3" aria-label="Social media">
                        {socialLinks.map((s) => {
                            const Icon = iconMap[s.id.split('/')[0]] || Github; // fallback
                            return (
                                <motion.a
                                    key={s.id}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    whileHover={{ y: -3, scale: 1.12 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-2 rounded-md text-slate-300 hover:bg-slate-800/60 transition-colors ${s.color}`}
                                >
                                    <Icon className="h-5 w-5" />
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white">
                                    <Menu size={24} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 px-6 py-8 text-slate-200">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-base">Dev<span className="text-yellow-400">Zakaria</span></span>
                                    </div>
                                    <SheetClose asChild>
                                        <Button variant="ghost" size="icon" aria-label="Close menu" className="text-slate-300">
                                            <X size={22} />
                                        </Button>
                                    </SheetClose>
                                </div>
                                <nav className="flex flex-col gap-2 mb-8" aria-label="Mobile section links">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.id}>
                                            <a
                                                href={link.href}
                                                onClick={(e) => handleNavClick(e, link.href)}
                                                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                                                    active === link.id ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                                                }`}
                                                aria-current={active === link.id ? 'page' : undefined}
                                            >
                                                {link.name}
                                            </a>
                                        </SheetClose>
                                    ))}
                                </nav>
                                <div className="flex gap-4" aria-label="Social links">
                                    {socialLinks.map((s) => {
                                        const Icon = iconMap[s.id.split('/')[0]] || Github;
                                        return (
                                            <motion.a
                                                key={s.id}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={s.label}
                                                whileHover={{ scale: 1.15 }}
                                                className="p-3 rounded-lg bg-slate-800/60 hover:bg-slate-700/70 text-slate-200"
                                            >
                                                <Icon className="h-5 w-5" />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Navbar;