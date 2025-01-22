"use client";
import { useState } from 'react';
//import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //await login(email, password);
            alert('Login successful!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2"
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2"
                    required 
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Log In</button>
            </form>
        </div>
    );
};

export default Login;
