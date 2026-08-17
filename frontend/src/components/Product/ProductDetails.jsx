import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const { singleProduct, similarProducts, loading, fetchSingleProduct, fetchSimilarProducts } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);

    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        if (id) {
            fetchSingleProduct(id);
            fetchSimilarProducts(id);
            setSelectedSize("");
            setSelectedColor("");
            setQuantity(1);
        }
    }, [id]);

    useEffect(() => {
        if (singleProduct && singleProduct.images && singleProduct.images.length > 0) {
            setMainImage(singleProduct.images[0].url);
        }
    }, [singleProduct]);

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCartClick = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color before adding to cart.", {
                duration: 1500,
            });
            return;
        }

        setIsButtonDisabled(true);
        addToCart(singleProduct, quantity, selectedSize, selectedColor);

        setTimeout(() => {
            toast.success("Product added to cart!", {
                duration: 1500,
            });
            setIsButtonDisabled(false);
        }, 300);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    if (!singleProduct) {
        return (
            <div className="text-center py-24 min-h-screen text-slate-500 font-medium">
                Product details not found or loading failed.
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 py-6 sm:py-10 max-w-7xl mx-auto">
            <div className="clean-card p-6 sm:p-10 rounded-3xl">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Thumbnails List */}
                    <div className="hidden md:flex flex-col space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {singleProduct.images && singleProduct.images.map((image, index) => (
                            <img
                                src={image.url}
                                key={index}
                                alt={image.alt || `Thumbnail ${index}`}
                                className={`w-16 h-20 object-cover rounded-xl cursor-pointer border transition-all ${
                                    mainImage === image.url ? "border-slate-950 ring-2 ring-slate-950/20" : "border-slate-200 opacity-70 hover:opacity-100"
                                }`}
                                onClick={() => setMainImage(image.url)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://picsum.photos/300/400?random=${index + 1}`;
                                }}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="md:w-1/2">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                            <img
                                src={mainImage || "https://picsum.photos/600/800"}
                                alt={singleProduct.name}
                                className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://picsum.photos/600/800";
                                }}
                            />
                        </div>
                    </div>

                    {/* Mobile Thumbnails List */}
                    <div className="md:hidden flex overflow-x-auto space-x-2 py-1 no-scrollbar">
                        {singleProduct.images && singleProduct.images.map((image, index) => (
                            <img
                                src={image.url}
                                key={index}
                                alt={image.alt || `Thumbnail ${index}`}
                                className={`w-14 h-16 object-cover rounded-lg cursor-pointer border flex-shrink-0 ${
                                    mainImage === image.url ? "border-slate-950 ring-2 ring-slate-950/20" : "border-slate-200 opacity-70"
                                }`}
                                onClick={() => setMainImage(image.url)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://picsum.photos/300/400?random=${index + 1}`;
                                }}
                            />
                        ))}
                    </div>

                    {/* Right Side Info Section */}
                    <div className="md:w-1/2 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 inline-block mb-3">
                                {singleProduct.brand || "HYPEWEAR"}
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-black mb-3 text-slate-950 uppercase font-heading tracking-tight">
                                {singleProduct.name}
                            </h1>

                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-2xl font-black text-slate-950">${singleProduct.price}</span>
                                {singleProduct.discountPrice && (
                                    <span className="text-sm font-semibold text-slate-400 line-through">${singleProduct.discountPrice}</span>
                                )}
                            </div>

                            <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">{singleProduct.description}</p>

                            {/* Colors Selector */}
                            <div className="mb-5">
                                <p className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-2">Color:</p>
                                <div className="flex gap-2.5">
                                    {singleProduct.colors && singleProduct.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border transition-all ${
                                                selectedColor === color 
                                                    ? "ring-2 ring-slate-950 ring-offset-2 border-slate-950" 
                                                    : "border-slate-300"
                                            }`}
                                            style={{
                                                backgroundColor: color.toLowerCase() === "white" ? "#FFFFFF" : color.toLowerCase() === "multicolor" ? "#ccc" : color.toLowerCase()
                                            }}
                                            title={color}
                                        ></button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes Selector */}
                            <div className="mb-5">
                                <p className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-2">Size:</p>
                                <div className="flex flex-wrap gap-2">
                                    {singleProduct.sizes && singleProduct.sizes.map((size) => (
                                        <button 
                                            key={size} 
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all uppercase ${
                                                selectedSize === size 
                                                    ? "bg-slate-950 text-white border-slate-950" 
                                                    : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <p className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-2">Quantity:</p>
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => handleQuantityChange("minus")} 
                                        className="w-9 h-9 bg-slate-100 rounded-lg border border-slate-200 text-sm font-bold text-slate-800 hover:bg-slate-200 transition"
                                    >
                                        -
                                    </button>
                                    <span className="text-base font-bold w-8 text-center text-slate-950">{quantity}</span>
                                    <button 
                                        onClick={() => handleQuantityChange("plus")} 
                                        className="w-9 h-9 bg-slate-100 rounded-lg border border-slate-200 text-sm font-bold text-slate-800 hover:bg-slate-200 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Add to Cart Button */}
                            <button 
                                onClick={handleAddToCartClick} 
                                disabled={isButtonDisabled || singleProduct.countInStock === 0}
                                className={`py-3.5 px-6 rounded-xl w-full font-bold text-xs uppercase tracking-wider transition-all ${
                                    singleProduct.countInStock === 0
                                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                        : isButtonDisabled 
                                            ? "bg-slate-800 text-white opacity-80" 
                                            : "bg-slate-950 text-white hover:bg-slate-800 shadow-sm"
                                }`}
                            >
                                {singleProduct.countInStock === 0 
                                    ? "OUT OF STOCK" 
                                    : isButtonDisabled 
                                        ? "ADDING TO CART..." 
                                        : "ADD TO CART"
                                }
                            </button>

                            {/* Product Characteristics */}
                            <div className="mt-6 pt-5 border-t border-slate-100 text-slate-700">
                                <h3 className="text-xs font-bold mb-3 uppercase tracking-wider text-slate-900 font-heading">Specifications:</h3>
                                <table className="w-full text-left text-xs text-slate-600">
                                    <tbody>
                                        <tr className="border-b border-slate-100">
                                            <td className="py-2 font-bold text-slate-900">Brand</td>
                                            <td className="py-2">{singleProduct.brand || "HYPEWEAR"}</td>
                                        </tr>
                                        <tr className="border-b border-slate-100">
                                            <td className="py-2 font-bold text-slate-900">Material</td>
                                            <td className="py-2">{singleProduct.material || "Heavyweight Cotton Blend"}</td>
                                        </tr>
                                        <tr className="border-b border-slate-100">
                                            <td className="py-2 font-bold text-slate-900">Category</td>
                                            <td className="py-2">{singleProduct.category}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 font-bold text-slate-900">Availability</td>
                                            <td className="py-2 font-semibold text-emerald-600">
                                                {singleProduct.countInStock > 0 
                                                    ? `In Stock (${singleProduct.countInStock})` 
                                                    : "Out of Stock"
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations Carousel */}
                <div className="mt-16 border-t border-slate-200 pt-10">
                    <h2 className="text-xl text-center font-black mb-8 uppercase tracking-tight font-heading text-slate-950">
                        Similar Products
                    </h2>
                    {similarProducts.length === 0 ? (
                        <p className="text-center text-slate-400 text-xs">No recommendations found.</p>
                    ) : (
                        <ProductGrid products={similarProducts} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;



