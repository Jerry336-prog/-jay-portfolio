import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-8 mt-12 border-t border-black/5 dark:border-white/5 text-center text-xs tracking-wider text-gray-600 dark:text-gray-500 font-light">
      <div className="max-w-7xl mx-auto px-6">
        <p>© {currentYear} Jerry.dev. Designed & Built with React, Tailwind v4 & Framer Motion.</p>
      </div>
    </footer>
  );
}

export default Footer;