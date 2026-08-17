import React from "react";
import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handlesearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collection/all?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 ${
        isOpen ? "fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md h-20 z-50 border-b border-slate-200 px-6 shadow-sm" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form onSubmit={handlesearch} className="relative flex justify-center w-full max-w-xl items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search apparel, products, & styles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="bg-slate-100 text-slate-900 border border-slate-300 px-4 py-2.5 pl-11 pr-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white placeholder:text-slate-400 text-xs w-full transition-all"
            />
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white font-bold px-3 py-1 rounded-lg text-xs hover:bg-slate-800 transition-colors"
            >
              Search
            </button>
          </div>
          <button
            type="button"
            onClick={handleSearchToggle}
            className="ml-3 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <HiMiniXMark className="h-5 w-5" />
          </button>
        </form>
      ) : (
        <button 
          onClick={handleSearchToggle}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-colors"
          title="Search Products"
        >
          <HiMagnifyingGlass className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;


