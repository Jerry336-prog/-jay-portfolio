import React from "react";
import TextType from "../Text_animation.jsx";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Home = () => {
  return (
    <section className="bg-[var(--bg-main)] text-[var(--text-primary)]">

      {/* ================= HERO ================= */}
      <div className="min-h-screen flex items-center px-5 mt-10 lg:mt-0 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="space-y-6">

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Hi, I’m <span className="text-green-500">Jerry</span>
            </h1>

            <h2 className="text-2xl opacity-80">
              <TextType
                text={[
                  "Frontend Developer",
                  "React Specialist",
                  "UI/UX Focused",
                ]}
                typingSpeed={70}
                pauseDuration={400}
                showCursor={true}
                cursorCharacter="|"
              />
            </h2>

            <p className="max-w-md text-sm md:text-base opacity-70">
              I build clean, scalable and user-friendly web applications
              focused on performance and real-world usability.
            </p>

            {/* 🔥 RESUME BUTTON */}
            <div className="flex flex-wrap gap-4 pt-4">

              <a
                href="/resume.pdf"
                download
                className="
                  px-6 py-3 rounded-full text-sm font-medium
                  bg-black text-white
                  dark:bg-white dark:text-black
                  hover:scale-105 transition
                "
              >
                Download Resume
              </a>

            </div>

            {/* 🔥 SOCIAL ICONS */}
            <div className="flex gap-4 pt-2">

              <a href="https://github.com/Jerry336-prog" target="_blank"
                className="p-3 rounded-full bg-[var(--bg-alt)] hover:bg-black/20 dark:hover:bg-green-600/20 hover:scale-110 transition">
                <FaGithub />
              </a>

              <a href="https://x.com/jerrydev5803701" target="_blank"
                className="p-3 rounded-full bg-[var(--bg-alt)] hover:bg-black/20 dark:hover:bg-green-600/20 hover:scale-110 transition">
                <FaTwitter />
              </a>

              <a href="https://www.linkedin.com/in/chinedu-jeremiah-22a10428b" target="_blank"
                className="p-3 rounded-full bg-[var(--bg-alt)] hover:bg-black/20 dark:hover:bg-green-600/20 hover:scale-110 transition">
                <FaLinkedin />
              </a>

            </div>

          </div>

          {/* RIGHT (IMAGE) */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="
                w-[280px] h-[340px] md:w-[380px] md:h-[440px]
                rounded-2xl overflow-hidden
                bg-white/80 dark:bg-white/5
                border border-black/10 dark:border-white/10
                backdrop-blur-md shadow-xl
              "
            >
              <img
                src="/portfolio.JPG"
                alt="Jerry"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ================= WHAT YOU DO ================= */}
      <div className="py-10 px-5 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Frontend Development",
              desc: "Building responsive, fast and scalable web apps using React and modern technologies.",
            },
            {
              title: "UI/UX Design",
              desc: "Designing clean and intuitive user interfaces focused on user experience.",
            },
            {
              title: "Real-world Solutions",
              desc: "Creating practical applications like invoice systems and business tools.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                p-6 rounded-xl
                bg-[var(--bg-alt)]
                border border-black/10 dark:border-white/10
                backdrop-blur-md
                hover:-translate-y-2 transition
              "
            >
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm opacity-70">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="py-10 px-5 md:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">

          <div
            className="
              p-10 rounded-2xl
              bg-[var(--bg-alt)]
              border border-black/10 dark:border-white/10
              backdrop-blur-md
            "
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Let’s Connect
            </h2>

            <p className="opacity-70 mb-6">
              Explore my work and connect with me across platforms.
            </p>

            <div className="flex justify-center gap-4">

              <a href="https://github.com/Jerry336-prog" target="_blank"
                className="p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-green-600/20 hover:scale-110 transition">
                <FaGithub />
              </a>

              <a href="https://x.com/jerrydev5803701" target="_blank"
                className="p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-green-600/20 hover:scale-110 transition">
                <FaTwitter />
              </a>

              <a href="https://www.linkedin.com/in/chinedu-jeremiah-22a10428b" target="_blank"
                className="p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-green-600/20 hover:scale-110 transition">
                <FaLinkedin />
              </a>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Home;