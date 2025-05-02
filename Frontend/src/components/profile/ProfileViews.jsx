import React, { useState, useEffect } from 'react';

const ProfileViews = ({ view, onClose }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [notificationSettings, setNotificationSettings] = useState({
    workouts: true,
    meals: true,
    progress: true,
    community: true
  });

  const [formData, setFormData] = useState({
    nationality: '',
    state: '',
    language: '',
    profession: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    wakeUpTime: '',
    bedTime: '',
    medicalConditions: [],
    allergies: '',
    primaryGoal: '',
    goalDetails: ''
  });

  useEffect(() => {
    // Load user profile data from localStorage
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      setFormData(JSON.parse(userProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Edit Profile View
  const EditProfileView = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full shadow-lg hover:bg-emerald-700">
            <i className="fas fa-camera text-sm"></i>
          </button>
        </div>
        <h3 className="text-lg font-semibold mt-4">John Doe</h3>
        <p className="text-sm text-gray-500">Premium Member</p>
      </div>

      <div className="flex border-b mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('personal')}
          className={activeTab === 'personal' ? 'px-4 py-2 border-b-2 border-emerald-600 text-emerald-600 whitespace-nowrap' : 'px-4 py-2 text-gray-500 whitespace-nowrap'}
        >
          Personal Info
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={activeTab === 'preferences' ? 'px-4 py-2 border-b-2 border-emerald-600 text-emerald-600 whitespace-nowrap' : 'px-4 py-2 text-gray-500 whitespace-nowrap'}
        >
          Preferences
        </button>
      </div>

      {activeTab === 'personal' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
              <select 
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              >
                <option value="">Select nationality</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="in">India</option>
                <option value="au">Australia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State/Region</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Sedentary', 'Light', 'Moderate', 'Very Active'].map((level) => (
                  <label key={level} className="relative flex flex-col items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="activityLevel"
                      value={level.toLowerCase()}
                      checked={formData.activityLevel === level.toLowerCase()}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-2 rounded-full ${formData.activityLevel === level.toLowerCase() ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                      <i className={`fas ${level === 'Sedentary' ? 'fa-couch' : level === 'Light' ? 'fa-walking' : level === 'Moderate' ? 'fa-running' : 'fa-dumbbell'} text-2xl ${formData.activityLevel === level.toLowerCase() ? 'text-emerald-600' : 'text-gray-600'}`}></i>
                    </div>
                    <span className="mt-2 font-medium text-sm text-center">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Schedule</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Wake-up Time</label>
                  <input
                    type="time"
                    name="wakeUpTime"
                    value={formData.wakeUpTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Bedtime</label>
                  <input
                    type="time"
                    name="bedTime"
                    value={formData.bedTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid'].map((condition) => (
                  <label key={condition} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      name="medicalConditions"
                      value={condition.toLowerCase()}
                      checked={formData.medicalConditions.includes(condition.toLowerCase())}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-emerald-600 mr-3"
                    />
                    <span className="text-sm">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="Enter allergies (if any)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              className="w-full md:w-auto px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
              onClick={() => {
                localStorage.setItem('userProfile', JSON.stringify(formData));
                alert('Profile updated successfully!');
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>Central Time (CT)</option>
            </select>
          </div>
          <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );

  // Account Settings View
  const AccountSettingsView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-lg text-white mb-6">
        <h3 className="text-lg font-semibold mb-2">Premium Membership</h3>
        <p className="text-sm opacity-90">Your next billing date is August 1, 2024</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Password</h4>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700">
              Change
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Enhanced account security</p>
            </div>
            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-gray-200">
              <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Connected Apps</h4>
              <p className="text-sm text-gray-500">Manage integrated services</p>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700">
              Manage
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-600">Delete Account</h4>
              <p className="text-sm text-gray-500">Permanently delete your account</p>
            </div>
            <button className="text-red-600 hover:text-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Messages View
  const MessagesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <button className="ml-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
          <i className="fas fa-edit"></i>
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="Sarah"
                className="w-12 h-12 rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium truncate">Sarah Johnson</h4>
                <span className="text-xs text-gray-500">2m ago</span>
              </div>
              <p className="text-sm text-gray-600 truncate">Great workout session today! 💪</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Mike"
                className="w-12 h-12 rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium truncate">Mike Chen</h4>
                <span className="text-xs text-gray-500">1h ago</span>
              </div>
              <p className="text-sm text-gray-600 truncate">Thanks for the meal plan recommendations!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Notifications View
  const NotificationsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 border">
        <h3 className="font-medium mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium capitalize">{key}</h4>
                <p className="text-sm text-gray-500">
                  Receive notifications about your {key}
                </p>
              </div>
              <button
                onClick={() =>
                  setNotificationSettings(prev => ({ ...prev, [key]: !value }))
                }
                className={value ? 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-emerald-600' : 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-gray-200'}
              >
                <span
                  className={value ? 'translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out' : 'translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Recent Notifications</h3>
        <div className="bg-white rounded-lg p-4 border space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-trophy text-emerald-600"></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">New Achievement!</h4>
                <span className="text-xs text-gray-500">2m ago</span>
              </div>
              <p className="text-sm text-gray-600">You've reached your weekly goal</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-bell text-blue-600"></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Workout Reminder</h4>
                <span className="text-xs text-gray-500">1h ago</span>
              </div>
              <p className="text-sm text-gray-600">Time for your daily exercise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const views = {
    editProfile: <EditProfileView />,
    accountSettings: <AccountSettingsView />,
    messages: <MessagesView />,
    notifications: <NotificationsView />
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[480px] bg-gray-50 shadow-lg overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {view === 'editProfile' && 'Edit Profile'}
            {view === 'accountSettings' && 'Account Settings'}
            {view === 'messages' && 'Messages'}
            {view === 'notifications' && 'Notifications'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="p-6">
          {views[view]}
        </div>
      </div>
    </div>
  );
};

export default ProfileViews;