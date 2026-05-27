import React, { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAll();
      setPosts(response.data);
    } catch (error) {
      setError('Failed to load posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full animate-spin cyber-spinner"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-cyan-400 border-l-purple-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
        <p className="mt-6 text-xl text-cyan-400 font-mono animate-pulse">Loading posts<span className="animate-pulse">...</span></p>
        <p className="mt-2 text-sm text-gray-500 font-mono">&gt; Accessing neural network_</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="holo-card border-red-500 border-opacity-50 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4 pulse-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-400 mb-2 font-mono">ERROR: CONNECTION FAILED</h2>
          <p className="text-gray-400 mb-4 font-mono">{error}</p>
          <button
            onClick={fetchPosts}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition glow-button"
          >
            RETRY CONNECTION
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 scanlines">
      <div className="tech-grid fixed inset-0 opacity-10"></div>
      <div className="container mx-auto px-4 py-12 relative">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 relative">
            <span className="neon-blue glitch">Latest Posts</span>
          </h1>
          <p className="text-cyan-400 text-lg font-mono">
            <span className="text-cyan-500">&gt;</span> Explore the neural network of ideas
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="holo-card max-w-2xl mx-auto p-12 rounded-2xl">
              <div className="relative mb-6">
                <svg className="w-32 h-32 text-cyan-400 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 border-2 border-cyan-500 border-opacity-30 rounded-full animate-ping"></div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-cyan-400 mb-3 font-mono">NO DATA FOUND</h2>
              <p className="text-gray-400 text-lg font-mono">
                The neural network is empty. Be the first to upload data.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Floating particles effect */}
        <div className="fixed top-20 left-10 w-2 h-2 bg-cyan-500 rounded-full opacity-50 float-animation"></div>
        <div className="fixed top-40 right-20 w-2 h-2 bg-purple-500 rounded-full opacity-50 float-animation" style={{animationDelay: '1s'}}></div>
        <div className="fixed bottom-40 left-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-50 float-animation" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default Home;
