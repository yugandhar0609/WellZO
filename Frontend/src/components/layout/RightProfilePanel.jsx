import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Default placeholder avatar
const defaultAvatar = 'https://via.placeholder.com/150/cccccc/808080?Text=User';

// Placeholder for icons - consider using SVGs or a library like Font Awesome
const EditIcon = () => <span className="mr-2">✏️</span>; // Simple emoji placeholder
const SettingsIcon = () => <span className="mr-2">⚙️</span>;
const MessagesIcon = () => <span className="mr-2">💬</span>;
const NotificationsIcon = () => <span className="mr-2">🔔</span>;
const LogoutIcon = () => <span className="mr-2">🚪</span>;

const RightProfilePanel = () => {
  const { currentUser, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <aside className="hidden lg:block w-72 bg-white p-6 border-l border-gray-200">
        <p>Loading user...</p>
      </aside>
    );
  }

  if (!currentUser) {
    // This panel shouldn't typically be shown if no user is logged in,
    // as App.jsx logic would hide it. But as a fallback:
    return null;
  }

  const userName = currentUser.name || 'User';
  const userAvatar = currentUser.profile_picture_url || defaultAvatar;
  // Mocked premium status for now, as it's not in current user model
  const membershipStatus = 'Premium Member'; 

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white p-6 border-l border-gray-200 h-screen fixed right-0 top-0 z-30">
      {/* User Info Header */}
      <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-gray-200">
        <img 
          src={userAvatar} 
          alt={userName}
          className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-emerald-200 shadow-sm"
        />
        <h2 className="text-xl font-semibold text-gray-800">{userName}</h2>
        <p className="text-sm text-gray-500">{membershipStatus}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-2 text-sm">
        <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Profile Settings</h3>
        <Link 
          to="/user-details" 
          className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors duration-150"
        >
          <EditIcon /> Edit Profile
        </Link>
        {/* Placeholder for Account Settings */}
        <Link 
          to="#" // Replace with actual path when created
          className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors duration-150"
        >
          <SettingsIcon /> Account Settings
        </Link>

        <h3 className="px-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Messages</h3>
        <Link 
          to="#" // Replace with actual path when created
          className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors duration-150"
        >
          <MessagesIcon /> Messages
        </Link>

        <h3 className="px-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notifications</h3>
        {/* Placeholder Notifications - In a real app, these would be dynamic */}
        <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 space-y-2">
            <div className="flex items-start">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <span className="text-emerald-600">🏆</span>
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-800">New Achievement!</p>
                    <p className="text-xs text-gray-500">You've reached your weekly goal</p>
                </div>
            </div>
            <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <span className="text-blue-600">🔔</span>
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-800">Workout Reminder</p>
                    <p className="text-xs text-gray-500">Time for your daily exercise</p>
                </div>
            </div>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 text-sm font-medium"
        >
          <LogoutIcon /> Logout
        </button>
      </div>
    </aside>
  );
};

export default RightProfilePanel; 