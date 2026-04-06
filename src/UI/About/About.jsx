import React from "react";

function About() {
  return (
    <section className="min-h-screen px-5 md:px-10 lg:px-20 py-20 bg-[var(--bg-main)] text-[var(--text-primary)]">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE (DEV CARD INSTEAD OF IMAGE) */}
        <div className="flex justify-center lg:justify-start">
          <div
            className="
              w-full max-w-md p-6 rounded-2xl
              bg-[var(--bg-alt)]
              border border-black/10 dark:border-white/10
              backdrop-blur-md shadow-xl
              space-y-6
            "
          >
            {/* Fake code header */}
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>

            {/* Code style intro */}
            <div className="text-sm font-mono opacity-80 space-y-2">
              <p><span className="text-green-500">const</span> developer = {"{"}</p>
              <p className="ml-4">name: "Jerry",</p>
              <p className="ml-4">role: "Frontend Developer",</p>
              <p className="ml-4">stack: ["React", "Firebase", "Tailwind"],</p>
              <p className="ml-4">focus: "Building real-world products"</p>
              <p>{"}"}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-black/10 dark:border-white/10"></div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="text-lg font-semibold">4+</h3>
                <p className="text-xs opacity-60">Projects</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">1+</h3>
                <p className="text-xs opacity-60">Years</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">100%</h3>
                <p className="text-xs opacity-60">Focus</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide">
            About Me
          </h1>

          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-xl">
            I’m Jerry, a frontend developer focused on building clean,
            scalable, and user-friendly web applications. I enjoy turning
            complex ideas into simple, intuitive interfaces.
          </p>

          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-xl">
            My work revolves around React, Firebase, and modern UI practices.
            I’m passionate about performance, smooth user experience, and
            creating products that actually solve real-world problems.
          </p>

          {/* SKILLS */}
          <div className="pt-6">
            <h2 className="text-lg font-medium mb-4">Tech Stack</h2>

            <div className="flex flex-wrap gap-3">
              {["React", "Firebase", "JavaScript", "Tailwind", "HTML", "CSS"].map((tech, i) => (
                <span
                  key={i}
                  className="
                    text-xs px-4 py-2 rounded-full
                    bg-[var(--bg-alt)]
                    border border-black/10 dark:border-white/10
                    backdrop-blur-md
                    hover:scale-105 transition
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* SECOND SECTION */}
      <div className="max-w-5xl mx-auto mt-24">

        <div
          className="
            p-8 rounded-2xl
            bg-[var(--bg-alt)]
            border border-black/10 dark:border-white/10
            backdrop-blur-md shadow-xl
          "
        >
          <h2 className="text-2xl font-semibold mb-4">
            What I Focus On
          </h2>

          <p className="text-sm md:text-base opacity-80 leading-relaxed">
            I focus on building real-world applications that are not just visually
            appealing but also practical and scalable. From invoice systems to
            portfolio platforms, my goal is to create solutions that people can
            actually use in their daily workflow.
          </p>

          <p className="text-sm md:text-base opacity-80 leading-relaxed mt-4">
            I’m currently improving my backend skills and working towards becoming
            a full-stack developer while continuing to sharpen my frontend craft.
          </p>
        </div>

      </div>

      {/* CTA SECTION */}
      <div className="max-w-5xl mx-auto mt-24">
        <div
          className="
            p-10 rounded-2xl text-center
            bg-[var(--bg-alt)]
            border border-black/10 dark:border-white/10
            backdrop-blur-md shadow-xl
          "
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Let’s Build Something Great
          </h2>

          <p className="text-sm md:text-base opacity-70 max-w-xl mx-auto mb-8">
            I’m always open to working on interesting projects, collaborations,
            or bringing ideas to life. Let’s create something impactful together.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">

            <a
              href="/projects"
              className="
                px-6 py-3 rounded-full font-medium
                bg-black text-white
                dark:bg-white dark:text-black
                hover:scale-105 transition
              "
            >
              View My Work
            </a>

            <a
              href="/contact"
              className="
                px-6 py-3 rounded-full font-medium
                bg-black/10 dark:bg-white/10
                hover:bg-black/20 dark:hover:bg-green-600/20
                transition
              "
            >
              Contact Me
            </a>

          </div>
        </div>
      </div>

    </section>
  );
}

export default About;