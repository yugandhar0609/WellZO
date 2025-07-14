import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserProfileMenu from './UserProfileMenu';
import BottomNavigationBar from './BottomNavigationBar';
import TopProfileButton from './TopProfileButton';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/dashboard', icon: 'home', label: 'Dashboard' },
    { path: '/workouts', icon: 'dumbbell', label: 'Workouts' },
    { path: '/meals', icon: 'utensils', label: 'Meal Plan' },
    { path: '/progress', icon: 'chart-line', label: 'Progress' },
    { path: '/community', icon: 'users', label: 'Community' },
    { path: '/ai-chat', icon: 'robot', label: 'AI Coach Chat' }
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation - Desktop Only */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg hidden lg:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-emerald-600">WellZO</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {navigationItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 ${
                  isActivePath(item.path) ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700'
                }`}
              >
                <i className={`fas fa-${item.icon}`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        <UserProfileMenu isMobile={false} />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <i className="fas fa-bars text-gray-600"></i>
              </button>
              <h2 className="text-xl font-semibold">
                {navigationItems.find(item => isActivePath(item.path))?.label || 'Dashboard'}
              </h2>
            </div>
          </div>
        </header>

        {/* Page Content */}
        {children}
      </main>

      {/* Mobile Navigation Components */}
      <TopProfileButton />
      <BottomNavigationBar />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-emerald-600">WellZO</h1>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <nav className="mt-6">
              <div className="px-4 space-y-2">
                {navigationItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 ${
                      isActivePath(item.path) ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700'
                    }`}
                  >
                    <i className={`fas fa-${item.icon}`}></i>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;