import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ProfileViews from '../../components/profile/ProfileViews';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Progress = () => {
  const [activeTab, setActiveTab] = useState('weight');
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeProfileView, setActiveProfileView] = useState(null);

  // Sample data for the weight chart
  const weightData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [85, 83, 82, 80, 78, 77],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const handleProfileAction = (action) => {
    setShowProfileMenu(false);
    setActiveProfileView(action);
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
            <Link to="/progress" className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 text-emerald-600">
              <i className="fas fa-chart-line"></i>
              <span>Progress</span>
            </Link>
            <Link to="/community" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-users"></i>
              <span>Community</span>
            </Link>
            <div className="pt-4 border-t border-gray-200 mt-4">
              <h4 className="text-xs font-semibold text-gray-500 mb-2 px-3">AI ASSISTANTS</h4>
              <Link to="/nutrition-agent" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <i className="fas fa-apple-alt"></i>
                <span>Nutrition Agent</span>
              </Link>
              <Link to="/fitness-agent" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <i className="fas fa-running"></i>
                <span>Fitness Agent</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 lg:mr-80 min-h-screen pb-16 lg:pb-0">
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
              <h2 className="text-xl font-semibold">Progress Tracking</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowPhotoUpload(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
              >
                <i className="fas fa-camera mr-2"></i>
                Add Progress Photo
              </button>
              {/* Mobile Profile Button */}
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100"
              >
                <img
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
            </div>
          </div>
          
          {/* Mobile AI Agents Bar */}
          <div className="lg:hidden border-t border-gray-100">
            <div className="flex justify-around px-4 py-2">
              <Link to="/nutrition-agent" className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-emerald-600">
                <i className="fas fa-apple-alt text-lg"></i>
                <span className="text-sm">Nutrition AI</span>
              </Link>
              <Link to="/fitness-agent" className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-emerald-600">
                <i className="fas fa-running text-lg"></i>
                <span className="text-sm">Fitness AI</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Progress Overview */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Weight</p>
                  <h3 className="text-2xl font-bold text-gray-900">77 kg</h3>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-weight text-emerald-600 text-xl"></i>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-emerald-600">-8kg from start</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Body Fat</p>
                  <h3 className="text-2xl font-bold text-gray-900">18%</h3>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-percentage text-emerald-600 text-xl"></i>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-emerald-600">-4% from start</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Muscle Mass</p>
                  <h3 className="text-2xl font-bold text-gray-900">32%</h3>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-dumbbell text-emerald-600 text-xl"></i>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-emerald-600">+2% from start</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Waist Size</p>
                  <h3 className="text-2xl font-bold text-gray-900">34"</h3>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-ruler text-emerald-600 text-xl"></i>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-emerald-600">-2" from start</p>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Progress Chart</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('weight')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeTab === 'weight'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Weight
                </button>
                <button
                  onClick={() => setActiveTab('measurements')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeTab === 'measurements'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Measurements
                </button>
              </div>
            </div>
            <div className="h-[300px]">
              <Line data={weightData} options={chartOptions} />
            </div>
          </div>

          {/* Progress Photos */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-xl font-semibold mb-6">Progress Photos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative group">
                <img
                  src="https://via.placeholder.com/300x400"
                  alt="Progress"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white">June 2023</p>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="https://via.placeholder.com/300x400"
                  alt="Progress"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white">July 2023</p>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="https://via.placeholder.com/300x400"
                  alt="Progress"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white">August 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-6">Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-award text-emerald-600 text-3xl"></i>
                </div>
                <h4 className="font-semibold">5kg Lost</h4>
                <p className="text-sm text-gray-500">Milestone reached</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-fire text-emerald-600 text-3xl"></i>
                </div>
                <h4 className="font-semibold">30 Day Streak</h4>
                <p className="text-sm text-gray-500">Consistency</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-dumbbell text-emerald-600 text-3xl"></i>
                </div>
                <h4 className="font-semibold">Strength +10%</h4>
                <p className="text-sm text-gray-500">Personal best</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-running text-emerald-600 text-3xl"></i>
                </div>
                <h4 className="font-semibold">5K Run</h4>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar - User Profile Management */}
      <aside className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg hidden lg:block overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex items-center space-x-4 mb-6 sm:mb-8">
            <div className="relative">
              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">John Doe</h3>
              <p className="text-xs sm:text-sm text-gray-500">Premium Member</p>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 sm:mb-4">PROFILE SETTINGS</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleProfileAction('editProfile')}
                  className="w-full flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50"
                >
                  <i className="fas fa-user text-gray-400"></i>
                  <span className="text-sm sm:text-base">Edit Profile</span>
                </button>
                <button 
                  onClick={() => handleProfileAction('accountSettings')}
                  className="w-full flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50"
                >
                  <i className="fas fa-cog text-gray-400"></i>
                  <span className="text-sm sm:text-base">Account Settings</span>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 sm:mb-4">MESSAGES</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleProfileAction('messages')}
                  className="w-full flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50"
                >
                  <i className="fas fa-envelope text-gray-400"></i>
                  <span className="text-sm sm:text-base">Messages</span>
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 sm:mb-4">NOTIFICATIONS</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleProfileAction('notifications')}
                  className="w-full flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50"
                >
                  <i className="fas fa-bell text-gray-400"></i>
                  <span className="text-sm sm:text-base">Notifications</span>
                </button>
              </div>
              <div className="mt-4 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-trophy text-emerald-600 text-sm sm:text-base"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Achievement!</p>
                      <p className="text-xs text-gray-500">You've reached your weekly goal</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">2m ago</span>
                </div>
              </div>
            </div>

            {/* Session Management */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 sm:mb-4">SESSION</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-2 sm:p-3 rounded-lg text-red-600 hover:bg-red-50">
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="text-sm sm:text-base">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:hidden z-50">
        <div className="grid grid-cols-5 gap-1 px-2 py-3">
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-home text-lg mb-1"></i>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/workouts" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-dumbbell text-lg mb-1"></i>
            <span className="text-xs">Workouts</span>
          </Link>
          <Link to="/meals" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-utensils text-lg mb-1"></i>
            <span className="text-xs">Meals</span>
          </Link>
          <Link to="/progress" className="flex flex-col items-center justify-center text-emerald-600">
            <i className="fas fa-chart-line text-lg mb-1"></i>
            <span className="text-xs">Progress</span>
          </Link>
          <Link to="/community" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-users text-lg mb-1"></i>
            <span className="text-xs">Community</span>
          </Link>
        </div>
      </nav>

      {/* Photo Upload Modal */}
      {showPhotoUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Add Progress Photo</h2>
                <button 
                  onClick={() => setShowPhotoUpload(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-600">Drag and drop your photo here or</p>
                  <button className="text-emerald-600 font-semibold hover:text-emerald-700">browse files</button>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowPhotoUpload(false)}
                    className="px-6 py-2 rounded-lg border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowPhotoUpload(false)}
                    className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Menu */}
      {showProfileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-lg overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-gray-500">Premium Member</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowProfileMenu(false)}
                  className="text-gray-500"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              {/* Mobile Profile Settings */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">PROFILE SETTINGS</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleProfileAction('editProfile')}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <i className="fas fa-user text-gray-400"></i>
                      <span>Edit Profile</span>
                    </button>
                    <button 
                      onClick={() => handleProfileAction('accountSettings')}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <i className="fas fa-cog text-gray-400"></i>
                      <span>Account Settings</span>
                    </button>
                  </div>
                </div>

                {/* Mobile Messages */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">MESSAGES</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleProfileAction('messages')}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <i className="fas fa-envelope text-gray-400"></i>
                      <span>Messages</span>
                    </button>
                  </div>
                </div>

                {/* Mobile Notifications */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">NOTIFICATIONS</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleProfileAction('notifications')}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <i className="fas fa-bell text-gray-400"></i>
                      <span>Notifications</span>
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-trophy text-emerald-600"></i>
                        </div>
                        <div>
                          <p className="text-sm font-medium">New Achievement!</p>
                          <p className="text-xs text-gray-500">You've reached your weekly goal</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">2m ago</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Session Management */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">SESSION</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50">
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Views */}
      {activeProfileView && (
        <ProfileViews
          view={activeProfileView}
          onClose={() => setActiveProfileView(null)}
        />
      )}
    </div>
  );
};

export default Progress;
