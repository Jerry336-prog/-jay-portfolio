import React from "react";
import { motion } from "framer-motion";
import TextType from "../Text_animation.jsx";
import { FaGithub, FaTwitter, FaLinkedin, FaBriefcase, FaCode, FaLightbulb } from "react-icons/fa";
import Button from "../Components/Button";

const Home = () => {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const techStack = [
    { name: "React", color: "from-sky-400 to-blue-500" },
    { name: "Firebase", color: "from-amber-400 to-orange-500" },
    { name: "JavaScript", color: "from-yellow-400 to-amber-500" },
    { name: "Tailwind CSS", color: "from-teal-400 to-emerald-500" },
    { name: "HTML5/CSS3", color: "from-orange-400 to-rose-500" },
  ];

  return (
    <section className="relative min-h-screen pt-12 pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-teal-600/10 dark:bg-teal-600/5 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ================= HERO ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[80vh] py-12">
          
          {/* LEFT CONTENT */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-black/5 dark:border-white/10 shadow-sm text-xs font-semibold tracking-wide uppercase text-gray-700 dark:text-gray-300">
              <span className="pulse-dot" />
              <span>Available for Freelance & Contract</span>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1 
                variants={itemVariants} 
                className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white"
              >
                Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500">Jerry</span>
              </motion.h1>
              
              <motion.h2 
                variants={itemVariants} 
                className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300"
              >
                <TextType
                  text={[
                    "Frontend Developer",
                    "React Specialist",
                    "UI/UX Focused",
                  ]}
                  typingSpeed={70}
                  pauseDuration={2000}
                  showCursor={true}
                  cursorCharacter="|"
                  className="font-semibold text-emerald-500 dark:text-emerald-400"
                />
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p 
              variants={itemVariants} 
              className="max-w-xl text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-light"
            >
              I build clean, scalable and user-friendly web applications, combining cutting-edge engineering with thoughtful visual aesthetics.
            </motion.p>

            {/* Resume CTA */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <a href="/resume.pdf" download className="no-underline">
                <Button variant="primary" className="px-8 py-3.5 shadow-lg shadow-emerald-500/20">
                  Download Resume
                </Button>
              </a>
              <a href="/projects" className="no-underline">
                <Button variant="secondary" className="px-8 py-3.5">
                  Explore Projects
                </Button>
              </a>
            </motion.div>

            {/* Tech Chips */}
            <motion.div variants={itemVariants} className="space-y-3 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Current Focus Stack</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span 
                    key={tech.name}
                    className="text-xs px-3.5 py-1.5 rounded-full glass-panel border border-black/5 dark:border-white/5 font-medium text-gray-700 dark:text-gray-300 shadow-sm"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4 border-t border-black/5 dark:border-white/5 max-w-sm">
              {[
                { href: "https://github.com/Jerry336-prog", icon: <FaGithub size={20} />, label: "GitHub" },
                { href: "https://x.com/jerrydev5803701", icon: <FaTwitter size={20} />, label: "Twitter" },
                { href: "https://www.linkedin.com/in/chinedu-jeremiah-22a10428b", icon: <FaLinkedin size={20} />, label: "LinkedIn" }
              ].map((social) => (
                <motion.a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full glass-panel border border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/30 shadow-sm transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

          </motion.div>

          {/* RIGHT PICTURE FRAME */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Animated hover gradient glow backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-35 transition duration-1000 group-hover:duration-200" />
              
              {/* Picture Card Wrapper */}
              <div className="relative w-[280px] h-[340px] md:w-[350px] md:h-[420px] rounded-2xl overflow-hidden glass-panel border border-black/10 dark:border-white/10 shadow-2xl p-2.5">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src="/portfolio.JPG"
                    alt="Jerry"
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ================= WHAT I DO ================= */}
        <div className="py-24 border-t border-black/5 dark:border-white/5">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Services & Expertise</h2>
            <p className="text-gray-600 dark:text-gray-400 font-light">How I bring designs to life and help build successful online products.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Development",
                desc: "Building responsive, blazing fast, and pixel-perfect web apps using React, Tailwind CSS v4, and modern standards.",
                icon: <FaCode className="w-6 h-6 text-emerald-500" />
              },
              {
                title: "UI/UX Architecture",
                desc: "Designing highly polished interfaces with micro-interactions, responsive grids, dark modes, and flawless spacing.",
                icon: <FaLightbulb className="w-6 h-6 text-emerald-500" />
              },
              {
                title: "Real-world SaaS",
                desc: "Creating business-ready integrations like Cloudinary image management, Firestore database nodes, and safe auth portals.",
                icon: <FaBriefcase className="w-6 h-6 text-emerald-500" />
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-2xl glass-panel border border-black/5 dark:border-white/15 hover-glow shadow-md flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= CONNECT CTA ================= */}
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl glass-panel border border-black/5 dark:border-white/10 text-center relative overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 pointer-events-none" />
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Interested in working together?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-light text-base md:text-lg">
                Let's construct something beautiful, functional, and performant. Explore my projects or send a message.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <a href="/contact" className="no-underline">
                  <Button variant="primary" className="px-8 py-3.5 shadow-lg shadow-emerald-500/20">
                    Get In Touch
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Home;