import React, { useState, useEffect } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
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

  return (
    <div className="h-[70px] bg-[var(--bg-alt)] backdrop-blur-md sticky top-0 z-50 justify-center">
      <section className="w-full h-[70px] duration-500 bg-[transparent] text-[var(--text)] max-w-[full] flex items-center px-6 py-4 ">
        <h1 className="font-bold text-4xl">Jerry.dev</h1>
        <div className=" bg-[var(--bg-primary)] lg:ml-[400px] duration-500 p-1 rounded-full gap-2 hidden md:block  header">
          {[
            { to: "/", label: "Home" },
            { to: "/projects", label: "Projects" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative group px-3 py-2 rounded-full overflow-hidden inline-flex items-center ${
                  isActive ? "bg-[var(--bg-secondary)] text-[var(--text)]" : ""
                }`
              }
            >
              {/* sliding background */}
              <span className="absolute left-0 right-0 bottom-0 h-0 bg-[var(--bg-primary)] transition-all duration-300 group-hover:h-full" />

              {/* text */}
              <span className="relative z-10 text-[gray] transition-colors duration-300 group-hover:text-[var(--text-primary-3)]">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
        <div>
          <button
            onClick={handleThemeChange}
            className={`toggle   h-[40px] w-[40px] flex lg:ml-[450px] ml-[45px] translate-x-10 justify-center items-center rounded-full cursor-pointer duration-500 ${
              theme === "light" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {theme === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
          </button>
        </div>
        <section
          onClick={showNav}
          className={`h-[40px] w-[40px] flex ml-[60px] justify-center items-center rounded-full cursor-pointer duration-500 ${
            theme === "light" ? "bg-black text-white" : "bg-white text-black"
          } md:hidden cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </section>
        <section>
          <Sidenav mynav={mynav} />
        </section>
      </section>
    </div>
  );
}

export default Header;
