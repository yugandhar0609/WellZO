import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // To get user avatar for profile icon

// SVG Icons as JSX
const HomeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const CommunityIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>
);

const MarketplaceIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
  </svg>
);

const DefaultProfileIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const BottomNavigationBar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Define navigation items
  const navItems = [
    { id: 'home', label: 'Home', IconComponent: HomeIcon, path: '/dashboard' },
    { id: 'search', label: 'Search', IconComponent: SearchIcon, path: '/search' },
    { id: 'community', label: 'Community', IconComponent: CommunityIcon, path: '/community' },
    { id: 'marketplace', label: 'Marketplace', IconComponent: MarketplaceIcon, path: '/marketplace' },
    { id: 'profile', label: 'Profile', path: '/profile-dashboard', isProfile: true },
  ];

  // Check if the current path is part of the profile section to keep profile tab active
  const isProfileActive = location.pathname.startsWith('/profile-dashboard') || location.pathname.startsWith('/user-details');

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          // Determine if the current item is active
          const isActive = item.isProfile ? isProfileActive : location.pathname === item.path;
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={() =>
                `flex flex-col items-center justify-center text-center w-1/5 h-full 
                transition-all duration-150 ease-in-out focus:outline-none group 
                ${isActive 
                  ? 'text-emerald-600 bg-emerald-100 rounded-lg' 
                  : 'text-gray-700 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg'
                } px-1 py-2`
              }
              title={item.label}
            >
              <div className="flex flex-col items-center justify-center">
                {item.isProfile ? (
                  currentUser?.profile_picture_url ? (
                    <img 
                      src={currentUser.profile_picture_url} 
                      alt={item.label}
                      className={`w-6 h-6 rounded-full object-cover 
                        ${isActive 
                          ? 'border-2 border-emerald-600' 
                          : 'border-2 border-transparent group-hover:border-emerald-300'}`}
                    />
                  ) : (
                    <DefaultProfileIcon className="w-6 h-6" />
                  )
                ) : (
                  <item.IconComponent className="w-6 h-6" />
                )}
                <span className="text-xs mt-1 hidden">
                  {item.label}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigationBar; 