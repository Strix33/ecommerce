import React, { useEffect, useState, useRef, useContext } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [arrivalProducts, setArrivalProducts] = useState([]);
    
    const { fetchHomePromotions } = useContext(ProductContext);

    useEffect(() => {
        const getArrivals = async () => {
            const data = await fetchHomePromotions("new-arrivals");
            setArrivalProducts(data);
        };
        getArrivals();
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    }

    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -320 : 320;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > (leftScroll + container.clientWidth + 1);

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    }

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener("scroll", updateScrollButtons);
        }
    }, [arrivalProducts]);

    if (arrivalProducts.length === 0) return null;

    return (
        <section className='py-12 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden'>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
                <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                        SEASONAL HIGHLIGHTS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase font-heading text-slate-950 tracking-tight">
                        New Arrivals
                    </h2>
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => scroll("left")} 
                        disabled={!canScrollLeft} 
                        className={`p-2.5 rounded-xl border transition-all ${canScrollLeft ? "bg-white border-slate-200 text-slate-800 hover:bg-slate-950 hover:text-white shadow-xs" : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"}`}
                    >
                        <FiChevronLeft className='text-lg'/>
                    </button>
                    <button 
                        onClick={() => scroll("right")} 
                        disabled={!canScrollRight}
                        className={`p-2.5 rounded-xl border transition-all ${canScrollRight ? "bg-white border-slate-200 text-slate-800 hover:bg-slate-950 hover:text-white shadow-xs" : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"}`}
                    >
                        <FiChevronRight className='text-lg'/>
                    </button>
                </div>
            </div>
            
            <div 
                ref={scrollRef}
                className={`overflow-x-auto flex space-x-5 pb-4 select-none no-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} 
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {arrivalProducts.map((product) => (
                    <div key={product._id} className='min-w-[260px] sm:min-w-[290px] max-w-[310px] relative group overflow-hidden rounded-2xl clean-card clean-card-hover flex-shrink-0'>
                        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                            <img 
                                src={product.images && product.images.length > 0 ? product.images[0].url : "https://picsum.photos/500/500?random=1"}
                                alt={product.images && product.images.length > 0 ? product.images[0].alt : product.name} 
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
                                draggable="false"
                            />
                            <span className="absolute top-3 left-3 bg-slate-950 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
                                NEW
                            </span>
                        </div>
                        <div className="p-4 bg-white">
                            <Link to={`/product/${product._id}`} className='block group-hover:text-slate-600 transition-colors'>
                                <h4 className="font-bold text-xs text-slate-900 line-clamp-1 mb-1">
                                    {product.name}
                                </h4>
                                <div className="flex items-center justify-between mt-2">
                                    <span className='text-slate-950 font-bold text-sm'>${product.price}</span>
                                    {product.discountPrice && (
                                        <span className='text-slate-400 line-through text-xs'>${product.discountPrice}</span>
                                    )}
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewArrivals;
