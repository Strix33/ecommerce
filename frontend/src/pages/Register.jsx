import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import registerImage from "../assets/register.webp";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            toast.success("Account successfully created!");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm '>
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-medium ">Rabbit</h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋🏻</h2>
                    <p className="text-center mb-6 text-gray-500">
                        Create an account to start shopping
                    </p>
                    <div className="mb-4">
                        <label className='block text-sm font-semibold mb-2'>Name</label>
                        <input 
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your Name'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input 
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your email address'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input 
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your password (min 6 chars)'
                            required
                        />
                    </div>
                    <button 
                        type='submit' 
                        disabled={loading}
                        className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50' 
                    >
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                    <p className='mt-6 text-center text-sm'>
                        Already have an account?{" "}
                        <Link to="/login" className='text-blue-500'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className="h-full flex flex-col justify-center items-center">
                    <img src={registerImage} alt="Register Account" className='h-[750px] w-full object-cover'/>
                </div>
            </div>
        </div>
    );
}

export default Register;