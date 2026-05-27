import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="holo-card rounded-xl p-6 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden">
      {/* Animated gradient border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 opacity-50"></div>
      
      <Link to={`/post/${post._id}`} className="block">
        <h2 className="text-2xl font-bold text-cyan-400 mb-3 hover:text-cyan-300 transition line-clamp-2 font-mono group-hover:neon-cyan">
          {post.title}
        </h2>
      </Link>
      
      <div className="flex items-center text-sm text-gray-400 mb-4 space-x-4 font-mono">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-cyan-400">{post.authorName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>
      
      <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
        {post.content.substring(0, 150)}
        {post.content.length > 150 && '...'}
      </p>
      
      <Link
        to={`/post/${post._id}`}
        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition group/link font-mono"
      >
        <span className="text-cyan-500 mr-2">&gt;</span>
        <span>Read more</span>
        <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>

      {/* Holographic shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default PostCard;
