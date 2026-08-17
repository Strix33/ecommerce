import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchSingleProduct, createProduct, updateProduct } = useContext(ProductContext);
    const { token } = useContext(AuthContext);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "Top Wear",
        brand: "HYPEWEAR",
        sizes: [],
        colors: [],
        collection: "Urban Hype",
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
                            brand: data.brand || "HYPEWEAR",
                            sizes: data.sizes || [],
                            colors: data.colors || [],
                            collection: data.collection || "Urban Hype",
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
        <div className="clean-card p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-black mb-6 text-slate-950 tracking-tight uppercase font-heading">
                {id === "new" ? "Create New Product" : "Edit Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Product Name */}
                <div>
                    <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Product Name</label>
                    <input
                        type='text'
                        name='name'
                        value={productData.name}
                        onChange={handleChange}
                        className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors'
                        placeholder="e.g. HYPEWEAR Minimalist Hoodie"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Description</label>
                    <textarea 
                        name='description' 
                        value={productData.description}
                        onChange={handleChange}
                        className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors'
                        placeholder="Describe the product details..."
                        rows={4}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Price */}
                    <div>
                        <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Price ($)</label>
                        <input
                            type='number'
                            name='price'
                            min={0}
                            step="0.01"
                            value={productData.price}
                            onChange={handleChange}
                            className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-950 font-bold text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            required
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Count in Stock</label>
                        <input
                            type='number'
                            name='countInStock'
                            min={0}
                            value={productData.countInStock}
                            onChange={handleChange}
                            className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-950 font-bold text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            required
                        />
                    </div>

                    {/* SKU */}
                    <div>
                        <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>SKU</label>
                        <input
                            type='text'
                            name='sku'
                            value={productData.sku}
                            onChange={handleChange}
                            className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 font-mono text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            placeholder="e.g. HYP-HD-001"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Sizes */}
                    <div>
                        <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Sizes (comma-separated)</label>
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
                            className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            placeholder="S, M, L, XL"
                        />
                    </div>

                    {/* Colors */}
                    <div>
                        <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Colors (comma-separated)</label>
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
                            className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            placeholder="Slate, White, Black"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {/* Brand */}
                    <div>
                        <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Brand</label>
                        <input
                            type='text'
                            name='brand'
                            value={productData.brand}
                            onChange={handleChange}
                            className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            placeholder="HYPEWEAR"
                            required
                        />
                    </div>

                    {/* Material */}
                    <div>
                        <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Material</label>
                        <input
                            type='text'
                            name='material'
                            value={productData.material}
                            onChange={handleChange}
                            className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            placeholder="Heavy Cotton"
                        />
                    </div>

                    {/* Collection */}
                    <div>
                        <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Collection</label>
                        <input
                            type='text'
                            name='collection'
                            value={productData.collection}
                            onChange={handleChange}
                            className='w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            placeholder="Urban Hype"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>Gender</label>
                        <select
                            name="gender"
                            value={productData.gender}
                            onChange={handleChange}
                            className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold text-xs focus:outline-none focus:border-slate-950 transition-colors"
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                </div>

                {/* Image List & Add URL */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className='block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2'>Product Images</label>
                    
                    <div className="flex gap-2 mb-3">
                        <input 
                            type="text" 
                            value={imageUrlInput}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                            className="flex-grow bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950"
                            placeholder="Paste image URL..."
                        />
                        <button 
                            type="button" 
                            onClick={handleAddImageUrl}
                            className="bg-slate-950 text-white px-5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
                        >
                            Add Image
                        </button>
                    </div>

                    {productData.images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {productData.images.map((image, index) => (
                                <div key={index} className="relative group overflow-hidden rounded-xl border border-slate-200 bg-white">
                                    <img 
                                        src={image.url} 
                                        alt={image.alt || "Product thumbnail"}
                                        className='w-full h-24 object-cover'
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full p-1 text-[10px] shadow-xs transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-400 text-xs">No images attached. Add an image URL above.</p>
                    )}
                </div>

                {/* Actions Row */}
                <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
                    <button 
                        type='button' 
                        onClick={() => navigate("/admin/products")}
                        className='bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors'
                    >
                        Cancel
                    </button>
                    <button 
                        type='submit' 
                        className='bg-slate-950 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs'
                    >
                        {id === "new" ? "Save Product" : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;
