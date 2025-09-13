import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import emailjs from "@emailjs/browser";
import { contactInfo, socialLinks as socialData } from "@/lib/data";

// EmailJS env vars
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const inputVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.5, type: "spring" },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const formVariant = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const socialVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4 },
  }),
};

const infoBlocks = [
  { icon: Mail, label: "Email", value: contactInfo.email },
  { icon: MapPin, label: "Location", value: contactInfo.location },
  { icon: Phone, label: "Response Time", value: contactInfo.responseTime },
];

const socialLinks = socialData.map((s) => ({
  icon: s.label.includes("LinkedIn") ? Linkedin : s.label.includes("GitHub") ? Github : Twitter,
  href: s.href,
  label: s.label,
  color: s.label.includes("LinkedIn") ? "hover:text-sky-400" : s.label.includes("GitHub") ? "hover:text-gray-200" : "hover:text-blue-400",
  glow: "hover:shadow-[0_0_16px_2px_rgba(59,130,246,0.4)]",
}));

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      );
      setLoading(false);
      setAlert({ type: "success", msg: "Message sent successfully! 🎉" });
      setFormData({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS send error:", err);
      setLoading(false);
      setAlert({
        type: "error",
        msg: "Failed to send message. Please try again.",
      });
    }
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 w-full bg-background overflow-hidden"
      aria-label="Contact Section"
    >
      {/* Subtle grid/particle overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <svg
          className="w-full h-full opacity-10"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#fff"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Subtle animated particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-500 via-green-400 to-pink-400 opacity-30 blur-lg"
              style={{
                width: 18 + Math.random() * 24,
                height: 18 + Math.random() * 24,
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
              }}
              animate={{
                y: [0, Math.random() * 40 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration: 7 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
            Let's <span className="text-foreground">Connect</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info & Social */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Availability Card */}
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 32px 0 rgba(59,130,246,0.25)",
              }}
              className="relative"
            >
              <Card
                className="overflow-hidden border border-accent/40 bg-background/70 shadow-lg rounded-2xl"
                style={{
                  fontFamily: "Inter, Poppins, sans-serif",
                }}
                aria-label="Available for Work"
              >
                {/* Animated Gradient Border */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    zIndex: 0,
                    boxShadow: "0 0 32px 4px rgba(59,130,246,0.25)",
                    animation: "pulseGlow 2.5s infinite alternate",
                  }}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-yellow-600 text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                    Available for Work
                  </CardTitle>
                  <CardDescription className="text-foreground/80 text-lg sm:text-xl font-medium mb-2">
                    I'm currently available for freelance projects and full-time opportunities. <span className="text-foreground font-semibold">Let's discuss how we can bring your ideas to life!</span>
                  </CardDescription>
                  <div className="inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-md animate-pulse items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-yellow-600 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span aria-label="Open to opportunities">{contactInfo.availabilityTag}</span>
                  </div>
                </CardHeader>
              </Card>
              {/* Glow animation */}
              <style>
                {`
                  @keyframes pulseGlow {
                    0% { box-shadow: 0 0 32px 4px rgba(59,130,246,0.25); }
                    100% { box-shadow: 0 0 48px 8px rgba(236,72,153,0.35); }
                  }
                `}
              </style>
            </motion.div>

            {/* Contact Info Blocks */}
            <div className="space-y-6">
              {infoBlocks.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="p-3 bg-background/60 border border-accent/40 rounded-xl shadow-sm">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/60">{item.label}</p>
                    <p className="text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
      <h4 className="text-lg font-semibold text-primary mb-6">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background/60 border border-accent/40 rounded-xl text-foreground/60 transition-all duration-300 hover:text-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    whileHover={{ scale: 1.13, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    variants={socialVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    aria-label={label}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            variants={formVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
      <Card className="bg-background/70 border border-accent/40 rounded-2xl shadow-xl">
              <CardHeader>
        <CardTitle className="text-primary text-2xl">
                  Send a Message
                </CardTitle>
        <CardDescription className="text-foreground/80">
                  Fill out the form below and I'll get back to you soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  aria-label="Contact Form"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      custom={0}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={inputVariant}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="text-foreground/80">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="from_name"
                        type="text"
                        required
                        value={formData.from_name}
                        onChange={handleChange}
                        className="bg-background/60 border-accent/40 focus:border-primary text-foreground rounded-lg"
                        placeholder="Your full name"
                        aria-label="Your full name"
                      />
                    </motion.div>
                    <motion.div
                      custom={1}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={inputVariant}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="text-foreground/80">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="from_email"
                        type="email"
                        required
                        value={formData.from_email}
                        onChange={handleChange}
                        className="bg-background/60 border-accent/40 focus:border-primary text-foreground rounded-lg"
                        placeholder="your.email@example.com"
                        aria-label="Your email address"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={inputVariant}
                    className="space-y-2"
                  >
                    <Label htmlFor="subject" className="text-foreground/80">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-background/60 border-accent/40 focus:border-primary text-foreground rounded-lg"
                      placeholder="What's this about?"
                      aria-label="Subject"
                    />
                  </motion.div>
                  <motion.div
                    custom={3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={inputVariant}
                    className="space-y-2"
                  >
                    <Label htmlFor="message" className="text-foreground/80">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="bg-background/60 border-accent/40 focus:border-primary text-foreground resize-none rounded-lg"
                      placeholder="Tell me about your project or idea..."
                      aria-label="Your message"
                    />
                  </motion.div>
                  <motion.div
                    custom={4}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={inputVariant}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full relative bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Send Message"
                    >
                      {loading ? (
                        <span className="animate-spin mr-2">
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                          <Sparkles className="h-4 w-4 ml-2 text-pink-200 animate-pulse" />
                        </span>
                      )}
                    </Button>
                    {/* Sparkle effect on hover */}
                    <style>
                      {`
                        /* Removed gradient glow; kept minimal focus ring via Tailwind classes */
                      `}
                    </style>
                  </motion.div>
                  {/* Alerts */}
                  <AnimatePresence>
                    {alert && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className={`mt-2 rounded-lg px-4 py-3 text-sm font-medium ${
                          alert.type === "success"
                            ? "bg-green-600/80 text-white"
                            : "bg-red-600/80 text-white"
                        }`}
                        role="alert"
                        aria-live="polite"
                      >
                        {alert.msg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
