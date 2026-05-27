import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const API_URL = "http://localhost:9000/api/users";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile on load or token change
    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // Token expired or invalid
                    logout();
                }
            } catch (error) {
                console.error("Fetch profile error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            return data;
        } catch (error) {
            console.error("Login context error:", error);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            return data;
        } catch (error) {
            console.error("Register context error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
