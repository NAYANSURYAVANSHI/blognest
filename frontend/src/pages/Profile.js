import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold neon-blue mb-6">Account Settings</h1>

      {/* User Info Card */}
      <div className="holo-card rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div className="border-b border-cyan-900 pb-3">
            <label className="text-sm font-medium text-gray-400">Username</label>
            <p className="text-lg text-gray-100 mt-1">{user?.username}</p>
          </div>
          <div className="border-b border-cyan-900 pb-3">
            <label className="text-sm font-medium text-gray-400">Email</label>
            <p className="text-lg text-gray-100 mt-1">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400">Member Since</label>
            <p className="text-lg text-gray-100 mt-1">
              {new Date(user?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
