/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 px-6 md:px-14 py-5 flex justify-between items-center transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#050a18]/80 backdrop-blur-xl border-cyan-400/8"
          : "bg-transparent border-transparent"
      }`}
    >
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/logo.jpg"
          alt="Fractify"
          className="w-9 h-9 rounded-xl"
        />
        <span className="text-xl font-bold tracking-tight">Fractify</span>
      </Link>

      <div className="hidden md:flex items-center gap-9">
        <a
          href="#features"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          How it Works
        </a>
        <a
          href="#about"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          About
        </a>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-5 py-2.5 text-sm font-medium text-white border border-white/15 rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition-all"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2.5 text-sm font-semibold text-[#050a18] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/30 transition-all"
        >
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
}
