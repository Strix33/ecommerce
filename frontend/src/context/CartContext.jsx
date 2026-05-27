import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const local = localStorage.getItem("cartItems");
        return local ? JSON.parse(local) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity, size, color) => {
        setCartItems((prev) => {
            // Check if exact same item (id, size, color) exists
            const existingIndex = prev.findIndex(
                (item) =>
                    item.productId === product._id &&
                    item.size === size &&
                    item.color === color
            );

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += quantity;
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.images && product.images.length > 0 ? product.images[0].url : "",
                        size,
                        color,
                        quantity
                    }
                ];
            }
        });
    };

    const updateQuantity = (productId, size, color, newQty) => {
        if (newQty < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.productId === productId && item.size === size && item.color === color
                    ? { ...item, quantity: newQty }
                    : item
            )
        );
    };

    const removeFromCart = (productId, size, color) => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                    !(item.productId === productId && item.size === size && item.color === color)
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                cartCount,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
