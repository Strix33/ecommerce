import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const API_BASE = "http://localhost:9000/api";

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch products with filters, search, and page query params
    const fetchProducts = async (filters = {}) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            Object.keys(filters).forEach((key) => {
                if (filters[key] !== undefined && filters[key] !== null && filters[key] !== "") {
                    queryParams.append(key, filters[key]);
                }
            });

            const response = await fetch(`${API_BASE}/products?${queryParams.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data.products || []);
                setTotalProducts(data.totalProducts || 0);
                setTotalPages(data.totalPages || 1);
                setCurrentPage(data.currentPage || 1);
            }
        } catch (error) {
            console.error("Fetch products context error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch individual product details
    const fetchSingleProduct = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/products/${id}`);
            if (response.ok) {
                const data = await response.json();
                setSingleProduct(data);
                return data;
            } else {
                setSingleProduct(null);
            }
        } catch (error) {
            console.error("Fetch single product context error:", error);
            setSingleProduct(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch recommendations/similar products
    const fetchSimilarProducts = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/products/similar/${id}`);
            if (response.ok) {
                const data = await response.json();
                setSimilarProducts(data);
            }
        } catch (error) {
            console.error("Fetch similar products error:", error);
        }
    };

    // Fetch promotions
    const fetchHomePromotions = async (type) => {
        try {
            const response = await fetch(`${API_BASE}/products/${type}`); // "new-arrivals" or "best-sellers"
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error(`Fetch ${type} failed:`, error);
            return [];
        }
    };

    // --- ADMINISTRATIVE FUNCTIONS (Admin authorization required) ---

    // Create a new product
    const createProduct = async (productData, token) => {
        try {
            const response = await fetch(`${API_BASE}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to create product");
            return data;
        } catch (error) {
            console.error("Create product context error:", error);
            throw error;
        }
    };

    // Update product
    const updateProduct = async (id, productData, token) => {
        try {
            const response = await fetch(`${API_BASE}/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to update product");
            return data;
        } catch (error) {
            console.error("Update product context error:", error);
            throw error;
        }
    };

    // Delete product
    const deleteProduct = async (id, token) => {
        try {
            const response = await fetch(`${API_BASE}/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to delete product");
            return data;
        } catch (error) {
            console.error("Delete product context error:", error);
            throw error;
        }
    };

    // Get Admin dashboard statistics
    const fetchDashboardStats = async (token) => {
        try {
            const response = await fetch(`${API_BASE}/admin/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                return await response.json();
            }
            throw new Error("Failed to load analytics");
        } catch (error) {
            console.error("Fetch dashboard stats context error:", error);
            throw error;
        }
    };

    // Fetch all users
    const fetchUsers = async (token) => {
        try {
            const response = await fetch(`${API_BASE}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                return await response.json();
            }
            throw new Error("Failed to load users list");
        } catch (error) {
            console.error("Fetch users context error:", error);
            throw error;
        }
    };

    // Update user details/role
    const updateUser = async (id, userData, token) => {
        try {
            const response = await fetch(`${API_BASE}/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to update user");
            return data;
        } catch (error) {
            console.error("Update user context error:", error);
            throw error;
        }
    };

    // Delete user
    const deleteUser = async (id, token) => {
        try {
            const response = await fetch(`${API_BASE}/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to delete user");
            return data;
        } catch (error) {
            console.error("Delete user context error:", error);
            throw error;
        }
    };

    // Fetch all orders
    const fetchOrders = async (token) => {
        try {
            const response = await fetch(`${API_BASE}/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                return await response.json();
            }
            throw new Error("Failed to load orders list");
        } catch (error) {
            console.error("Fetch orders context error:", error);
            throw error;
        }
    };

    // Toggle delivery status
    const toggleDeliveryStatus = async (id, token) => {
        try {
            const response = await fetch(`${API_BASE}/orders/${id}/deliver`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to toggle delivery");
            return data;
        } catch (error) {
            console.error("Toggle delivery context error:", error);
            throw error;
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                singleProduct,
                similarProducts,
                totalProducts,
                totalPages,
                currentPage,
                loading,
                fetchProducts,
                fetchSingleProduct,
                fetchSimilarProducts,
                fetchHomePromotions,
                createProduct,
                updateProduct,
                deleteProduct,
                fetchDashboardStats,
                fetchUsers,
                updateUser,
                deleteUser,
                fetchOrders,
                toggleDeliveryStatus
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
