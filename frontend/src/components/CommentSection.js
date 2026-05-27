import React, { useState, useEffect } from 'react';
import { commentsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getByPost(postId);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await commentsAPI.create({
        content: newComment,
        postId,
      });
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await commentsAPI.delete(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (error) {
      alert('Failed to delete comment');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold neon-blue mb-4">Comments ({comments.length})</h3>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-6 holo-card p-4 rounded-lg">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="cyber-input w-full px-4 py-2 rounded-lg"
            rows="3"
            disabled={loading}
          />
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="glow-button mt-2 bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <>
                <div className="cyber-spinner w-4 h-4 inline-block mr-2"></div>
                Posting...
              </>
            ) : (
              'Post Comment'
            )}
          </button>
        </form>
      ) : (
        <p className="text-gray-400 mb-6">Please log in to comment.</p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="holo-card rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold text-cyan-400">
                  {comment.authorName}
                </span>
                <span className="text-sm text-gray-400 ml-2">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              {user && user.id === comment.author && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-400 hover:text-red-300 text-sm transition"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="text-gray-300">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-400 text-center py-4 holo-card rounded-lg">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
