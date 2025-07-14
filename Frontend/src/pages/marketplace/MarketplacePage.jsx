import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';

// Custom Marketplace Icon Component
const MarketplaceIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" fill="currentColor"/>
    <path d="M9 8H15V10H9V8ZM9 12H15V14H9V12Z" fill="currentColor"/>
  </svg>
);

// Star Rating Component
const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-sm text-gray-600">({reviews})</span>
  </div>
);

// Product Card Component
const ProductCard = ({ product }) => (
  <Link 
    to={`/marketplace/product/${product.id}`}
    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
  >
    <div className="relative">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 sm:h-52 md:h-48 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {product.badge && (
        <div className="absolute top-2 left-2 bg-emerald-600 text-white px-2 py-1 rounded text-xs font-semibold">
          {product.badge}
        </div>
      )}
      {product.discount && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
          -{product.discount}%
        </div>
      )}
    </div>
    
    <div className="p-3 sm:p-4">
      <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
        {product.name}
      </h3>
      
      <StarRating rating={product.rating} reviews={product.reviews} />
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        {product.prime && (
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
            Prime
          </div>
        )}
      </div>
      
      <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
        {product.description}
      </p>
      
      {product.freeShipping && (
        <div className="flex items-center mt-2 text-xs text-emerald-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
            <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.5l1.5-.75.5-.25.5.25L17 15V8a1 1 0 00-1-1h-2z"/>
          </svg>
          Free Shipping
        </div>
      )}
    </div>
  </Link>
);

// Filter Chip Component
const FilterChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
      active 
        ? 'bg-emerald-600 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

export const mockProducts = [
  {
    id: 1,
    name: "Organic Protein Powder - Vanilla Flavor",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://via.placeholder.com/300x300",
    description: "High-quality organic protein powder for muscle recovery and growth",
    rating: 4.5,
    reviews: 1234,
    badge: "Best Seller",
    discount: 25,
    prime: true,
    freeShipping: true,
    category: "supplements"
  },
  {
    id: 2,
    name: "Vitamin D3 Supplements - 60 Capsules",
    price: 19.99,
    image: "https://via.placeholder.com/300x300",
    description: "Essential vitamin D3 supplements for bone health and immune support",
    rating: 4.3,
    reviews: 856,
    prime: true,
    freeShipping: true,
    category: "supplements"
  },
  {
    id: 3,
    name: "Wireless Fitness Tracker - Heart Rate Monitor",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://via.placeholder.com/300x300",
    description: "Advanced fitness tracker with heart rate monitoring and GPS",
    rating: 4.7,
    reviews: 2341,
    badge: "New",
    discount: 31,
    prime: true,
    freeShipping: true,
    category: "wearables"
  },
  {
    id: 4,
    name: "Yoga Mat - Premium Non-Slip",
    price: 34.99,
    image: "https://via.placeholder.com/300x300",
    description: "Premium yoga mat with excellent grip and cushioning",
    rating: 4.4,
    reviews: 567,
    freeShipping: true,
    category: "equipment"
  },
  {
    id: 5,
    name: "Resistance Bands Set - 5 Levels",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://via.placeholder.com/300x300",
    description: "Complete resistance bands set for home workouts",
    rating: 4.6,
    reviews: 1089,
    discount: 29,
    prime: true,
    freeShipping: true,
    category: "equipment"
  },
  {
    id: 6,
    name: "Omega-3 Fish Oil - 120 Softgels",
    price: 22.99,
    image: "https://via.placeholder.com/300x300",
    description: "High-quality omega-3 fish oil for heart and brain health",
    rating: 4.2,
    reviews: 743,
    prime: true,
    freeShipping: true,
    category: "supplements"
  }
];

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'supplements', label: 'Supplements' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'wearables', label: 'Wearables' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Customer Rating' },
  { id: 'newest', label: 'Newest' },
];

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <PageLayout>
      <div className="bg-white/90 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-3">
            <MarketplaceIcon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Marketplace
            </h1>
          </div>
          <div className="text-sm text-gray-600">
            {sortedProducts.length} products
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 sm:mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-2 sm:space-x-3 mb-4 sm:mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              label={category.label}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>

        {/* Sort and Filter Controls */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter</span>
            </button>
          </div>
          
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
            <span>View:</span>
            <button className="p-1 border rounded hover:bg-gray-100">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button className="p-1 border rounded hover:bg-gray-100">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Load More Button */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MarketplacePage; 