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

const ACCENT = "#FFC300";

const Navbar = () => {
    const [active, setActive] = useState("hero");
    const [scrolled, setScrolled] = useState(false);
    const [hovered, setHovered] = useState(null);
    const observersRef = useRef([]);

    // Scroll listener (background transition)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Smooth scroll
    const handleNavClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Active section observer
    useEffect(() => {
        const options = { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 };
        const callback = (entries) => {
            entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
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
        hidden: { y: -40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
    };

    const linkBase =
        "relative px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
    const inactiveLink = "text-slate-300 hover:text-white";
    const activeLink = "text-white";

    return (
        <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            role="navigation"
            aria-label="Primary"
            className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-500 ${
                scrolled
                    ? "bg-slate-900/80 backdrop-blur-md border-slate-800 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.6)]"
                    : "bg-transparent backdrop-blur-0 border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex h-16 items-center justify-between gap-6">
                    {/* Branding */}
                        <a
                            href="#hero"
                            onClick={(e) => handleNavClick(e, "#hero")}
                            aria-label="Go to Hero section"
                            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] rounded-full"
                            style={{ ["--accent"]: ACCENT }}
                        >
                            <div className="relative">
                                <Avatar className="h-10 w-10 ring-2 ring-slate-700 group-hover:ring-[--accent] transition-colors duration-300">
                                    <AvatarImage src="/logo.png" alt="Logo" />
                                    <AvatarFallback className="bg-slate-800 text-[--accent] font-semibold">
                                        DZ
                                    </AvatarFallback>
                                </Avatar>
                                <motion.span
                                    layout
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 rounded-full"
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                                />
                            </div>
                            <span className="font-semibold text-lg tracking-tight text-white">
                                Dev<span style={{ color: ACCENT }}>Zakaria</span>
                            </span>
                        </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Section links">
                        {navLinks.map((link) => {
                            const isActive = active === link.id;
                            return (
                                <motion.div
                                    key={link.id}
                                    className="relative"
                                    onMouseEnter={() => setHovered(link.id)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    <a
                                        href={link.href}
                                        aria-current={isActive ? "page" : undefined}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`${linkBase} ${
                                            isActive ? activeLink : inactiveLink
                                        } focus-visible:ring-[${ACCENT}] focus-visible:ring-offset-0`}
                                        style={{
                                            WebkitTapHighlightColor: "transparent",
                                        }}
                                    >
                                        <span className="relative z-10">{link.name}</span>

                                        {/* Active / Hover background */}
                                        <AnimatePresence>
                                            {(hovered === link.id || isActive) && (
                                                <motion.span
                                                    layoutId="nav-highlight"
                                                    className="absolute inset-0 rounded-md bg-slate-800/65 border border-slate-700/70 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_14px_-2px_rgba(0,0,0,0.55)]"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    transition={{ duration: 0.18 }}
                                                />
                                            )}
                                        </AnimatePresence>

                                        {/* Accent underline (hover or active) */}
                                        <AnimatePresence>
                                            {(hovered === link.id || isActive) && (
                                                <motion.span
                                                    layoutId="nav-underline"
                                                    className="absolute left-3 right-3 -bottom-[2px] h-[2px] rounded bg-[--accent]"
                                                    style={{ ["--accent"]: ACCENT }}
                                                    initial={{ opacity: 0, scaleX: 0 }}
                                                    animate={{ opacity: 1, scaleX: 1 }}
                                                    exit={{ opacity: 0, scaleX: 0 }}
                                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </a>
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* Social (desktop) */}
                    <div className="hidden md:flex items-center gap-2" aria-label="Social media">
                        {socialLinks.map((s) => {
                            const Icon = iconMap[s.id.split("/")[0]] || Github;
                            return (
                                <motion.a
                                    key={s.id}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    whileHover={{ y: -3, scale: 1.12 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative p-2 rounded-md text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--accent]"
                                    style={{ ["--accent"]: ACCENT }}
                                >
                                    <Icon className="h-5 w-5 transition-colors" />
                                    <motion.span
                                        aria-hidden="true"
                                        className="absolute inset-0 rounded-md bg-slate-800/50 opacity-0 group-hover:opacity-100 border border-slate-700/60"
                                        initial={false}
                                        transition={{ duration: 0.22 }}
                                    />
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Open menu"
                                    className="text-white hover:text-[--accent] transition-colors"
                                    style={{ ["--accent"]: ACCENT }}
                                >
                                    <Menu size={24} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="flex flex-col gap-6 bg-slate-950/85 backdrop-blur-xl border-l border-slate-800 px-6 py-8 text-slate-200"
                                aria-label="Mobile menu"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 ring-2 ring-slate-700">
                                            <AvatarImage src="/logo.png" alt="Logo" />
                                            <AvatarFallback className="bg-slate-800 text-[--accent] font-semibold">
                                                DZ
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold text-base">
                                            Dev<span style={{ color: ACCENT }}>Zakaria</span>
                                        </span>
                                    </div>
                                    <SheetClose asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Close menu"
                                            className="text-slate-300 hover:text-white"
                                        >
                                            <X size={22} />
                                        </Button>
                                    </SheetClose>
                                </div>

                                <nav className="flex flex-col gap-2 mt-2" aria-label="Mobile section links">
                                    {navLinks.map((link) => {
                                        const isActive = active === link.id;
                                        return (
                                            <SheetClose asChild key={link.id}>
                                                <a
                                                    href={link.href}
                                                    aria-current={isActive ? "page" : undefined}
                                                    onClick={(e) => handleNavClick(e, link.href)}
                                                    className={`relative block px-4 py-3 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[${ACCENT}] ${
                                                        isActive
                                                            ? "bg-slate-800 text-white"
                                                            : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                                                    }`}
                                                >
                                                    <span className="relative z-10">{link.name}</span>
                                                    <AnimatePresence>
                                                        {isActive && (
                                                            <motion.span
                                                                layoutId="mobile-active"
                                                                className="absolute inset-0 rounded-lg border border-slate-700/70"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </a>
                                            </SheetClose>
                                        );
                                    })}
                                </nav>

                                <div className="mt-auto pt-6 border-t border-slate-800">
                                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                                        Connect
                                    </p>
                                    <div className="flex gap-4" aria-label="Social links">
                                        {socialLinks.map((s) => {
                                            const Icon = iconMap[s.id.split("/")[0]] || Github;
                                            return (
                                                <motion.a
                                                    key={s.id}
                                                    href={s.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={s.label}
                                                    whileHover={{ scale: 1.15 }}
                                                    whileTap={{ scale: 0.92 }}
                                                    className="relative p-3 rounded-lg bg-slate-800/60 hover:bg-slate-700/70 text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--accent]"
                                                    style={{ ["--accent"]: ACCENT }}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </motion.a>
                                            );
                                        })}
                                    </div>
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