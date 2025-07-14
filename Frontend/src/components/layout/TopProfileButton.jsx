import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ProfileSidebar from './ProfileSidebar';

const DefaultProfileIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const TopProfileButton = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { currentUser } = useAuth();
  const defaultAvatar = 'https://via.placeholder.com/150/cccccc/808080?Text=User';
  const userAvatar = currentUser?.profile_picture_url || defaultAvatar;

  return (
    <>
      {/* Profile Button - Available on all pages, top-left */}
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-[80]">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-emerald-500 hover:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200"
        >
          {currentUser?.profile_picture_url ? (
            <img
              src={userAvatar}
              alt={currentUser.name || 'User'}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <DefaultProfileIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-600" />
          )}
        </button>
      </div>

      {/* Profile Sidebar */}
      <ProfileSidebar 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)} 
      />
    </>
  );
};

export default TopProfileButton; 