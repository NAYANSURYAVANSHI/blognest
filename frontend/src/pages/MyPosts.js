import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, postId: null, postTitle: '' });
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await postsAPI.getAll();
      // Filter to show only current user's posts
      const myPosts = response.data.filter(post => post.author._id === user.id);
      setPosts(myPosts);
    } catch (error) {
      setError('Failed to load posts. Please try again.');
      toast.error('Failed to load posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (postId, postTitle) => {
    setDeleteModal({ show: true, postId, postTitle });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.postId) return;

    setDeleting(true);

    try {
      await postsAPI.delete(deleteModal.postId);
      
      // Remove deleted post from state
      setPosts(posts.filter(post => post._id !== deleteModal.postId));
      
      // Close modal
      setDeleteModal({ show: false, postId: null, postTitle: '' });
      
      // Show success toast
      toast.success('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, postId: null, postTitle: '' });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Loading Spinner Component
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 premium-spinner"></div>
        </div>
        <p className="mt-6 text-xl text-gold-glow">Loading your posts...</p>
      </div>
    );
  }

  // Error State
  if (error && posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="holo-card border-2 border-red-500 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchMyPosts}
            className="glow-button bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-500 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-6xl font-bold gradient-gold-text luxury-heading mb-3">My Posts</h1>
          <p className="text-gray-400 text-lg">Manage all your blog posts in one premium space</p>
        </div>
        <Link
          to="/create"
          className="premium-button flex items-center space-x-3 px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#FFD700] to-[#F5C542] text-black border-0 gold-glow-strong elegant-hover"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create New Post</span>
        </Link>
      </div>

      {/* Empty State */}
      {posts.length === 0 ? (
        <div className="glass-card rounded-3xl p-20 text-center cinematic-shadow">
          <div className="empty-state-icon inline-block mb-8">
            <svg className="w-32 h-32 text-[#FFD700] icon-gold-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold mb-4 luxury-heading">
            <span className="gradient-gold-text">No Posts Yet</span>
          </h2>
          <p className="text-gray-400 text-xl mb-3">Start sharing your premium thoughts with the world!</p>
          <p className="text-gray-500 mb-10 text-lg">Create your first luxury blog post today.</p>
          <Link
            to="/create"
            className="premium-button inline-flex items-center space-x-3 px-10 py-5 rounded-xl text-lg font-bold bg-gradient-to-r from-[#FFD700] to-[#F5C542] text-black border-0 gold-glow-strong elegant-hover"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Your First Post</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Posts Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-400">
              <span className="font-semibold neon-cyan">{posts.length}</span> post{posts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="premium-card rounded-2xl overflow-hidden elegant-hover cinematic-shadow"
              >
                {/* Card Content */}
                <div className="p-8">
                  {/* Title */}
                  <Link to={`/post/${post._id}`}>
                    <h2 className="text-2xl font-bold text-gray-100 mb-4 hover:text-[#FFD700] transition line-clamp-2 min-h-[4rem] luxury-heading">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Meta Information */}
                  <div className="flex items-center text-sm text-gray-400 mb-6 space-x-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-[#F5C542]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{post.authorName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-[#F5C542]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <p className="text-gray-300 mb-6 line-clamp-3 min-h-[4.5rem] leading-relaxed">
                    {truncateText(post.content, 150)}
                  </p>

                  {/* Updated Badge */}
                  {post.updatedAt !== post.createdAt && (
                    <div className="mb-6">
                      <span className="premium-badge">
                        <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Updated {formatDate(post.updatedAt)}
                      </span>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="luxury-divider mb-6"></div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/post/${post._id}`}
                      className="flex-1 text-center premium-button px-4 py-3 rounded-lg font-medium text-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${post._id}`}
                      className="flex-1 text-center premium-button px-4 py-3 rounded-lg font-medium text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(post._id, post.title)}
                      className="flex-1 premium-button border-red-500 text-red-400 px-4 py-3 rounded-lg font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fadeIn cinematic-blur">
          <div className="glass-card rounded-3xl max-w-md w-full p-10 cinematic-shadow transform animate-slideUp">
            {/* Modal Icon */}
            <div className="flex justify-center mb-6">
              <div className="empty-state-icon">
                <svg className="w-20 h-20 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>

            {/* Modal Title */}
            <h3 className="text-3xl font-bold text-gray-100 mb-3 text-center luxury-heading">Delete Post?</h3>
            
            {/* Modal Content */}
            <p className="text-gray-300 mb-3 text-center text-lg">
              Are you sure you want to delete <span className="text-[#FFD700] font-semibold">"{truncateText(deleteModal.postTitle, 50)}"</span>?
            </p>

            {/* Warning Box */}
            <div className="glass-card border-red-500 p-5 mb-8 rounded-xl">
              <div className="flex">
                <svg className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm text-red-300 font-semibold">This action cannot be undone!</p>
                  <p className="text-xs text-red-400 mt-1">All comments on this post will also be deleted.</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex space-x-4">
              <button
                onClick={handleDeleteCancel}
                disabled={deleting}
                className="flex-1 premium-button px-6 py-4 rounded-xl font-semibold text-lg disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 premium-button border-red-500 text-red-400 px-6 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 flex items-center justify-center"
              >
                {deleting ? (
                  <>
                    <div className="premium-spinner w-5 h-5 mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Post'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MyPosts;
