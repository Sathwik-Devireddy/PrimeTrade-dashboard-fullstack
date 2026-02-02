import React, { useState, useEffect } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, Pencil, Trash, Calendar, CircleCheck, Circle, LoaderCircle, TrendingUp, CheckCircle2, ListTodo } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Skeleton } from "../components/ui/Skeleton";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    variants={itemVariants}
    className="glass-card p-6 rounded-[2rem] flex flex-col justify-between group overflow-hidden relative"
  >
    <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 transition-all duration-700 group-hover:scale-150", color)} />
    <div className="flex justify-between items-start">
      <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
        <Icon className="text-white" size={20} />
      </div>
      <span className="text-xs font-bold text-white/30 tracking-widest uppercase">{title}</span>
    </div>
    <div className="mt-8">
      <h4 className="text-4xl font-bold tracking-tighter">{value}</h4>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    if (tasks.length === 0) setLoading(true);
    try {
      let query = "/tasks?";
      if (search) query += `q=${search}&`;
      if (filter !== "all") query += `completed=${filter === "completed"}`;
      const { data } = await api.get(query);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, filter]);

  const handleSave = async (taskData) => {
    try {
      if (taskData._id) {
        const { data } = await api.put(`/tasks/${taskData._id}`, taskData);
        setTasks(prev => prev.map(t => (t._id === taskData._id ? data : t)));
      } else {
        const { data } = await api.post("/tasks", taskData);
        setTasks(prev => [data, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to save task");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-12"
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl font-black tracking-tighter leading-none mb-4">
            Hello, <span className="text-blue-400">{user?.name}</span>
          </h1>
          <p className="text-white/40 font-medium max-w-md">Your workspace is optimized. You have {stats.pending} pending tasks for today.</p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button
            onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
            className="bg-white text-black hover:bg-white/90 rounded-[2rem] px-8 h-14 font-bold shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
          >
            <Plus size={20} />
            Create New Task
          </Button>
        </motion.div>
      </div>

      {/* Bento Grid Styling */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats row can be part of bento */}
        <StatCard title="Total Flow" value={stats.total} icon={ListTodo} color="bg-blue-500" />
        <StatCard title="Done" value={stats.completed} icon={CheckCircle2} color="bg-green-500" />
        <StatCard title="Ongoing" value={stats.pending} icon={TrendingUp} color="bg-purple-500" />

        {/* Search & Filter Card (Large) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-1 glass-card p-6 rounded-[2rem] flex flex-col justify-between"
        >
          <div className="flex bg-white/5 p-1 rounded-2xl gap-1">
            {["all", "pending", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  filter === f ? "bg-white text-black" : "text-white/40 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <span className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">Filter Active</span>
            <h4 className="text-xl font-bold mt-1 capitalize">{filter} Tasks</h4>
          </div>
        </motion.div>
      </div>

      {/* Tasks Waterfall Grid */}
      <div className="space-y-6">
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">Active Stream</h3>
        </motion.div>

        {loading && tasks.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-[2rem] bg-white/5" />)}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <TaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingTask}
      />
    </motion.div>
  );
}
