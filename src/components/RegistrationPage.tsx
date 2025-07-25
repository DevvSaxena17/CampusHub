import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2B0A3D] via-[#1a0824] to-black p-4">
      <div className="w-full max-w-md bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Register</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#E0E0E0] text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-white bg-opacity-10 border border-[#8E44AD] border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-[#E0E0E0] text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-white bg-opacity-10 border border-[#8E44AD] border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-[#E0E0E0] text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-white bg-opacity-10 border border-[#8E44AD] border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50 focus:border-transparent transition-all duration-300"
                placeholder="Create a password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8E44AD] to-[#1ABC9C] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#8E44AD]/25 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-opacity-50"
            >
              Register
            </button>
          </form>
        ) : (
          <div className="text-center text-[#E0E0E0]">
            <p className="mb-4">Registration successful! You can now <Link to="/" className="text-[#8E44AD] hover:underline font-semibold">login</Link> as Aarav Sharma, Priya Verma, or Rohan Mehta.</p>
          </div>
        )}
        <div className="text-center mt-6">
          <Link to="/" className="text-[#8E44AD] hover:underline font-semibold">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage; 