import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SquareCheck } from "lucide-react";
import { cn } from "../lib/utils";

export default function TaskForm({ isOpen, onClose, onSubmit, initialData }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description || "");
            setCompleted(initialData.completed);
        } else {
            setTitle("");
            setDescription("");
            setCompleted(false);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...(initialData && { _id: initialData._id }),
            title,
            description,
            completed
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="glass-card w-full max-w-lg rounded-[3rem] p-10 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] -z-10" />

                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <SquareCheck size={20} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter">
                                    {initialData ? "Refine Task" : "New Objective"}
                                </h3>
                            </div>
                            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Objective Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Strategic Details</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all resize-none h-32"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe the objective..."
                                />
                            </div>

                            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setCompleted(!completed)}>
                                <div className={cn(
                                    "w-6 h-6 rounded-lg border transition-all duration-300 flex items-center justify-center",
                                    completed ? "bg-blue-500 border-blue-500" : "bg-white/5 border-white/10 group-hover:border-white/30"
                                )}>
                                    {completed && <SquareCheck size={14} className="text-white" />}
                                </div>
                                <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">Mark Objective as Secured</span>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white/60 font-bold rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] py-4 bg-white text-black font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                                >
                                    {initialData ? "Save Changes" : "Create Objective"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
