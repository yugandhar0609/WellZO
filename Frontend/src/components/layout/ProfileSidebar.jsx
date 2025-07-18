import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProfileSidebar = ({ isOpen, onClose }) => {
  const { currentUser, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const defaultAvatar = 'https://via.placeholder.com/150/cccccc/808080?Text=User';
  const userAvatar = currentUser?.profile_picture_url || defaultAvatar;

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleMenuItemClick = () => {
    onClose();
  };

  // Profile-only menu items with icons
  const profileMenuItems = [
    { 
      id: 1, 
      label: 'View Profile', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ), 
      path: '/profile-dashboard',
      description: 'View your complete profile'
    },
    { 
      id: 2, 
      label: 'Edit Profile', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ), 
      path: '/user-details',
      description: 'Update your personal information'
    },
    { 
      id: 3, 
      label: 'Account Settings', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      path: '/settings',
      description: 'Manage your account preferences'
    },
    { 
      id: 4, 
      label: 'Privacy & Security', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ), 
      path: '/privacy',
      description: 'Manage your privacy settings'
    },
    { 
      id: 5, 
      label: 'Help & Support', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      path: '/help',
      description: 'Get help and support'
    }
  ];

  if (authLoading) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 md:w-96 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100">
          <div className="flex items-center">
            <h2 className="text-base sm:text-lg font-semibold text-emerald-800">Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-emerald-200 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        {currentUser ? (
          <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <img
                  src={userAvatar}
                  alt={currentUser.name || 'User'}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 sm:border-3 border-emerald-500 shadow-lg"
                />
                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                  {currentUser.name || 'User'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {currentUser.email}
                </p>
                <div className="flex items-center mt-1 sm:mt-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>
            </div>
            
            {/* User Stats */}
            <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-center">
              <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                <div className="text-sm sm:text-base md:text-lg font-bold text-emerald-600">12</div>
                <div className="text-xs text-gray-500">Days Active</div>
              </div>
              <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                <div className="text-sm sm:text-base md:text-lg font-bold text-orange-600">85%</div>
                <div className="text-xs text-gray-500">Goals Met</div>
              </div>
              <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                <div className="text-sm sm:text-base md:text-lg font-bold text-blue-600">7</div>
                <div className="text-xs text-gray-500">Achievements</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 border-b border-gray-200 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <Link 
              to="/login" 
              onClick={handleMenuItemClick}
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base"
            >
              Please log in
            </Link>
          </div>
        )}

        {/* Profile Menu Items */}
        {currentUser && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 sm:mb-3 uppercase tracking-wide">Profile Options</h3>
              <nav className="space-y-1 sm:space-y-2">
                {profileMenuItems.map(item => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={handleMenuItemClick}
                    className="flex items-start space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors duration-150 group border border-transparent hover:border-emerald-100"
                  >
                    <div className="text-gray-400 group-hover:text-emerald-600 transition-colors mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs sm:text-sm">{item.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">{item.description}</div>
                    </div>
                    <div className="text-gray-300 group-hover:text-emerald-400 transition-colors">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Logout Section */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors duration-150 font-medium border border-red-200 hover:border-red-300 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>WellZO Dashboard</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar; 