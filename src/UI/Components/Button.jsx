import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  // Styles based on variants
  const baseStyle = "relative inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer disabled:cursor-not-allowed select-none overflow-hidden";
  
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-500/30",
    secondary: "bg-white/10 dark:bg-white/5 text-gray-800 dark:text-gray-100 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20",
    ghost: "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5",
    outline: "bg-transparent text-gray-800 dark:text-gray-100 border-2 border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40",
    danger: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30",
    disabled: "bg-gray-100 dark:bg-gray-800/40 text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-800/60 pointer-events-none"
  };

  const currentVariant = disabled || loading ? variants.disabled : variants[variant];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${currentVariant} ${className}`}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
