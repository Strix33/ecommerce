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
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
                <nav className="max-w-7xl mx-auto flex justify-between items-center py-3.5 px-4 sm:px-6">
                    <div>
                        <Link to="/" className="text-2xl font-black tracking-tight text-slate-900 font-heading flex items-center gap-2 group">
                            <span className="tracking-tighter text-slate-950 group-hover:text-slate-700 transition-colors">
                                HYPEWEAR
                            </span>
                            <span className="hidden sm:inline-block text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                                OFFICIAL
                            </span>
                        </Link>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-7">
                        <Link to="/collection/all?gender=Men" className="text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors">
                            Men
                        </Link>
                        <Link to="/collection/all?gender=Women" className="text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors">
                            Women
                        </Link>
                        <Link to="/collection/all?category=Top Wear" className="text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors">
                            Top Wear
                        </Link>
                        <Link to="/collection/all?category=Bottom Wear" className="text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors">
                            Bottom Wear
                        </Link>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4">
                        {user && user.role === "admin" && (
                            <Link to="/admin" className='bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition'>
                                Admin
                            </Link>
                        )}
                        <Link to={user ? "/profile" : "/login"} className="text-slate-700 hover:text-slate-950 transition-colors flex items-center gap-1.5" title={user ? "View Profile" : "Login"}>
                            <div className="p-2 rounded-full hover:bg-slate-100 transition">
                                <HiOutlineUser className="h-5 w-5"/>
                            </div>
                            {user && <span className="hidden sm:inline text-xs font-bold text-slate-800">Hi, {user.name.split(" ")[0]}</span>}
                        </Link>
                        <button onClick={toggleCartDrawer} className="relative text-slate-700 hover:text-slate-950 transition-colors p-2 rounded-full hover:bg-slate-100">
                            <HiOutlineShoppingBag className="h-5 w-5"/>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <div className="overflow-hidden">
                            <Searchbar />
                        </div>
                        <button onClick={toggleNavDrawer} className="md:hidden text-slate-700 hover:text-slate-950 p-2">
                            <HiBars3BottomRight className="h-6 w-6"/>
                        </button>
                    </div>
                </nav>
            </header>
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
            
            {/* Mobile Nav Drawer */}
            {navDrawerOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity" onClick={toggleNavDrawer} />
            )}
            <div className={`fixed top-0 left-0 w-4/5 sm:w-80 h-full bg-white border-r border-slate-200 shadow-2xl transform transition-transform duration-300 ease-out z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-between items-center p-5 border-b border-slate-100">
                    <span className="text-lg font-black tracking-tight text-slate-900 font-heading">
                        HYPEWEAR
                    </span>
                    <button onClick={toggleNavDrawer} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900">
                        <IoMdClose className='h-6 w-6'/>
                    </button>
                </div>
                <div className="p-6">
                    <h2 className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-4'>Categories</h2>
                    <nav className='space-y-4'>
                        <Link to="/collection/all?gender=Men" onClick={toggleNavDrawer} className='block text-sm font-semibold text-slate-800 hover:text-slate-950'>Men's Apparel</Link>
                        <Link to="/collection/all?gender=Women" onClick={toggleNavDrawer} className='block text-sm font-semibold text-slate-800 hover:text-slate-950'>Women's Apparel</Link>
                        <Link to="/collection/all?category=Top Wear" onClick={toggleNavDrawer} className='block text-sm font-semibold text-slate-800 hover:text-slate-950'>Top Wear</Link>
                        <Link to="/collection/all?category=Bottom Wear" onClick={toggleNavDrawer} className='block text-sm font-semibold text-slate-800 hover:text-slate-950'>Bottom Wear</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar;
