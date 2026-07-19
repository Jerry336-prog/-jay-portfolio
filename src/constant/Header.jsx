import React, { useState, useEffect } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidenav from "../UI/Sidenav.jsx";

function Header() {
  const [theme, setTheme] = useState(() => {
    let myChoice = localStorage.getItem("theme");
    return myChoice ? myChoice : "light";
  });

  const handleThemeChange = () => {
    let newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  let [mynav, setMynav] = useState(false);
  function showNav() {
    setMynav(!mynav);
  }

  // Scroll detection to hide/show header
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      // Show if scrolling up, or if near top
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 70);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/certificates", label: "Certificates" },
    { to: "/contact", label: "Contact" },
  ];

  const location = useLocation();

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-[75px] glass-navbar sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2">
          <motion.span
            className="text-2xl font-black tracking-tight text-emerald-500 dark:text-emerald-400"
            whileHover={{ scale: 1.05 }}
          >
            Jerry.dev
          </motion.span>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 transition-colors hover:text-emerald-500 dark:hover:text-emerald-400 cursor-pointer"
              >
                {isActive && (
                  <motion.span
                    className="absolute inset-0 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-full shadow-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-emerald-600 dark:text-emerald-400 font-bold" : ""}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
          <motion.button
            onClick={handleThemeChange}
            className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 text-gray-800 dark:text-white"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <IoMoonOutline size={18} /> : <IoSunnyOutline size={18} />}
          </motion.button>

          {/* HAMBURGER (MOBILE ONLY) */}
          <motion.button
            onClick={showNav}
            className="w-10 h-10 flex md:hidden justify-center items-center rounded-full cursor-pointer bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 text-gray-800 dark:text-white"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Navigation Menu"
          >
            <div className="relative w-5 h-5 flex flex-col justify-between items-center">
              <motion.span
                animate={mynav ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-[2px] bg-current rounded-full origin-left"
              />
              <motion.span
                animate={mynav ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-[2px] bg-current rounded-full"
              />
              <motion.span
                animate={mynav ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-[2px] bg-current rounded-full origin-left"
              />
            </div>
          </motion.button>
        </div>

        {/* MOBILE NAVIGATION */}
        <Sidenav mynav={mynav} onClose={() => setMynav(false)} />
      </div>
    </motion.header>
  );
}

export default Header;
