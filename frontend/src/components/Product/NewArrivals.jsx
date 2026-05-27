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
        const scrollAmount = direction === "left" ? -300 : 300;
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
        <section className='py-16 px-4 lg:px-0'>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl font-bold mb-4">
                    Explore New Arrivals
                </h2>
                <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion. 
                </p>
                <div className="absolute right-0 bottom-[-30px] flex space-x-2 z-10">
                    <button 
                        onClick={() => scroll("left")} 
                        disabled={!canScrollLeft} 
                        className={`p-2 rounded border transition ${canScrollLeft ? "bg-white text-black hover:bg-gray-50" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                    >
                        <FiChevronLeft className='text-2xl'/>
                    </button>
                    <button 
                        onClick={() => scroll("right")} 
                        disabled={!canScrollRight}
                        className={`p-2 rounded border transition ${canScrollRight ? "bg-white text-black hover:bg-gray-50" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                    >
                        <FiChevronRight className='text-2xl'/>
                    </button>
                </div>
            </div>
            
            <div 
                ref={scrollRef}
                className={`container mx-auto overflow-x-scroll flex space-x-6 relative pb-4 select-none scrollbar-hide ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} 
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {arrivalProducts.map((product) => (
                    <div key={product._id} className='min-w-[80%] sm:min-w-[45%] lg:min-w-[30%] relative group overflow-hidden rounded-lg shadow-sm border border-gray-100 bg-white'>
                        <img 
                            src={product.images && product.images.length > 0 ? product.images[0].url : "https://picsum.photos/500/500?random=1"}
                            alt={product.images && product.images.length > 0 ? product.images[0].alt : product.name} 
                            className='w-full h-[450px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-500'
                            draggable="false"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.6)] to-transparent text-white p-6 rounded-b-lg">
                            <Link to={`/product/${product._id}`} className='block'>
                                <h4 className="font-semibold text-lg hover:underline transition-all line-clamp-1">
                                    {product.name}
                                </h4>
                                <p className='mt-1 text-red-400 font-bold'>${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewArrivals;