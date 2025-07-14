import React from 'react';
import BottomNavigationBar from './BottomNavigationBar';
import TopProfileButton from './TopProfileButton';

const PageLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 sm:pb-20">
      {/* Top Profile Button - Available on all pages */}
      <TopProfileButton />

      {/* Page Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-[30] px-3 sm:px-4 py-3 sm:py-4 h-14 sm:h-16">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 ml-10 sm:ml-12 truncate">{title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 sm:pt-20 px-2 sm:px-4 max-w-screen-xl mx-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigationBar />
    </div>
  );
};

export default PageLayout; 