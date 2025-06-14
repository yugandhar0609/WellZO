import React from 'react';
import { Link } from 'react-router-dom';

export const mockProducts = [
  {
    id: 1,
    name: "Organic Protein Powder",
    price: 29.99,
    image: "https://via.placeholder.com/150",
    description: "High-quality organic protein powder for muscle recovery"
  },
  {
    id: 2,
    name: "Vitamin D3 Supplements",
    price: 19.99,
    image: "https://via.placeholder.com/150",
    description: "Essential vitamin D3 supplements for bone health"
  },
  // Add more mock products as needed
];

const MarketplacePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Wellness Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Link 
            to={`/marketplace/product/${product.id}`} 
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-primary">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage; 