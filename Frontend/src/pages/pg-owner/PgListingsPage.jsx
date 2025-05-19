import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, BuildingOffice2Icon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock data for PG listings
const mockListings = [
  {
    id: 'pg101',
    name: 'Sunshine Happy Homes',
    address: '123 Main St, Koregaon Park, Pune',
    status: 'Active',
    occupancy: '18/24',
    beds: 24,
    filledBeds: 18,
    pendingVerifications: 2,
    image: 'https://via.placeholder.com/150/A7F3D0/166534?Text=PG1' // Light green background, dark green text
  },
  {
    id: 'pg102',
    name: 'Comfort Stay PG',
    address: '456 Elm St, Viman Nagar, Pune',
    status: 'Pending',
    occupancy: '0/15',
    beds: 15,
    filledBeds: 0,
    pendingVerifications: 0,
    image: 'https://via.placeholder.com/150/FEF3C7/F59E0B?Text=PG2' // Light yellow background, orange text
  },
  {
    id: 'pg103',
    name: 'Secure Living PG',
    address: '789 Oak St, Hinjewadi, Pune',
    status: 'Inactive',
    occupancy: '10/20',
    beds: 20,
    filledBeds: 10,
    pendingVerifications: 0,
    image: 'https://via.placeholder.com/150/FEE2E2/DC2626?Text=PG3' // Light red background, red text
  },
];

const PgListingsPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My PG Listings</h1>
        <Link 
          to="/pg-partnership/register" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-5 rounded-lg inline-flex items-center transition-colors text-sm shadow hover:shadow-md"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New PG
        </Link>
      </div>

      {mockListings.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl shadow-lg">
            <BuildingOffice2Icon className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No PG listings found.</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first PG.</p>
            <div className="mt-6">
                <Link 
                    to="/pg-partnership/register" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-5 rounded-lg inline-flex items-center transition-colors text-sm shadow hover:shadow-md"
                    >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add New PG
                </Link>
            </div>
        </div>
      ) : (
        <div className="space-y-6">
          {mockListings.map((pg) => {
            const occupancyPercentage = pg.beds > 0 ? (pg.filledBeds / pg.beds) * 100 : 0;
            return (
              <div key={pg.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48 md:h-full" src={pg.image} alt={pg.name} />
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 
                                ${pg.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                pg.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}
                            >
                                {pg.status}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 hover:text-emerald-600 transition-colors">
                                <Link to={`/pg-owner/listings/${pg.id}`}>{pg.name}</Link>
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">{pg.address}</p>
                        </div>
                        <div className="flex-shrink-0 ml-4 mt-1 space-x-2">
                            <button title="View Details" className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                                <EyeIcon className="h-5 w-5" />
                            </button>
                            <button title="Edit Listing" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button title="Delete Listing" className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                            <span>Occupancy</span>
                            <span>{pg.filledBeds} / {pg.beds} beds</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className={`h-2.5 rounded-full ${pg.status === 'Active' ? 'bg-emerald-500' : pg.status === 'Pending' ? 'bg-yellow-400' : 'bg-red-400'}`}
                                style={{ width: `${occupancyPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    {pg.pendingVerifications > 0 && (
                        <p className="mt-3 text-xs text-yellow-600 font-medium">
                            {pg.pendingVerifications} pending verification(s)
                        </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PgListingsPage; 