import React, { useState } from 'react';

const UserInsights = ({ user }) => {
  const [timeframe, setTimeframe] = useState('week');

  const insights = {
    week: {
      posts: 5,
      views: 1234,
      likes: 89,
      comments: 23,
      shares: 12,
      followers: 342,
      engagement_rate: 12.8,
      top_hashtags: ['#morningroutine', '#wellness', '#fitness'],
      growth: {
        posts: '+25%',
        views: '+18%',
        engagement: '+15%'
      }
    },
    month: {
      posts: 18,
      views: 4567,
      likes: 234,
      comments: 78,
      shares: 45,
      followers: 342,
      engagement_rate: 15.2,
      top_hashtags: ['#selfgrowth', '#nutrition', '#mindfulness'],
      growth: {
        posts: '+12%',
        views: '+23%',
        engagement: '+8%'
      }
    },
    year: {
      posts: 156,
      views: 28945,
      likes: 1567,
      comments: 432,
      shares: 234,
      followers: 342,
      engagement_rate: 18.6,
      top_hashtags: ['#wellness', '#fitnessjourney', '#mentalhealth'],
      growth: {
        posts: '+45%',
        views: '+67%',
        engagement: '+32%'
      }
    }
  };

  const badges = [
    {
      id: 1,
      name: 'Early Adopter',
      description: 'One of the first 1000 community members',
      icon: '🚀',
      earned: true,
      date: '2 months ago'
    },
    {
      id: 2,
      name: 'Motivation Master',
      description: 'Received 100+ motivate reactions',
      icon: '⚡',
      earned: true,
      date: '3 weeks ago'
    },
    {
      id: 3,
      name: 'Wellness Warrior',
      description: 'Posted for 30 consecutive days',
      icon: '🏆',
      earned: true,
      date: '1 week ago'
    },
    {
      id: 4,
      name: 'Community Helper',
      description: 'Commented on 50+ posts',
      icon: '🤝',
      earned: false,
      progress: 42,
      total: 50
    },
    {
      id: 5,
      name: 'Trending Creator',
      description: 'Had a post reach 1000+ views',
      icon: '🔥',
      earned: false,
      progress: 750,
      total: 1000
    }
  ];

  const achievements = [
    {
      title: 'Most Inspiring Post',
      description: 'Your post "My 30-day meditation journey" received the most love reactions this week',
      icon: '💝',
      metric: '45 love reactions'
    },
    {
      title: 'Top Engager',
      description: 'You\'re in the top 10% for community engagement this month',
      icon: '🌟',
      metric: '15.2% engagement rate'
    },
    {
      title: 'Consistency Champion',
      description: 'Posted content for 5 days in a row',
      icon: '🎯',
      metric: '5 day streak'
    }
  ];

  const currentData = insights[timeframe];

  const getProgressPercentage = (current, total) => {
    return Math.round((current / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Impact</h2>
            <p className="text-sm text-gray-500">See how you're inspiring the community</p>
          </div>
          
          {/* Timeframe Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeframe === period
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-eye text-blue-600"></i>
              <span className="text-xs text-green-600 font-medium">{currentData.growth.views}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{currentData.views.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Views</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-heart text-green-600"></i>
              <span className="text-xs text-green-600 font-medium">{currentData.growth.engagement}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{currentData.likes}</div>
            <div className="text-sm text-gray-600">Reactions</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-comments text-purple-600"></i>
              <span className="text-xs text-green-600 font-medium">+12%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{currentData.comments}</div>
            <div className="text-sm text-gray-600">Comments</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-share text-orange-600"></i>
              <span className="text-xs text-green-600 font-medium">+8%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{currentData.shares}</div>
            <div className="text-sm text-gray-600">Shares</div>
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-emerald-700">{currentData.engagement_rate}%</div>
              <div className="text-sm text-emerald-600">Engagement Rate</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Top Hashtags</div>
              <div className="flex space-x-1 mt-1">
                {currentData.top_hashtags.map((tag, index) => (
                  <span key={index} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-yellow-700">{achievement.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Badges & Milestones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                badge.earned
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`text-2xl ${badge.earned ? '' : 'grayscale'}`}>
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${badge.earned ? 'text-emerald-700' : 'text-gray-600'}`}>
                    {badge.name}
                  </h4>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              </div>
              
              {badge.earned ? (
                <div className="text-xs text-emerald-600 font-medium">
                  <i className="fas fa-check mr-1"></i>
                  Earned {badge.date}
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress}/{badge.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(badge.progress, badge.total)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Summary */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-sm p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <i className="fas fa-chart-line text-2xl"></i>
          <h3 className="text-lg font-bold">Your Wellness Impact</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{currentData.posts}</div>
            <div className="text-sm opacity-90">Posts shared</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{currentData.followers}</div>
            <div className="text-sm opacity-90">People inspired</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">4.8⭐</div>
            <div className="text-sm opacity-90">Community rating</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <p className="text-sm opacity-90">
            "Keep sharing your journey! Your posts are inspiring others to start their own wellness transformations."
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInsights; 