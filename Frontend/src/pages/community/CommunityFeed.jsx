import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import PostCard from '../../components/community/PostCard';
import CreatePost from '../../components/community/CreatePost';
import CommunityStats from '../../components/community/CommunityStats';
import TrendingTopics from '../../components/community/TrendingTopics';
import SuggestedConnections from '../../components/community/SuggestedConnections';
import FilterTabs from '../../components/community/FilterTabs';
import AIWellnessBuddy from '../../components/community/AIWellnessBuddy';

const CommunityFeed = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showAIBuddy, setShowAIBuddy] = useState(false);

  // Add missing data variables
  const trendingTopics = [
    { tag: '#30daychallenge', posts: 1247, growth: '+23%' },
    { tag: '#mentalhealth', posts: 892, growth: '+18%' },
    { tag: '#nutrition', posts: 743, growth: '+15%' },
    { tag: '#fitness', posts: 1456, growth: '+12%' },
    { tag: '#mindfulness', posts: 534, growth: '+8%' }
  ];

  const suggestedUsers = [
    {
      id: 5,
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      title: 'Yoga Instructor',
      mutualConnections: 12,
      isFollowing: false
    },
    {
      id: 6,
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      title: 'Personal Trainer',
      mutualConnections: 8,
      isFollowing: false
    }
  ];

  // Mock data - replace with actual API calls
  const mockPosts = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
        verified: true,
        title: 'Certified Nutritionist'
      },
      type: 'achievement',
      content: "Just completed my 30-day meditation challenge! 🧘‍♀️ The mental clarity and reduced anxiety have been incredible. Here's what I learned...",
      media: [{ url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=300&fit=crop', type: 'image' }],
      metrics: {
        steps: 12847,
        duration: '30 days',
        improvement: '+25% focus'
      },
      tags: ['#meditation', '#mentalhealth', '#30daychallenge', '#mindfulness'],
      timestamp: '2 hours ago',
      likes: 127,
      loves: 45,
      motivates: 23,
      comments: 23,
      shares: 8,
      bookmarks: 67,
      reactions: { liked: false, loved: false, motivated: false },
      bookmarked: false,
      category: 'wellness',
      views: 1834
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        verified: false,
        title: 'Fitness Enthusiast'
      },
      type: 'fitness',
      content: "New PR today! Deadlifted 315lbs 💪 Been working on my form for months and finally hit this milestone. The key was focusing on progressive overload and proper nutrition.",
      media: [{ url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop', type: 'image' }],
      metrics: {
        weight: '315 lbs',
        previous: '285 lbs',
        improvement: '+30 lbs PR'
      },
      tags: ['#deadlift', '#personalrecord', '#strength', '#fitness'],
      timestamp: '4 hours ago',
      likes: 89,
      loves: 12,
      motivates: 45,
      comments: 15,
      shares: 5,
      bookmarks: 32,
      reactions: { liked: true, loved: false, motivated: false },
      bookmarked: false,
      category: 'fitness',
      views: 976
    },
    {
      id: 3,
      user: {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
        verified: true,
        title: 'Sports Nutritionist'
      },
      type: 'nutrition',
      content: "The science behind post-workout nutrition timing 🥗⏰ Your body has a 30-45 minute window where nutrient uptake is optimized. Here's what you should eat...",
      media: [{ url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=300&fit=crop', type: 'image' }],
      metrics: {
        readTime: '3 min read',
        sources: '5 studies cited',
        saves: '234 saves'
      },
      tags: ['#nutrition', '#science', '#postworkout', '#recovery'],
      timestamp: '6 hours ago',
      likes: 203,
      loves: 89,
      motivates: 34,
      comments: 34,
      shares: 67,
      bookmarks: 156,
      reactions: { liked: false, loved: false, motivated: false },
      bookmarked: true,
      category: 'nutrition',
      views: 2543
    },
    {
      id: 4,
      user: {
        id: 4,
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        verified: false,
        title: 'Mental Health Advocate'
      },
      type: 'wellness',
      content: "6 months of therapy and I can finally say I'm proud of my progress 🌱 Mental health is just as important as physical health. To anyone struggling - you're not alone.",
      media: [],
      metrics: {
        duration: '6 months',
        sessions: '24 sessions',
        improvement: 'Anxiety -60%'
      },
      tags: ['#mentalhealth', '#therapy', '#progress', '#anxiety', '#selfcare'],
      timestamp: '8 hours ago',
      likes: 156,
      loves: 234,
      motivates: 89,
      comments: 28,
      shares: 12,
      bookmarks: 78,
      reactions: { liked: false, loved: true, motivated: false },
      bookmarked: false,
      category: 'wellness',
      views: 1456
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  const handlePostCreate = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  const handlePostInteraction = (postId, type, value) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        switch (type) {
          case 'reaction':
            const newReactions = { ...post.reactions };
            // Toggle reaction: if same reaction is clicked, remove it; otherwise set new reaction
            if (post.reactions[value]) {
              // Remove the reaction
              newReactions[value] = false;
              return {
                ...post,
                reactions: newReactions,
                likes: value === 'liked' ? Math.max(0, post.likes - 1) : post.likes,
                loves: value === 'loved' ? Math.max(0, post.loves - 1) : post.loves,
                motivates: value === 'motivated' ? Math.max(0, post.motivates - 1) : post.motivates
              };
            } else {
              // Reset all reactions and set new one
              Object.keys(newReactions).forEach(key => newReactions[key] = false);
              newReactions[value] = true;
              
              return {
                ...post,
                reactions: newReactions,
                likes: value === 'liked' ? post.likes + 1 : post.reactions.liked ? Math.max(0, post.likes - 1) : post.likes,
                loves: value === 'loved' ? post.loves + 1 : post.reactions.loved ? Math.max(0, post.loves - 1) : post.loves,
                motivates: value === 'motivated' ? post.motivates + 1 : post.reactions.motivated ? Math.max(0, post.motivates - 1) : post.motivates
              };
            }
          case 'comment':
            return { ...post, comments: post.comments + 1 };
          case 'share':
            return { ...post, shares: post.shares + 1 };
          case 'bookmark':
            return { 
              ...post, 
              bookmarks: post.bookmarked ? Math.max(0, post.bookmarks - 1) : post.bookmarks + 1,
              bookmarked: !post.bookmarked 
            };
          case 'report':
            // Handle reporting (would send to moderation system)
            console.log(`Post ${postId} reported for: ${value}`);
            return post;
          default:
            return post;
        }
      }
      return post;
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center animate-pulse">
            <i className="fas fa-users text-white text-2xl"></i>
          </div>
          <p className="text-gray-600 font-medium">Loading your community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      {/* Enhanced Responsive Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left side - Logo and Title */}
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <i className="fas fa-users text-white text-sm sm:text-lg"></i>
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">WellZO Community</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Share your wellness journey</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Search/Discover Button */}
              <Link 
                to="/discover"
                className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-600 sm:px-3 sm:py-2 rounded-lg font-medium transition-colors"
                title="Discover"
              >
                <i className="fas fa-search text-sm"></i>
                <span className="hidden sm:inline text-sm">Discover</span>
              </Link>
              
              {/* AI Wellness Buddy Button */}
              <button 
                onClick={() => setShowAIBuddy(true)}
                className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-600 sm:px-3 sm:py-2 rounded-lg font-medium transition-colors"
                title="AI Buddy"
              >
                <i className="fas fa-robot text-sm"></i>
                <span className="hidden sm:inline text-sm">AI Buddy</span>
              </button>
              
              {/* Share Progress Button */}
              <button 
                onClick={() => setShowCreatePost(true)}
                className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white sm:px-4 sm:py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                title="Share Progress"
              >
                <i className="fas fa-plus text-sm"></i>
                <span className="hidden sm:inline text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <CommunityStats />
            <TrendingTopics topics={trendingTopics} />
            
            {/* Quick Actions for Mobile */}
            <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/discover"
                  className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <i className="fas fa-search text-gray-600 text-lg mb-1"></i>
                  <span className="text-sm font-medium text-gray-700">Discover</span>
                </Link>
                <button 
                  onClick={() => setShowAIBuddy(true)}
                  className="flex flex-col items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
                >
                  <i className="fas fa-robot text-purple-600 text-lg mb-1"></i>
                  <span className="text-sm font-medium text-purple-700">AI Buddy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Filter Tabs */}
            <FilterTabs 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />

            {/* Create Post Quick Action */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={currentUser?.profile_picture_url || 'https://via.placeholder.com/50'}
                  alt="Your avatar"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-emerald-200 object-cover"
                />
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 text-left text-gray-500 transition-colors text-sm sm:text-base"
                >
                  Share your wellness journey...
                </button>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 p-2 sm:p-3 rounded-xl transition-colors"
                >
                  <i className="fas fa-camera text-sm sm:text-base"></i>
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4 sm:space-y-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onInteraction={handlePostInteraction}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-6 sm:py-8">
              <button className="bg-white hover:bg-gray-50 border border-gray-200 px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-gray-600 font-medium transition-colors text-sm sm:text-base">
                Load More Posts
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <SuggestedConnections users={suggestedUsers} />
            
            {/* Community Guidelines */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Community Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <i className="fas fa-heart text-emerald-500 mt-1"></i>
                  <span>Be supportive and encouraging</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="fas fa-shield-alt text-emerald-500 mt-1"></i>
                  <span>Respect privacy and boundaries</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="fas fa-lightbulb text-emerald-500 mt-1"></i>
                  <span>Share evidence-based advice</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="fas fa-users text-emerald-500 mt-1"></i>
                  <span>Foster inclusive discussions</span>
                </div>
              </div>
            </div>

            {/* AI Wellness Buddy Teaser */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-sm p-4 sm:p-6 text-white">
              <div className="flex items-center space-x-2 mb-3">
                <i className="fas fa-robot text-xl sm:text-2xl"></i>
                <h3 className="font-semibold text-sm sm:text-base">AI Wellness Buddy</h3>
              </div>
              <p className="text-xs sm:text-sm opacity-90 mb-4">
                Get personalized wellness tips, nutrition advice, and fitness guidance from our AI assistant!
              </p>
              <button 
                onClick={() => setShowAIBuddy(true)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm w-full"
              >
                Chat with AI Buddy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onSubmit={handlePostCreate}
          user={currentUser}
        />
      )}

      {/* AI Wellness Buddy Modal */}
      <AIWellnessBuddy
        isOpen={showAIBuddy}
        onClose={() => setShowAIBuddy(false)}
      />
    </div>
  );
};

export default CommunityFeed; 