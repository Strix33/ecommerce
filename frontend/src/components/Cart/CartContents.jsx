import React, { useContext } from 'react'
import { RiDeleteBin3Line } from "react-icons/ri";
import { CartContext } from '../../context/CartContext';

const CartContents = () => {
    const { cartItems, updateQuantity, removeFromCart, totalPrice } = useContext(CartContext);

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 font-medium">
                Your cart is empty. Start shopping!
            </div>
        );
    }

    return (
        <div>
            {cartItems.map((product, index) => (
                <div key={index} className="flex items-start justify-between py-4 border-b border-gray-100">
                    <div className="flex items-start">
                        <img 
                            src={product.image || "https://picsum.photos/150?random=1"} 
                            alt={product.name} 
                            className='w-20 h-24 object-cover mr-4 rounded shadow-sm border border-gray-100' 
                        />
                        <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Size: <span className="font-bold text-gray-700 uppercase">{product.size}</span> | Color: <span className="font-bold text-gray-700">{product.color}</span>
                            </p>
                            <div className="flex items-center mt-3">
                                <button 
                                    onClick={() => updateQuantity(product.productId, product.size, product.color, product.quantity - 1)}
                                    className="border border-gray-200 rounded px-2.5 py-0.5 font-bold text-gray-600 hover:bg-gray-50 active:scale-95 transition"
                                >
                                    -
                                </button>
                                <span className='mx-3 font-semibold text-sm w-4 text-center'>{product.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(product.productId, product.size, product.color, product.quantity + 1)}
                                    className="border border-gray-200 rounded px-2.5 py-0.5 font-bold text-gray-600 hover:bg-gray-50 active:scale-95 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between h-24">
                        <p className="font-bold text-gray-900">${(product.price * product.quantity).toLocaleString()}</p>
                        <button 
                            onClick={() => removeFromCart(product.productId, product.size, product.color)}
                            title="Remove item"
                            className="hover:scale-105 active:scale-95 transition"
                        >
                            <RiDeleteBin3Line className='h-5 w-5 text-red-500 hover:text-red-600'/>
                        </button>
                    </div>
                </div>
            ))}
            
            <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span className="font-semibold text-gray-700">Subtotal:</span>
                <span className="text-xl font-bold text-black">${totalPrice.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default CartContents;