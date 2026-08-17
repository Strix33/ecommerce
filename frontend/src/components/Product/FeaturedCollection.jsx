import React from 'react'
import { Link } from 'react-router-dom'
import featured from "../../assets/featured.webp"
import { HiArrowUpRight } from 'react-icons/hi2'

const FeaturedCollection = () => {
  return (
    <section className='py-12 px-4 sm:px-6 max-w-7xl mx-auto'>
        <div className="flex flex-col-reverse lg:flex-row items-center rounded-3xl overflow-hidden clean-card shadow-xs">
            {/* Left Content */}
            <div className="lg:w-1/2 p-8 sm:p-12 lg:p-14">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 mb-4 inline-block">
                  EDITORIAL FEATURE
              </span>
              <h2 className='text-2xl sm:text-4xl font-black uppercase font-heading text-slate-950 tracking-tight mb-4 leading-tight'>
                  HIGH STREET COMFORT & UNMATCHED CUTS
              </h2>
              <p className='text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed'>
                  Engineered with heavyweight organic cottons and precision tailored fits. Designed for timeless versatility and structured urban everyday wear.
              </p>
              <Link 
                to="/collection/all" 
                className='inline-flex items-center gap-2 bg-slate-950 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-800 transition-all shadow-xs'
              >
                  Shop Featured Drops <HiArrowUpRight className="h-4 w-4"/>
              </Link>
            </div>
            {/* Right Image */}
            <div className="lg:w-1/2 w-full h-[350px] lg:h-[480px] relative overflow-hidden bg-slate-100">
              <img 
                src={featured} 
                alt="Featured HYPEWEAR Collection"
                className='w-full h-full object-cover brightness-95 hover:scale-102 transition-transform duration-500 ease-out'
              />
            </div>
        </div>
    </section>
  )
}

export default FeaturedCollection
