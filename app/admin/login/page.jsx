"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/login', formData);
      if (res.status === 200) {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-neutral-900 p-8 rounded-lg shadow-xl border border-neutral-800 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-neon">ADMIN ACCESS</h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Email</label>
          <input
            className="w-full p-3 bg-black border border-neutral-700 rounded focus:border-neon focus:outline-none transition-colors text-white"
            type="email"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="mb-8">
          <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Password</label>
          <input
            className="w-full p-3 bg-black border border-neutral-700 rounded focus:border-neon focus:outline-none transition-colors text-white"
            type="password"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <button className="w-full bg-neon text-black font-bold p-3 rounded hover:bg-white transition-colors uppercase tracking-widest text-sm">
          Enter System
        </button>
      </form>
    </div>
  );
}