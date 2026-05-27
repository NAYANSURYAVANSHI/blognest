import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postsAPI } from '../services/api';

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getOne(id);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      setError('Failed to load post');
      console.error('Error fetching post:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        await postsAPI.update(id, { title, content });
      } else {
        await postsAPI.create({ title, content });
      }
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="cyber-spinner w-16 h-16"></div>
        <div className="text-xl neon-cyan mt-4">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold neon-blue mb-6">
        {isEditMode ? 'Edit Post' : 'Create New Post'}
      </h1>

      <form onSubmit={handleSubmit} className="holo-card rounded-lg shadow-md p-6">
        {error && (
          <div className="bg-red-900 bg-opacity-50 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-300 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="cyber-input w-full px-4 py-2 rounded-lg"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-300 font-semibold mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="cyber-input w-full px-4 py-2 rounded-lg"
            placeholder="Write your post content here..."
            rows="12"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="glow-button bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <>
                <div className="cyber-spinner w-4 h-4 inline-block mr-2"></div>
                Saving...
              </>
            ) : (
              isEditMode ? 'Update Post' : 'Create Post'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-700 text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPost;
