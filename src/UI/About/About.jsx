import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import { FaCode, FaDatabase, FaWrench, FaTerminal } from "react-icons/fa";

// Smooth Counting Hook Component
const Counter = ({ value, duration = 1.2 }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let start = 0;
    if (target === 0) return;
    
    const stepTime = Math.max(Math.floor((duration * 1000) / target), 15);
    const timer = setInterval(() => {
      start += Math.ceil(target / 60); // Increment proportionally to hit timeline
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const skillGroups = [
    {
      title: "Frontend Craft",
      icon: <FaCode className="text-sky-400" />,
      skills: ["React.js", "JavaScript", "HTML5 & CSS3", "Tailwind CSS v4", "Vite"]
    },
    {
      title: "Backend & Systems",
      icon: <FaDatabase className="text-emerald-400" />,
      skills: ["Firebase Firestore", "Firebase Authentication", "Cloudinary SDK", "REST APIs"]
    },
    {
      title: "Environment & Tools",
      icon: <FaWrench className="text-amber-400" />,
      skills: ["Git & GitHub", "Vercel Deployment", "NPM & Node.js", "Chrome DevTools"]
    }
  ];

  return (
    <section className="relative min-h-screen pt-12 pb-24 overflow-hidden">
      {/* Glow background markers */}
      <div className="absolute top-1/3 left-[-10%] w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500">Me</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 font-light"
          >
            Crafting elegant solutions to complex digital challenges.
          </motion.p>
        </div>

        {/* ================= INTRO GRID ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: INTERACTIVE CODE MOCKUP */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center lg:justify-start w-full"
          >
            <div className="w-full max-w-xl rounded-2xl overflow-hidden glass-panel border border-black/15 dark:border-white/10 shadow-2xl font-mono text-xs md:text-sm">
              {/* Window Header */}
              <div className="bg-slate-800/90 dark:bg-black/40 px-4 py-3 flex items-center justify-between border-b border-black/20 dark:border-white/5">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm shadow-rose-500/10"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm shadow-amber-500/10"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/10"></span>
                </div>
                <div className="text-[11px] text-gray-400 font-sans flex items-center gap-1.5">
                  <FaTerminal size={12} className="text-gray-400" />
                  <span>jerry_profile.json</span>
                </div>
                <div className="w-12"></div>
              </div>

              {/* Code window area */}
              <div className="p-6 bg-slate-900/90 dark:bg-black/40 space-y-3 overflow-x-auto text-gray-300">
                <p className="text-gray-500">// Personal developer config</p>
                <div className="space-y-1">
                  <p><span className="text-emerald-400">const</span> developer = <span className="text-purple-400">{"{"}</span></p>
                  <p className="pl-4">name: <span className="text-teal-300">"Jerry"</span>,</p>
                  <p className="pl-4">role: <span className="text-teal-300">"Frontend Architect"</span>,</p>
                  <p className="pl-4">experience: <span className="text-amber-400">"2+ Years"</span>,</p>
                  <p className="pl-4">focus: <span className="text-teal-300">"Clean UI, Scaling SaaS products"</span>,</p>
                  <p className="pl-4">
                    stack: <span className="text-purple-300">[</span>
                    <span className="text-teal-300">"React"</span>, <span className="text-teal-300">"Tailwind"</span>, <span className="text-teal-300">"Firebase"</span>
                    <span className="text-purple-300">]</span>,
                  </p>
                  <p className="pl-4">motivation: <span className="text-teal-300">"Building real-world usability"</span>,</p>
                  <p className="pl-4">status: <span className="text-teal-300">"Building interactive design systems"</span></p>
                  <p><span className="text-purple-400">{"}"}</span>;</p>
                </div>
                <p className="pt-2 text-gray-500">// Output stats log</p>
                <p className="text-purple-400">console<span className="text-gray-300">.</span><span className="text-blue-400">log</span><span className="text-gray-300">(</span><span className="text-gray-400">"Ready to create."</span><span className="text-gray-300">)</span>;</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: DETAIL STATS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 text-left"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Designing interfaces that feel like magic.
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              I’m Jerry, a frontend developer and UI/UX focused engineer. I specialize in turning complex product flows into fluid, easy-to-use, and pixel-perfect applications. My toolbox revolves around React, Firebase database architecture, and cutting edge CSS styling patterns.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              My engineering philosophy revolves around accessibility, visual delight, and clean code optimization. I believe the best applications are those that bridge beautiful layout interactions with high-fidelity performance.
            </motion.p>

            {/* Premium Stat Counter Dashboard Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {[
                { count: "10+", label: "Projects Built" },
                { count: "8+", label: "Technologies" },
                { count: "4+", label: "Years Exp" },
                { count: "500+", label: "GitHub Commits" }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl glass-panel border border-black/5 dark:border-white/5 text-center">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                    <Counter value={stat.count} />
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* ================= SKILLS GRID ================= */}
        <div className="py-24 border-t border-black/5 dark:border-white/5 mt-20">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Stack Directory</h2>
            <p className="text-gray-600 dark:text-gray-400 font-light">Categorized languages, frameworks, and developer workflows I use daily.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl glass-panel border border-black/5 dark:border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
                    {group.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{group.title}</h3>
                </div>
                <ul className="space-y-3">
                  {group.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= WHAT I FOCUS ON ================= */}
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-2xl glass-panel border border-black/5 dark:border-white/10 shadow-xl space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What I Focus On</h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              <p>
                I build real-world web applications that are highly functional, scalable, and responsive. From dashboard consoles and data trackers to simple business sites, my goal is to create products that solve specific problems and make workflows easier.
              </p>
              <p>
                I am currently scaling my full-stack capabilities, digging deeper into Node.js backend infrastructure, advanced PostgreSQL/SQL architectures, and Cloud database structures while continuing to sharpen my frontend craft.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ================= CTA WIDGET ================= */}
        <div className="pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl glass-panel border border-black/5 dark:border-white/10 text-center relative overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 pointer-events-none" />
            <div className="max-w-xl mx-auto space-y-6 relative z-10">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Let’s Build Something Great
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                I'm open to freelance work, full-time opportunities, and design collaboration projects. Let's make something impactful together.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <a href="/projects" className="no-underline">
                  <Button variant="primary" className="px-8 py-3.5 shadow-lg shadow-emerald-500/20">
                    View My Work
                  </Button>
                </a>
                <a href="/contact" className="no-underline">
                  <Button variant="secondary" className="px-8 py-3.5">
                    Contact Me
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default About;