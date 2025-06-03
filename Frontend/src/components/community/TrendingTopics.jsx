import React from 'react';

const TrendingTopics = ({ topics }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <i className="fas fa-fire text-white text-sm"></i>
        </div>
        <h3 className="font-semibold text-gray-900">Trending Now</h3>
      </div>
      
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                  #{index + 1}
                </span>
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {topic.tag}
                </div>
                <div className="text-sm text-gray-500">{topic.posts} posts</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                topic.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {topic.growth}
              </span>
              <i className={`fas ${
                topic.growth.startsWith('+') ? 'fa-arrow-up text-green-500' : 'fa-arrow-down text-red-500'
              } text-xs`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <i className="fas fa-brain text-purple-600"></i>
            <span className="text-sm font-medium text-purple-700">AI Insight</span>
          </div>
          <p className="text-sm text-purple-600">
            Mental health discussions are trending 📈 Join the conversation about wellness and self-care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics; 