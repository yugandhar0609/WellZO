import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { 
    HomeIcon, DocumentTextIcon, ChatBubbleLeftEllipsisIcon, CreditCardIcon, UserCircleIcon, QuestionMarkCircleIcon, Bars3Icon, XMarkIcon, BuildingOffice2Icon 
} from '@heroicons/react/24/outline'; // Using outline icons for a cleaner look

const sidebarNavigation = [
  { name: 'Dashboard', href: '/pg-owner/dashboard', icon: HomeIcon },
  { name: 'My Listings', href: '/pg-owner/listings', icon: BuildingOffice2Icon },
  // { name: 'Bookings', href: '/pg-owner/bookings', icon: CalendarDaysIcon }, // Future use
  { name: 'Inquiries', href: '/pg-owner/inquiries', icon: ChatBubbleLeftEllipsisIcon },
  // { name: 'Payments', href: '/pg-owner/payments', icon: CreditCardIcon }, // Future use
  { name: 'Profile', href: '/pg-owner/profile', icon: UserCircleIcon },
  { name: 'Support', href: '/pg-owner/support', icon: QuestionMarkCircleIcon },
];

const PgOwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Placeholder for user data - replace with actual auth context later
  const pgOwnerUser = {
    name: 'PG Owner Name',
    email: 'pgowner@example.com',
    imageUrl: 'https://via.placeholder.com/150/008080/FFFFFF?Text=PG',
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top navigation for mobile, also shows on desktop */}
      <header className="bg-emerald-700 text-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/pg-owner/dashboard" className="text-xl font-bold tracking-tight">
                Wellzo PG Dashboard
              </Link>
            </div>
            <div className="flex items-center">
                {/* Desktop User Menu (or simple name) */}
                <div className="hidden md:flex items-center ml-4">
                    <span className='mr-2 text-sm'>{pgOwnerUser.name}</span>
                    <img className="h-8 w-8 rounded-full" src={pgOwnerUser.imageUrl} alt="User" />
                    {/* TODO: Add a dropdown for logout, settings */}
                </div>
                 {/* Mobile menu button */}
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)} 
                    className="md:hidden ml-3 p-2 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded={sidebarOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    {sidebarOpen ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Static sidebar for desktop */}
        <aside className={`hidden md:flex md:flex-shrink-0 w-64 bg-white border-r border-gray-200 shadow-lg flex-col justify-between transition-all duration-300 ease-in-out`}>
          <nav className="flex-grow px-3 py-6 space-y-1">
            {sidebarNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 
                  ${isActive 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-500'}`} aria-hidden="true" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          {/* Sidebar Footer/User Area - Desktop */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <img className="h-10 w-10 rounded-full object-cover" src={pgOwnerUser.imageUrl} alt="PG Owner" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{pgOwnerUser.name}</p>
                <p className="text-xs text-gray-500">Logout</p> {/* TODO: Make this a button */}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar (drawer) */}
        {sidebarOpen && (
            <div className="md:hidden fixed inset-0 z-40 flex">
                {/* Off-canvas menu */}
                <div className={`fixed inset-y-0 left-0 flex flex-col w-64 max-w-[80%] bg-white border-r border-gray-200 shadow-xl z-50 transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-between h-16 px-4 border-b bg-emerald-700 text-white">
                        <Link to="/pg-owner/dashboard" className="text-lg font-bold tracking-tight">
                            Wellzo PG Menu
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md hover:bg-emerald-600">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex-grow px-3 py-6 space-y-1">
                        {sidebarNavigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            onClick={() => setSidebarOpen(false)} // Close sidebar on click
                            className={({ isActive }) =>
                            `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 
                            ${isActive 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                            }
                        >
                            <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-500'}`} aria-hidden="true" />
                            {item.name}
                        </NavLink>
                        ))}
                    </nav>
                     {/* Sidebar Footer/User Area - Mobile */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={pgOwnerUser.imageUrl} alt="PG Owner" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">{pgOwnerUser.name}</p>
                            <p className="text-xs text-gray-500">Logout</p> {/* TODO: Make this a button */}
                        </div>
                        </div>
                    </div>
                </div>
                 {/* Overlay */}
                <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSidebarOpen(false)}></div>
            </div>
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-0 md:p-0">
          {/* The Outlet will render the specific page component (e.g., PgDashboardPage) */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default PgOwnerLayout; 