import React from "react";
import { motion } from "framer-motion";
import { Pencil, Trash, Calendar, CircleCheck, Circle, Clock } from "lucide-react";
import { cn } from "../lib/utils";

const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } }
};

export default function TaskCard({ task, onEdit, onDelete }) {
    const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
    });

    return (
        <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
            className="group"
        >
            <div className={cn(
                "glass-card h-full rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden transition-all duration-700",
                task.completed ? "bg-white/[0.01] border-white/5 opacity-60" : "hover:bg-white/[0.05] hover:border-white/20"
            )}>
                {/* Visual Accent */}
                <div className={cn(
                    "absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 transition-all duration-700 group-hover:scale-150",
                    task.completed ? "bg-green-500" : "bg-blue-500"
                )} />

                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-500",
                            task.completed
                                ? "bg-green-500/10 border-green-500/20 text-green-400"
                                : "bg-white/5 border-white/10 text-white group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-blue-400"
                        )}>
                            {task.completed ? <CircleCheck size={20} /> : <Circle size={20} />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Task Item</span>
                            <h4 className={cn(
                                "text-xl font-bold tracking-tight transition-all duration-500",
                                task.completed ? "text-white/30 line-through" : "text-white"
                            )}>
                                {task.title}
                            </h4>
                        </div>
                    </div>
                </div>

                <p className={cn(
                    "text-sm leading-relaxed flex-1 mb-8",
                    task.completed ? "text-white/20" : "text-white/60"
                )}>
                    {task.description || "No description provided for this objective."}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white/30">
                            <Clock size={12} className="text-blue-500/50" />
                            <span>{formattedDate}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(task)}
                            className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-white/40 hover:text-white transition-all active:scale-90"
                        >
                            <Pencil size={14} />
                        </button>
                        <button
                            onClick={() => onDelete(task._id)}
                            className="p-3 bg-white/5 hover:bg-red-500/20 border border-white/5 hover:border-red-500/30 rounded-2xl text-white/40 hover:text-red-400 transition-all active:scale-90"
                        >
                            <Trash size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
