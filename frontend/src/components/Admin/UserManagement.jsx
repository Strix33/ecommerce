import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';

const UserManagement = () => {
    const { fetchUsers, updateUser, deleteUser } = useContext(ProductContext);
    const { token } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer"
    });

    const loadUsers = async () => {
        if (!token) return;
        try {
            const data = await fetchUsers(token);
            setUsers(data);
        } catch (error) {
            toast.error("Failed to load users list");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [token]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Register new user via backend API
            const response = await fetch("http://localhost:9000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to add user");

            toast.success("User added successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "customer",
            });
            loadUsers(); // Refresh list
        } catch (error) {
            toast.error(error.message || "Error adding user");
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUser(userId, { role: newRole }, token);
            toast.success("User role updated successfully!");
            loadUsers(); // Refresh
        } catch (error) {
            toast.error(error.message || "Failed to update role");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId, token);
                toast.success("User removed successfully!");
                loadUsers(); // Refresh
            } catch (error) {
                toast.error(error.message || "Failed to delete user");
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
            <h2 className="text-2xl font-extrabold mb-8 text-gray-900 tracking-wide uppercase">User Management</h2>
            
            {/* Add User Section */}
            <div className="p-6 rounded-xl border border-gray-100 bg-gray-50 mb-8 max-w-2xl">
                <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-700">Add New User</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className='block text-gray-600 text-xs font-semibold mb-1'>Name</label>
                        <input 
                            type="text" 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange} 
                            className='w-full p-2.5 border rounded-lg bg-white focus:ring-1 focus:ring-black'
                            placeholder="Full name"
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-600 text-xs font-semibold mb-1'>Email</label>
                        <input 
                            type="email" 
                            name='email' 
                            value={formData.email} 
                            onChange={handleChange} 
                            className='w-full p-2.5 border rounded-lg bg-white focus:ring-1 focus:ring-black'
                            placeholder="Email address"
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-600 text-xs font-semibold mb-1'>Password</label>
                        <input 
                            type="password" 
                            name='password' 
                            value={formData.password} 
                            onChange={handleChange} 
                            className='w-full p-2.5 border rounded-lg bg-white focus:ring-1 focus:ring-black'
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-600 text-xs font-semibold mb-1'>Role</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange}
                            className='w-full p-2.5 border rounded-lg bg-white focus:ring-1 focus:ring-black font-semibold text-sm'
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 mt-2">
                        <button 
                            type='submit'
                            className='bg-black text-white py-2.5 px-6 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition shadow-sm'
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>

            {/* Users List */}
            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-700 border-b">
                        <tr>
                            <th className='py-3.5 px-4'>Name</th>
                            <th className='py-3.5 px-4'>Email</th>
                            <th className='py-3.5 px-4 text-center'>Role Access</th>
                            <th className='py-3.5 px-4 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((userItem) => (
                            <tr key={userItem._id} className='hover:bg-gray-50 transition border-b border-gray-50 last:border-0'>
                                <td className='py-3 px-4 font-semibold text-gray-900 text-sm'>
                                    {userItem.name}
                                </td>
                                <td className='py-3 px-4 text-sm font-medium'>{userItem.email}</td>
                                <td className='py-3 px-4 text-center'>
                                    <select 
                                        value={userItem.role} 
                                        onChange={(e) => handleRoleChange(userItem._id, e.target.value)}
                                        className='p-1.5 border rounded-lg font-semibold text-xs uppercase'
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className='py-3 px-4 text-right'>
                                    <button 
                                        onClick={() => handleDeleteUser(userItem._id)}
                                        className='bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded transition shadow-sm'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;