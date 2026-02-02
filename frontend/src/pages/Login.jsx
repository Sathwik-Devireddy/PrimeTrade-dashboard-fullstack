import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { SquareCheck, Mail, Lock, ArrowRight, LoaderCircle } from "lucide-react";
import { cn } from "../lib/utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg"
    >
      <div className="glass-card rounded-[3rem] p-12 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[100px] -z-10" />

        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-[0_20px_40px_rgba(59,130,246,0.5)]">
            <SquareCheck size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-2">Welcome Back.</h2>
          <p className="text-white/40 font-medium">Continue your high-performance workflow.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm mb-8 flex items-center gap-3 backdrop-blur-md"
          >
            <div className="p-1 bg-red-500/20 rounded-full">
              <ArrowRight size={14} className="rotate-180" />
            </div>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-4">Identifier</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors" size={20} />
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pl-14 pr-6 text-white placeholder:text-white/10 focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-4">Credential</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors" size={20} />
              <input
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pl-14 pr-6 text-white placeholder:text-white/10 focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              className="w-full bg-white text-black py-5 rounded-[1.5rem] font-bold shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Resume Access</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-white/30 text-sm font-medium">
            New to the system?{" "}
            <Link to="/register" className="text-white hover:text-blue-400 transition-colors font-bold underline-offset-4 decoration-white/20 underline">
              Establish Identity
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
