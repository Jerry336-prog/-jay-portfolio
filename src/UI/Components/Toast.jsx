import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

const Toast = ({ message, type = "success", isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    info: <Info className="w-5 h-5 text-sky-400" />
  };

  const bgStyles = {
    success: "border-emerald-500/30 bg-emerald-950/20 dark:bg-emerald-950/30 backdrop-blur-md",
    error: "border-rose-500/30 bg-rose-950/20 dark:bg-rose-950/30 backdrop-blur-md",
    info: "border-sky-500/30 bg-sky-950/20 dark:bg-sky-950/30 backdrop-blur-md"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl border glass-panel shadow-2xl ${bgStyles[type]}`}
          style={{ maxWidth: "350px" }}
        >
          {icons[type]}
          <div className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">
            {message}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
