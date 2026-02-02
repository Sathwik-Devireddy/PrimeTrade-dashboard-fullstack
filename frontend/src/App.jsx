import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  SquareCheck,
  Search,
  Command
} from "lucide-react";
import { cn } from "./lib/utils";

const NavItem = ({ to, icon: Icon, label, active, onClick, collapsed }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500",
        active
          ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10"
          : "text-white/50 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon size={20} className={cn("transition-transform duration-500 group-hover:scale-110", active && "text-blue-400")} />
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-medium tracking-tight"
        >
          {label}
        </motion.span>
      )}
      {active && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 bg-white/5 rounded-2xl -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
};

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-blue-500/30">
      {/* Immersive Background */}
      <div className="mesh-gradient" />
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />

      {!user ? (
        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="px-8 py-6 flex justify-between items-center">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-all duration-500 shadow-xl">
                <SquareCheck size={22} className="text-blue-400" />
              </div>
              <span className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">TaskInter</span>
            </div>
            <nav className="flex gap-2 p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5">
              <Link to="/" className={cn("px-5 py-2 rounded-xl text-sm font-medium transition-all", location.pathname === "/" ? "bg-white/10 text-white shadow-lg" : "text-white/50 hover:text-white")}>Login</Link>
              <Link to="/register" className={cn("px-5 py-2 rounded-xl text-sm font-medium transition-all", location.pathname === "/register" ? "bg-white/10 text-white shadow-lg" : "text-white/50 hover:text-white")}>Register</Link>
            </nav>
          </header>
          <main className="flex-1 flex items-center justify-center p-6">
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="relative z-10 flex min-h-screen">
          {/* Floating Dashboard Navigation */}
          <motion.aside
            animate={{ width: collapsed ? 100 : 280 }}
            className="p-6 sticky top-0 h-screen hidden md:flex flex-col"
          >
            <div className="flex-1 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/10 flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <SquareCheck size={18} className="text-white" />
                  </div>
                  {!collapsed && <span className="font-bold tracking-tighter text-lg">TaskInter</span>}
                </div>
              </div>

              <nav className="flex-1 px-4 py-8 space-y-2">
                <NavItem
                  to="/dashboard"
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={location.pathname === "/dashboard"}
                  collapsed={collapsed}
                />
                <NavItem
                  to="/profile"
                  icon={User}
                  label="Profile"
                  active={location.pathname === "/profile"}
                  collapsed={collapsed}
                />
              </nav>

              <div className="p-4 mt-auto">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-white/50 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={18} />
                    {!collapsed && <span className="text-sm font-medium">Logout</span>}
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Content Area */}
          <main className="flex-1 p-6 md:p-10 lg:p-16 h-screen overflow-auto">
            <div className="max-w-6xl mx-auto">
              {/* Command Bar Placeholder UI */}
              <div className="mb-12 flex justify-end">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white/40 text-sm hover:border-white/20 transition-all cursor-pointer group">
                  <Search size={16} />
                  <span>Search anything...</span>
                  <div className="flex items-center gap-1 ml-4 py-0.5 px-1.5 bg-white/10 rounded-lg text-[10px] font-bold text-white/60">
                    <Command size={10} />
                    <span>K</span>
                  </div>
                </div>
              </div>
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
