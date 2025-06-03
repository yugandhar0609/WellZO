import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../components/community/PostCard';

const DiscoverPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All', icon: 'fa-globe', count: '2.4k' },
    { id: 'fitness', name: 'Fitness', icon: 'fa-dumbbell', count: '892' },
    { id: 'nutrition', name: 'Nutrition', icon: 'fa-apple-alt', count: '743' },
    { id: 'wellness', name: 'Mental Wellness', icon: 'fa-spa', count: '1.1k' },
    { id: 'routine', name: 'Daily Routine', icon: 'fa-clock', count: '567' },
    { id: 'motivation', name: 'Motivation', icon: 'fa-fire', count: '445' },
    { id: 'achievement', name: 'Achievements', icon: 'fa-trophy', count: '334' }
  ];

  const sortOptions = [
    { id: 'trending', name: 'Trending', icon: 'fa-fire' },
    { id: 'recent', name: 'Most Recent', icon: 'fa-clock' },
    { id: 'popular', name: 'Most Popular', icon: 'fa-heart' },
    { id: 'discussed', name: 'Most Discussed', icon: 'fa-comments' }
  ];

  const trendingHashtags = [
    { tag: '#morningroutine', posts: 1247, growth: '+23%', color: 'blue' },
    { tag: '#vegmealplan', posts: 892, growth: '+18%', color: 'green' },
    { tag: '#selfgrowth', posts: 743, growth: '+15%', color: 'purple' },
    { tag: '#fitnessjourney', posts: 1456, growth: '+12%', color: 'orange' },
    { tag: '#mindfulness', posts: 534, growth: '+8%', color: 'indigo' },
    { tag: '#healthyhabits', posts: 623, growth: '+10%', color: 'emerald' }
  ];

  const challenges = [
    {
      id: 1,
      title: '30-Day Morning Routine',
      description: 'Start your day with intention',
      participants: 2847,
      daysLeft: 15,
      badge: '🌅',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Mindful March',
      description: '10 minutes of meditation daily',
      participants: 1534,
      daysLeft: 8,
      badge: '🧘‍♀️',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Plant-Based Week',
      description: 'Explore plant-based nutrition',
      participants: 987,
      daysLeft: 3,
      badge: '🌱',
      difficulty: 'Advanced'
    }
  ];

  // Mock posts data
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
      type: 'routine',
      content: "My 5AM morning routine that changed my life ☀️ Wake up → Hydrate → 10min meditation → Journal → Workout. The key is consistency, not perfection! #morningroutine #selfgrowth #mindfulness",
      media: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop', type: 'image' }],
      metrics: {
        duration: '90 minutes',
        consistency: '28 days',
        energy_boost: '+40%'
      },
      tags: ['#morningroutine', '#selfgrowth', '#mindfulness', '#productivity'],
      timestamp: '2 hours ago',
      likes: 127,
      loves: 45,
      motivates: 23,
      comments: 34,
      shares: 12,
      bookmarks: 67,
      reactions: { liked: false, loved: false, motivated: false },
      category: 'routine',
      views: 2847
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        verified: false,
        title: 'Plant-Based Chef'
      },
      type: 'nutrition',
      content: "Weekly meal prep made simple! 🥗 This colorful Buddha bowl has everything you need: quinoa, roasted veggies, chickpeas, and tahini dressing. Prep time: 45 minutes, feeds you for 4 days! #vegmealplan #mealprep #healthyeating",
      media: [{ url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop', type: 'image' }],
      metrics: {
        prep_time: '45 minutes',
        servings: '4 meals',
        cost: '$12 total'
      },
      tags: ['#vegmealplan', '#mealprep', '#healthyeating', '#plantbased'],
      timestamp: '4 hours ago',
      likes: 89,
      loves: 78,
      motivates: 12,
      comments: 23,
      shares: 15,
      bookmarks: 45,
      reactions: { liked: true, loved: false, motivated: false },
      category: 'nutrition',
      views: 1534
    },
    {
      id: 3,
      user: {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
        verified: true,
        title: 'Mental Health Therapist'
      },
      type: 'wellness',
      content: "Self-compassion isn't selfish 💜 Today's reminder: You can't pour from an empty cup. Taking care of your mental health is taking care of everyone you love. What's one thing you'll do for yourself today? #selfgrowth #mentalhealth #selfcare",
      media: [],
      metrics: {
        self_care_time: '30 minutes',
        mood_improvement: '+60%',
        stress_reduction: 'Significant'
      },
      tags: ['#selfgrowth', '#mentalhealth', '#selfcare', '#mindfulness'],
      timestamp: '6 hours ago',
      likes: 203,
      loves: 156,
      motivates: 89,
      comments: 67,
      shares: 34,
      bookmarks: 123,
      reactions: { liked: false, loved: true, motivated: false },
      category: 'wellness',
      views: 3267
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

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
            console.log(`Post ${postId} reported for: ${value}`);
            return post;
          default:
            return post;
        }
      }
      return post;
    }));
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleHashtagClick = (hashtag) => {
    setSearchQuery(hashtag);
  };

  const handleBackToFeed = () => {
    navigate('/community');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center animate-pulse">
            <i className="fas fa-search text-white text-2xl"></i>
          </div>
          <p className="text-gray-600 font-medium">Discovering amazing content...</p>
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
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <button 
                onClick={handleBackToFeed}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                title="Back to Community"
              >
                <i className="fas fa-arrow-left text-gray-600"></i>
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <i className="fas fa-search text-white text-sm sm:text-lg"></i>
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Discover</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Explore wellness content</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-gray-100 text-gray-600 px-3 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
              >
                <i className="fas fa-filter mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Left Sidebar - Filters */}
          <div className={`lg:col-span-1 space-y-4 sm:space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts, hashtags..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                      activeCategory === category.id
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <i className={`fas ${category.icon} ${
                        activeCategory === category.id ? 'text-emerald-600' : 'text-gray-400'
                      }`}></i>
                      <span className="font-medium text-sm sm:text-base">{category.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeCategory === category.id 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Hashtags */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Trending Hashtags</h3>
              <div className="space-y-3">
                {trendingHashtags.map((hashtag, index) => (
                  <button
                    key={index}
                    onClick={() => handleHashtagClick(hashtag.tag)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 bg-${hashtag.color}-500 rounded-full`}></div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors text-sm sm:text-base">
                          {hashtag.tag}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">{hashtag.posts} posts</div>
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${
                      hashtag.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {hashtag.growth}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Sort Options */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Sort by</h3>
                <div className="flex space-x-1 sm:space-x-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-colors ${
                        sortBy === option.id
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <i className={`fas ${option.icon} text-xs sm:text-sm`}></i>
                      <span className="text-xs sm:text-sm font-medium hidden sm:inline">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Summary */}
            {(searchQuery || activeCategory !== 'all') && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Showing results for:</span>
                    {activeCategory !== 'all' && (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                        {categories.find(c => c.id === activeCategory)?.name}
                      </span>
                    )}
                    {searchQuery && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        "{searchQuery}"
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}

            {/* Posts Feed */}
            <div className="space-y-4 sm:space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onInteraction={handlePostInteraction}
                  />
                ))
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                  <i className="fas fa-search text-3xl sm:text-4xl text-gray-300 mb-4"></i>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filters to find more content.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Challenges */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Daily Challenges */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-trophy text-white text-sm"></i>
                </div>
                <h3 className="font-semibold text-gray-900">Active Challenges</h3>
              </div>
              
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-xl sm:text-2xl">{challenge.badge}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        challenge.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                        challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{challenge.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">{challenge.description}</p>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">{challenge.participants.toLocaleString()} joined</span>
                      <span className="text-emerald-600 font-medium">{challenge.daysLeft} days left</span>
                    </div>
                    
                    <button className="w-full mt-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all text-xs sm:text-sm">
                      Join Challenge
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Spotlight */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-sm p-4 sm:p-6 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-star text-xl sm:text-2xl"></i>
                <h3 className="font-semibold text-sm sm:text-base">Weekly Spotlight</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-medium mb-1 text-sm sm:text-base">Top Contributor</h4>
                  <p className="text-xs sm:text-sm opacity-90">
                    @sarah_wellness shared 12 inspiring posts this week!
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-medium mb-1 text-sm sm:text-base">Trending Topic</h4>
                  <p className="text-xs sm:text-sm opacity-90">
                    #MindfulMarch is taking off with 2.4k posts!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage; 