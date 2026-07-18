import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiShare1 } from "react-icons/ci";
import { FaSearch, FaRegFolderOpen } from "react-icons/fa";
import { db } from "../../utilis/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { CardSkeleton } from "../Components/Skeleton";
import Button from "../Components/Button";

function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filterTabs = ["All", "Featured", "React", "Firebase", "Tailwind"];

  // Filter and search logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeFilter === "All" ||
      (activeFilter === "Featured" && project.featured) ||
      project.stack.some(
        (tech) => tech.toLowerCase().trim() === activeFilter.toLowerCase().trim()
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative min-h-screen pt-12 pb-24 overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 font-light"
          >
            A curated showcase of engineering builds, focusing on performance, usability, and UI layouts.
          </motion.p>
        </div>

        {/* ================= CONTROLS ================= */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search box */}
          <div className="relative w-full md:max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
              <FaSearch size={14} />
            </span>
            <input
              type="text"
              placeholder="Search by title, stack, or desc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full glass-panel border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500/40 transition-all duration-300 bg-transparent"
            />
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                      : "glass-panel border border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= PROJECTS GRID ================= */}
        {loading ? (
          /* Loading Skeletons */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filteredProjects.length > 0 ? (
          /* Projects grid with Framer Motion */
          <motion.div
            layout
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-xl overflow-hidden glass-panel border border-black/10 dark:border-white/10 shadow-lg flex flex-col hover-glow"
                >
                  {/* Image Container with Zoom effect */}
                  <div className="h-56 w-full overflow-hidden relative border-b border-black/5 dark:border-white/5">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-amber-500 text-black font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-amber-400/30">
                        <span>⭐</span>
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow bg-transparent">
                    {/* Header line */}
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h2>

                      {/* Project status badge */}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          project.status === "Live"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : project.status === "In Progress"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {project.status || "Completed"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-300"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Share action Button */}
                    <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                      >
                        <Button
                          variant="secondary"
                          className="px-4 py-2 text-xs flex items-center gap-1.5"
                        >
                          <span>Visit Live</span>
                          <CiShare1 size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search / Filter state */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center p-12 rounded-2xl glass-panel border border-black/10 dark:border-white/10 shadow-lg space-y-6"
          >
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 text-gray-400 dark:text-gray-600">
              <FaRegFolderOpen size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No projects found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                We couldn't find any projects matching your search term or filter tags.
              </p>
            </div>
            <Button
              variant="primary"
              className="text-xs py-2 px-5"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
            >
              Reset Search & Filters
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Project;
