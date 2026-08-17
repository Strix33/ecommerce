import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

const FeaturesSection = () => {
  return (
    <section className='py-12 px-4 sm:px-6 max-w-7xl mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl clean-card shadow-xs group">
                <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 mb-4 group-hover:scale-105 transition-transform">
                    <HiShoppingBag className='text-2xl'/>
                </div>
                <h4 className="font-bold text-xs uppercase font-heading tracking-wider text-slate-950 mb-1.5">FREE EXPRESS SHIPPING</h4>
                <p className='text-slate-500 text-xs leading-relaxed max-w-xs'>
                    On all global orders over $100.00 with real-time tracking
                </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl clean-card shadow-xs group">
                <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 mb-4 group-hover:scale-105 transition-transform">
                    <HiArrowPathRoundedSquare className='text-2xl'/>
                </div>
                <h4 className="font-bold text-xs uppercase font-heading tracking-wider text-slate-950 mb-1.5">45 DAYS HASSLE-FREE RETURNS</h4>
                <p className='text-slate-500 text-xs leading-relaxed max-w-xs'>
                    100% money back guarantee with easy return pickup
                </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl clean-card shadow-xs group">
                <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 mb-4 group-hover:scale-105 transition-transform">
                    <HiOutlineCreditCard className='text-2xl'/>
                </div>
                <h4 className="font-bold text-xs uppercase font-heading tracking-wider text-slate-950 mb-1.5">ENCRYPTED CHECKOUT</h4>
                <p className='text-slate-500 text-xs leading-relaxed max-w-xs'>
                    256-Bit SSL security & multi-currency payment gates
                </p>
            </div>
        </div>
    </section>
  )
}

export default FeaturesSection
