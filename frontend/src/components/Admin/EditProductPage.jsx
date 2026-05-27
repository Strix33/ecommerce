import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchSingleProduct, createProduct, updateProduct, loading } = useContext(ProductContext);
    const { token } = useContext(AuthContext);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "Top Wear",
        brand: "",
        sizes: [],
        colors: [],
        collection: "Casual Wear",
        material: "",
        gender: "Unisex",
        images: []
    });

    const [imageUrlInput, setImageUrlInput] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            if (id && id !== "new") {
                try {
                    const data = await fetchSingleProduct(id);
                    if (data) {
                        setProductData({
                            name: data.name || "",
                            description: data.description || "",
                            price: data.price || 0,
                            countInStock: data.countInStock || 0,
                            sku: data.sku || "",
                            category: data.category || "Top Wear",
                            brand: data.brand || "",
                            sizes: data.sizes || [],
                            colors: data.colors || [],
                            collection: data.collection || "Casual Wear",
                            material: data.material || "",
                            gender: data.gender || "Unisex",
                            images: data.images || []
                        });
                    }
                } catch (error) {
                    toast.error("Failed to load product details");
                    console.error(error);
                }
            }
        };
        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: name === "price" || name === "countInStock" ? Number(value) : value
        }));
    };

    const handleAddImageUrl = (e) => {
        e.preventDefault();
        if (!imageUrlInput.trim()) return;
        setProductData((prev) => ({
            ...prev,
            images: [...prev.images, { url: imageUrlInput, alt: prev.name }]
        }));
        setImageUrlInput("");
    };

    const handleRemoveImage = (indexToRemove) => {
        setProductData((prev) => ({
            ...prev,
            images: prev.images.filter((_, idx) => idx !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (productData.images.length === 0) {
            toast.error("Please add at least one product image URL.");
            return;
        }

        try {
            if (id === "new") {
                await createProduct(productData, token);
                toast.success("Product created successfully!");
            } else {
                await updateProduct(id, productData, token);
                toast.success("Product updated successfully!");
            }
            navigate("/admin/products");
        } catch (error) {
            toast.error(error.message || "Failed to save product details");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white border border-gray-100 shadow-sm rounded-xl mt-4">
            <h2 className="text-3xl font-extrabold mb-8 text-gray-900 tracking-wide uppercase">
                {id === "new" ? "Add New Product" : "Edit Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Product Name */}
                <div>
                    <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Product Name</label>
                    <input
                        type='text'
                        name='name'
                        value={productData.name}
                        onChange={handleChange}
                        className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black'
                        placeholder="e.g. Classic Cotton Henley"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Description</label>
                    <textarea 
                        name='description' 
                        value={productData.description}
                        onChange={handleChange}
                        className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black'
                        placeholder="Write a clear details overview..."
                        rows={4}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Price */}
                    <div>
                        <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Price ($)</label>
                        <input
                            type='number'
                            name='price'
                            min={0}
                            step="0.01"
                            value={productData.price}
                            onChange={handleChange}
                            className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black font-semibold'
                            required
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Count in Stock</label>
                        <input
                            type='number'
                            name='countInStock'
                            min={0}
                            value={productData.countInStock}
                            onChange={handleChange}
                            className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black font-semibold'
                            required
                        />
                    </div>

                    {/* SKU */}
                    <div>
                        <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>SKU</label>
                        <input
                            type='text'
                            name='sku'
                            value={productData.sku}
                            onChange={handleChange}
                            className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black font-semibold'
                            placeholder="e.g. HNL-SH-001"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Sizes */}
                    <div>
                        <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Sizes (comma-separated)</label>
                        <input
                            type='text'
                            name='sizes'
                            value={productData.sizes.join(", ")}
                            onChange={(e) => 
                                setProductData({
                                    ...productData,
                                    sizes: e.target.value.split(",").map((size) => size.trim()).filter(Boolean),
                                })
                            }
                            className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black'
                            placeholder="S, M, L, XL"
                        />
                    </div>

                    {/* Colors */}
                    <div>
                        <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Colors (comma-separated)</label>
                        <input
                            type='text'
                            name='colors'
                            value={productData.colors.join(", ")}
                            onChange={(e) => 
                                setProductData({
                                    ...productData,
                                    colors: e.target.value.split(",").map((color) => color.trim()).filter(Boolean),
                                })
                            }
                            className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black'
                            placeholder="Black, White, Blue"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    {/* Brand */}
                    <div>
                        <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Brand</label>
                        <input
                            type='text'
                            name='brand'
                            value={productData.brand}
                            onChange={handleChange}
                            className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black'
                            placeholder="Urban Threads"
                            required
                        />
                    </div>

                    {/* Material */}
                    <div>
                        <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Material</label>
                        <input
                            type='text'
                            name='material'
                            value={productData.material}
                            onChange={handleChange}
                            className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black'
                            placeholder="Cotton / Leather"
                        />
                    </div>

                    {/* Collection */}
                    <div>
                        <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Collection</label>
                        <input
                            type='text'
                            name='collection'
                            value={productData.collection}
                            onChange={handleChange}
                            className='w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black'
                            placeholder="Casual Wear"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Gender</label>
                        <select
                            name="gender"
                            value={productData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black font-semibold text-sm"
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                </div>

                {/* Image List & Add URL */}
                <div className="border p-5 rounded-xl bg-gray-50">
                    <label className='block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Product Images</label>
                    
                    <div className="flex gap-2 mb-4">
                        <input 
                            type="text" 
                            value={imageUrlInput}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                            className="flex-grow border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-black bg-white"
                            placeholder="Paste image URL here..."
                        />
                        <button 
                            type="button" 
                            onClick={handleAddImageUrl}
                            className="bg-black text-white px-5 rounded-lg font-bold text-xs uppercase tracking-wide hover:bg-gray-800 transition"
                        >
                            Add URL
                        </button>
                    </div>

                    {productData.images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {productData.images.map((image, index) => (
                                <div key={index} className="relative group overflow-hidden rounded-lg shadow-sm border border-gray-200 bg-white">
                                    <img 
                                        src={image.url} 
                                        alt={image.alt || "Product thumbnail"}
                                        className='w-full h-24 object-cover'
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 text-[10px] shadow-md transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-xs mt-2 italic">No images added yet. Add an image URL above.</p>
                    )}
                </div>

                {/* Actions Row */}
                <div className="flex justify-end gap-3 border-t pt-6">
                    <button 
                        type='button' 
                        onClick={() => navigate("/admin/products")}
                        className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-lg text-sm transition'
                    >
                        Cancel
                    </button>
                    <button 
                        type='submit' 
                        className='bg-black hover:bg-gray-900 text-white font-bold px-8 py-3 rounded-lg text-sm transition shadow-sm'
                    >
                        {id === "new" ? "Create Product" : "Update Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;