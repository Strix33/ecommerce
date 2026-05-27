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

    // Fetch product details and recommendation on mount / ID change
    useEffect(() => {
        if (id) {
            fetchSingleProduct(id);
            fetchSimilarProducts(id);
            // Reset configurations
            setSelectedSize("");
            setSelectedColor("");
            setQuantity(1);
        }
    }, [id]);

    // Set default main image when product loads
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

        // Add to global state cart
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!singleProduct) {
        return (
            <div className="text-center py-24 min-h-screen text-gray-500 font-medium">
                Product details not found or loading failed.
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row">
                    {/* Left Thumbnails List */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {singleProduct.images && singleProduct.images.map((image, index) => (
                            <img
                                src={image.url}
                                key={index}
                                alt={image.alt || `Thumbnail ${index}`}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border transition hover:opacity-90 ${
                                    mainImage === image.url ? "border-black border-2" : "border-gray-200"
                                }`}
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="md:w-1/2">
                        <div className="mb-4 overflow-hidden rounded-lg border border-gray-100">
                            <img
                                src={mainImage || "https://picsum.photos/500/500"}
                                alt={singleProduct.name}
                                className="w-full h-[500px] object-cover rounded-lg hover:scale-105 transition duration-500"
                            />
                        </div>
                    </div>

                    {/* Mobile Thumbnails List */}
                    <div className="md:hidden flex overflow-x-scroll space-x-3 mb-4 py-2">
                        {singleProduct.images && singleProduct.images.map((image, index) => (
                            <img
                                src={image.url}
                                key={index}
                                alt={image.alt || `Thumbnail ${index}`}
                                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                                    mainImage === image.url ? "border-black border-2" : "border-gray-300"
                                }`}
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>

                    {/* Right Side Info Section */}
                    <div className="md:w-1/2 md:ml-10">
                        <span className="text-xs uppercase font-bold text-gray-400 tracking-widest">{singleProduct.brand}</span>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 mt-1">
                            {singleProduct.name}
                        </h1>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-bold text-red-500">$ {singleProduct.price}</span>
                            {singleProduct.discountPrice && (
                                <span className="text-lg text-gray-400 line-through">$ {singleProduct.discountPrice}</span>
                            )}
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">{singleProduct.description}</p>

                        {/* Colors Selector */}
                        <div className="mb-5">
                            <p className="text-gray-800 font-semibold text-sm">Select Color:</p>
                            <div className="flex gap-3 mt-2">
                                {singleProduct.colors && singleProduct.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-9 h-9 rounded-full border transition active:scale-95 ${
                                            selectedColor === color 
                                                ? "ring-2 ring-black ring-offset-2 border-black" 
                                                : "border-gray-300"
                                        }`}
                                        style={{
                                            backgroundColor: color.toLowerCase() === "multicolor" ? "#ccc" : color.toLowerCase()
                                        }}
                                        title={color}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        {/* Sizes Selector */}
                        <div className="mb-5">
                            <p className="text-gray-800 font-semibold text-sm">Select Size:</p>
                            <div className="flex gap-2 mt-2">
                                {singleProduct.sizes && singleProduct.sizes.map((size) => (
                                    <button 
                                        key={size} 
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 text-xs font-semibold rounded-md border transition uppercase active:scale-95 ${
                                            selectedSize === size 
                                                ? "bg-black text-white border-black" 
                                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <p className="text-gray-800 font-semibold text-sm">Quantity:</p>
                            <div className="flex items-center space-x-3 mt-2">
                                <button 
                                    onClick={() => handleQuantityChange("minus")} 
                                    className="px-3 py-1 bg-gray-100 rounded-md text-lg font-bold text-gray-700 hover:bg-gray-200 transition"
                                >
                                    -
                                </button>
                                <span className="text-lg font-semibold w-6 text-center">{quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange("plus")} 
                                    className="px-3 py-1 bg-gray-100 rounded-md text-lg font-bold text-gray-700 hover:bg-gray-200 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                            onClick={handleAddToCartClick} 
                            disabled={isButtonDisabled || singleProduct.countInStock === 0}
                            className={`py-3 px-8 rounded-lg w-full font-bold text-white transition tracking-wide ${
                                singleProduct.countInStock === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : isButtonDisabled 
                                        ? "bg-gray-700 cursor-wait opacity-80" 
                                        : "bg-black hover:bg-gray-900 active:scale-[0.99]"
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
                        <div className="mt-8 pt-6 border-t border-gray-100 text-gray-700">
                            <h3 className="text-md font-bold mb-3 uppercase tracking-wider text-gray-800">Characteristics:</h3>
                            <table className="w-full text-left text-sm text-gray-600">
                                <tbody>
                                    <tr className="border-b border-gray-50">
                                        <td className="py-2.5 font-semibold text-gray-700">Brand</td>
                                        <td className="py-2.5">{singleProduct.brand || "Rabbit"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-50">
                                        <td className="py-2.5 font-semibold text-gray-700">Material</td>
                                        <td className="py-2.5">{singleProduct.material || "Premium Cotton"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-50">
                                        <td className="py-2.5 font-semibold text-gray-700">Category</td>
                                        <td className="py-2.5">{singleProduct.category}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 font-semibold text-gray-700">Stock Availability</td>
                                        <td className="py-2.5">
                                            {singleProduct.countInStock > 0 
                                                ? `${singleProduct.countInStock} items available` 
                                                : "Out of Stock"
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Recommendations Carousel */}
                <div className="mt-20 border-t pt-12">
                    <h2 className="text-2xl text-center font-bold mb-8 uppercase tracking-wider">
                        You May Also Like
                    </h2>
                    {similarProducts.length === 0 ? (
                        <p className="text-center text-gray-500 text-sm">No similar items available.</p>
                    ) : (
                        <ProductGrid products={similarProducts} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
