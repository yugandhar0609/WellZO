import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Community = () => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  // Mock data for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        level: 'Gold'
      },
      content: 'Just completed my first 5K run! 🏃‍♀️ So proud of my progress!',
      image: 'https://example.com/run-achievement.jpg',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      achievement: 'Running Milestone'
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        level: 'Silver'
      },
      content: 'Hit my protein goals for 30 days straight! 💪 Thanks to this amazing community for the support!',
      image: '',
      likes: 18,
      comments: 5,
      timestamp: '4 hours ago',
      achievement: 'Nutrition Streak'
    }
  ]);

  const handleNewPost = () => {
    setShowNewPostModal(true);
  };

  const handleMessage = (user) => {
    setSelectedUser(user);
    setShowMessageModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg hidden lg:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-emerald-600">HealthAI Coach</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </Link>
            <Link to="/workouts" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-dumbbell"></i>
              <span>Workouts</span>
            </Link>
            <Link to="/meals" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-utensils"></i>
              <span>Meal Plan</span>
            </Link>
            <Link to="/progress" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-chart-line"></i>
              <span>Progress</span>
            </Link>
            <Link to="/community" className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 text-emerald-600">
              <i className="fas fa-users"></i>
              <span>Community</span>
            </Link>
            <Link to="/ai-chat" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-robot"></i>
              <span>AI Coach Chat</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pb-16 lg:pb-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <button className="lg:hidden">
                <i className="fas fa-bars text-gray-600"></i>
              </button>
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
              >
                <i className="fas fa-arrow-left"></i>
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Link>
              <h2 className="text-xl font-semibold">Community</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleNewPost}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Share Achievement
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Feed */}
          <div className="max-w-2xl mx-auto space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm">
                {/* Post Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={post.user.avatar} 
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold">{post.user.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{post.timestamp}</span>
                          <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full">
                            {post.user.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleMessage(post.user)}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <i className="fas fa-comment-dots"></i>
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="mb-4">{post.content}</p>
                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Achievement" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                      <i className="fas fa-trophy mr-2"></i>
                      {post.achievement}
                    </span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="p-4 border-t flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600">
                      <i className="fas fa-heart"></i>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600">
                      <i className="fas fa-comment"></i>
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-gray-600 hover:text-emerald-600">
                    <i className="fas fa-share"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:hidden z-50">
        <div className="flex justify-around p-4">
          <Link to="/dashboard" className="text-gray-600">
            <i className="fas fa-home text-xl"></i>
          </Link>
          <Link to="/workouts" className="text-gray-600">
            <i className="fas fa-dumbbell text-xl"></i>
          </Link>
          <Link to="/meals" className="text-gray-600">
            <i className="fas fa-utensils text-xl"></i>
          </Link>
          <Link to="/progress" className="text-gray-600">
            <i className="fas fa-chart-line text-xl"></i>
          </Link>
          <Link to="/community" className="text-emerald-600">
            <i className="fas fa-users text-xl"></i>
          </Link>
        </div>
      </nav>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Share Your Achievement</h3>
                <button 
                  onClick={() => setShowNewPostModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="space-y-4">
                <textarea
                  placeholder="What did you achieve today?"
                  className="w-full h-32 p-3 border rounded-lg resize-none"
                ></textarea>
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-gray-600">
                    <i className="fas fa-image"></i>
                    <span>Add Photo</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600">
                    <i className="fas fa-trophy"></i>
                    <span>Select Achievement</span>
                  </button>
                </div>
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                </div>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="h-64 border rounded-lg p-4 mb-4 overflow-y-auto">
                {/* Message history would go here */}
                <div className="text-center text-gray-500">
                  Start a conversation with {selectedUser.name}
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg"
                />
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
