import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from './MarketplacePage'; // Import the mock data

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.images[0] || foundProduct.image); // Set initial main image
    } else {
      // Handle product not found, e.g., redirect to a 404 page or show a message
      console.error('Product not found!');
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
        <p className='ml-4 text-xl text-gray-700'>Loading product details...</p>
      </div>
    );
  }

  // Helper to render rating stars
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>)}
        {halfStar && <i key="half" className="fas fa-star-half-alt text-yellow-400"></i>}
        {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>)}
        <span className="ml-2 text-sm text-gray-600">({product.reviewsCount} reviews)</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
      <div className="container mx-auto bg-white p-6 md:p-8 rounded-xl shadow-xl">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-500">
          <Link to="/marketplace" className="hover:text-emerald-600">Marketplace</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="mb-4 overflow-hidden rounded-lg shadow">
              <img src={selectedImage} alt={product.name} className="w-full h-auto max-h-[500px] object-contain transition-transform duration-300 ease-in-out hover:scale-105" />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images && product.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? 'border-emerald-500' : 'border-transparent'} hover:border-emerald-400`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-3">Brand: <span className="font-medium text-gray-700">{product.brand}</span></p>
              <div className="mb-4">
                {renderRatingStars(product.rating)}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-emerald-600">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-3">{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="ml-3 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-md">{product.discount} OFF</span>
                )}
              </div>
              <p className={`text-sm font-semibold mb-4 ${product.availability === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                {product.availability}
              </p>
              
              <div className="prose prose-sm max-w-none text-gray-700 mb-6">
                <h3 className="text-md font-semibold mb-1">Description:</h3>
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center">
                <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
              </button>
              <button className="w-full mt-3 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-center">
                <i className="far fa-heart mr-2"></i> Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Info Tabs (Optional - Can be simple sections for now) */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Details</h2>
          
          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 pl-4">
                {product.features.map((feature, index) => <li key={index}>{feature}</li>)}
              </ul>
            </div>
          )}

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Specifications:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">{key}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {product.customerReviews && product.customerReviews.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Customer Reviews ({product.reviewsCount})</h3>
              <div className="space-y-6">
                {product.customerReviews.slice(0,3).map((review, index) => ( // Show a few reviews
                  <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-1">
                      {renderRatingStars(review.rating)} 
                      <span className="ml-auto text-xs text-gray-500">Verified Buyer</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">{review.user}</p>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
                {product.reviewsCount > 3 && (
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        View all {product.reviewsCount} reviews
                    </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 