import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { data } = await api.get("/me");
                    setUser(data);
                } catch (error) {
                    console.error("Token verification failed:", error);
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return data.user;
    };

    const register = async (name, email, password) => {
        const { data } = await api.post("/auth/signup", { name, email, password });
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return data.user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
