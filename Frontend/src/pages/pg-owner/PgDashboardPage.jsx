import React from 'react';

const PgDashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">PG Owner Dashboard</h1>
      
      {/* Placeholder for Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Occupancy Overview */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Occupancy Overview</h2>
          <p className="text-4xl font-bold text-emerald-600">18/24 <span className="text-lg font-medium text-gray-500">beds filled</span></p>
          <div className="mt-3 h-2.5 w-full bg-gray-200 rounded-full">
            <div className="h-2.5 bg-emerald-500 rounded-full" style={{ width: `${(18/24)*100}%` }}></div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Today's Tasks</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><span className="font-medium text-red-500">Urgent:</span> Respond to new inquiry from Priya S.</li>
            <li>Review 2 pending verification requests.</li>
            <li><span className="text-blue-500">Reminder:</span> Monthly rent collection for Room 102.</li>
          </ul>
        </div>

        {/* Earnings Snapshot */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Earnings Snapshot (This Month)</h2>
          <p className="text-4xl font-bold text-emerald-600">₹45,000 <span className="text-lg font-medium text-gray-500">earned</span></p>
          <p className="text-xs text-gray-500 mt-1">Next payout: 15th July</p>
        </div>

        {/* PG Listing Performance */}
        <div className="bg-white p-6 rounded-xl shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">PG Listing Performance (Last 30 Days)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div><p className="text-3xl font-bold text-gray-700">1.2K</p><p className="text-xs text-gray-500">Views</p></div>
            <div><p className="text-3xl font-bold text-gray-700">78</p><p className="text-xs text-gray-500">Saves</p></div>
            <div><p className="text-3xl font-bold text-gray-700">32</p><p className="text-xs text-gray-500">Contact Clicks</p></div>
            <div><p className="text-3xl font-bold text-gray-700">5</p><p className="text-xs text-gray-500">New Bookings</p></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">Add New PG</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">Upload Photos</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm">View Inquiries</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PgDashboardPage; 