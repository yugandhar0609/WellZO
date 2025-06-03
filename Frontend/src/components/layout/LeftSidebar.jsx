import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// SVG Icons (Copied from BottomNavigationBar.jsx for now, consider moving to a shared file)
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

const ChevronDownIcon = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

const LeftSidebar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home', IconComponent: HomeIcon, path: '/dashboard' },
    { id: 'search', label: 'Search', IconComponent: SearchIcon, path: '/search' },
    { id: 'community', label: 'Community', IconComponent: CommunityIcon, path: '/community' },
    { id: 'marketplace', label: 'Marketplace', IconComponent: MarketplaceIcon, path: '/marketplace' },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const profileLinks = [
      { id: 'view-profile', label: 'View Profile', path: '/profile-dashboard' },
      { id: 'edit-profile', label: 'Edit Profile', path: '/user-details' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen px-4 py-8 bg-white border-r fixed z-40">
      <div className="flex flex-col justify-between flex-1 mt-2">
        <nav className="-mx-3 space-y-3">
          {/* Main Nav Items */}
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsProfileMenuOpen(false)} // Close profile menu on main nav click
                className={() => 
                  `flex items-center px-3 py-2 transition-colors duration-150 ease-in-out rounded-lg 
                  ${isActive 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`
                }
                title={item.label}
              >
                <item.IconComponent className="w-6 h-6" />
                <span className="mx-4 font-medium text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Profile Section at the bottom of sidebar */}
        <div className="mt-auto pt-4 border-t border-gray-200 relative" ref={profileMenuRef}>
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex items-center w-full p-3 transition-colors duration-150 ease-in-out rounded-lg 
              ${location.pathname.startsWith('/profile') || location.pathname.startsWith('/user-details') // Highlight if on a profile related page
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`
            }
            title="User Profile"
          >
            {currentUser?.profile_picture_url ? (
              <img 
                src={currentUser.profile_picture_url} 
                alt={currentUser.name || 'User profile'}
                className={`w-8 h-8 rounded-full object-cover 
                  ${location.pathname.startsWith('/profile') ? 'border-2 border-emerald-500' : 'border-2 border-transparent'}`}
              />
            ) : (
              <DefaultProfileIcon className="w-8 h-8" />
            )}
            <div className="mx-3 flex-1 text-left overflow-hidden">
              <p className="font-semibold text-sm truncate">{currentUser?.name || 'User'}</p>
            </div>
            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
              {profileLinks.map(link => (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-150 ease-in-out"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { logout(); setIsProfileMenuOpen(false); }}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-b-lg transition-colors duration-150 ease-in-out"
              >
                <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar; 