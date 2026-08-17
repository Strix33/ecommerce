import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';

const ProductManagement = () => {
    const { products, loading, fetchProducts, deleteProduct } = useContext(ProductContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetchProducts({ limit: 100 });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id, token);
                toast.success("Product deleted successfully!");
                fetchProducts({ limit: 100 });
            } catch (error) {
                toast.error(error.message || "Failed to delete product");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-950"></div>
            </div>
        );
    }

    return (
        <div className="clean-card p-6 sm:p-8 rounded-3xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase font-heading tracking-tight">Product Inventory</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Manage active products, pricing, and stock</p>
                </div>
                <Link 
                    to="/admin/products/new/edit" 
                    className="bg-slate-950 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs"
                >
                    + Add New Product
                </Link>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className='min-w-full text-left text-slate-700'>
                    <thead className='bg-slate-50 text-[10px] font-bold uppercase text-slate-500 border-b border-slate-200 tracking-wider'>
                        <tr>
                            <th className='py-3 px-4'>Product</th>
                            <th className='py-3 px-4 text-center'>Price</th>
                            <th className='py-3 px-4 text-center'>Stock</th>
                            <th className='py-3 px-4'>SKU</th>
                            <th className='py-3 px-4'>Category</th>
                            <th className='py-3 px-4 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className='hover:bg-slate-50 transition border-b border-slate-100 last:border-0'>
                                    <td className='py-3 px-4 flex items-center gap-3'>
                                        <img 
                                            src={product.images && product.images.length > 0 ? product.images[0].url : "https://picsum.photos/150?random=1"} 
                                            alt={product.name}
                                            className="w-10 h-12 object-cover rounded-lg border border-slate-200"
                                        />
                                        <span className="font-bold text-slate-950 text-xs line-clamp-1">{product.name}</span>
                                    </td>
                                    <td className='py-3 px-4 text-center font-black text-slate-950 text-xs'>${product.price.toLocaleString()}</td>
                                    <td className={`py-3 px-4 text-center text-xs font-bold ${product.countInStock === 0 ? "text-rose-600 font-extrabold" : "text-slate-700"}`}>
                                        {product.countInStock}
                                    </td>
                                    <td className='py-3 px-4 text-xs text-slate-500 font-mono'>{product.sku}</td>
                                    <td className='py-3 px-4 text-xs font-semibold text-slate-600 uppercase'>{product.category}</td>
                                    <td className='py-3 px-4 text-right whitespace-nowrap'>
                                        <Link 
                                            to={`/admin/products/${product._id}/edit`}
                                            className='bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg mr-2 transition-colors'
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(product._id)}
                                            className='bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className='p-8 text-center text-slate-400 font-medium text-xs'>
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
