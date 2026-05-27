import React, { useContext, useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollectionCenter from '../components/Product/GenderCollectionCenter';
import NewArrivals from '../components/Product/NewArrivals';
import ProductGrid from '../components/Product/ProductGrid';
import FeaturedCollection from '../components/Product/FeaturedCollection';
import FeaturesSection from '../components/Product/FeaturesSection';
import { ProductContext } from '../context/ProductContext';

const Home = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [womenTopWears, setWomenTopWears] = useState([]);
    const [loading, setLoading] = useState(true);

    const { fetchHomePromotions } = useContext(ProductContext);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                // Fetch best sellers
                const bsData = await fetchHomePromotions("best-sellers");
                setBestSellers(bsData);

                // Fetch Women's Top Wear for the bottom section
                const response = await fetch("http://localhost:9000/api/products?gender=Women&category=Top Wear&limit=4");
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
        <div>
            <Hero />
            <GenderCollectionCenter />
            
            <NewArrivals />

            <div className="container mx-auto py-12 px-6">
                <h2 className='text-3xl text-center font-bold mb-8 uppercase tracking-wider'>
                    Best Sellers
                </h2>
                {loading ? (
                    <div className="text-center py-6 text-gray-500">Loading best sellers...</div>
                ) : (
                    <ProductGrid products={bestSellers} />
                )}
            </div>

            <div className="container mx-auto py-12 px-6">
                <h2 className="text-3xl text-center font-bold mb-8 uppercase tracking-wider">
                    Top Wears for Women
                </h2>
                {loading ? (
                    <div className="text-center py-6 text-gray-500">Loading women apparel...</div>
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