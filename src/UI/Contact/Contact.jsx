import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { GrLinkedin } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import Button from "../Components/Button";
import Toast from "../Components/Toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !validateEmail(email) || !message.trim()) {
      setStatus("error");
      setToastMessage("Please fill in all required fields with a valid email.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    setStatus("success");
    setToastMessage("Thanks! Your message has been sent successfully.");
    setToastType("success");
    setShowToast(true);

    setName("");
    setEmail("");
    setProjectName("");
    setMessage("");

    setTimeout(() => {
      setStatus(null);
    }, 3500);
  }

  const contacts = [
    {
      label: "Email",
      value: "chinedujeremiah723@gmail.com",
      href: "mailto:chinedujeremiah723@gmail.com",
      icon: <CiMail size={22} className="text-emerald-500" />,
    },
    {
      label: "GitHub",
      value: "@Jerry336-prog",
      href: "https://github.com/Jerry336-prog",
      icon: <FaGithub size={22} className="text-emerald-500" />,
    },
    {
      label: "LinkedIn",
      value: "in/chinedu-jeremiah",
      href: "https://www.linkedin.com/in/chinedu-jeremiah-22a10428b",
      icon: <GrLinkedin size={22} className="text-emerald-500" />,
    },
    {
      label: "Twitter",
      value: "@Jerry.dev",
      href: "https://x.com/jerrydev5803701",
      icon: <FaSquareXTwitter size={22} className="text-emerald-500" />,
    },
  ];

  return (
    <section className="relative min-h-screen pt-12 pb-24 overflow-hidden">
      {/* Background radial flares */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ================= HEADER ================= */}
        <header className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            Let’s Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500">Together</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 font-light"
          >
            Have a project in mind or want to collaborate? Fill out the form or reach out directly.
          </motion.p>
        </header>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid gap-12 lg:grid-cols-12 max-w-6xl mx-auto items-start">
          
          {/* LEFT SIDE: CONTACT DETAILS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl p-8 glass-panel border border-black/10 dark:border-white/10 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Direct Channels
              </h2>

              <div className="space-y-4">
                {contacts.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="flex items-center gap-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 p-4 transition-all duration-300 hover:border-emerald-500/30"
                  >
                    {/* Icon frame */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-gray-800 dark:text-gray-200">
                      {item.icon}
                    </div>

                    {/* Meta text */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Widget */}
            <div className="rounded-2xl p-6 glass-panel border border-black/10 dark:border-white/10 shadow-md flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20">
                <span className="pulse-dot" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Availability & Location
                </h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  Open for freelance contracts, full-time positions, and remote work. Based globally, working on GMT+1.
                </p>
              </div>
            </div>

            {/* Response Time Widget */}
            <div className="rounded-2xl p-6 glass-panel border border-black/10 dark:border-white/10 shadow-md">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Expected Reply Time
              </h3>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                I typically review all incoming developer inquiries and respond within <span className="text-emerald-500 font-semibold">24 hours</span>.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: GLASS FORM */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 glass-panel border border-black/10 dark:border-white/10 shadow-lg space-y-6"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Send a Message
              </h2>

              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  placeholder="e.g. John Doe"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  placeholder="you@example.com"
                />
              </div>

              {/* Project Name */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Project / Topic Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  placeholder="e.g. E-Commerce Redesign"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Project Description / Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                  placeholder="Describe your project requirements, scope, or questions..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3.5 shadow-lg shadow-emerald-500/20"
              >
                Send Message
              </Button>

              {/* Inline alerts for accessibility */}
              {status === "success" && (
                <p className="text-center text-xs font-medium text-emerald-500 bg-emerald-500/10 py-2.5 rounded-lg border border-emerald-500/20">
                  Your message was sent successfully!
                </p>
              )}

              {status === "error" && (
                <p className="text-center text-xs font-medium text-rose-500 bg-rose-500/10 py-2.5 rounded-lg border border-rose-500/20">
                  Please check form inputs and try again.
                </p>
              )}
            </motion.form>
          </div>
        </div>

        {/* Global Toast Alert */}
        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </section>
  );
}
