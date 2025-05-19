import React, { useState, useEffect } from 'react';

// Mock Data - In a real app, this would come from an API
const mockPgsAndGyms = [
  { id: 'pg1', name: 'Sunshine PG for Ladies', type: 'PG', address: '123 Main St, Koregaon Park, Pune', rating: 4.5, image: 'https://via.placeholder.com/300x200.png?text=Sunshine+PG', amenities: ['WiFi', 'Food', 'Laundry'], price: '₹8000/month' },
  { id: 'gym1', name: 'Fitness First Gym', type: 'Gym', address: '456 Elm St, Viman Nagar, Pune', rating: 4.8, image: 'https://via.placeholder.com/300x200.png?text=Fitness+First', facilities: ['Cardio', 'Weights', 'Trainer', 'Yoga'], price: '₹2000/month' },
  { id: 'pg2', name: 'Comfort Stay PG (Gents)', type: 'PG', address: '789 Oak St, Hinjewadi, Pune', rating: 4.2, image: 'https://via.placeholder.com/300x200.png?text=Comfort+PG', amenities: ['WiFi', 'AC', 'Parking'], price: '₹7500/month' },
  { id: 'gym2', name: 'Powerhouse Gym & Spa', type: 'Gym', address: '101 Pine St, Baner, Pune', rating: 4.6, image: 'https://via.placeholder.com/300x200.png?text=Powerhouse+Gym', facilities: ['Weights', 'CrossFit', 'Sauna', 'Pool'], price: '₹3000/month' },
  { id: 'pg3', name: 'Secure Living PG', type: 'PG', address: '234 Maple St, Kothrud, Pune', rating: 4.0, image: 'https://via.placeholder.com/300x200.png?text=Secure+PG', amenities: ['Food', 'Security', 'CCTV'], price: '₹7000/month' },
  { id: 'gym3', name: 'Zenith Fitness Studio', type: 'Gym', address: '567 Birch St, Aundh, Pune', rating: 4.3, image: 'https://via.placeholder.com/300x200.png?text=Zenith+Fitness', facilities: ['Zumba', 'Aerobics', 'Personal Training'], price: '₹1800/month' },
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'pg', 'gym'
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate API call or filtering
    setIsLoading(true);
    const filtered = mockPgsAndGyms.filter(item => {
      const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                item.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilterType = filterType === 'all' || item.type.toLowerCase() === filterType;
      return matchesSearchTerm && matchesFilterType;
    });
    
    // Simulate loading delay
    setTimeout(() => {
        setResults(filtered);
        setIsLoading(false);
    }, 500);

  }, [searchTerm, filterType]);

  const SearchResultCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-xs text-emerald-600 bg-emerald-100 inline-block px-2 py-0.5 rounded-full mb-2 font-medium">{item.type}</p>
        <p className="text-sm text-gray-600 mb-1"><i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>{item.address}</p>
        <p className="text-sm text-gray-600 mb-3"><i className="fas fa-star mr-2 text-yellow-400"></i>{item.rating} / 5.0</p>
        <div className="mb-3">
            {(item.type === 'PG' && item.amenities) && item.amenities.slice(0,3).map(amenity => (
                <span key={amenity} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-1 mb-1 inline-block">{amenity}</span>
            ))}
            {(item.type === 'Gym' && item.facilities) && item.facilities.slice(0,3).map(facility => (
                <span key={facility} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-1 mb-1 inline-block">{facility}</span>
            ))}
        </div>
        <p className="text-lg font-bold text-emerald-700 mb-3">{item.price}</p>
        <button className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header/Search Bar Area */}
      <div className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">Search PGs & Gyms</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              type="text"
              placeholder="Search by name or location (e.g., Koregaon Park, Fitness First)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow duration-150"
            />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none md:w-auto w-full"
            >
              <option value="all">All Types</option>
              <option value="pg">PGs</option>
              <option value="gym">Gyms</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {results.map(item => (
              <SearchResultCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <i className="fas fa-search text-5xl text-gray-400 mb-4"></i>
            <p className="text-xl text-gray-600">No results found for "{searchTerm}"{filterType !== 'all' ? ` in ${filterType.toUpperCase()}s` : ''}.</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage; 