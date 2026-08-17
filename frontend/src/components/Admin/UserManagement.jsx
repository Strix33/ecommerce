import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../config';
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
            const response = await fetch(`${API_URL}/api/users/register`, {
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
            loadUsers();
        } catch (error) {
            toast.error(error.message || "Error adding user");
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUser(userId, { role: newRole }, token);
            toast.success("User role updated successfully!");
            loadUsers();
        } catch (error) {
            toast.error(error.message || "Failed to update role");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId, token);
                toast.success("User removed successfully!");
                loadUsers();
            } catch (error) {
                toast.error(error.message || "Failed to delete user");
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
            <h2 className="text-xl sm:text-2xl font-black mb-6 text-slate-950 tracking-tight uppercase font-heading">User Roster & Roles</h2>
            
            {/* Add User Section */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-8 max-w-3xl">
                <h3 className="text-xs font-bold mb-3 uppercase tracking-wider text-slate-900">Provision New User Account</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                        <label className='block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1'>Name</label>
                        <input 
                            type="text" 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange} 
                            className='w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-950'
                            placeholder="Full name"
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1'>Email</label>
                        <input 
                            type="email" 
                            name='email' 
                            value={formData.email} 
                            onChange={handleChange} 
                            className='w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-950'
                            placeholder="Email address"
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1'>Password</label>
                        <input 
                            type="password" 
                            name='password' 
                            value={formData.password} 
                            onChange={handleChange} 
                            className='w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-950'
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1'>Role</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange}
                            className='w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold text-xs focus:outline-none focus:border-slate-950'
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 mt-1">
                        <button 
                            type='submit'
                            className='bg-slate-950 text-white py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs'
                        >
                            Create User Account
                        </button>
                    </div>
                </form>
            </div>

            {/* Users List */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className='min-w-full text-left text-slate-700'>
                    <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 border-b border-slate-200 tracking-wider">
                        <tr>
                            <th className='py-3 px-4'>User</th>
                            <th className='py-3 px-4'>Email</th>
                            <th className='py-3 px-4 text-center'>Role Access</th>
                            <th className='py-3 px-4 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((userItem) => (
                            <tr key={userItem._id} className='hover:bg-slate-50 transition border-b border-slate-100 last:border-0'>
                                <td className='py-3 px-4 font-bold text-slate-950 text-xs'>
                                    {userItem.name}
                                </td>
                                <td className='py-3 px-4 text-xs font-mono text-slate-500'>{userItem.email}</td>
                                <td className='py-3 px-4 text-center'>
                                    <select 
                                        value={userItem.role} 
                                        onChange={(e) => handleRoleChange(userItem._id, e.target.value)}
                                        className='p-1 bg-white border border-slate-200 rounded-lg font-bold text-[10px] uppercase text-slate-900 focus:outline-none'
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className='py-3 px-4 text-right'>
                                    <button 
                                        onClick={() => handleDeleteUser(userItem._id)}
                                        className='bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors'
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
