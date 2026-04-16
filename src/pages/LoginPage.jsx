/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import API from "../api/axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", formData);
      login(res.data.access_token, res.data.user);
      navigate("/upload");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-[#050a18] flex items-center justify-center px-4 relative overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Background elements */}
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 justify-center mb-10">
          <img
            src="/logo.jpg"
            alt="Fractify"
            className="w-10 h-10 rounded-xl"
          />
          <span className="text-2xl font-bold text-white">Fractify</span>
        </Link>

        {/* Card */}
        <div className="bg-[#0a1628] border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-sm text-slate-400 mb-8">
            Log in to continue your fracture analysis
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#050a18] font-semibold text-sm rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/25 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#050a18]/30 border-t-[#050a18] rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
