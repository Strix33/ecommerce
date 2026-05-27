import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';

const ProductManagement = () => {
    const { products, loading, fetchProducts, deleteProduct } = useContext(ProductContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        // Fetch all products (limit: 100 to show a comprehensive list in admin panel)
        fetchProducts({ limit: 100 });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id, token);
                toast.success("Product deleted successfully!");
                // Refresh list
                fetchProducts({ limit: 100 });
            } catch (error) {
                toast.error(error.message || "Failed to delete product");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white border border-gray-100 shadow-sm rounded-xl mt-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-wide uppercase">Product Management</h2>
                {/* Custom create product button */}
                <Link 
                    to="/admin/products/new/edit" 
                    className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition"
                >
                    + Add New Product
                </Link>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-50 text-xs font-bold uppercase text-gray-700 border-b'>
                        <tr>
                            <th className='py-3.5 px-4'>Product Details</th>
                            <th className='py-3.5 px-4 text-center'>Price</th>
                            <th className='py-3.5 px-4 text-center'>Stock</th>
                            <th className='py-3.5 px-4'>SKU</th>
                            <th className='py-3.5 px-4'>Category</th>
                            <th className='py-3.5 px-4 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className='hover:bg-gray-50 transition border-b border-gray-50 last:border-0'>
                                    <td className='py-3 px-4 flex items-center gap-3'>
                                        <img 
                                            src={product.images && product.images.length > 0 ? product.images[0].url : "https://picsum.photos/150?random=1"} 
                                            alt={product.name}
                                            className="w-10 h-10 object-cover rounded border"
                                        />
                                        <span className="font-semibold text-gray-900 text-sm line-clamp-1">{product.name}</span>
                                    </td>
                                    <td className='py-3 px-4 text-center font-bold text-gray-900 text-sm'>${product.price.toLocaleString()}</td>
                                    <td className={`py-3 px-4 text-center text-sm font-bold ${product.countInStock === 0 ? "text-red-500" : "text-gray-700"}`}>
                                        {product.countInStock}
                                    </td>
                                    <td className='py-3 px-4 text-xs font-semibold text-gray-500'>{product.sku}</td>
                                    <td className='py-3 px-4 text-xs font-bold text-gray-500 uppercase'>{product.category}</td>
                                    <td className='py-3 px-4 text-right whitespace-nowrap'>
                                        <Link 
                                            to={`/admin/products/${product._id}/edit`}
                                            className='bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded mr-2 transition'
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(product._id)}
                                            className='bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded transition'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className='p-8 text-center text-gray-500 font-semibold text-sm'>
                                    No products found in the database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;