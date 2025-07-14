import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserProfileMenu from './UserProfileMenu';

const DefaultProfileIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const TopProfileButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useAuth();
  const defaultAvatar = 'https://via.placeholder.com/150/cccccc/808080?Text=User';
  const userAvatar = currentUser?.profile_picture_url || defaultAvatar;

  return (
    <>
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {currentUser?.profile_picture_url ? (
            <img
              src={userAvatar}
              alt={currentUser.name || 'User'}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <DefaultProfileIcon className="w-6 h-6 text-emerald-600" />
          )}
        </button>

        {/* Profile Menu Overlay */}
        {showMenu && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowMenu(false)}
            />
            <div className="fixed top-16 left-4 z-50">
              <UserProfileMenu isMobile={true} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TopProfileButton; 