import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../interceptor/services';
import BottomNavigationBar from '../../components/layout/BottomNavigationBar';
import TopProfileButton from '../../components/layout/TopProfileButton';

// 3D Animated AI Icon Component (Jarvis-style)
const JarvisAIIcon = ({ size = 6, animate = true }) => {
  const sizeClasses = {
    4: 'w-4 h-4',
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
          filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))',
        }}
      >
        {/* Outer rotating ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeDasharray="10,5"
          className={animate ? 'animate-spin' : ''}
          style={{ transformOrigin: '50px 50px', animationDuration: '3s' }}
        />
        
        {/* Middle ring */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          strokeDasharray="8,3"
          className={animate ? 'animate-spin' : ''}
          style={{ transformOrigin: '50px 50px', animationDuration: '2s', animationDirection: 'reverse' }}
        />
        
        {/* Inner core */}
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="url(#coreGradient)"
          className={animate ? 'animate-pulse' : ''}
        />
        
        {/* Central neural pattern */}
        <g className={animate ? 'animate-pulse' : ''} style={{ animationDuration: '1.5s' }}>
          <path
            d="M35 50 L50 35 L65 50 L50 65 Z"
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="50" r="3" fill="white" />
          <circle cx="42" cy="42" r="1.5" fill="rgba(255,255,255,0.7)" />
          <circle cx="58" cy="42" r="1.5" fill="rgba(255,255,255,0.7)" />
          <circle cx="42" cy="58" r="1.5" fill="rgba(255,255,255,0.7)" />
          <circle cx="58" cy="58" r="1.5" fill="rgba(255,255,255,0.7)" />
        </g>
        
        {/* Energy particles */}
        <g className={animate ? 'animate-ping' : ''} style={{ animationDuration: '2s' }}>
          <circle cx="25" cy="30" r="1" fill="rgba(168, 85, 247, 0.9)" />
          <circle cx="75" cy="25" r="1" fill="rgba(168, 85, 247, 0.9)" />
          <circle cx="80" cy="70" r="1" fill="rgba(168, 85, 247, 0.9)" />
          <circle cx="20" cy="75" r="1" fill="rgba(168, 85, 247, 0.9)" />
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.9)" />
            <stop offset="70%" stopColor="rgba(99, 102, 241, 0.7)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.5)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isLoading: authLoading } = useAuth();

  const [showSidebar, setShowSidebar] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [waterIntake, setWaterIntake] = useState(6);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [profileData, setProfileData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [showFoodScan, setShowFoodScan] = useState(false);
  const [selectedMeasurementPeriod, setSelectedMeasurementPeriod] = useState('week');
  const [showBodyProgress, setShowBodyProgress] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [bodyImages, setBodyImages] = useState([]);
  const [selectedImageType, setSelectedImageType] = useState('front');
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your personal AI health assistant. I can help you with nutrition advice, workout planning, health insights, and answer any wellness questions you have. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedWaterIntake = localStorage.getItem('waterIntake');
    const savedBodyImages = localStorage.getItem('bodyImages');
    
    if (savedWaterIntake) {
      setWaterIntake(parseInt(savedWaterIntake));
    }
    
    if (savedBodyImages) {
      setBodyImages(JSON.parse(savedBodyImages));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waterIntake', waterIntake.toString());
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem('bodyImages', JSON.stringify(bodyImages));
  }, [bodyImages]);

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

  // Handle body image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now(),
          type: selectedImageType,
          image: e.target.result,
          date: new Date().toISOString(),
          month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        setBodyImages(prev => [...prev, newImage]);
        setShowImageUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get body progress data by month
  const getBodyProgressByMonth = () => {
    const groupedByMonth = bodyImages.reduce((acc, image) => {
      if (!acc[image.month]) {
        acc[image.month] = { front: null, side: null, back: null };
      }
      acc[image.month][image.type] = image;
      return acc;
    }, {});
    
    return Object.entries(groupedByMonth)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .slice(-6); // Show last 6 months
  };

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem('waterIntake');
    localStorage.removeItem('bodyImages');
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

  // Enhanced health metrics with more comprehensive data
  const healthMetrics = [
    { 
      title: 'Daily Steps', 
      value: '12,847', 
      target: '15,000',
      percentage: 86,
      icon: '🚶‍♂️',
      bgColor: 'from-emerald-500 to-teal-600',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      change: '+12%',
      trend: 'up',
      subtitle: '2,153 steps to goal'
    },
    { 
      title: 'Calories Burned', 
      value: '2,486', 
      target: '2,800',
      percentage: 89,
      icon: '🔥',
      bgColor: 'from-orange-500 to-red-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: '+8%',
      trend: 'up',
      subtitle: '314 cal remaining'
    },
    { 
      title: 'Heart Rate', 
      value: '72 BPM', 
      target: 'Normal',
      percentage: 100,
      icon: '❤️',
      bgColor: 'from-red-500 to-pink-500',
      lightBg: 'bg-red-50',
      textColor: 'text-red-600',
      change: 'Stable',
      trend: 'stable',
      subtitle: 'Resting rate: 68 BPM'
    },
    { 
      title: 'Sleep Quality', 
      value: '7.5h', 
      target: '8h',
      percentage: 94,
      icon: '😴',
      bgColor: 'from-purple-500 to-indigo-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+15min',
      trend: 'up',
      subtitle: '30min to optimal'
    }
  ];

  // Body measurements data
  const bodyMeasurements = [
    { name: 'Weight', current: '72.5 kg', previous: '73.2 kg', change: '-0.7 kg', trend: 'down', icon: '⚖️' },
    { name: 'Body Fat', current: '18.2%', previous: '19.1%', change: '-0.9%', trend: 'down', icon: '📊' },
    { name: 'Muscle Mass', current: '58.3 kg', previous: '57.8 kg', change: '+0.5 kg', trend: 'up', icon: '💪' },
    { name: 'BMI', current: '23.4', previous: '23.7', change: '-0.3', trend: 'down', icon: '📏' }
  ];

  // Weight training progress
  const workoutProgress = [
    { exercise: 'Bench Press', current: '80 kg', target: '90 kg', percentage: 89, reps: '3x8', icon: '🏋️‍♂️' },
    { exercise: 'Squats', current: '100 kg', target: '110 kg', percentage: 91, reps: '3x10', icon: '🦵' },
    { exercise: 'Deadlift', current: '120 kg', target: '130 kg', percentage: 92, reps: '3x5', icon: '💪' },
    { exercise: 'Pull-ups', current: '12 reps', target: '15 reps', percentage: 80, reps: '3 sets', icon: '🔥' }
  ];

  // Calorie tracking data
  const calorieData = {
    consumed: 1847,
    burned: 2486,
    target: 2200,
    remaining: 353,
    macros: {
      protein: { consumed: 145, target: 165, percentage: 88 },
      carbs: { consumed: 220, target: 275, percentage: 80 },
      fats: { consumed: 68, target: 73, percentage: 93 }
    }
  };

  // Meal suggestions
  const mealSuggestions = [
    { 
      name: 'Grilled Chicken Salad', 
      calories: 420, 
      time: 'Lunch', 
      protein: '35g', 
      icon: '🥗',
      difficulty: 'Easy',
      prepTime: '15 min'
    },
    { 
      name: 'Protein Smoothie Bowl', 
      calories: 280, 
      time: 'Snack', 
      protein: '25g', 
      icon: '🥤',
      difficulty: 'Easy',
      prepTime: '5 min'
    },
    { 
      name: 'Salmon & Quinoa', 
      calories: 580, 
      time: 'Dinner', 
      protein: '42g', 
      icon: '🐟',
      difficulty: 'Medium',
      prepTime: '25 min'
    }
  ];

  const todaySchedule = [
    { time: '07:00', activity: 'Morning Yoga', type: 'workout', status: 'completed', icon: '🧘‍♀️' },
    { time: '09:30', activity: 'Protein Smoothie', type: 'nutrition', status: 'completed', icon: '🥤' },
    { time: '12:00', activity: 'Healthy Lunch', type: 'nutrition', status: 'pending', icon: '🥗' },
    { time: '15:30', activity: 'HIIT Training', type: 'workout', status: 'pending', icon: '🏃‍♂️' },
    { time: '19:00', activity: 'Meditation', type: 'wellness', status: 'pending', icon: '🧘' }
  ];

  const achievements = [
    { title: '7-Day Streak', icon: '🔥', bgColor: 'from-orange-500 to-red-500', description: 'Weekly consistency' },
    { title: 'Weight Goal', icon: '🏆', bgColor: 'from-yellow-500 to-orange-500', description: 'Target achieved' },
    { title: 'Hydration Master', icon: '💧', bgColor: 'from-blue-500 to-cyan-500', description: 'Daily water goal' },
    { title: 'Early Bird', icon: '🌅', bgColor: 'from-amber-500 to-yellow-500', description: 'Morning workouts' }
  ];

  // Show loading if auth or profile is loading
  if (authLoading || (currentUser && isLoadingProfile)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center animate-pulse shadow-lg">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
          <div className="text-center">
            <p className="text-gray-700 font-medium">Loading your dashboard...</p>
            <p className="text-gray-500 text-sm">Preparing your health insights</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // Handle AI chat
  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsAITyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your current health metrics, I recommend increasing your protein intake by 15g daily to support your muscle building goals.",
        "I can see you're making great progress! Your consistency with workouts is impressive. Have you considered adding some flexibility training?",
        "Your calorie tracking shows you're on the right path. Would you like me to suggest some nutrient-dense meal options for tomorrow?",
        "I notice your water intake has been consistent. That's excellent for recovery and overall health. Keep it up!",
        "Your sleep quality metrics suggest adding 30 minutes of evening stretching could improve your rest. Would you like a routine?",
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage = {
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsAITyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Top Profile Button */}
      <TopProfileButton />
      
      {/* Profile Completion Banner */}
      {!isProfileComplete && (
        <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-white"></i>
              </div>
              <div>
                <span className="font-semibold">Complete your profile to unlock all features!</span>
                <p className="text-sm text-white/90">Get personalized recommendations and insights</p>
              </div>
            </div>
            <Link 
              to="/user-details" 
              className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl transition-all duration-200 text-sm font-semibold backdrop-blur-sm border border-white/30"
            >
              Complete Now
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden">
          <div className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 border-r border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">W</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">WellZO</h1>
                    <p className="text-xs text-gray-500">Health & Wellness</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-times text-gray-500"></i>
                </button>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              <Link to="/dashboard" className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                <span className="text-lg">🏠</span>
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link to="/health-tracking" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                <span className="text-lg">📊</span>
                <span>Health Tracking</span>
              </Link>
              <Link to="/community" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                <span className="text-lg">👥</span>
                <span>Community</span>
              </Link>
              <Link to="/nutrition" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                <span className="text-lg">🍎</span>
                <span>Nutrition</span>
              </Link>
              <Link to="/workouts" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                <span className="text-lg">💪</span>
                <span>Workouts</span>
              </Link>
              <Link to="/wellness" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                <span className="text-lg">🧘</span>
                <span>Wellness</span>
              </Link>
              <Link to="/marketplace" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                <span className="text-lg">🛒</span>
                <span>Marketplace</span>
              </Link>
              
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-500 mb-3 px-4">AI ASSISTANTS</h4>
                <div className="space-y-2">
                  <Link to="/nutrition-ai" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                    <span className="text-lg">🤖</span>
                    <span>Nutrition AI</span>
                  </Link>
                  <Link to="/fitness-ai" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                    <span className="text-lg">🧠</span>
                    <span>Fitness AI</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content - Full Width */}
      <main className="min-h-screen pb-20 lg:pb-4">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4 max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <i className="fas fa-bars text-gray-600"></i>
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center lg:block hidden shadow-lg">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {getGreeting()}, {userName.split(' ')[0]}! 👋
                  </h2>
                  <p className="text-sm text-gray-500 font-medium">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAIChat(true)}
                className="hidden sm:flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Jarvis AI Icon */}
                <div className="relative z-10">
                  <JarvisAIIcon size={6} animate={true} />
                </div>
                
                <div className="relative z-10 flex flex-col">
                  <span className="font-bold text-sm">JARVIS AI</span>
                  <span className="text-xs opacity-90">Health Assistant</span>
                </div>
                
                {/* Pulse effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
              </button>
              
              {/* Right side spacing for balance */}
              <div className="w-12 h-12"></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto">
          {/* Health Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="group relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${metric.bgColor} rounded-xl flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl">{metric.icon}</span>
                  </div>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    metric.trend === 'up' ? 'text-green-700 bg-green-100' : 
                    metric.trend === 'down' ? 'text-red-700 bg-red-100' : 'text-gray-700 bg-gray-100'
                  }`}>
                    {metric.trend === 'up' && <i className="fas fa-arrow-up mr-1"></i>}
                    {metric.trend === 'down' && <i className="fas fa-arrow-down mr-1"></i>}
                    {metric.change}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-xs text-gray-500">{metric.subtitle}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-semibold text-gray-700">{metric.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`bg-gradient-to-r ${metric.bgColor} h-2.5 rounded-full transition-all duration-700`}
                        style={{ width: `${metric.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Target: {metric.target}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Body Measurements & Weight Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Body Measurements */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Body Measurements</h3>
                  <p className="text-sm text-gray-600">Track your physical progress</p>
                </div>
                <select 
                  value={selectedMeasurementPeriod}
                  onChange={(e) => setSelectedMeasurementPeriod(e.target.value)}
                  className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="3months">3 Months</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {bodyMeasurements.map((measurement, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{measurement.icon}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        measurement.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                      }`}>
                        {measurement.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">{measurement.name}</p>
                      <p className="text-lg font-bold text-gray-900">{measurement.current}</p>
                      <p className="text-xs text-gray-500">Previous: {measurement.previous}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weight Training Progress */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Weight Training Progress</h3>
                  <p className="text-sm text-gray-600">Your strength training journey</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🏋️‍♂️</span>
                </div>
              </div>
              <div className="space-y-4">
                {workoutProgress.map((exercise, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{exercise.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{exercise.exercise}</p>
                          <p className="text-xs text-gray-500">{exercise.reps}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{exercise.current}</p>
                        <p className="text-xs text-gray-500">Target: {exercise.target}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-semibold">{exercise.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${exercise.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Body Progress Tracking */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Body Progress Photos</h3>
                <p className="text-sm text-gray-600">Track your visual transformation month by month</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowBodyProgress(!showBodyProgress)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  <span className="mr-2">📊</span>
                  {showBodyProgress ? 'Hide' : 'View'} Progress
                </button>
                <button 
                  onClick={() => setShowImageUpload(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  <span className="mr-2">📷</span>
                  Add Photo
                </button>
              </div>
            </div>

            {/* Current Month Preview */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                  {bodyImages.find(img => img.type === 'front' && img.month === new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })) ? (
                    <img 
                      src={bodyImages.find(img => img.type === 'front' && img.month === new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })).image}
                      alt="Front view"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-3xl mb-2 block">🧍‍♂️</span>
                      <span className="text-xs text-gray-500">Front View</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700">Front</p>
              </div>
              
              <div className="text-center">
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                  {bodyImages.find(img => img.type === 'side' && img.month === new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })) ? (
                    <img 
                      src={bodyImages.find(img => img.type === 'side' && img.month === new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })).image}
                      alt="Side view"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-3xl mb-2 block">🚶‍♂️</span>
                      <span className="text-xs text-gray-500">Side View</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700">Side</p>
              </div>
              
              <div className="text-center">
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                  {bodyImages.find(img => img.type === 'back' && img.month === new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })) ? (
                    <img 
                      src={bodyImages.find(img => img.type === 'back' && img.month === new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })).image}
                      alt="Back view"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-3xl mb-2 block">🧍‍♂️</span>
                      <span className="text-xs text-gray-500">Back View</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700">Back</p>
              </div>
            </div>

            {/* Month by Month Progress */}
            {showBodyProgress && (
              <div className="space-y-6">
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Monthly Progress Timeline</h4>
                  {getBodyProgressByMonth().length > 0 ? (
                    <div className="space-y-4">
                      {getBodyProgressByMonth().map(([month, images]) => (
                        <div key={month} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                          <h5 className="font-semibold text-gray-800 mb-3">{month}</h5>
                          <div className="grid grid-cols-3 gap-3">
                            {['front', 'side', 'back'].map((type) => (
                              <div key={type} className="text-center">
                                <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                                  {images[type] ? (
                                    <img 
                                      src={images[type].image}
                                      alt={`${type} view`}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                      <span className="text-2xl">📷</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 mt-1 capitalize">{type}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <span className="text-4xl mb-4 block">📸</span>
                      <p className="text-gray-600">No progress photos yet. Start by adding your first photo!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-emerald-600">{bodyImages.length}</p>
                <p className="text-xs text-gray-600">Total Photos</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-blue-600">{getBodyProgressByMonth().length}</p>
                <p className="text-xs text-gray-600">Months Tracked</p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-orange-600">
                  {bodyImages.length > 0 ? Math.floor((Date.now() - new Date(bodyImages[0].date).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                </p>
                <p className="text-xs text-gray-600">Days Tracking</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-yellow-600">
                  {bodyImages.filter(img => img.month === new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })).length}/3
                </p>
                <p className="text-xs text-gray-600">This Month</p>
              </div>
            </div>
          </div>

          {/* Calorie Tracking & Food Scanner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calorie Overview */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Daily Calorie Tracking</h3>
                  <p className="text-blue-100">Monitor your nutrition intake</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{calorieData.consumed}</p>
                  <p className="text-sm text-blue-100">Consumed</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{calorieData.burned}</p>
                  <p className="text-sm text-blue-100">Burned</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{calorieData.remaining}</p>
                  <p className="text-sm text-blue-100">Remaining</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Macronutrients</h4>
                {Object.entries(calorieData.macros).map(([macro, data]) => (
                  <div key={macro} className="bg-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium capitalize">{macro}</span>
                      <span className="text-sm">{data.consumed}g / {data.target}g</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-xs text-blue-100">{data.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Scanner */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan Your Food</h3>
                <p className="text-sm text-gray-600 mb-6">Instantly calculate calories and nutrition</p>
                
                <button 
                  onClick={() => setShowFoodScan(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1 mb-4"
                >
                  <span className="mr-2">📷</span>
                  Scan Food
                </button>
                
                <div className="space-y-3">
                  <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg transition-colors font-medium">
                    <span className="mr-2">➕</span>
                    Add Manual Entry
                  </button>
                  <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg transition-colors font-medium">
                    <span className="mr-2">🔍</span>
                    Search Foods
                  </button>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Recent Scans</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>🍎 Apple</span>
                      <span className="text-gray-500">95 cal</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>🥗 Salad</span>
                      <span className="text-gray-500">340 cal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meal Suggestions & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Meal Suggestions */}
            <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Meal Suggestions</h3>
                  <p className="text-sm text-gray-600">Personalized recommendations for your goals</p>
                </div>
                <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300">
                  <span className="mr-1">🤖</span>
                  Generate More
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mealSuggestions.map((meal, index) => (
                  <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="text-center mb-3">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">{meal.icon}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">{meal.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{meal.time} • {meal.difficulty}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Calories</span>
                        <span className="font-semibold text-orange-600">{meal.calories}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Protein</span>
                        <span className="font-semibold text-blue-600">{meal.protein}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Prep Time</span>
                        <span className="font-semibold text-gray-700">{meal.prepTime}</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg">
                      Add to Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Water Intake */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Hydration Tracker</h3>
                <span className="text-2xl">💧</span>
              </div>
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                  <div className="absolute inset-2 bg-white/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">{waterIntake}</span>
                  </div>
                </div>
                <p className="text-blue-100 mb-2">Glasses today</p>
                <p className="text-xs text-blue-200">Goal: 8 glasses (2L)</p>
              </div>
              
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-10 rounded-full transition-all duration-300 ${
                      i < waterIntake ? 'bg-white shadow-lg scale-110' : 'bg-white/30'
                    }`}
                  ></div>
                ))}
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={addWater}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl transition-all duration-300 font-semibold border border-white/30"
                >
                  <span className="mr-2">💧</span>
                  Add Glass
                </button>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button className="bg-white/10 hover:bg-white/20 py-2 rounded-lg transition-colors">
                    250ml
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 py-2 rounded-lg transition-colors">
                    500ml
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-white/10 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Today's Progress</span>
                    <span className="text-sm font-semibold">{Math.round((waterIntake/8)*100)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(waterIntake/8)*100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule, Achievements, and Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                  <p className="text-sm text-gray-600">Your wellness agenda</p>
                </div>
                <span className="text-xl">📅</span>
              </div>
              <div className="space-y-3">
                {todaySchedule.map((item, index) => (
                  <div key={index} className={`group flex items-center p-4 rounded-xl transition-all duration-300 ${
                    item.status === 'completed' 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                      : 'bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md'
                  }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                      item.type === 'workout' ? 'bg-orange-100' :
                      item.type === 'nutrition' ? 'bg-emerald-100' :
                      'bg-purple-100'
                    }`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.activity}</h4>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    {item.status === 'completed' ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                    ) : (
                      <button className="w-8 h-8 bg-gray-200 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors group-hover:scale-110">
                        <i className="fas fa-play text-gray-600 group-hover:text-white text-sm"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                  <p className="text-sm text-gray-600">Your wellness milestones</p>
                </div>
                <span className="text-xl">🏆</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="group text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-14 h-14 bg-gradient-to-r ${achievement.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="text-xl text-white">{achievement.icon}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{achievement.title}</h4>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <span className="mr-2">🎯</span>
                View All Achievements
              </button>
            </div>

            {/* Profile Stats & Notifications */}
            <div className="md:col-span-2 lg:col-span-1 space-y-6">
              {/* Profile Stats Card */}
              <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={userAvatar}
                      alt="Profile"
                      className="w-16 h-16 rounded-full border-3 border-white object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs">✨</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{userName}</h3>
                    <p className="text-emerald-100 font-medium">Premium Member</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-300">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star text-xs"></i>
                        ))}
                      </div>
                      <span className="text-xs text-emerald-100 ml-2 font-medium">Level 12</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-xs text-emerald-100">Day Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-xs text-emerald-100">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">#23</p>
                    <p className="text-xs text-emerald-100">Rank</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Weekly Goal</span>
                      <span className="text-sm">85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Notifications */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Notifications</h4>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">2</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🏆</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">New Achievement Unlocked!</p>
                      <p className="text-xs text-gray-600">You've reached your weekly goal</p>
                      <p className="text-xs text-emerald-600 font-medium">2 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">⏰</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">Workout Reminder</p>
                      <p className="text-xs text-gray-600">HIIT session starts in 30 minutes</p>
                      <p className="text-xs text-blue-600 font-medium">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">💡</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">Health Tip</p>
                      <p className="text-xs text-gray-600">Stay hydrated throughout the day</p>
                      <p className="text-xs text-purple-600 font-medium">3 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  View All Notifications
                </button>
              </div>
            </div>
          </div>

          {/* AI Health Insights - Full Width */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl shadow-xl p-6 lg:p-8 text-white">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold">🤖 AI Health Insights</h3>
                <p className="text-emerald-100">Personalized recommendations powered by AI</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-all duration-300 font-semibold border border-white/30">
                <span className="mr-2">⚡</span>
                Refresh Insights
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h4 className="font-semibold text-lg">Today's Recommendation</h4>
                </div>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Based on your activity patterns, consider adding 15 minutes of stretching to improve flexibility and reduce muscle tension. Your recovery metrics suggest this would optimize tomorrow's performance.
                </p>
                <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Apply Suggestion
                </button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h4 className="font-semibold text-lg">Weekly Progress</h4>
                </div>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Excellent progress! You're 23% more active this week compared to last week. Your consistency with morning workouts is showing great results in your energy levels.
                </p>
                <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold text-lg">Goal Optimization</h4>
                </div>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Your weight loss goal is on track! Consider increasing protein intake by 10g daily to maintain muscle mass while losing fat. Adjust your dinner portions accordingly.
                </p>
                <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Update Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavigationBar />



      {/* Food Scanner Modal */}
      {showFoodScan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Food Scanner</h3>
                <button 
                  onClick={() => setShowFoodScan(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-times text-gray-500"></i>
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-6xl">📱</span>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Scan Your Food</h4>
                <p className="text-gray-600 mb-6">Point your camera at food to get instant calorie and nutrition information</p>
                
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    <span className="mr-2">📷</span>
                    Open Camera
                  </button>
                  
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors">
                    <span className="mr-2">🖼️</span>
                    Choose from Gallery
                  </button>
                  
                  <button className="w-full text-gray-500 hover:text-gray-700 py-2 font-medium transition-colors">
                    Manual Entry Instead
                  </button>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Supported foods:</p>
                  <div className="flex justify-center space-x-2 text-lg">
                    <span>🍎</span>
                    <span>🥗</span>
                    <span>🍗</span>
                    <span>🍕</span>
                    <span>🥪</span>
                    <span>🍜</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Body Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add Body Progress Photo</h3>
                <button 
                  onClick={() => setShowImageUpload(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-times text-gray-500"></i>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Image Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Photo Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['front', 'side', 'back'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedImageType(type)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedImageType === type
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <span className="text-2xl block mb-2">
                            {type === 'front' ? '🧍‍♂️' : type === 'side' ? '🚶‍♂️' : '🧍‍♂️'}
                          </span>
                          <span className="text-sm font-medium capitalize">{type}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Month Info */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                      <p className="text-sm text-gray-600">Progress photos for this month</p>
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="body-image-upload"
                    />
                    <label
                      htmlFor="body-image-upload"
                      className="cursor-pointer"
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📷</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload {selectedImageType} view photo</h4>
                      <p className="text-gray-600 mb-4">Choose a photo from your device</p>
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-block">
                        Select Photo
                      </div>
                    </label>
                  </div>

                  {/* Tips */}
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">📸 Photo Tips</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Use good lighting (natural light is best)</li>
                      <li>• Wear fitted clothing or swimwear</li>
                      <li>• Stand against a plain background</li>
                      <li>• Keep the same pose for consistency</li>
                      <li>• Take photos at the same time of day</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Interface */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col border border-white/20">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 rounded-t-3xl">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/20">
                    <JarvisAIIcon size={8} animate={true} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                  {/* Neural activity indicator */}
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <span>Helix</span>
                    <span className="text-sm bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-2 py-1 rounded-full font-medium">
                      v2.0
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">Personal Health Intelligence System</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-semibold border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Neural Networks Active</span>
                </div>
                <button 
                  onClick={() => setShowAIChat(false)}
                  className="group relative p-3 rounded-xl hover:bg-red-50 transition-all duration-200 border border-gray-200 hover:border-red-200"
                >
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
                  <i className="fas fa-times text-gray-500 group-hover:text-red-600 text-lg transition-colors relative z-10"></i>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 -right-2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Close JARVIS
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/30 to-white/50">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && (
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 mt-1 border border-purple-200">
                        <JarvisAIIcon size={4} animate={false} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-semibold text-gray-900">Helix</span>
                          <span className="text-xs text-gray-500 font-medium">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-lg p-4 shadow-sm border border-gray-200/50">
                          <p className="text-gray-800 leading-relaxed text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {message.role === 'user' && (
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="flex-1 text-right">
                        <div className="flex items-center justify-end space-x-2 mb-2">
                          <span className="text-xs text-gray-500 font-medium">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">You</span>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl rounded-tr-lg p-4 shadow-md">
                          <p className="text-white leading-relaxed text-sm">{message.content}</p>
                        </div>
                      </div>
                      <img
                        src={userAvatar}
                        alt="You"
                        className="w-8 h-8 rounded-xl border-2 border-emerald-500 object-cover shadow-md flex-shrink-0 mt-1"
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* AI Typing Indicator */}
              {isAITyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 border border-purple-200">
                      <JarvisAIIcon size={4} animate={true} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-gray-900">JARVIS AI</span>
                        <span className="text-xs text-gray-500 font-medium">processing neural patterns...</span>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-lg p-4 shadow-sm border border-gray-200/50">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/30 to-white/50 rounded-b-3xl">
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button 
                  onClick={() => setChatInput("What should I eat for lunch today based on my goals?")}
                  className="bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-200 border border-emerald-200"
                >
                  <span className="mr-2">🍽️</span>Meal Planning
                </button>
                <button 
                  onClick={() => setChatInput("Create a personalized workout plan for today")}
                  className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 px-4 py-2 rounded-xl text-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-200 border border-orange-200"
                >
                  <span className="mr-2">💪</span>Workout Plan
                </button>
                <button 
                  onClick={() => setChatInput("Analyze my health progress and give insights")}
                  className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-200 border border-blue-200"
                >
                  <span className="mr-2">📊</span>Health Insights
                </button>
                <button 
                  onClick={() => setChatInput("Give me tips for better sleep and recovery")}
                  className="bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-4 py-2 rounded-xl text-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-200 border border-purple-200"
                >
                  <span className="mr-2">😴</span>Sleep Tips
                </button>
              </div>

              <div className="flex items-end space-x-4">
                <div className="flex-1 relative">
                  <div className="relative">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask me anything about your health, nutrition, workouts, or wellness goals..."
                      className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-6 py-4 pr-16 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm leading-relaxed shadow-sm"
                      rows="1"
                      style={{ minHeight: '56px', maxHeight: '120px' }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendChatMessage();
                        }
                      }}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-purple-600 transition-colors p-1">
                        <i className="fas fa-microphone text-sm"></i>
                      </button>
                      <button className="text-gray-400 hover:text-purple-600 transition-colors p-1">
                        <i className="fas fa-paperclip text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleSendChatMessage}
                  disabled={!chatInput.trim() || isAITyping}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                >
                  <i className="fas fa-paper-plane text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>Press Enter to send, Shift + Enter for new line</span>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Neural Networks Online</span>
                  </span>
                  <span>Powered by JARVIS Intelligence</span>
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
