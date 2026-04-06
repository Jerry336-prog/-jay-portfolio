import React, { useState, useEffect } from "react";
import { auth } from "../../utilis/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Login failed");
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
    <section className="min-h-screen flex items-center justify-center px-5 bg-[var(--bg-main)] text-[var(--text-primary)]">

      <div
        className="
          w-full max-w-md p-8 rounded-xl
          bg-[var(--bg-alt)]
          border border-black/15 dark:border-white/10
          backdrop-blur-md
          shadow-xl
        "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-wide">
            Admin Login
          </h1>
          <p className="text-sm mt-2 opacity-70">
            Access your dashboard to manage projects
          </p>
        </div>
    <p className="text-xs text-center opacity-50 mb-4">
         Jerry DevHub • Admin Panel
    </p>
        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full p-3 rounded-lg
              bg-black/5 dark:bg-white/10
              border border-black/10 dark:border-white/10
              outline-none
              focus:ring-2 focus:ring-green-500/40
              transition
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full p-3 rounded-lg
              bg-black/5 dark:bg-white/10
              border border-black/10 dark:border-white/10
              outline-none
              focus:ring-2 focus:ring-green-500/40
              transition
            "
          />

          {/* Button */}
          <button
            className="
              w-full py-3 rounded-lg font-medium
              bg-black/10 dark:bg-white/10
              hover:bg-black/20 dark:hover:bg-green-600/20
              transition
            "
          >
            Login
          </button>

        </form>
      </div>
      

      {/* 🔥 FLOATING HOME BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="
          fixed bottom-6 right-6
          p-4 rounded-full
          bg-[var(--bg-alt)]
          border border-black/10 dark:border-white/10
          backdrop-blur-md shadow-lg
          hover:scale-110 hover:bg-black/10 dark:hover:bg-white/10
          transition
        "
      >
        <FaHome className="text-lg" />
      </button>

    </section>
  );
}

export default Login;