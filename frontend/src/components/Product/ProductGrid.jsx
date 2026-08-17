import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({ products, customCols }) => {
  return (
    <div className={`grid ${customCols || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"} gap-6 sm:gap-8`}>
        {products.map((product, index)=>(
            <Link key={product._id || index} to={`/product/${product._id}`} className='block group'>
                <div className="clean-card clean-card-hover p-4 sm:p-5 rounded-3xl overflow-hidden">
                    <div className="w-full aspect-[3/4] mb-3.5 overflow-hidden rounded-2xl bg-slate-100 relative">
                         <img 
                            src={product.images && product.images.length > 0 && product.images[0].url ? product.images[0].url : "https://picsum.photos/500/600"} 
                            alt={product.name}
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/500/600?random=" + (index + 1);
                            }}
                         />
                         {product.discountPrice && (
                            <span className="absolute top-3 left-3 bg-slate-950 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg shadow-xs">
                              SALE
                            </span>
                         )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-600 transition-colors line-clamp-1 mb-1.5">{product.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-slate-950 font-black text-base sm:text-lg">
                            ${product.price}
                        </span>
                        {product.brand && (
                          <span className="text-[10px] font-bold text-slate-600 uppercase bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                            {product.brand}
                          </span>
                        )}
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default ProductGrid


