import React from "react";

function PageLoader({ isVisible }) {
  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-[var(--bg-main)]
        transition-opacity duration-500 ease-in-out
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div
          className="
            w-12 h-12
            border-2 border-transparent
            border-t-[var(--text-primary)]
            border-r-[var(--text-primary)]
            rounded-full
            animate-spin
          "
        />

        {/* Text */}
        <span className="text-xs tracking-widest uppercase opacity-70">
          Loading
        </span>
      </div>
    </div>
  );
}

export default PageLoader;

