import React, { useState } from 'react';

const BadgesTab = ({ currentUser, profileData }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock badge data
  const badges = [
    {
      id: 1,
      name: 'Early Bird',
      description: 'Complete 5 morning workouts',
      icon: '🌅',
      category: 'workout',
      earned: true,
      earnedDate: '2024-01-15',
      progress: 5,
      total: 5,
      rarity: 'common',
      points: 50
    },
    {
      id: 2,
      name: 'Hydration Hero',
      description: 'Drink 8 glasses of water daily for 7 days',
      icon: '💧',
      category: 'health',
      earned: true,
      earnedDate: '2024-01-10',
      progress: 7,
      total: 7,
      rarity: 'common',
      points: 75
    },
    {
      id: 3,
      name: 'Streak Master',
      description: 'Maintain a 30-day workout streak',
      icon: '🔥',
      category: 'workout',
      earned: false,
      progress: 18,
      total: 30,
      rarity: 'rare',
      points: 200
    },
    {
      id: 4,
      name: 'Community Champion',
      description: 'Get 100 likes on your posts',
      icon: '👑',
      category: 'social',
      earned: true,
      earnedDate: '2024-01-08',
      progress: 147,
      total: 100,
      rarity: 'epic',
      points: 150
    },
    {
      id: 5,
      name: 'Weight Loss Warrior',
      description: 'Lose 5kg and maintain for 2 weeks',
      icon: '⚖️',
      category: 'health',
      earned: false,
      progress: 3.2,
      total: 5,
      rarity: 'rare',
      points: 300
    },
    {
      id: 6,
      name: 'Nutrition Ninja',
      description: 'Track meals for 14 consecutive days',
      icon: '🥗',
      category: 'nutrition',
      earned: true,
      earnedDate: '2024-01-12',
      progress: 14,
      total: 14,
      rarity: 'uncommon',
      points: 100
    },
    {
      id: 7,
      name: 'Sleep Guardian',
      description: 'Get 8+ hours of sleep for 10 nights',
      icon: '😴',
      category: 'health',
      earned: false,
      progress: 6,
      total: 10,
      rarity: 'uncommon',
      points: 125
    },
    {
      id: 8,
      name: 'Marathon Master',
      description: 'Complete a marathon distance',
      icon: '🏃‍♂️',
      category: 'workout',
      earned: false,
      progress: 0,
      total: 1,
      rarity: 'legendary',
      points: 500
    }
  ];

  const categories = [
    { id: 'all', label: 'All Badges', icon: '🏆' },
    { id: 'workout', label: 'Workout', icon: '💪' },
    { id: 'health', label: 'Health', icon: '❤️' },
    { id: 'nutrition', label: 'Nutrition', icon: '🍎' },
    { id: 'social', label: 'Social', icon: '👥' }
  ];

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    uncommon: 'from-green-400 to-green-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500'
  };

  const rarityBorders = {
    common: 'border-gray-300',
    uncommon: 'border-green-300',
    rare: 'border-blue-300',
    epic: 'border-purple-300',
    legendary: 'border-yellow-300'
  };

  const filteredBadges = activeCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === activeCategory);

  const earnedBadges = badges.filter(badge => badge.earned);
  const totalPoints = earnedBadges.reduce((sum, badge) => sum + badge.points, 0);

  const getProgressPercentage = (progress, total) => {
    return Math.min((progress / total) * 100, 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Total Badges</p>
              <p className="text-3xl font-bold">{earnedBadges.length}</p>
              <p className="text-emerald-200 text-sm">of {badges.length} available</p>
            </div>
            <div className="text-4xl opacity-80">🏆</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Points</p>
              <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
              <p className="text-blue-200 text-sm">Achievement points</p>
            </div>
            <div className="text-4xl opacity-80">⭐</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Completion</p>
              <p className="text-3xl font-bold">{Math.round((earnedBadges.length / badges.length) * 100)}%</p>
              <p className="text-purple-200 text-sm">Profile complete</p>
            </div>
            <div className="text-4xl opacity-80">📊</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
                activeCategory === category.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredBadges.map((badge) => (
          <div 
            key={badge.id} 
            className={`bg-white rounded-2xl p-4 sm:p-6 border-2 ${rarityBorders[badge.rarity]} shadow-sm hover:shadow-md transition-shadow ${
              badge.earned ? 'opacity-100' : 'opacity-75'
            }`}
          >
            {/* Badge Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${rarityColors[badge.rarity]} flex items-center justify-center text-lg sm:text-2xl shadow-lg`}>
                {badge.icon}
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  badge.earned 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {badge.earned ? '✓ Earned' : 'In Progress'}
                </div>
                <p className="text-xs text-gray-500 mt-1 capitalize">{badge.rarity}</p>
              </div>
            </div>

            {/* Badge Info */}
            <div className="mb-3 sm:mb-4">
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{badge.name}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">{badge.description}</p>
              {badge.earned && (
                <p className="text-xs text-emerald-600 font-medium">
                  Earned on {formatDate(badge.earnedDate)}
                </p>
              )}
            </div>

            {/* Progress Bar */}
            {!badge.earned && (
              <div className="mb-3 sm:mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
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

            {/* Points */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">⭐</span>
                <span className="text-xs sm:text-sm font-medium text-gray-700">{badge.points} pts</span>
              </div>
              {badge.earned && (
                <div className="text-emerald-600 text-lg sm:text-xl">✓</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {earnedBadges.slice(0, 3).map((badge) => (
            <div key={badge.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${rarityColors[badge.rarity]} flex items-center justify-center text-lg`}>
                {badge.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{badge.name}</p>
                <p className="text-sm text-gray-600">Earned on {formatDate(badge.earnedDate)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium text-gray-700">{badge.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesTab; 