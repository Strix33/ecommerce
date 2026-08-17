import React, { useContext } from 'react'
import { RiDeleteBin3Line } from "react-icons/ri";
import { CartContext } from '../../context/CartContext';

const CartContents = () => {
    const { cartItems, updateQuantity, removeFromCart, totalPrice } = useContext(CartContext);

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-16 text-slate-500 font-medium text-xs">
                Your cart is empty.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {cartItems.map((product, index) => (
                <div key={index} className="flex items-start justify-between p-3.5 rounded-2xl clean-card">
                    <div className="flex items-start">
                        <img 
                            src={product.image || "https://picsum.photos/150?random=1"} 
                            alt={product.name} 
                            className='w-14 h-16 object-cover mr-3 rounded-xl border border-slate-200' 
                        />
                        <div>
                            <h3 className="font-bold text-slate-950 text-xs line-clamp-1">{product.name}</h3>
                            <p className="text-[10px] text-slate-500 mt-1">
                                Size: <span className="font-bold text-slate-900">{product.size}</span> | Color: <span className="font-bold text-slate-900">{product.color}</span>
                            </p>
                            <div className="flex items-center mt-2.5 space-x-2">
                                <button 
                                    onClick={() => updateQuantity(product.productId, product.size, product.color, product.quantity - 1)}
                                    className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 font-bold text-slate-800 hover:bg-slate-200 flex items-center justify-center text-xs transition"
                                >
                                    -
                                </button>
                                <span className='font-bold text-xs w-4 text-center text-slate-950'>{product.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(product.productId, product.size, product.color, product.quantity + 1)}
                                    className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 font-bold text-slate-800 hover:bg-slate-200 flex items-center justify-center text-xs transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between h-16">
                        <p className="font-black text-slate-950 text-xs">${(product.price * product.quantity).toLocaleString()}</p>
                        <button 
                            onClick={() => removeFromCart(product.productId, product.size, product.color)}
                            title="Remove item"
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 transition-colors"
                        >
                            <RiDeleteBin3Line className='h-4 w-4'/>
                        </button>
                    </div>
                </div>
            ))}
            
            <div className="mt-4 flex justify-between items-center p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-700">Subtotal:</span>
                <span className="text-base font-black text-slate-950">${totalPrice.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default CartContents;
