import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, Lock, ShieldCheck, Camera, ArrowRight, Save, X } from "lucide-react";
import { cn } from "../lib/utils";

export default function Profile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: "", content: "" });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                password: ""
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ type: "", content: "" });

        try {
            const payload = {
                name: formData.name,
                email: formData.email
            };
            if (formData.password) payload.password = formData.password;

            await api.put("/me", payload);
            setMsg({ type: "success", content: "Identity parameters updated. Refreshing stream..." });
            setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
            setMsg({ type: "error", content: err.response?.data?.error || "Update protocol failed" });
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Brief Card */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="glass-card rounded-[3rem] p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-600/20 to-purple-600/20 -z-10" />
                        <div className="relative inline-block group">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] border-2 border-white/20 flex items-center justify-center text-3xl font-black text-white shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-blue-500/50">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center border-2 border-[#020617] cursor-pointer hover:scale-110 transition-transform">
                                <Camera size={14} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter mt-6">{user?.name}</h2>
                        <p className="text-white/40 text-sm font-medium mt-1 uppercase tracking-widest">{user?.email}</p>

                        <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-black text-white/20 tracking-widest uppercase">Secured Access</span>
                                <ShieldCheck size={14} className="text-green-400" />
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Settings Card */}
                <div className="lg:col-span-2">
                    <div className="glass-card rounded-[3rem] p-10 md:p-12 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h3 className="text-3xl font-black tracking-tighter">Core Identity</h3>
                                <p className="text-white/40 font-medium">Manage your system credentials.</p>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={cn(
                                    "p-4 rounded-2xl transition-all active:scale-95",
                                    isEditing ? "bg-red-500/10 text-red-400" : "bg-white/5 text-white/40 hover:text-white"
                                )}
                            >
                                {isEditing ? <X size={20} /> : <Pencil size={20} />}
                            </button>
                        </div>

                        {msg.content && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "p-5 rounded-[1.5rem] mb-8 text-sm font-bold flex items-center gap-3 backdrop-blur-md border",
                                    msg.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                                )}
                            >
                                <ArrowRight size={14} className={msg.type === "error" ? "rotate-180" : ""} />
                                {msg.content}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-4">Full Name</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 px-6 text-white outline-none transition-all disabled:opacity-30 focus:border-blue-500/50"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-4">Email Contact</label>
                                    <input
                                        type="email"
                                        disabled={!isEditing}
                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 px-6 text-white outline-none transition-all disabled:opacity-30 focus:border-blue-500/50"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="space-y-2"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-4">Update Access Key</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new code (Optional)"
                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 px-6 text-white outline-none transition-all focus:border-blue-500/50"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </motion.div>
                            )}

                            {isEditing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="pt-6"
                                >
                                    <button
                                        disabled={loading}
                                        className="w-full bg-white text-black py-5 rounded-[1.5rem] font-bold shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                                    >
                                        {loading ? <LoaderCircle className="animate-spin" size={20} /> : (
                                            <>
                                                <Save size={20} />
                                                <span>Synchronize Profile</span>
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
