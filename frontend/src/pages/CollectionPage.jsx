import React, { useEffect, useRef, useState, useContext } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/Product/FilterSidebar";
import SortOptions from "../components/Product/SortOptions";
import ProductGrid from "../components/Product/ProductGrid";
import { ProductContext } from "../context/ProductContext";

const CollectionPage = () => {
    const { products, totalPages, currentPage, loading, fetchProducts } = useContext(ProductContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        
        const filters = {
            category: params.category || "",
            gender: params.gender || "",
            collection: params.collection || "",
            color: params.color || "",
            size: params.size || "",
            minPrice: params.minPrice || "",
            maxPrice: params.maxPrice || "",
            search: params.search || "",
            sortBy: params.sortBy || "",
            page: params.page || 1,
            limit: 8
        };

        fetchProducts(filters);
    }, [searchParams]);

    const handlePageChange = (pageNumber) => {
        searchParams.set("page", pageNumber);
        setSearchParams(searchParams);
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 py-8 gap-8 relative">
            {/* Mobile filter button */}
            <button 
                onClick={toggleSidebar} 
                className="lg:hidden w-full p-3.5 flex justify-center items-center rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-white border border-slate-200 shadow-xs"
            >
                <FaFilter className="mr-2 text-slate-600"/> Filter Apparel
            </button>

            {/* Desktop Filter Sidebar (Static Flow) */}
            <div className="hidden lg:block w-72 flex-shrink-0">
                <FilterSidebar />
            </div>

            {/* Mobile Filter Drawer Overlay & Panel (< lg screens) */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <div 
                ref={sidebarRef} 
                className={`fixed top-0 left-0 bottom-0 z-40 w-80 max-w-[85vw] bg-white p-5 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
                }`}
            >
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                    <span className="text-sm font-black uppercase font-heading text-slate-950">Filters</span>
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-950 transition-colors"
                    >
                        <IoMdClose className="h-5 w-5"/>
                    </button>
                </div>
                <FilterSidebar />
            </div>

            {/* Main Product Catalog Section */}
            <div className="flex-grow min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 border-b border-slate-200 pb-4 gap-4">
                    <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
                            CURATED COLLECTION
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 font-heading">
                            {searchParams.get("gender") ? `${searchParams.get("gender")}'s Collection` : searchParams.get("category") ? searchParams.get("category") : "All Apparel"}
                        </h2>
                    </div>
                    {/* Sort Option */}
                    <SortOptions />
                </div>

                {/* Product grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-950"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 text-xs clean-card rounded-2xl p-8">
                        No products found matching your active filters.
                    </div>
                ) : (
                    <div>
                        <ProductGrid products={products} />

                        {/* Pagination UI */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-10">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                                            currentPage === index + 1
                                                ? "bg-slate-950 text-white shadow-xs"
                                                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionPage;

