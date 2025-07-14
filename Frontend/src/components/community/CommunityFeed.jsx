import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import FilterTabs from './FilterTabs';
import CommunityStats from './CommunityStats';
import TrendingTopics from './TrendingTopics';
import SuggestedConnections from './SuggestedConnections';
import { getPosts, getCommunityStats, getTrendingTopics, getSuggestedUsers, setupRealTimeUpdates } from '../../interceptor/services';

// Community Icon Component
const CommunityIcon = ({ size = 6, animate = true }) => {
  const sizeClasses = {
    4: 'w-4 h-4',
    5: 'w-5 h-5',
    6: 'w-6 h-6',
    8: 'w-8 h-8',
    10: 'w-10 h-10',
    12: 'w-12 h-12'
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      <svg
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        viewBox="0 0 100 100"
        style={{
          filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))',
        }}
      >
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#communityGradient1)"
          strokeWidth="2"
          strokeDasharray="5,3"
          className={animate ? 'animate-spin' : ''}
          style={{ transformOrigin: '50px 50px', animationDuration: '4s' }}
        />
        
        {/* Inner core */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="url(#communityCoreGradient)"
          className={animate ? 'animate-pulse' : ''}
        />
        
        {/* Community people icons */}
        <g className={animate ? 'animate-pulse' : ''} style={{ animationDuration: '2s' }}>
          <circle cx="40" cy="40" r="4" fill="white" />
          <circle cx="60" cy="40" r="4" fill="white" />
          <circle cx="50" cy="55" r="4" fill="white" />
          <path d="M35 48 Q40 45 45 48" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M55 48 Q60 45 65 48" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M45 63 Q50 60 55 63" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="communityGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <radialGradient id="communityCoreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.9)" />
            <stop offset="70%" stopColor="rgba(5, 150, 105, 0.7)" />
            <stop offset="100%" stopColor="rgba(4, 120, 87, 0.5)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [communityStats, setCommunityStats] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [unreadCount, setUnreadCount] = useState(0);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    loadInitialData();
    
    // Setup real-time updates
    const cleanup = setupRealTimeUpdates((data) => {
      setUnreadCount(data.unread_count || 0);
    });
    
    return cleanup;
  }, []);

  useEffect(() => {
    loadPosts();
  }, [activeFilter, sortBy]);

  const loadInitialData = async () => {
    try {
      // Load community stats, trending topics, and suggested users
      const [statsResult, topicsResult, usersResult] = await Promise.all([
        getCommunityStats(),
        getTrendingTopics(),
        getSuggestedUsers()
      ]);

      if (statsResult.success) {
        setCommunityStats(statsResult.data);
      }

      if (topicsResult.success) {
        setTrendingTopics(topicsResult.data);
      }

      if (usersResult.success) {
        setSuggestedUsers(usersResult.data);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        type: activeFilter,
        sort: sortBy
      };

      const result = await getPosts(params);
      
      if (result.success) {
        setPosts(result.data.results || []);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to load posts. Please try again.');
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setShowCreatePost(false);
    
    // Reload community stats to reflect new post
    loadInitialData();
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="text-center">
          <CommunityIcon size={12} animate={true} />
          <p className="text-gray-600 mt-4 text-sm sm:text-base">Loading community feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 -mt-4">
      {/* Header - Responsive */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <CommunityIcon size={window.innerWidth < 640 ? 6 : 8} animate={false} />
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Community</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {posts.length} posts
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-2 text-gray-600 hover:text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon icon={faSearch} className="text-lg" />
              </button>

              {/* Desktop Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search posts, hashtags..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-48 lg:w-64 text-sm"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <FontAwesomeIcon icon={faBell} className="text-lg sm:text-xl" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Create Post Button */}
              <button
                onClick={() => setShowCreatePost(true)}
                className="bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
              >
                <FontAwesomeIcon icon={faPlus} className="text-sm" />
                <span className="hidden sm:inline">Create</span>
                <span className="sm:hidden">+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden border-t bg-white px-3 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts, hashtags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                autoFocus
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:col-span-3 space-y-4 lg:space-y-6">
            <CommunityStats stats={communityStats} />
            <TrendingTopics topics={trendingTopics} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            {/* Mobile Stats Cards */}
            <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CommunityIcon size={4} animate={false} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Active Members</p>
                    <p className="text-lg font-bold text-gray-900">
                      {communityStats?.active_members || '12.4k'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faPlus} className="text-blue-600 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Posts Today</p>
                    <p className="text-lg font-bold text-gray-900">
                      {communityStats?.posts_today || '247'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <FilterTabs 
              activeFilter={activeFilter} 
              onFilterChange={handleFilterChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                <p className="text-red-600 text-sm sm:text-base">{error}</p>
                <button
                  onClick={loadPosts}
                  className="mt-2 text-red-700 hover:text-red-800 font-medium text-sm"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Posts */}
            <div className="space-y-4 sm:space-y-6">
              {loading ? (
                <div className="text-center py-8 sm:py-12">
                  <CommunityIcon size={10} animate={true} />
                  <p className="text-gray-600 mt-4 text-sm sm:text-base">Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-lg sm:text-xl" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base px-4">
                    {activeFilter !== 'all' 
                      ? `No ${activeFilter} posts available. Try a different filter.`
                      : 'Be the first to share something with the community!'
                    }
                  </p>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="bg-emerald-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base"
                  >
                    Create First Post
                  </button>
                </div>
              ) : (
                posts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onUpdate={handlePostUpdate}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:col-span-3 space-y-4 lg:space-y-6">
            <SuggestedConnections users={suggestedUsers} />
          </div>
        </div>

        {/* Mobile Bottom Sections */}
        <div className="lg:hidden mt-6 space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Trending Topics</h3>
            <TrendingTopics topics={trendingTopics} />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Suggested Connections</h3>
            <SuggestedConnections users={suggestedUsers} />
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

export default CommunityFeed; 