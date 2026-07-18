import React, { useState, useEffect } from "react";
import { auth } from "../../utilis/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import Toast from "../Components/Toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Toast feedback state
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("error");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setToastMsg("Welcome back, Admin!");
      setToastType("success");
      setShowToast(true);
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      console.error(error);
      setToastMsg("Authentication failed. Please check credentials.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const [theme, setTheme] = useState(() => {
    let myChoice = localStorage.getItem("theme");
    return myChoice ? myChoice : "light";
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-2xl glass-panel border border-black/10 dark:border-white/10 shadow-2xl relative z-10"
      >
        {/* Console Dots */}
        <div className="flex gap-1.5 absolute top-5 left-6">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
        </div>

        {/* Header */}
        <div className="text-center mt-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Admin Portal
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 tracking-wider uppercase">
            Jerry.dev Control Panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email input group */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Admin Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Password input group */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full py-3.5 mt-2 shadow-lg shadow-emerald-500/20"
          >
            Authenticate Console
          </Button>
        </form>
      </motion.div>

      {/* FLOATING HOME BUTTON */}
      <motion.button
        onClick={() => navigate("/")}
        className="fixed bottom-6 right-6 p-4 rounded-full glass-panel border border-black/10 dark:border-white/10 shadow-lg hover:border-emerald-500/30 text-gray-800 dark:text-gray-200 cursor-pointer"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Navigate Home"
      >
        <FaHome className="text-lg" />
      </motion.button>

      {/* Dynamic feedback toast */}
      <Toast
        message={toastMsg}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}

export default Login;