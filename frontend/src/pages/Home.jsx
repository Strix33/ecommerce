import React, { useContext, useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollectionCenter from '../components/Product/GenderCollectionCenter';
import NewArrivals from '../components/Product/NewArrivals';
import ProductGrid from '../components/Product/ProductGrid';
import FeaturedCollection from '../components/Product/FeaturedCollection';
import FeaturesSection from '../components/Product/FeaturesSection';
import { ProductContext } from '../context/ProductContext';
import { API_URL } from '../config';

const Home = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [womenTopWears, setWomenTopWears] = useState([]);
    const [loading, setLoading] = useState(true);

    const { fetchHomePromotions } = useContext(ProductContext);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                const bsData = await fetchHomePromotions("best-sellers");
                setBestSellers(bsData);

                const response = await fetch(`${API_URL}/api/products?gender=Women&category=Top Wear&limit=4`);
                if (response.ok) {
                    const data = await response.json();
                    setWomenTopWears(data.products || []);
                }
            } catch (err) {
                console.error("Failed to load Home page dynamic collections:", err);
            } finally {
                setLoading(false);
            }
        };
        loadHomeData();
    }, []);

    return (
        <div className="space-y-4">
            <Hero />
            <GenderCollectionCenter />
            
            <NewArrivals />

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
                <div className="text-center mb-8">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                        MOST POPULAR
                    </span>
                    <h2 className='text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading tracking-tight'>
                        Best Sellers
                    </h2>
                </div>
                {loading ? (
                    <div className="text-center py-12 text-slate-400 text-xs">Loading best sellers...</div>
                ) : (
                    <ProductGrid products={bestSellers} />
                )}
            </div>

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
                <div className="text-center mb-8">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                        FEMALE COLLECTION
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading tracking-tight">
                        Top Wears for Women
                    </h2>
                </div>
                {loading ? (
                    <div className="text-center py-12 text-slate-400 text-xs">Loading women apparel...</div>
                ) : (
                    <ProductGrid products={womenTopWears} />
                )}
            </div>
            
            <FeaturedCollection />
            <FeaturesSection />
        </div>
    );
}

export default Home;
