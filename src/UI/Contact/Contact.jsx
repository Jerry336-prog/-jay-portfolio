import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { GrLinkedin } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !validateEmail(email) || !message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => setStatus(null), 3500);
  }

  const contacts = [
    {
      label: "Email",
      value: "emmann.dev@gmail.com",
      href: "mailto:emmann.dev@gmail.com",
      icon: <CiMail size={22} />,
    },
    {
      label: "GitHub",
      value: "@Abiola-Emmanuel",
      href: "https://github.com/Abiola-Emmanuel",
      icon: <FaGithub size={22} />,
    },
    {
      label: "LinkedIn",
      value: "in/emmanuel-abiola",
      href: "https://linkedin.com/in/emmanuel-abiola",
      icon: <GrLinkedin size={22} />,
    },
    {
      label: "Twitter",
      value: '@console.log("Emman")',
      href: "https://x.com/consolelogEmman",
      icon: <FaSquareXTwitter size={22} />,
    },
  ];

  return (
    <section className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl lg:text-6xl font-semibold">
            Let’s work together
          </h1>
          <p className="mt-4 text-md text-[var(--text-secondary)]">
            Have a question or want to work together? Send a message.
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-lg p-6 bg-[var(--bg-alt)] backdrop-blur-md">
              <h2 className="text-lg font-semibold mb-6">
                Contact
              </h2>

              <div className="space-y-4">
                {contacts.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-4
                      rounded-xl border
                      border-gray-300 dark:border-gray-800
                      bg-white dark:bg-gray-900
                      p-5
                      transition-all
                      hover:-translate-y-1
                      hover:shadow-md
                    "
                  >
                    {/* Icon */}
                    <div className="
                      flex items-center justify-center
                      w-12 h-12
                      rounded-full
                      bg-gray-100 dark:bg-gray-800
                      text-gray-800 dark:text-gray-200
                    ">
                      {item.icon}
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {item.label}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-6 bg-[var(--bg-alt)] backdrop-blur-md">
              <h3 className="text-sm font-medium">
                Availability
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Open to freelance and contract work.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-lg p-6 bg-[var(--bg-alt)] backdrop-blur-md"
          >
            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-[var(--text-secondary)]">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-transparent border border-gray-400 focus:border-[var(--bg-secondary)] outline-none"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-[var(--text-secondary)]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-transparent border border-gray-400 focus:border-[var(--bg-secondary)] outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-[var(--text-secondary)]">
                Message
              </label>
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded bg-transparent border border-gray-400 focus:border-[var(--bg-secondary)] outline-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded bg-[var(--bg-secondary)] font-medium hover:opacity-90 transition"
            >
              Send message
            </button>

            {status === "success" && (
              <p className="mt-4 text-sm text-green-400">
                Thanks — your message was sent (simulated).
              </p>
            )}

            {status === "error" && (
              <p className="mt-4 text-sm text-rose-400">
                Please fill all fields with a valid email.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
