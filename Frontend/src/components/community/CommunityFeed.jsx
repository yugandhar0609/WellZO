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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Community</h1>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {posts.length} posts
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search posts, hashtags..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <FontAwesomeIcon icon={faBell} className="text-xl" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Create Post Button */}
              <button
                onClick={() => setShowCreatePost(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span className="hidden sm:inline">Create Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <CommunityStats stats={communityStats} />
            <TrendingTopics topics={trendingTopics} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Filter Tabs */}
            <FilterTabs 
              activeFilter={activeFilter} 
              onFilterChange={handleFilterChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={loadPosts}
                  className="mt-2 text-red-700 hover:text-red-800 font-medium"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Posts */}
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-4">
                    {activeFilter !== 'all' 
                      ? `No ${activeFilter} posts available. Try a different filter.`
                      : 'Be the first to share something with the community!'
                    }
                  </p>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
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

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
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