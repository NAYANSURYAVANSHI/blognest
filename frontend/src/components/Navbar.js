import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="premium-navbar sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#F5C542] rounded-lg flex items-center justify-center pulse-gold">
              <span className="text-black font-bold text-2xl">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-gold-text luxury-heading">BlogNest</span>
              <span className="text-xs text-gray-500 font-mono">Premium Edition</span>
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-[#F5C542] text-sm font-mono hidden md:flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#FFD700] rounded-full pulse-gold"></span>
                  <span>{user?.username}</span>
                </span>
                <Link
                  to="/my-posts"
                  className="premium-button flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>My Posts</span>
                </Link>
                <Link
                  to="/profile"
                  className="premium-button flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </Link>
                <Link
                  to="/create"
                  className="premium-button flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-[#FFD700] to-[#F5C542] text-black border-0 gold-glow"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-bold">Create Post</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="premium-button flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium border-red-500 text-red-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="premium-button px-6 py-2.5 rounded-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="premium-button px-6 py-2.5 rounded-lg font-medium bg-gradient-to-r from-[#FFD700] to-[#F5C542] text-black border-0 gold-glow"
                >
                  <span className="font-bold">Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
