import React from 'react';
import BottomNavigationBar from './BottomNavigationBar';
import TopProfileButton from './TopProfileButton';

const PageLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Profile Button - Available on all pages */}
      <TopProfileButton />

      {/* Page Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-[30] px-4 py-4 h-16">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 ml-10 sm:ml-12">{title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-screen-xl mx-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigationBar />
    </div>
  );
};

export default PageLayout; 