import React from "react";
import {TbBrandMeta} from "react-icons/tb"
import {IoLogoInstagram} from "react-icons/io"
import {RiTwitterXLine} from "react-icons/ri"

const Topbar = () => {
  return (
    <div className="bg-slate-950 text-slate-300 text-[11px] font-medium border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-4 sm:px-6">
        <div className="hidden md:flex items-center space-x-3">
            <a href="#" className="hover:text-white transition-colors p-1">
              <TbBrandMeta className="h-3.5 w-3.5"/>
            </a>
            <a href="#" className="hover:text-white transition-colors p-1">
              <IoLogoInstagram className="h-3.5 w-3.5"/>
            </a>
            <a href="#" className="hover:text-white transition-colors p-1">
              <RiTwitterXLine className="h-3.5 w-3.5"/>
            </a>
        </div>
        <div className="text-center flex-grow font-semibold tracking-wider uppercase text-[10px] text-slate-200">
            <span>FREE EXPRESS SHIPPING ON ALL ORDERS OVER $100</span>
        </div>
        <div className="hidden md:block font-mono text-[11px] text-slate-400">
            <a href="tel:+18005554973" className="hover:text-white transition-colors">
                +1 (800) 555-HYPE
            </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;


