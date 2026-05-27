import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center tech-grid py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold neon-blue glitch">
            Create your account
          </h2>
          <p className="mt-2 text-gray-400">Join the cybernetic blog network</p>
        </div>
        <form className="mt-8 space-y-6 holo-card p-8 rounded-xl" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="cyber-input appearance-none relative block w-full px-4 py-3 rounded-lg sm:text-sm"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cyber-input appearance-none relative block w-full px-4 py-3 rounded-lg sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyber-input appearance-none relative block w-full px-4 py-3 rounded-lg sm:text-sm"
                placeholder="Min 6 characters"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="cyber-input appearance-none relative block w-full px-4 py-3 rounded-lg sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="glow-button group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <>
                  <div className="cyber-spinner w-5 h-5 mr-2"></div>
                  Creating account...
                </>
              ) : (
                'Register'
              )}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition">
              Already have an account? <span className="neon-cyan font-semibold">Sign in here</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
