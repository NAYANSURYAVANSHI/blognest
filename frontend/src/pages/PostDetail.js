import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getOne(id);
      setPost(response.data);
    } catch (error) {
      setError('Failed to load post');
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.delete(id);
      navigate('/');
    } catch (error) {
      alert('Failed to delete post');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="cyber-spinner w-16 h-16"></div>
        <div className="text-xl neon-cyan mt-4">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="holo-card border border-red-500 text-red-300 px-4 py-3 rounded-lg">
          {error || 'Post not found'}
        </div>
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 mt-4 inline-block transition">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const isAuthor = user && user.id === post.author._id;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/" className="text-cyan-400 hover:text-cyan-300 mb-4 inline-block transition">
        ← Back to Home
      </Link>

      <article className="holo-card rounded-lg shadow-md p-8 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold neon-blue mb-2">{post.title}</h1>
            <div className="text-gray-400">
              By <span className="text-cyan-400">{post.authorName}</span> • {formatDate(post.createdAt)}
              {post.updatedAt !== post.createdAt && (
                <span className="text-sm text-purple-400"> (edited)</span>
              )}
            </div>
          </div>
          {isAuthor && (
            <div className="flex space-x-2">
              <Link
                to={`/edit/${post._id}`}
                className="glow-button bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="glow-button bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
        </div>
      </article>

      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetail;
