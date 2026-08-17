import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);
  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, Number(params.maxPrice) || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };
    
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = (newFilters[name] || []).filter((item) => item !== value);
      }
    } else {
      if (newFilters[name] === value) {
        newFilters[name] = "";
      } else {
        newFilters[name] = value;
      }
    }
    
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleColorClick = (color) => {
    const newFilters = { ...filters, color: filters.color === color ? "" : color };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key])) {
        if (newFilters[key].length > 0) {
          params.set(key, newFilters[key].join(","));
        } else {
          params.delete(key);
        }
      } else if (newFilters[key] !== "" && newFilters[key] !== null && newFilters[key] !== undefined) {
        params.set(key, newFilters[key]);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  }

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, Number(newPrice)]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: Number(newPrice) };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleClearAll = () => {
    const cleared = {
      category: "",
      gender: "",
      color: "",
      size: [],
      material: [],
      brand: [],
      minPrice: 0,
      maxPrice: 100,
    };
    setFilters(cleared);
    setPriceRange([0, 100]);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="p-6 clean-card rounded-3xl text-slate-800">
      <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
        <h3 className="text-sm font-black uppercase tracking-wider font-heading text-slate-950">Filters</h3>
        <button 
          onClick={handleClearAll}
          className="text-xs text-rose-600 font-bold uppercase tracking-wider hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-5 border-b border-slate-100 pb-4">
        <label className='block text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider'>Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2 cursor-pointer" onClick={() => handleFilterChange({ target: { name: 'category', value: category, type: 'radio' } })}>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2.5 transition-colors ${filters.category === category ? "border-slate-950 bg-slate-950" : "border-slate-300 bg-white"}`}>
              {filters.category === category && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className={`text-xs font-medium ${filters.category === category ? "text-slate-950 font-bold" : "text-slate-600"}`}>{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-5 border-b border-slate-100 pb-4">
        <label className='block text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider'>Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-2 cursor-pointer" onClick={() => handleFilterChange({ target: { name: 'gender', value: gender, type: 'radio' } })}>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2.5 transition-colors ${filters.gender === gender ? "border-slate-950 bg-slate-950" : "border-slate-300 bg-white"}`}>
              {filters.gender === gender && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className={`text-xs font-medium ${filters.gender === gender ? "text-slate-950 font-bold" : "text-slate-600"}`}>{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-5 border-b border-slate-100 pb-4">
        <label className='block text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider'>Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorClick(color)}
              className={`w-6 h-6 rounded-full border border-slate-300 cursor-pointer transition-all hover:scale-105
                ${filters.color === color ? "ring-2 ring-slate-950 ring-offset-2 border-slate-950" : ""}`}
              style={{ backgroundColor: color.toLowerCase() === 'white' ? '#FFFFFF' : color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Size filter */}
      <div className="mb-5 border-b border-slate-100 pb-4">
        <label className='block text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider'>Size</label>
        <div className="grid grid-cols-3 gap-1.5">
          {sizes.map((size) => {
            const isSelected = filters.size.includes(size);
            return (
              <label 
                key={size} 
                className={`flex items-center justify-center p-2 rounded-lg border text-xs font-bold cursor-pointer transition-all ${isSelected ? "bg-slate-950 text-white border-slate-950" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"}`}
              >
                <input
                  type='checkbox'
                  name='size'
                  value={size}
                  onChange={handleFilterChange}
                  checked={isSelected}
                  className='hidden'
                />
                <span>{size}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Material filter */}
      <div className="mb-5 border-b border-slate-100 pb-4">
        <label className='block text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider'>Material</label>
        <div className="space-y-1.5">
          {materials.map((mat) => {
            const isChecked = filters.material.includes(mat);
            return (
              <label key={mat} className="flex items-center cursor-pointer">
                <input
                  type='checkbox'
                  name='material'
                  value={mat}
                  onChange={handleFilterChange}
                  checked={isChecked}
                  className='mr-2.5 h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900'
                />
                <span className={`text-xs ${isChecked ? "text-slate-950 font-bold" : "text-slate-600"}`}>{mat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Brand filter */}
      <div className="mb-5 border-b border-slate-100 pb-4">
        <label className='block text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider'>Brand</label>
        <div className="space-y-1.5">
          {brands.map((brand) => {
            const isChecked = filters.brand.includes(brand);
            return (
              <label key={brand} className="flex items-center cursor-pointer">
                <input
                  type='checkbox'
                  name='brand'
                  value={brand}
                  onChange={handleFilterChange}
                  checked={isChecked}
                  className='mr-2.5 h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900'
                />
                <span className={`text-xs ${isChecked ? "text-slate-950 font-bold" : "text-slate-600"}`}>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className='block text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider'>
          Max Price: <span className="text-slate-950 font-black">${priceRange[1]}</span>
        </label>
        <input 
          type="range" 
          name='priceRange' 
          min={0} 
          max={100} 
          value={priceRange[1]} 
          onChange={handlePriceChange}
          className='w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-950'
        />
        <div className="flex justify-between text-slate-500 font-semibold text-[10px] mt-1.5">
          <span>$0</span>
          <span>$100</span>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar;
