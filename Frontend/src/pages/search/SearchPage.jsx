import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';

// AI Search Icon Component
const AISearchIcon = ({ size = 6, animate = true }) => {
  const sizeClasses = {
    4: 'w-4 h-4',
    5: 'w-5 h-5',
    6: 'w-6 h-6',
    8: 'w-8 h-8',
    10: 'w-10 h-10',
    12: 'w-12 h-12',
    16: 'w-16 h-16'
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      <svg
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        viewBox="0 0 100 100"
        style={{
          filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))',
        }}
      >
        {/* Outer rotating ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#searchGradient1)"
          strokeWidth="2"
          strokeDasharray="8,4"
          className={animate ? 'animate-spin' : ''}
          style={{ transformOrigin: '50px 50px', animationDuration: '4s' }}
        />
        
        {/* Inner core */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="url(#searchCoreGradient)"
          className={animate ? 'animate-pulse' : ''}
        />
        
        {/* Search icon */}
        <g className={animate ? 'animate-pulse' : ''} style={{ animationDuration: '2s' }}>
          <circle cx="45" cy="45" r="12" fill="none" stroke="white" strokeWidth="3" />
          <path d="M55 55 L65 65" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="searchGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <radialGradient id="searchCoreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.9)" />
            <stop offset="70%" stopColor="rgba(5, 150, 105, 0.7)" />
            <stop offset="100%" stopColor="rgba(4, 120, 87, 0.5)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const searchInputRef = useRef(null);

  // Mock AI search steps
  const searchSteps = [
    'Analyzing your query...',
    'Searching through health databases...',
    'Finding relevant PGs and gyms...',
    'Checking doctor availability...',
    'Compiling personalized results...',
    'Ranking by relevance and quality...'
  ];

  // Mock search results
  const mockSearchResults = [
    {
      id: 1,
      type: 'pg',
      title: 'Premium PG near Anna Nagar',
      description: 'Based on your search, this PG offers excellent facilities including gym access, healthy meal options, and is located in a safe neighborhood.',
      rating: 4.8,
      price: '₹15,000/month',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop',
      relevance: 95,
      features: ['Gym Access', 'Healthy Meals', 'WiFi', 'AC', 'Security']
    },
    {
      id: 2,
      type: 'gym',
      title: 'FitLife Gym & Wellness Center',
      description: 'AI-recommended gym with modern equipment, personal trainers, and nutrition counseling services.',
      rating: 4.7,
      price: '₹2,500/month',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop',
      relevance: 92,
      features: ['Personal Trainer', 'Nutrition Counseling', 'Modern Equipment', 'Group Classes']
    },
    {
      id: 3,
      type: 'doctor',
      title: 'Dr. Sarah Johnson - Nutritionist',
      description: 'Highly recommended nutritionist specializing in wellness and dietary planning for young professionals.',
      rating: 4.9,
      price: '₹800/consultation',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=250&fit=crop',
      relevance: 88,
      features: ['Nutrition Planning', 'Weight Management', 'Online Consultations', 'Follow-up Support']
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    setSearchResults([]);
    
    // Simulate AI search process
    for (let i = 0; i < searchSteps.length; i++) {
      setCurrentStep(searchSteps[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Simulate final results
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSearchResults(mockSearchResults);
    setIsSearching(false);
    setCurrentStep('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const suggestedQueries = [
    "Find PGs near IT parks with gym facilities",
    "Best gyms for weight training in Chennai",
    "Nutritionist for meal planning and diet",
    "PG with healthy food options under ₹20k",
    "Yoga studios for beginners nearby",
    "Doctors specializing in sports medicine"
  ];

  useEffect(() => {
    // Focus on search input when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <PageLayout title="AI Search">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 -mt-20 pt-20">
        {/* Hero Section - Responsive */}
        <div className="text-center py-6 sm:py-8 md:py-12 px-4">
          <div className="flex justify-center mb-4 sm:mb-6">
            <AISearchIcon size={window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 12 : 16} animate={true} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            AI-Powered Search
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4">
            Ask anything about PGs, gyms, doctors, or wellness services. 
            Our AI will find the best matches for you.
          </p>
        </div>

        {/* Search Input - Responsive */}
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 mb-6 sm:mb-8">
          <div className="relative">
            <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="flex-1 relative">
                <textarea
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything... e.g., 'Find PGs near IT parks'"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-16 resize-none focus:outline-none text-gray-900 placeholder-gray-500 bg-transparent text-sm sm:text-base"
                  rows="1"
                  style={{ minHeight: '50px', maxHeight: '120px' }}
                />
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-emerald-600 transition-colors p-1">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
              </div>
                  <button 
                onClick={handleSearch}
                disabled={!query.trim() || isSearching}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium text-sm sm:text-base"
              >
                {isSearching ? (
                  <>
                    <AISearchIcon size={5} animate={true} />
                    <span className="hidden sm:inline">Searching...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                  </>
                )}
                  </button>
            </div>
          </div>
        </div>

        {/* Suggested Queries - Responsive */}
        {!hasSearched && (
          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Try asking:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {suggestedQueries.map((suggestion, index) => (
                  <button
                    key={index}
                  onClick={() => setQuery(suggestion)}
                  className="text-left p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900 transition-colors leading-tight">{suggestion}</span>
              </div>
                    </button>
                  ))}
            </div>
          </div>
        )}

        {/* Search Progress - Responsive */}
        {isSearching && (
          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <AISearchIcon size={window.innerWidth < 640 ? 6 : 8} animate={true} />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">AI is searching...</h3>
                  <p className="text-sm sm:text-base text-emerald-600 font-medium">{currentStep}</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results - Responsive */}
        {searchResults.length > 0 && (
          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Search Results</h2>
              <p className="text-sm sm:text-base text-gray-600">Found {searchResults.length} relevant results for "{query}"</p>
                  </div>
                  
            <div className="space-y-4 sm:space-y-6">
              {searchResults.map((result) => (
                <div key={result.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3">
                      <img 
                        src={result.image} 
                        alt={result.title}
                        className="w-full h-48 sm:h-56 lg:h-full object-cover"
                      />
                    </div>
                    <div className="lg:w-2/3 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                              result.type === 'pg' ? 'bg-blue-100 text-blue-800' :
                              result.type === 'gym' ? 'bg-orange-100 text-orange-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {result.type.toUpperCase()}
                            </span>
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm font-medium text-gray-900">{result.rating}</span>
                            </div>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{result.title}</h3>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xl sm:text-2xl font-bold text-emerald-600">{result.price}</p>
                          <p className="text-xs text-gray-500">AI Match: {result.relevance}%</p>
                        </div>
                      </div>
                      
                      <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">{result.description}</p>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                        {result.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium text-sm sm:text-base">
                          View Details
                        </button>
                        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base">
                          Save for Later
                        </button>
                </div>
              </div>
            </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State - Responsive */}
        {hasSearched && !isSearching && searchResults.length === 0 && (
          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 text-center py-8 sm:py-12">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Try rephrasing your query or search for something else.</p>
              <button 
                onClick={() => {
                  setQuery('');
                  setHasSearched(false);
                  searchInputRef.current?.focus();
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base"
              >
                Try a new search
              </button>
          </div>
        </div>
      )}
    </div>
    </PageLayout>
  );
};

export default SearchPage; 