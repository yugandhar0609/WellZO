import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileViews from '../../components/profile/ProfileViews';

const Workouts = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeProfileView, setActiveProfileView] = useState(null);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setShowDetail(true);
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
            <Link to="/workouts" className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 text-emerald-600">
              <i className="fas fa-dumbbell"></i>
              <span>Workouts</span>
            </Link>
            <Link to="/meals" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-utensils"></i>
              <span>Meal Plan</span>
            </Link>
            <Link to="/progress" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
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
              <h2 className="text-xl font-semibold">Workout Plans</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-full sm:w-auto">
                <select className="w-full sm:w-auto appearance-none bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg pr-10 focus:outline-none">
                  <option>This Week</option>
                  <option>Next Week</option>
                  <option>Custom Range</option>
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600"></i>
              </div>
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

        {/* Weekly Calendar */}
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-7 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Mon</div>
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  15
                </div>
                <div className="mt-1 text-xs text-emerald-600">Cardio</div>
              </div>
              {/* Repeat for other days */}
            </div>
          </div>

          {/* Workout List */}
          <div className="space-y-6">
            {/* Today's Workout */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Today's Workout: Upper Body Focus</h3>
                <div className="flex items-center space-x-2 text-emerald-600">
                  <i className="fas fa-clock"></i>
                  <span>45 mins</span>
                </div>
              </div>
              <button 
                onClick={() => handleWorkoutClick({
                  title: "Upper Body Focus",
                  duration: "45 mins",
                  exercises: [
                    {
                      name: "Push-ups",
                      sets: "3 sets × 12 reps",
                      target: "Chest, Shoulders, Triceps",
                      instructions: "Keep your core tight and maintain a straight line from head to heels",
                      warning: "Avoid letting your hips sag or lifting them too high"
                    }
                  ]
                })}
                className="w-full"
              >
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <img src="https://example.com/pushup.gif" alt="Push-up demonstration" 
                           className="w-full rounded-lg shadow-md" />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">Push-ups</h4>
                          <p className="text-gray-600">3 sets × 12 reps</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-bullseye text-emerald-600 mt-1"></i>
                          <p className="text-gray-600">Target: Chest, Shoulders, Triceps</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Upcoming Workouts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Tomorrow</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-running text-emerald-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Lower Body Focus</h4>
                      <p className="text-sm text-gray-500">45 mins · 6 exercises</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Week Progress</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">4/6</div>
                    <div className="text-sm text-gray-600">Workouts Done</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">180</div>
                    <div className="text-sm text-gray-600">Minutes Active</div>
                  </div>
                </div>
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
              <div className="mt-4 space-y-3">
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
          <Link to="/workouts" className="flex flex-col items-center justify-center text-emerald-600">
            <i className="fas fa-dumbbell text-lg mb-1"></i>
            <span className="text-xs">Workouts</span>
          </Link>
          <Link to="/meals" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-utensils text-lg mb-1"></i>
            <span className="text-xs">Meals</span>
          </Link>
          <Link to="/progress" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-chart-line text-lg mb-1"></i>
            <span className="text-xs">Progress</span>
          </Link>
          <Link to="/community" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-users text-lg mb-1"></i>
            <span className="text-xs">Community</span>
          </Link>
        </div>
      </nav>

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

      {/* Workout Detail Modal */}
      {showDetail && selectedWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedWorkout.title}</h2>
                  <p className="text-gray-600">{selectedWorkout.duration}</p>
                </div>
                <button 
                  onClick={() => setShowDetail(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {selectedWorkout.exercises.map((exercise, index) => (
                <div key={index} className="mb-8">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img src="https://example.com/pushup-tutorial.gif" alt={exercise.name} 
                         className="w-full rounded-lg" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Exercise Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <i className="fas fa-bullseye text-emerald-600 w-6"></i>
                          <span className="text-gray-600">{exercise.target}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-sync-alt text-emerald-600 w-6"></i>
                          <span className="text-gray-600">{exercise.sets}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Instructions</h4>
                      <p className="text-gray-600">{exercise.instructions}</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-amber-700">Form Check</h4>
                      <p className="text-amber-600">{exercise.warning}</p>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setShowDetail(false)}
                className="w-full py-3 px-6 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
              >
                Start Workout
              </button>
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

export default Workouts; 