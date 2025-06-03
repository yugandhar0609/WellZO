import React from 'react';

const FilterTabs = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', name: 'All Posts', icon: 'fa-globe', count: '2.4k' },
    { id: 'fitness', name: 'Fitness', icon: 'fa-dumbbell', count: '892' },
    { id: 'nutrition', name: 'Nutrition', icon: 'fa-apple-alt', count: '743' },
    { id: 'wellness', name: 'Wellness', icon: 'fa-spa', count: '1.1k' },
    { id: 'achievement', name: 'Achievements', icon: 'fa-trophy', count: '567' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
      <div className="flex space-x-1 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <i className={`fas ${filter.icon} ${activeFilter === filter.id ? '' : 'text-gray-400'}`}></i>
            <span>{filter.name}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              activeFilter === filter.id 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs; 