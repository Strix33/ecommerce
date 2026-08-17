export const API_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.MODE === "development" ? "http://localhost:9000" : "");
