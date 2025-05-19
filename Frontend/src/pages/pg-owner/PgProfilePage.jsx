import React, { useState } from 'react';
import { UserCircleIcon, PencilIcon, EnvelopeIcon, PhoneIcon, IdentificationIcon, CameraIcon } from '@heroicons/react/24/outline';

// Mock PG Owner Data - in a real app, this would come from an auth context or API
const mockPgOwnerData = {
  ownerFullName: 'Ramesh Kumar',
  ownerContactNumber: '9876543210',
  ownerEmail: 'ramesh.k@pgempire.com',
  ownerGovId: '**** **** **** 3456', // Masked for display
  ownerProfilePhotoUrl: 'https://via.placeholder.com/150/008080/FFFFFF?Text=RK',
  pgsManaged: [
    { id: 'pg101', name: 'Sunshine Happy Homes', address: '123 Main St, Koregaon Park' },
    { id: 'pg105', name: 'Kumar\'s Comfort Stays', address: '789 Palm Rd, Baner' },
  ],
  memberSince: '2023-05-15T10:00:00Z',
};

const PgProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ownerFullName: mockPgOwnerData.ownerFullName,
    ownerContactNumber: mockPgOwnerData.ownerContactNumber,
    // Email typically isn't editable or requires verification
    // ownerGovId might also be non-editable after verification
  });
  const [profilePhoto, setProfilePhoto] = useState(null); // For new photo upload
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(mockPgOwnerData.ownerProfilePhotoUrl);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProfilePhoto(file);
        setProfilePhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, call API to update profile
    console.log('Saving PG Owner Profile:', { ...formData, profilePhoto });
    // Update mock data if needed for persistence in this mock setup
    mockPgOwnerData.ownerFullName = formData.ownerFullName;
    mockPgOwnerData.ownerContactNumber = formData.ownerContactNumber;
    if (profilePhotoPreview && profilePhoto) mockPgOwnerData.ownerProfilePhotoUrl = profilePhotoPreview;
    setIsEditing(false);
    alert('Profile updated successfully (Mock)!');
  };

  const inputClass = "mt-1 block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Owner Profile</h1>
        {!isEditing && (
            <button 
                onClick={() => setIsEditing(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center transition-colors text-sm shadow hover:shadow-md"
            >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Profile
            </button>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-xl shadow-xl space-y-8 max-w-2xl mx-auto">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                <img 
                    src={profilePhotoPreview}
                    alt="Owner Profile"
                    className="h-32 w-32 rounded-full object-cover ring-4 ring-emerald-200 shadow-md"
                />
                {isEditing && (
                    <label htmlFor="profilePhotoInput" className="absolute bottom-0 right-0 bg-emerald-600 p-2 rounded-full text-white cursor-pointer hover:bg-emerald-700 transition-colors shadow">
                        <CameraIcon className="h-5 w-5"/>
                        <input type="file" id="profilePhotoInput" name="ownerProfilePhoto" onChange={handlePhotoChange} className="hidden" accept="image/*" />
                    </label>
                )}
            </div>
            {!isEditing && <h2 className="text-2xl font-semibold text-gray-800">{mockPgOwnerData.ownerFullName}</h2>}
        </div>

        {/* Personal Information Section */}
        <div className="space-y-6">
            <div>
              <label htmlFor="ownerFullName" className={labelClass}>Full Name</label>
              {isEditing ? (
                <input type="text" name="ownerFullName" id="ownerFullName" value={formData.ownerFullName} onChange={handleInputChange} className={inputClass} />
              ) : (
                <p className="mt-1 text-gray-700 text-lg py-2.5 px-1">{mockPgOwnerData.ownerFullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="ownerEmail" className={labelClass}>Email Address (Cannot be changed)</label>
                    <div className="flex items-center mt-1">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2"/>
                        <p className="text-gray-500 text-md py-2.5 px-1 truncate">{mockPgOwnerData.ownerEmail}</p>
                    </div>
                </div>
                <div>
                    <label htmlFor="ownerContactNumber" className={labelClass}>Contact Number</label>
                    {isEditing ? (
                        <input type="tel" name="ownerContactNumber" id="ownerContactNumber" value={formData.ownerContactNumber} onChange={handleInputChange} className={inputClass} />
                    ) : (
                        <div className="flex items-center mt-1">
                            <PhoneIcon className="h-5 w-5 text-gray-400 mr-2"/>
                            <p className="text-gray-700 text-md py-2.5 px-1">{mockPgOwnerData.ownerContactNumber}</p>
                        </div>
                    )}
                </div>
            </div>

            <div>
              <label htmlFor="ownerGovId" className={labelClass}>Government ID (Verification)</label>
               <div className="flex items-center mt-1">
                  <IdentificationIcon className="h-5 w-5 text-gray-400 mr-2"/>
                  <p className="text-gray-500 text-md py-2.5 px-1">{mockPgOwnerData.ownerGovId} (Status: Verified)</p>
                  {/* In a real app, might show verification status or allow upload if not verified and editable */} 
              </div>
            </div>
        </div>

        {/* Managed PGs Section (Display Only) */}
        <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Managed PGs/Hostels</h3>
            {mockPgOwnerData.pgsManaged.length > 0 ? (
                <ul className="space-y-3">
                    {mockPgOwnerData.pgsManaged.map(pg => (
                        <li key={pg.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="font-semibold text-emerald-700">{pg.name}</p>
                            <p className="text-xs text-gray-500">{pg.address}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500">No PGs currently managed under this profile.</p>
            )}
        </div>

        {isEditing && (
            <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
                <button 
                    type="button" 
                    onClick={() => { setIsEditing(false); setProfilePhotoPreview(mockPgOwnerData.ownerProfilePhotoUrl); /* Reset form changes */ }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm border border-gray-300"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm shadow hover:shadow-md"
                >
                    Save Changes
                </button>
            </div>
        )}
         {!isEditing && (
            <div className="pt-6 border-t border-gray-200 text-xs text-gray-400">
                Member since: {new Date(mockPgOwnerData.memberSince).toLocaleDateString()}
            </div>
        )}
      </form>
    </div>
  );
};

export default PgProfilePage; 