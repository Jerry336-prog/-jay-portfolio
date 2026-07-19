import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCertificate, FaTimes, FaSearchPlus } from "react-icons/fa";

function Certificate() {
  const [selectedCert, setSelectedCert] = useState(null);

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

  // Replace 'image' properties with actual paths once you upload your certificate images to the public folder
  const certificates = [
    {
      title: "Advanced React",
      issuer: "Meta / Coursera",
      date: "2019",
      description: "Advanced concepts of React including performance optimization, component architecture, and modern state management.",
      image: "https://placehold.co/800x600/10b981/ffffff?text=Advanced+React+Certificate"
    },
    {
      title: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta / Coursera",
      date: "2018",
      description: "Comprehensive training in responsive web design, UI/UX principles, and modern frontend development workflows.",
      image: "https://placehold.co/800x600/10b981/ffffff?text=Meta+Front-End+Certificate"
    },
    {
      title: "Front End Development Libraries",
      issuer: "freeCodeCamp",
      date: "2018",
      description: "Hands-on projects and proficiency in using popular frontend libraries like React, Redux, and Bootstrap.",
      image: "https://placehold.co/800x600/10b981/ffffff?text=freeCodeCamp+Certificate"
    },
    {
      title: "Software Engineering",
      issuer: "Bitxbase Academy",
      date: "2019",
      description: "Foundational software engineering principles, algorithms, data structures, and robust system design.",
      image: "https://placehold.co/800x600/10b981/ffffff?text=Software+Engineering+Certificate"
    }
  ];

  return (
    <section className="relative min-h-screen pt-12 pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500">Certificates</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 font-light"
          >
            A track record of continuous learning and professional development.
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => setSelectedCert(cert)}
              className="p-8 rounded-2xl glass-panel border border-black/5 dark:border-white/10 shadow-lg flex flex-col h-full hover-glow cursor-pointer group relative overflow-hidden"
            >
              {/* Overlay hover effect to indicate it's clickable */}
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-300 flex items-center justify-center">
                <FaSearchPlus className="opacity-0 group-hover:opacity-100 text-emerald-500 text-4xl transform scale-50 group-hover:scale-100 transition-all duration-300 absolute right-8 top-8" />
              </div>

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500">
                  <FaCertificate size={24} />
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-300">
                  {cert.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">{cert.title}</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-4 relative z-10">{cert.issuer}</p>
              <p className="text-gray-600 dark:text-gray-400 font-light text-sm mt-auto leading-relaxed relative z-10">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-full glass-panel border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-white dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedCert.title}</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">{selectedCert.issuer} • {selectedCert.date}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>
              
              {/* Modal Body / Image */}
              <div className="relative flex-1 overflow-auto bg-black/5 dark:bg-black/40 flex items-center justify-center p-6 md:p-10 min-h-[40vh] md:min-h-[60vh]">
                <img 
                  src={selectedCert.image} 
                  alt={`${selectedCert.title} Certificate`}
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Certificate;
