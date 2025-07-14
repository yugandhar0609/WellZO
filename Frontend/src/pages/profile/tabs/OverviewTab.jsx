import React from 'react';
import { Link } from 'react-router-dom';

const OverviewTab = ({ currentUser, profileData, setProfileData }) => {
  const displayName = currentUser?.name || profileData?.full_name || 'User';
  const avatarUrl = currentUser?.profile_picture_url || profileData?.profile_picture_url || 'https://via.placeholder.com/150/cccccc/808080?Text=User';

  // Mock data for demonstration
  const quickStats = [
    { label: 'Current Weight', value: '75 kg', target: '70 kg', progress: 70, color: 'emerald' },
    { label: 'Daily Steps', value: '8,247', target: '10,000', progress: 82, color: 'blue' },
    { label: 'Water Intake', value: '2.1 L', target: '2.5 L', progress: 84, color: 'cyan' },
    { label: 'Sleep Hours', value: '7.2 h', target: '8 h', progress: 90, color: 'purple' }
  ];

  const healthMetrics = [
    { icon: '❤️', label: 'Heart Rate', value: '72 bpm', status: 'normal' },
    { icon: '🩸', label: 'Blood Pressure', value: '120/80', status: 'normal' },
    { icon: '🌡️', label: 'Body Temperature', value: '36.8°C', status: 'normal' },
    { icon: '⚡', label: 'Energy Level', value: '85%', status: 'good' }
  ];

  const recentActivities = [
    { type: 'workout', icon: '💪', activity: 'Morning Yoga', time: '2 hours ago', duration: '45 min' },
    { type: 'meal', icon: '🥗', activity: 'Healthy Lunch', time: '4 hours ago', calories: '520 cal' },
    { type: 'water', icon: '💧', activity: 'Hydration Goal', time: '6 hours ago', amount: '500ml' },
    { type: 'sleep', icon: '😴', activity: 'Sleep Tracking', time: '8 hours ago', duration: '7.2 h' }
  ];

  const getProgressColor = (color) => {
    const colors = {
      emerald: 'bg-emerald-500',
      blue: 'bg-blue-500',
      cyan: 'bg-cyan-500',
      purple: 'bg-purple-500'
    };
    return colors[color] || 'bg-emerald-500';
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-emerald-800 mb-2">
              Welcome back, {displayName.split(' ')[0]}! 👋
            </h2>
            <p className="text-sm sm:text-base text-emerald-600">
              You're doing great! Keep up the healthy lifestyle.
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-200 rounded-full flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">🎯</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</h3>
              <span className="text-xs text-gray-400">{stat.progress}%</span>
            </div>
            <div className="mb-2 sm:mb-3">
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500">Target: {stat.target}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(stat.color)}`}
                style={{ width: `${stat.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Health Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{metric.icon}</span>
              <div>
                <div className="text-sm font-medium text-gray-900">{metric.label}</div>
                <div className="text-lg font-bold text-gray-700">{metric.value}</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  metric.status === 'normal' ? 'bg-green-100 text-green-800' : 
                  metric.status === 'good' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {metric.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <Link to="/dashboard" className="text-sm text-emerald-600 hover:text-emerald-700">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.activity}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
                <div className="text-sm text-gray-600">
                  {activity.duration || activity.calories || activity.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goal Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Progress</h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-emerald-800">Weight Loss Goal</span>
                <span className="text-sm text-emerald-600">5 kg lost</span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="text-xs text-emerald-600 mt-1">70% complete • 2 kg to go</div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">Fitness Challenge</span>
                <span className="text-sm text-blue-600">12/30 days</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="text-xs text-blue-600 mt-1">40% complete • 18 days left</div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-800">Meditation Streak</span>
                <span className="text-sm text-purple-600">7 days</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="text-xs text-purple-600 mt-1">New record! Keep going 🔥</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/workouts" className="flex flex-col items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
            <span className="text-2xl mb-2">💪</span>
            <span className="text-sm font-medium text-emerald-800">Start Workout</span>
          </Link>
          <Link to="/meals" className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <span className="text-2xl mb-2">🍽️</span>
            <span className="text-sm font-medium text-orange-800">Log Meal</span>
          </Link>
          <Link to="/progress" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <span className="text-2xl mb-2">📊</span>
            <span className="text-sm font-medium text-blue-800">View Progress</span>
          </Link>
          <Link to="/ai-chat" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <span className="text-2xl mb-2">🤖</span>
            <span className="text-sm font-medium text-purple-800">AI Coach</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab; 