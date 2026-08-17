import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () =>{
        navigate("/");
    };
  return (
    <div className="p-5">
        <div className="mb-6 border-b border-slate-800 pb-4">
            <Link to="/admin" className='text-xl font-black uppercase font-heading tracking-tight text-white block'>
                HYPEWEAR
            </Link>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">Admin Control Panel</span>
        </div>

        <nav className="flex flex-col space-y-1">
            <NavLink to="/admin" end className={({isActive}) =>
                isActive?"bg-slate-800 text-white py-2.5 px-3.5 rounded-xl flex items-center space-x-3 font-bold text-xs uppercase tracking-wider"
                :"text-slate-400 hover:bg-slate-900 hover:text-white py-2.5 px-3.5 rounded-xl flex items-center space-x-3 font-medium text-xs uppercase tracking-wider transition-colors" 
            }>
                <FaStore className="h-4 w-4 text-slate-400"/>
                <span>Dashboard Overview</span>
            </NavLink>

            <NavLink to="/admin/users" className={({isActive}) =>
                isActive?"bg-slate-800 text-white py-2.5 px-3.5 rounded-xl flex items-center space-x-3 font-bold text-xs uppercase tracking-wider"
                :"text-slate-400 hover:bg-slate-900 hover:text-white py-2.5 px-3.5 rounded-xl flex items-center space-x-3 font-medium text-xs uppercase tracking-wider transition-colors" 
            }>
                <FaUser className="h-4 w-4 text-slate-400"/>
                <span>User Roster</span>
            </NavLink>

            <NavLink to="/admin/products" className={({isActive}) =>
                isActive?"bg-slate-800 text-white py-2.5 px-3.5 rounded-xl flex items-center space-x-3 font-bold text-xs uppercase tracking-wider"
                :"text-slate-400 hover:bg-slate-900 hover:text-white py-2.5 px-3.5 rounded-xl flex items-center space-x-3 font-medium text-xs uppercase tracking-wider transition-colors" 
            }>
                <FaBoxOpen className="h-4 w-4 text-slate-400"/>
                <span>Product Inventory</span>
            </NavLink>

            <NavLink to="/admin/orders" className={({isActive}) =>
                isActive?"bg-slate-800 text-white py-2.5 px-3.5 rounded-xl flex items-center space-x-3 font-bold text-xs uppercase tracking-wider"
                :"text-slate-400 hover:bg-slate-900 hover:text-white py-2.5 px-3.5 rounded-xl flex items-center space-x-3 font-medium text-xs uppercase tracking-wider transition-colors" 
            }>
                <FaClipboardList className="h-4 w-4 text-slate-400"/>
                <span>Orders Queue</span>
            </NavLink>

            <NavLink to="/" className="text-slate-400 hover:bg-slate-900 hover:text-white py-2.5 px-3.5 rounded-xl flex items-center space-x-3 font-medium text-xs uppercase tracking-wider transition-colors mt-3 border-t border-slate-800 pt-3">
                <FaStore className="h-4 w-4 text-slate-400"/>
                <span>Back to Storefront</span>
            </NavLink>
        </nav>
        
        <div className="mt-6 pt-3 border-t border-slate-800">
            <button onClick={handleLogout} className='w-full bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 py-2.5 px-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors'>
                <FaSignOutAlt className="h-3.5 w-3.5"/>
                <span>Exit Dashboard</span>
            </button>
        </div>
    </div>
  )
}

export default AdminSidebar
