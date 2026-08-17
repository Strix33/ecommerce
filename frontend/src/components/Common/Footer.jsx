import React from 'react'
import {Link} from 'react-router-dom'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className='border-t border-slate-200 bg-slate-950 pt-14 pb-10 text-slate-300'>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-4 sm:px-6">
            <div>
                <Link to="/" className="text-2xl font-black tracking-tight text-white uppercase font-heading inline-block mb-3">
                    HYPEWEAR
                </Link>
                <p className='text-slate-400 text-xs leading-relaxed mb-4 font-normal'>
                    Subscribe to receive early drop announcements, subscriber-only offers, and urban style updates.
                </p>
                <p className='font-bold text-xs text-white mb-3'>
                    Get 15% OFF your first order.
                </p>
                <form className='flex' onSubmit={(e) => e.preventDefault()}>
                    <input 
                      type='email' 
                      placeholder='Enter your email' 
                      className='p-2.5 w-full text-xs bg-slate-900 border border-slate-800 rounded-l-xl focus:outline-none focus:border-slate-700 text-white placeholder-slate-500' 
                      required
                    />
                    <button 
                      type='submit' 
                      className='bg-white text-slate-950 font-bold px-4 text-xs rounded-r-xl uppercase tracking-wider hover:bg-slate-200 transition-colors'
                    >
                      Subscribe
                    </button>
                </form>
            </div>
            
            <div>
                <h3 className="text-xs font-bold uppercase font-heading tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
                    Shop Categories
                </h3>
                <ul className='space-y-2.5 text-xs text-slate-400 font-medium'>
                    <li>
                        <Link to="/collection/all?category=Top Wear&gender=Men" className='hover:text-white transition-colors'>Men's Top Wear</Link>
                    </li>
                    <li>
                        <Link to="/collection/all?category=Top Wear&gender=Women" className='hover:text-white transition-colors'>Women's Top Wear</Link>
                    </li>
                    <li>
                        <Link to="/collection/all?category=Bottom Wear&gender=Men" className='hover:text-white transition-colors'>Men's Bottom Wear</Link>
                    </li>
                    <li>
                        <Link to="/collection/all?category=Bottom Wear&gender=Women" className='hover:text-white transition-colors'>Women's Bottom Wear</Link>
                    </li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-xs font-bold uppercase font-heading tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
                    Customer Care
                </h3>
                <ul className='space-y-2.5 text-xs text-slate-400 font-medium'>
                    <li>
                        <Link to="#" className='hover:text-white transition-colors'>Order Status</Link>
                    </li>
                    <li>
                        <Link to="#" className='hover:text-white transition-colors'>Shipping & Delivery</Link>
                    </li>
                    <li>
                        <Link to="#" className='hover:text-white transition-colors'>Returns & Exchanges</Link>
                    </li>
                    <li>
                        <Link to="#" className='hover:text-white transition-colors'>Size & Fit Guide</Link>
                    </li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-xs font-bold uppercase font-heading tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
                    Social Connection
                </h3>
                <div className="flex items-center space-x-2.5 mb-5">
                    <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors'>
                      <TbBrandMeta className='h-4 w-4'/>
                    </a>
                    <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors'>
                      <IoLogoInstagram className='h-4 w-4'/>
                    </a>
                    <a href='https://x.com' target='_blank' rel='noopener noreferrer' className='p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors'>
                      <RiTwitterXLine className='h-4 w-4'/>
                    </a>
                </div>
                <p className='text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1'>Support Line</p>
                <p className='text-xs font-mono text-slate-200 flex items-center font-semibold'><FiPhoneCall className='inline-block mr-2 text-slate-400'/>+1 (800) 555-HYPE</p>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 HYPEWEAR Inc. All Rights Reserved.</p>
            <div className="flex space-x-6 text-[11px]">
                <a href="#" className="hover:text-slate-400">Privacy Policy</a>
                <a href="#" className="hover:text-slate-400">Terms of Service</a>
                <a href="#" className="hover:text-slate-400">Cookie Preferences</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
