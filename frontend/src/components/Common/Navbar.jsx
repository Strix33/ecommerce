import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import Searchbar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

    const { user } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    }

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <>
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                <div>
                    <Link to="/" className="text-2xl font-medium tracking-tight">
                        Rabbit
                    </Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link to="/collection/all?gender=Men" className="text-gray-700 hover:text-black text-sm font-medium uppercase">men</Link>
                    <Link to="/collection/all?gender=Women" className="text-gray-700 hover:text-black text-sm font-medium uppercase">women</Link>
                    <Link to="/collection/all?category=Top Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Top wear</Link>
                    <Link to="/collection/all?category=Bottom Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">bottom wear</Link>
                </div>
                <div className="flex items-center space-x-4">
                    {user && user.role === "admin" && (
                        <Link to="/admin" className='block bg-black px-2.5 py-1 rounded text-xs text-white uppercase tracking-wider hover:bg-gray-800 transition'>
                            Admin
                        </Link>
                    )}
                    <Link to={user ? "/profile" : "/login"} className="hover:text-black flex items-center gap-1.5" title={user ? "View Profile" : "Login"}>
                        <HiOutlineUser className="h-6 w-6 text-gray-700"/>
                        {user && <span className="hidden sm:inline text-xs text-gray-500 font-medium">Hi, {user.name.split(" ")[0]}</span>}
                    </Link>
                    <button onClick={toggleCartDrawer} className="relative hover:text-black">
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700"/>
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-[#ea2e0e] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <div className="overflow-hidden">
                        <Searchbar />
                    </div>
                    <button onClick={toggleNavDrawer} className="md:hidden">
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700"/>
                    </button>
                </div>
            </nav>
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
            
            {/* Mobile Nav Drawer */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className='h-6 w-6 text-gray-600'/>
                    </button>
                </div>
                <div className="p-4">
                    <h2 className='text-xl font-semibold mb-4 '>Menu</h2>
                    <nav className='space-y-4'>
                        <Link to="/collection/all?gender=Men" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Men</Link>
                        <Link to="/collection/all?gender=Women" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Women</Link>
                        <Link to="/collection/all?category=Top Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Top Wear</Link>
                        <Link to="/collection/all?category=Bottom Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Bottom Wear</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar;