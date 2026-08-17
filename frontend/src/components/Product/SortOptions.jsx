import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) =>{
    const sortBy = e.target.value;
    searchParams.set("sortBy",sortBy)
    setSearchParams(searchParams)
  }
  return (
    <div className="flex items-center justify-end">
      <div className="relative">
        <select
          id='sort'
          onChange={handleSortChange}
          value={searchParams.get("sortBy") || ""}
          className='bg-white text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200 px-3.5 py-2 rounded-xl focus:outline-none focus:border-slate-950 cursor-pointer shadow-xs'
        >
          <option value="" className="bg-white text-slate-800">Sort By: Default</option>
          <option value="priceAsc" className="bg-white text-slate-800">Price: Low to High</option>
          <option value="priceDesc" className="bg-white text-slate-800">Price: High to Low</option>
          <option value="popularity" className="bg-white text-slate-800">Popularity</option>
        </select>
      </div>
    </div>
  )
}

export default SortOptions

