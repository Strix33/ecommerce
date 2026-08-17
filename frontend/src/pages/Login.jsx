import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import loginImage from "../assets/login.webp";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const data = await login(email, password);
            toast.success("Successfully logged in!");
            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            toast.error(err.message || "Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[85vh] items-center my-6">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8">
                <form 
                    onSubmit={handleSubmit}
                    className='w-full max-w-md clean-card p-6 sm:p-8 rounded-3xl shadow-sm'>
                    <div className="flex justify-center mb-4">
                        <Link to="/" className="text-2xl font-black uppercase font-heading text-slate-950 tracking-tight">
                            HYPEWEAR
                        </Link>
                    </div>
                    <h2 className="text-xl font-bold text-center text-slate-950 mb-1 font-heading uppercase">Welcome Back</h2>
                    <p className="text-center mb-6 text-slate-500 text-xs">
                        Sign in to access your profile & order history
                    </p>
                    
                    <div className="mb-4">
                        <label className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'>Email Address</label>
                        <input 
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            placeholder='name@example.com'
                            required
                        />
                    </div>
                    
                    <div className="mb-5">
                        <label className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'>Password</label>
                        <input 
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors'
                            placeholder='••••••••'
                            required
                        />
                    </div>
                    
                    <button 
                        type='submit' 
                        disabled={loading}
                        className='w-full bg-slate-950 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs disabled:opacity-50' 
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                    
                    <p className='mt-5 text-center text-xs text-slate-500'>
                        New to HYPEWEAR?{" "}
                        <Link to="/register" className='text-slate-950 font-bold hover:underline'>
                            Create an Account
                        </Link>
                    </p>
                </form>
            </div>
            
            <div className='hidden md:block w-1/2 p-6'>
                <div className="h-[550px] rounded-3xl overflow-hidden border border-slate-200 relative shadow-sm">
                    <img src={loginImage} alt="HYPEWEAR Account" className='w-full h-full object-cover brightness-95'/>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8">
                        <div>
                            <span className="text-[10px] font-bold text-slate-900 bg-white/90 px-2.5 py-1 rounded mb-2 inline-block">
                                MEMBER PORTAL
                            </span>
                            <h3 className="text-2xl font-black uppercase text-white font-heading tracking-tight">ELEVATE YOUR STYLE</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
