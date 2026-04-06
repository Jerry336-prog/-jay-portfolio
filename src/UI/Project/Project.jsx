
import React, { useEffect, useState } from "react";
import { CiShare1 } from "react-icons/ci";
import { db } from "../../utilis/Firebase";
import { collection, getDocs } from "firebase/firestore";

function Project() {

const [projects, setProjects] = useState([]);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  fetchProjects();
}, []);



  return (
    <section className="min-h-screen py-20 px-5 md:px-10 lg:px-20 bg-[var(--bg-main)] text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-4xl lg:text-6xl md:text-4xl font-semibold tracking-wide">
          My Projects
        </h1>
        <p className="max-w-xl mx-auto mt-5 text-sm md:text-base opacity-70">
          A curated selection of projects focused on building scalable,
          user-friendly, and performant web applications.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="
              group rounded-xl overflow-hidden
              bg-white/80 dark:bg-white/5
              border border-black/10 dark:border-white/10
              backdrop-blur-md
              transition hover:-translate-y-2 hover:shadow-xl
            "
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />

            </div>

            {/* Content */}
            <div className="p-6 bg-[var(--bg-alt)] flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">
                  {project.title}
                </h2>

                {/* Status */}
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full
                    ${
                      project.status === "Live"
                        ? "bg-green-600/20 text-green-700 dark:text-green-400"
                        : project.status === "In Progress"
                        ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                        : project.status === "Completed"
                        ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                        : "bg-gray-500/20 text-gray-600 dark:text-gray-400"
                    }
                  `}
                >
                  {project.status}
                </span>
              </div>

                <div className="flex items-center gap-2">
                {project.featured && (
                  <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-600">
                      ⭐ Featured
                  </span>
               )}
              </div>

              <p className="text-sm opacity-80 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 shadow-2xl cursor-pointer shadow-black hover:scale-105 rounded-full bg-black/10 dark:bg-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

                               {/* Action */}
              <a
                href={project.link}
                className="
              text-lg font-black px-3 py-1 rounded-full bg-black/10 dark:bg-white/10
              self-start  shadow-black hover:scale-120
              hover:bg-black/20 dark:hover:bg-green-600/20"
              >
               <CiShare1 />
              </a>


            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Project;
