import React, { useState } from 'react';

const SuggestedConnections = ({ users }) => {
  const [following, setFollowing] = useState({});

  const handleFollow = (userId) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
          <i className="fas fa-user-plus text-white text-sm"></i>
        </div>
        <h3 className="font-semibold text-gray-900">Suggested for You</h3>
      </div>
      
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{user.name}</h4>
              <p className="text-sm text-gray-500 truncate">{user.title}</p>
              <p className="text-xs text-gray-400">
                {user.mutualConnections} mutual connections
              </p>
            </div>
            
            <button
              onClick={() => handleFollow(user.id)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                following[user.id]
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {following[user.id] ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
          View All Suggestions
        </button>
      </div>

      {/* Community Highlights */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Community Highlights</h4>
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <i className="fas fa-star text-yellow-500 text-sm"></i>
              <span className="text-sm font-medium text-emerald-700">Top Contributor</span>
            </div>
            <p className="text-xs text-emerald-600">
              Sarah shared 12 helpful nutrition tips this week!
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <i className="fas fa-trophy text-orange-500 text-sm"></i>
              <span className="text-sm font-medium text-blue-700">Weekly Challenge</span>
            </div>
            <p className="text-xs text-blue-600">
              Join the "Mindful Monday" meditation challenge!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedConnections; 