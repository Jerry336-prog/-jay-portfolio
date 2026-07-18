import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Sidenav({ mynav, onClose }) {
  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -30,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {mynav && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="absolute top-[70px] left-0 w-full glass-panel border-b border-black/10 dark:border-white/10 p-6 md:hidden z-40"
        >
          <ol className="flex flex-col gap-5">
            {links.map((link) => (
              <motion.li key={link.to} variants={itemVariants}>
                <NavLink
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `text-lg font-medium block py-2 transition-colors cursor-pointer ${
                      isActive
                        ? "text-emerald-500"
                        : "text-gray-800 dark:text-gray-200 hover:text-emerald-400"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidenav;