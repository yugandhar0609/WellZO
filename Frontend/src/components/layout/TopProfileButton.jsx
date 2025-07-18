import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';

const DefaultProfileIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const TopProfileButton = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { currentUser } = useAuth();
  const location = useLocation();
  const defaultAvatar = 'https://via.placeholder.com/150/cccccc/808080?Text=User';
  const userAvatar = currentUser?.profile_picture_url || defaultAvatar;

  // Hide the profile button on profile-related pages
  const isProfilePage = location.pathname.includes('/profile') || 
                       location.pathname.includes('/user-details') ||
                       location.pathname.includes('/settings');

  // Handle touch feedback for mobile
  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsPressed(false), 150);
  };

  // Show tooltip on hover
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSidebar && !event.target.closest('.profile-sidebar-container')) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSidebar]);

  return (
    <>
      {/* Profile Button - Available on all pages, top-left */}
      {!isProfilePage && !showSidebar && (
        <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-[80]">
          <div className="relative">
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-[90]">
                {currentUser?.name || 'Profile'}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
            
            {/* Profile Button with Android-like interactions */}
            <button
              onClick={() => setShowSidebar(true)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`
                relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 
                rounded-full bg-white shadow-lg 
                flex items-center justify-center 
                border-2 border-emerald-500 
                hover:border-emerald-600 hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
                transition-all duration-200 ease-out
                active:scale-95 active:shadow-md
                ${isPressed ? 'scale-95 shadow-md' : ''}
              `}
              aria-label="Open profile menu"
            >
              {/* Ripple effect for Android-like feedback */}
              <div className="absolute inset-0 rounded-full bg-emerald-100 opacity-0 transition-opacity duration-200 pointer-events-none"></div>
              
              {currentUser?.profile_picture_url ? (
                <img
                  src={userAvatar}
                  alt={currentUser.name || 'User'}
                  className="w-full h-full rounded-full object-cover relative z-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              
              {!currentUser?.profile_picture_url && (
                <DefaultProfileIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-600 relative z-10" />
              )}
              
              {/* Online status indicator */}
              {currentUser && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm z-20"></div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Profile Sidebar */}
      <div className="profile-sidebar-container">
        <ProfileSidebar 
          isOpen={showSidebar} 
          onClose={() => setShowSidebar(false)} 
        />
      </div>
    </>
  );
};

export default TopProfileButton; 