import React from 'react';

const CommunityStats = () => {
  const stats = [
    { label: 'Active Members', value: '12.4k', change: '+8%', color: 'emerald' },
    { label: 'Posts Today', value: '247', change: '+15%', color: 'blue' },
    { label: 'Success Stories', value: '1.2k', change: '+12%', color: 'yellow' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
          <i className="fas fa-chart-bar text-white text-sm"></i>
        </div>
        <h3 className="font-semibold text-gray-900">Community Stats</h3>
      </div>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${stat.color}-100 text-${stat.color}-700`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Activity Chart Placeholder */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-600 mb-3">Weekly Activity</div>
        <div className="flex items-end space-x-1 h-12">
          {[40, 65, 45, 80, 90, 75, 95].map((height, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-600 rounded-sm opacity-80"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats; 