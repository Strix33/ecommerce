import React, { useEffect, useRef, useState, useContext } from "react";
import { FaFilter } from "react-icons/fa";
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

    // Listen to changes in searchParams and load matching products
    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        
        // Map search parameters to backend filters
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
            limit: 8 // default items per page
        };

        fetchProducts(filters);
    }, [searchParams]);

    const handlePageChange = (pageNumber) => {
        searchParams.set("page", pageNumber);
        setSearchParams(searchParams);
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 py-8 gap-8">
            {/* Mobile filter button */}
            <button 
                onClick={toggleSidebar} 
                className="lg:hidden w-full border p-3 flex justify-center items-center rounded-lg font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50 transition"
            >
                <FaFilter className="mr-2"/> Filters
            </button>

            {/* Filter Sidebar */}
            <div 
                ref={sidebarRef} 
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 border-r border-gray-100 pr-4`}
            >
                <FilterSidebar />
            </div>

            <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-800">
                        {searchParams.get("gender") ? `${searchParams.get("gender")}'s Collection` : "All Apparel"}
                    </h2>
                    {/* Sort Option */}
                    <SortOptions />
                </div>

                {/* Product grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-24 text-gray-500 font-medium">
                        No products found matching those filters. Try clearing some selections!
                    </div>
                ) : (
                    <div>
                        <ProductGrid products={products} />

                        {/* Pagination UI */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-12">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 border rounded-md transition ${
                                            currentPage === index + 1
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
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