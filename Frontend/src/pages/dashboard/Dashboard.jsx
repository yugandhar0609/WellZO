import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../interceptor/services';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isLoading: authLoading } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [waterIntake, setWaterIntake] = useState(6);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [profileData, setProfileData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      
      setIsLoadingProfile(true);
      try {
        const response = await getUserProfile();
        if (response.success && response.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (!authLoading && currentUser) {
      fetchProfile();
    }
  }, [currentUser, authLoading]);

  const addWater = () => {
    setWaterIntake(prev => Math.min(prev + 1, 8));
  };

  const handleLogout = () => {
    logout();
  };

  // Get user display data
  const getUserDisplayData = () => {
    if (!currentUser) return { name: 'User', avatar: 'https://via.placeholder.com/60' };
    
    const name = profileData?.full_name || currentUser.name || 'User';
    const avatar = currentUser.profile_picture_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face';
    
    return { name, avatar };
  };

  const { name: userName, avatar: userAvatar } = getUserDisplayData();

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Check if profile is complete
  const isProfileComplete = profileData && 
    profileData.full_name && 
    profileData.age && 
    profileData.gender && 
    profileData.city;

  // Mock health metrics (these would come from actual health tracking APIs)
  const healthMetrics = [
    { 
      title: 'Daily Steps', 
      value: '12,847', 
      target: '15,000',
      percentage: 86,
      icon: 'fa-walking',
      bgColor: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'Calories Burned', 
      value: '2,486', 
      target: '2,800',
      percentage: 89,
      icon: 'fa-fire',
      bgColor: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: '+8%',
      trend: 'up'
    },
    { 
      title: 'Heart Rate', 
      value: '72 BPM', 
      target: 'Normal',
      percentage: 100,
      icon: 'fa-heartbeat',
      bgColor: 'bg-red-500',
      lightBg: 'bg-red-50',
      textColor: 'text-red-600',
      change: 'Stable',
      trend: 'stable'
    },
    { 
      title: 'Sleep Quality', 
      value: '7.5h', 
      target: '8h',
      percentage: 94,
      icon: 'fa-moon',
      bgColor: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+15min',
      trend: 'up'
    }
  ];

  const todaySchedule = [
    { time: '07:00', activity: 'Morning Yoga', type: 'workout', status: 'completed' },
    { time: '09:30', activity: 'Protein Smoothie', type: 'nutrition', status: 'completed' },
    { time: '12:00', activity: 'Healthy Lunch', type: 'nutrition', status: 'pending' },
    { time: '15:30', activity: 'HIIT Training', type: 'workout', status: 'pending' },
    { time: '19:00', activity: 'Meditation', type: 'wellness', status: 'pending' }
  ];

  const achievements = [
    { title: '7-Day Streak', icon: 'fa-fire', bgColor: 'bg-orange-500', lightBg: 'bg-orange-50', textColor: 'text-orange-600' },
    { title: 'Weight Goal', icon: 'fa-trophy', bgColor: 'bg-yellow-500', lightBg: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { title: 'Hydration Master', icon: 'fa-tint', bgColor: 'bg-blue-500', lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'Early Bird', icon: 'fa-sun', bgColor: 'bg-amber-500', lightBg: 'bg-amber-50', textColor: 'text-amber-600' }
  ];

  // Show loading if auth or profile is loading
  if (authLoading || (currentUser && isLoadingProfile)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Completion Banner */}
      {!isProfileComplete && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <i className="fas fa-exclamation-triangle"></i>
              <span className="font-medium">Complete your profile to unlock all features!</span>
            </div>
            <Link 
              to="/user-details" 
              className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-lg transition-colors text-sm font-medium"
            >
              Complete Now
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">W</span>
                  </div>
                  <h1 className="text-xl font-bold text-emerald-600">WellZO</h1>
                </div>
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <i className="fas fa-times text-gray-500"></i>
                </button>
              </div>
            </div>
            <nav className="p-4">
              <div className="space-y-2">
                <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-500 text-white">
                  <i className="fas fa-home"></i>
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link to="/health-tracking" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700">
                  <i className="fas fa-chart-line"></i>
                  <span>Health Tracking</span>
                </Link>
                <Link to="/community" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700">
                  <i className="fas fa-users"></i>
                  <span>Community</span>
                </Link>
                <Link to="/nutrition" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700">
                  <i className="fas fa-apple-alt"></i>
                  <span>Nutrition</span>
                </Link>
                <Link to="/workouts" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700">
                  <i className="fas fa-dumbbell"></i>
                  <span>Workouts</span>
                </Link>
                <Link to="/wellness" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700">
                  <i className="fas fa-spa"></i>
                  <span>Wellness</span>
                </Link>
                <Link to="/marketplace" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700">
                  <i className="fas fa-store"></i>
                  <span>Marketplace</span>
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-xs font-semibold text-gray-500 mb-3 px-3">AI ASSISTANTS</h4>
                <div className="space-y-2">
                  <Link to="/nutrition-ai" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700">
                    <i className="fas fa-robot text-emerald-600"></i>
                    <span>Nutrition AI</span>
                  </Link>
                  <Link to="/fitness-ai" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700">
                    <i className="fas fa-brain text-purple-600"></i>
                    <span>Fitness AI</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white shadow-lg hidden lg:block z-30">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <h1 className="text-2xl font-bold text-emerald-600">WellZO</h1>
          </div>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            <Link to="/dashboard" className="flex items-center space-x-3 p-4 rounded-xl bg-emerald-500 text-white shadow-md">
              <i className="fas fa-home"></i>
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link to="/health-tracking" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors">
              <i className="fas fa-chart-line"></i>
              <span>Health Tracking</span>
            </Link>
            <Link to="/community" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors">
              <i className="fas fa-users"></i>
              <span>Community</span>
            </Link>
            <Link to="/nutrition" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors">
              <i className="fas fa-apple-alt"></i>
              <span>Nutrition</span>
            </Link>
            <Link to="/workouts" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors">
              <i className="fas fa-dumbbell"></i>
              <span>Workouts</span>
            </Link>
            <Link to="/wellness" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors">
              <i className="fas fa-spa"></i>
              <span>Wellness</span>
            </Link>
            <Link to="/marketplace" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors">
              <i className="fas fa-store"></i>
              <span>Marketplace</span>
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 mb-4 px-4">AI ASSISTANTS</h4>
            <div className="space-y-2">
              <Link to="/nutrition-ai" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors">
                <i className="fas fa-robot text-emerald-600"></i>
                <span>Nutrition AI</span>
              </Link>
              <Link to="/fitness-ai" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors">
                <i className="fas fa-brain text-purple-600"></i>
                <span>Fitness AI</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 lg:mr-80 min-h-screen pb-20 lg:pb-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <i className="fas fa-bars text-gray-600"></i>
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {getGreeting()}, {userName.split(' ')[0]}!
                </h2>
                <p className="text-sm text-gray-500">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="hidden sm:block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">Last 3 Months</option>
              </select>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="lg:hidden relative"
              >
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8 space-y-8">
          {/* Health Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${metric.lightBg} rounded-xl flex items-center justify-center`}>
                    <i className={`fas ${metric.icon} ${metric.textColor} text-xl`}></i>
                  </div>
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.trend === 'up' && <i className="fas fa-arrow-up mr-1"></i>}
                    {metric.trend === 'down' && <i className="fas fa-arrow-down mr-1"></i>}
                    {metric.change}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${metric.bgColor} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${metric.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400">Target: {metric.target}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions & Water Intake */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors group">
                  <i className="fas fa-plus text-emerald-600 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                  <span className="text-sm font-medium text-emerald-700">Log Meal</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
                  <i className="fas fa-dumbbell text-blue-600 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                  <span className="text-sm font-medium text-blue-700">Start Workout</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group">
                  <i className="fas fa-moon text-purple-600 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                  <span className="text-sm font-medium text-purple-700">Log Sleep</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group">
                  <i className="fas fa-weight text-orange-600 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                  <span className="text-sm font-medium text-orange-700">Log Weight</span>
                </button>
              </div>
            </div>

            {/* Water Intake */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Water Intake</h3>
                <i className="fas fa-tint text-2xl opacity-80"></i>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{waterIntake}/8</div>
                <p className="text-blue-100 mb-4">Glasses today</p>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-8 rounded-full ${
                        i < waterIntake ? 'bg-white' : 'bg-white/30'
                      } transition-colors`}
                    ></div>
                  ))}
                </div>
                <button 
                  onClick={addWater}
                  className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl transition-colors font-medium"
                >
                  Add Glass
                </button>
              </div>
            </div>
          </div>

          {/* Today's Schedule & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Today's Schedule</h3>
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className={`flex items-center p-4 rounded-xl ${
                    item.status === 'completed' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      item.type === 'workout' ? 'bg-orange-100 text-orange-600' :
                      item.type === 'nutrition' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <i className={`fas ${
                        item.type === 'workout' ? 'fa-dumbbell' :
                        item.type === 'nutrition' ? 'fa-utensils' :
                        'fa-spa'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.activity}</h4>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    {item.status === 'completed' && (
                      <i className="fas fa-check-circle text-green-500 text-xl"></i>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Recent Achievements</h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`w-12 h-12 ${achievement.lightBg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <i className={`fas ${achievement.icon} ${achievement.textColor} text-xl`}></i>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Insights */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-md p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">AI Health Insights</h3>
              <i className="fas fa-brain text-2xl opacity-80"></i>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-medium mb-2">💡 Today's Recommendation</h4>
                <p className="text-emerald-100 text-sm">
                  Based on your activity, consider adding 15 minutes of stretching to improve flexibility and reduce muscle tension.
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-medium mb-2">📈 Weekly Progress</h4>
                <p className="text-emerald-100 text-sm">
                  You're 23% more active this week! Keep up the great work and stay consistent with your routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar - Profile & Notifications */}
      <aside className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg hidden lg:block overflow-y-auto z-30">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={userAvatar}
                alt="Profile"
                className="w-14 h-14 rounded-full border-2 border-emerald-500 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{userName}</h3>
              <p className="text-sm text-gray-500">Premium Member</p>
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-xs"></i>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-2">Level 12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500 mb-4">PROFILE INFO</h4>
          <div className="space-y-3">
            {profileData?.age && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Age</span>
                <span className="font-semibold text-gray-900">{profileData.age} years</span>
              </div>
            )}
            {profileData?.city && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Location</span>
                <span className="font-semibold text-gray-900">{profileData.city}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Member Since</span>
              <span className="font-semibold text-gray-900">
                {new Date(currentUser.created_at || Date.now()).getFullYear()}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500 mb-4">QUICK STATS</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Streak</span>
              <span className="font-semibold text-emerald-600">7 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Points</span>
              <span className="font-semibold text-purple-600">2,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rank</span>
              <span className="font-semibold text-orange-600">#23</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6">
          <h4 className="text-sm font-semibold text-gray-500 mb-4">NOTIFICATIONS</h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-xl">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-trophy text-white text-sm"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">New Achievement!</p>
                <p className="text-xs text-gray-500">You've completed your weekly goal</p>
                <span className="text-xs text-gray-400">2 minutes ago</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-bell text-white text-sm"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Workout Reminder</p>
                <p className="text-xs text-gray-500">HIIT session in 30 minutes</p>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-xl">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-heart text-white text-sm"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Health Tip</p>
                <p className="text-xs text-gray-500">Stay hydrated throughout the day</p>
                <span className="text-xs text-gray-400">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 border-t border-gray-200">
          <div className="space-y-3">
            <Link 
              to="/profile-dashboard" 
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors"
            >
              <i className="fas fa-user text-gray-400"></i>
              <span className="text-sm">View Profile</span>
            </Link>
            <Link 
              to="/user-details" 
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors"
            >
              <i className="fas fa-user-edit text-gray-400"></i>
              <span className="text-sm">Edit Profile</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:hidden z-50 border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1 px-2 py-3">
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-emerald-600">
            <i className="fas fa-home text-lg mb-1"></i>
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link to="/community" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors">
            <i className="fas fa-users text-lg mb-1"></i>
            <span className="text-xs">Community</span>
          </Link>
          <Link to="/nutrition-ai" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-1">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <span className="text-xs">AI</span>
          </Link>
          <Link to="/workouts" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors">
            <i className="fas fa-dumbbell text-lg mb-1"></i>
            <span className="text-xs">Workout</span>
          </Link>
          <Link to="/marketplace" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors">
            <i className="fas fa-store text-lg mb-1"></i>
            <span className="text-xs">Store</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Profile Menu */}
      {showProfileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={userAvatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-emerald-500 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{userName}</h3>
                    <p className="text-sm text-gray-500">Premium Member</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowProfileMenu(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <i className="fas fa-times text-gray-500"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-3">PROFILE INFO</h4>
                <div className="space-y-3">
                  {profileData?.age && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Age</span>
                      <span className="font-semibold text-gray-900">{profileData.age} years</span>
                    </div>
                  )}
                  {profileData?.city && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="font-semibold text-gray-900">{profileData.city}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-3">ACCOUNT</h4>
                <div className="space-y-2">
                  <Link 
                    to="/profile-dashboard" 
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <i className="fas fa-user text-gray-400"></i>
                    <span>View Profile</span>
                  </Link>
                  <Link 
                    to="/user-details" 
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <i className="fas fa-user-edit text-gray-400"></i>
                    <span>Edit Profile</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
