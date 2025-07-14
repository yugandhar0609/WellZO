import React, { useState } from 'react';

const CommunityProfileTab = ({ currentUser, profileData }) => {
  const [activeSection, setActiveSection] = useState('posts');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(profileData?.bio || "Passionate about health and wellness. Love sharing my fitness journey and connecting with like-minded individuals! 🏋️‍♂️💪");

  // Mock data for community features
  const socialStats = [
    { label: 'Posts', value: '147', icon: '📝' },
    { label: 'Followers', value: '2.3K', icon: '👥' },
    { label: 'Following', value: '892', icon: '➕' },
    { label: 'Likes', value: '5.7K', icon: '❤️' }
  ];

  const recentPosts = [
    {
      id: 1,
      content: "Just completed a 5K run! Feeling amazing and ready to take on the day. Who else is crushing their fitness goals today?",
      timestamp: "2 hours ago",
      likes: 23,
      comments: 5,
      image: null
    },
    {
      id: 2,
      content: "Meal prep Sunday! Made some delicious quinoa bowls with roasted vegetables. Nutrition is key to reaching our goals! 🥗",
      timestamp: "1 day ago",
      likes: 45,
      comments: 12,
      image: "https://via.placeholder.com/300x200/10b981/ffffff?text=Healthy+Meal"
    },
    {
      id: 3,
      content: "Completed my first marathon training week! 42km total this week. The journey of a thousand miles begins with a single step.",
      timestamp: "3 days ago",
      likes: 67,
      comments: 18,
      image: null
    }
  ];

  const connections = [
    { name: 'Sarah Johnson', avatar: 'https://via.placeholder.com/40/f59e0b/ffffff?text=SJ', status: 'Active 2h ago', mutualFriends: 12 },
    { name: 'Mike Chen', avatar: 'https://via.placeholder.com/40/3b82f6/ffffff?text=MC', status: 'Active 1h ago', mutualFriends: 8 },
    { name: 'Emma Wilson', avatar: 'https://via.placeholder.com/40/ec4899/ffffff?text=EW', status: 'Active 30m ago', mutualFriends: 15 },
    { name: 'David Rodriguez', avatar: 'https://via.placeholder.com/40/8b5cf6/ffffff?text=DR', status: 'Active 5h ago', mutualFriends: 6 }
  ];

  const activities = [
    { type: 'achievement', text: 'Earned "7-Day Streak" badge', time: '2 hours ago', icon: '🏆' },
    { type: 'workout', text: 'Completed "Upper Body Strength" workout', time: '4 hours ago', icon: '💪' },
    { type: 'social', text: 'Liked 3 posts in the community', time: '6 hours ago', icon: '❤️' },
    { type: 'goal', text: 'Reached daily water intake goal', time: '8 hours ago', icon: '💧' },
    { type: 'social', text: 'Commented on Mike\'s workout post', time: '1 day ago', icon: '💬' }
  ];

  const handleBioSave = () => {
    setIsEditingBio(false);
    // Here you would typically save the bio to your backend
    console.log('Saving bio:', bio);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'posts':
        return (
          <div className="space-y-6">
            {recentPosts.map(post => (
              <div key={post.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <img 
                    src={currentUser?.profile_picture_url || 'https://via.placeholder.com/50/10b981/ffffff?text=U'} 
                    alt="Your avatar" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">{currentUser?.name || 'You'}</span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-500 text-sm">{post.timestamp}</span>
                    </div>
                    <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                    )}
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button className="flex items-center space-x-2 hover:text-emerald-600 transition-colors">
                        <span>❤️</span>
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-emerald-600 transition-colors">
                        <span>💬</span>
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-emerald-600 transition-colors">
                        <span>📤</span>
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'connections':
        return (
          <div className="space-y-4">
            {connections.map((connection, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img 
                    src={connection.avatar} 
                    alt={connection.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                    <p className="text-sm text-gray-500">{connection.status}</p>
                    <p className="text-xs text-gray-400">{connection.mutualFriends} mutual connections</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-sm font-medium">
                  Message
                </button>
              </div>
            ))}
          </div>
        );
      
      case 'activity':
        return (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.text}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Profile Header */}
      <div className="text-center">
        <div className="relative inline-block">
          <img 
            src={currentUser?.profile_picture_url || 'https://via.placeholder.com/120/10b981/ffffff?text=U'} 
            alt="Profile" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto border-4 border-emerald-200 shadow-lg"
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs sm:text-sm">✓</span>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-4">{currentUser?.name || 'User'}</h2>
        <p className="text-emerald-600 font-medium text-sm sm:text-base">@{currentUser?.username || 'username'}</p>
      </div>

      {/* Social Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {socialStats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bio Section */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">About</h3>
          <button 
            onClick={() => setIsEditingBio(!isEditingBio)}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            {isEditingBio ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {isEditingBio ? (
          <div className="space-y-4">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              rows="4"
              placeholder="Tell the community about yourself..."
            />
            <div className="flex space-x-3">
              <button 
                onClick={handleBioSave}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-sm font-medium"
              >
                Save
              </button>
              <button 
                onClick={() => setIsEditingBio(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed">{bio}</p>
        )}
      </div>

      {/* Section Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex justify-center sm:justify-start space-x-4 sm:space-x-8">
          {[
            { id: 'posts', label: 'Posts', icon: '📝' },
            { id: 'connections', label: 'Connections', icon: '👥' },
            { id: 'activity', label: 'Activity', icon: '⚡' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`py-3 sm:py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 ${
                activeSection === section.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-base sm:text-lg">{section.icon}</span>
              <span className="text-xs sm:text-sm">{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Section Content */}
      <div className="min-h-[400px]">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default CommunityProfileTab; 