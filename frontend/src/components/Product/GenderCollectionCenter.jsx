import React from 'react'
import mensCollectionImage from "../../assets/mens-collection.webp"
import womensCollectionImage from "../../assets/womens-collection.webp"
import { Link } from 'react-router-dom'
import { HiArrowUpRight } from 'react-icons/hi2'

const GenderCollectionCenter = () => {
  return (
    <section className='py-12 px-4 sm:px-6 max-w-7xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Women's Collection Card */}
        <div className='relative group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm'>
          <img 
            src={womensCollectionImage} 
            alt="Women's Collection" 
            className='w-full h-[450px] lg:h-[550px] object-cover brightness-95 group-hover:scale-102 transition-transform duration-500 ease-out'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6 sm:p-8'>
            <div className='bg-white/95 p-6 rounded-2xl border border-slate-200 w-full shadow-md backdrop-blur-md'>
              <span className='text-[10px] font-bold tracking-wider text-slate-600 uppercase px-2.5 py-1 rounded bg-slate-100 mb-2 inline-block'>
                WOMEN
              </span>
              <h2 className='text-xl sm:text-2xl font-black text-slate-950 uppercase font-heading tracking-tight mb-1'>
                Women's Apparel
              </h2>
              <Link 
                to="/collection/all?gender=Women" 
                className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-slate-600 transition-colors mt-2'
              >
                Shop Women <HiArrowUpRight className="h-4 w-4"/>
              </Link>
            </div>
          </div>
        </div>

        {/* Men's Collection Card */}
        <div className='relative group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm'>
          <img 
            src={mensCollectionImage} 
            alt="Men's Collection" 
            className='w-full h-[450px] lg:h-[550px] object-cover brightness-95 group-hover:scale-102 transition-transform duration-500 ease-out'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6 sm:p-8'>
            <div className='bg-white/95 p-6 rounded-2xl border border-slate-200 w-full shadow-md backdrop-blur-md'>
              <span className='text-[10px] font-bold tracking-wider text-slate-600 uppercase px-2.5 py-1 rounded bg-slate-100 mb-2 inline-block'>
                MEN
              </span>
              <h2 className='text-xl sm:text-2xl font-black text-slate-950 uppercase font-heading tracking-tight mb-1'>
                Men's Apparel
              </h2>
              <Link 
                to="/collection/all?gender=Men" 
                className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-slate-600 transition-colors mt-2'
              >
                Shop Men <HiArrowUpRight className="h-4 w-4"/>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default GenderCollectionCenter
