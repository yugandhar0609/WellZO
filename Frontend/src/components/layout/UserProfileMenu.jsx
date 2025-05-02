import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfileMenu = ({ isMobile }) => {
  const [showMenu, setShowMenu] = useState(false);

  // Mock user data - replace with actual user data from your auth system
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    subscription: 'Pro Plan'
  };

  const menuItems = [
    { id: 1, label: 'Profile Settings', icon: 'user-cog', path: '/settings' },
    { id: 2, label: 'Billing & Plans', icon: 'credit-card', path: '/billing' },
    { id: 3, label: 'Notifications', icon: 'bell', path: '/notifications' },
    { id: 4, label: 'Privacy', icon: 'shield-alt', path: '/privacy' }
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <>
      {/* Desktop Version */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 text-left">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-gray-500">{user.subscription}</p>
            </div>
            <i className={`fas fa-chevron-${showMenu ? 'down' : 'up'} text-gray-400`}></i>
          </button>

          {showMenu && (
            <div className="mt-2 py-2 space-y-1">
              {menuItems.map(item => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  <i className={`fas fa-${item.icon} w-5 text-gray-400`}></i>
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-50 text-red-600 w-full"
              >
                <i className="fas fa-sign-out-alt w-5"></i>
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Version */}
      {isMobile && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t shadow-lg z-40">
          {showMenu && (
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.subscription}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {menuItems.map(item => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <i className={`fas fa-${item.icon} text-xl text-emerald-600 mb-2`}></i>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </Link>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="w-full p-3 mt-4 rounded-lg bg-red-50 text-red-600 flex items-center justify-center space-x-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="absolute -top-12 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default UserProfileMenu; 