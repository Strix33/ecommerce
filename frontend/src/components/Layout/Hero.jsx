import heroImg from "../../assets/rabbit-hero.webp"
import {Link} from 'react-router-dom'
import { HiArrowUpRight } from 'react-icons/hi2'

const Hero = () => {
  return (
    <section className="py-4 sm:py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden shadow-md group border border-slate-200">
            <img 
              src={heroImg} 
              alt="HYPEWEAR Collection" 
              className="w-full h-[450px] sm:h-[550px] md:h-[650px] object-cover object-center brightness-95 group-hover:scale-102 transition-transform duration-500 ease-out"
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end">
                <div className="p-6 sm:p-10 md:p-14 max-w-2xl">
                    <span className="inline-block px-3 py-1 rounded-md bg-white/90 text-slate-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
                        NEW SEASON 2026
                    </span>
                    
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase font-heading text-white leading-tight mb-4">
                        HIGH STREETWEAR <br />
                        ESSENTIALS
                    </h1>
                    
                    <p className="text-slate-200 text-xs sm:text-sm md:text-base mb-6 max-w-lg font-medium leading-relaxed">
                        Discover minimalist silhouettes, premium heavyweight cottons, and versatile everyday urban apparel.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                        <Link 
                          to="/collection/all" 
                          className="px-6 py-3 rounded-xl bg-white text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-slate-100 transition-all flex items-center gap-2 shadow-sm"
                        >
                            Shop Collection <HiArrowUpRight className="h-4 w-4"/>
                        </Link>
                        <Link 
                          to="/collection/all?category=Top Wear" 
                          className="px-6 py-3 rounded-xl bg-slate-900/80 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-900 transition-all"
                        >
                            Browse Top Wear
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero
