import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Import useAuth hook

// A default avatar for users without a profile picture
const defaultAvatar = 'https://via.placeholder.com/150/cccccc/808080?Text=User'; // Placeholder image

const UserProfileMenu = ({ isMobile }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser, logout, isLoading: authLoading } = useAuth(); // Use the auth hook
  const navigate = useNavigate();

  // Menu items - consider making paths dynamic or from a config if they change often
  const menuItems = [
    { id: 1, label: 'View Profile', icon: 'user-circle', path: '/profile-dashboard' }, // Path for the new main profile page
    { id: 2, label: 'Edit Profile', icon: 'user-cog', path: '/user-details' }, // Path to existing UserDetails form
    // { id: 2, label: 'Billing & Plans', icon: 'credit-card', path: '/billing' }, // Example for future
    // { id: 3, label: 'Notifications', icon: 'bell', path: '/notifications' }, // Example for future
  ];

  const handleLogout = () => {
    logout(); // Call logout from useAuth
  };

  // Handle loading state from useAuth
  if (authLoading) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        Loading user...
      </div>
    );
  }

  // Handle case where user is not logged in (currentUser is null)
  if (!currentUser) {
    return (
      <div className="p-4 text-center text-sm">
        <Link to="/login" className="text-emerald-600 hover:underline">
          Please log in
        </Link>
      </div>
    );
  }

  // User data to display
  const userName = currentUser.name || 'User';
  const userAvatar = currentUser.profile_picture_url || defaultAvatar;

  return (
    <>
      {/* Desktop Version - Placed at the bottom of a sidebar */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150"
          >
            <img
              src={userAvatar}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover bg-gray-200"
            />
            <div className="flex-1 text-left overflow-hidden">
              <p className="font-semibold text-sm truncate" title={userName}>{userName}</p>
              {/* <p className="text-xs text-gray-500">{currentUser.email}</p> */}
            </div>
            <i className={`fas fa-chevron-${showMenu ? 'down' : 'up'} text-gray-400 transition-transform duration-150`}></i>
          </button>

          {showMenu && (
            <div className="mt-2 py-2 space-y-1 bg-white rounded-md shadow-xs ring-1 ring-black ring-opacity-5 focus:outline-none">
              {menuItems.map(item => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setShowMenu(false)} // Close menu on item click
                  className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-150"
                >
                  <i className={`fas fa-${item.icon} w-5 text-gray-400`}></i>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-red-50 text-red-600 w-full transition-colors duration-150"
              >
                <i className="fas fa-sign-out-alt w-5"></i>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Version - Triggered by an icon, menu slides up or appears */}
      {/* This mobile version might be better integrated with the new BottomNavigationBar */}
      {/* For now, keeping existing structure but using real data */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
           {/* Button to toggle menu, styled to look like part of BottomNav or a floating action button */}, 
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="absolute -top-12 right-4 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center border-2 border-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <img
              src={userAvatar}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover"
            />
             {/* Or an icon: <i className={`fas ${showMenu ? 'fa-times' : 'fa-user'} text-xl`}></i> */}
          </button>

          {showMenu && (
            <div className="p-4 space-y-3">
              <div className="flex items-center space-x-4 mb-3 pb-3 border-b">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-16 h-16 rounded-full object-cover bg-gray-200"
                />
                <div>
                  <p className="font-semibold text-lg">{userName}</p>
                  <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
                </div>
              </div>

              {menuItems.map(item => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setShowMenu(false)} // Close menu on item click
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 text-gray-800 transition-colors duration-150"
                >
                  <i className={`fas fa-${item.icon} text-xl text-emerald-600 w-6 text-center`}></i>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full mt-2 p-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center space-x-2 transition-colors duration-150"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfileMenu; 