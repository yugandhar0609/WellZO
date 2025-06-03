import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define steps for the registration form
const STEPS = [
  { id: 1, name: 'Owner Information' },
  { id: 2, name: 'Property Details' },
  { id: 3, name: 'Media & Documents' },
  { id: 4, name: 'Review & Submit' },
];

// Helper for generating a unique ID (very basic for frontend mock)
const generateUniqueId = () => `PG_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

const PgRegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Owner Information
    ownerFullName: '',
    ownerContactNumber: '',
    ownerEmail: '',
    ownerPassword: '',
    ownerConfirmPassword: '',
    ownerGovId: '', // Aadhar, etc.
    ownerProfilePhoto: null,

    // Step 2: Property Information
    pgName: '',
    pgAddressStreet: '',
    pgAddressCity: '',
    pgAddressState: '',
    pgAddressPincode: '',
    pgPropertyType: 'boys', // boys, girls, co-ed
    pgCapacity: '',
    pgRoomTypes: {
      single: false,
      double: false,
      shared: false, // e.g., 3+ beds
    },
    pgAmenities: [], // Array of strings like ['WiFi', 'AC', 'Laundry']
    pgFoodAvailability: 'not_provided', // not_provided, included, separate_cost
    
    // Step 3: Media Uploads
    pgPropertyPhotos: [], // Array of File objects
    pgLegalDocuments: [], // Array of File objects
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name.startsWith('pgRoomTypes.')) {
        const roomType = name.split('.')[1];
        setFormData(prev => ({ 
            ...prev, 
            pgRoomTypes: { ...prev.pgRoomTypes, [roomType]: checked }
        }));
      } else { // Amenities
        setFormData(prev => ({
          ...prev,
          pgAmenities: checked 
            ? [...prev.pgAmenities, value]
            : prev.pgAmenities.filter(amenity => amenity !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    const finalData = {
        ...formData,
        id: generateUniqueId(), // Simulate a backend ID assignment
        verificationStatus: 'Pending', // Default status
        listingStatus: 'Pending', // Default status
        createdDate: new Date().toISOString(),
        lastUpdatedDate: new Date().toISOString(),
    };
    console.log('Submitting PG Registration Data:', finalData);
    alert('PG Registration Submitted Successfully (Mock)! Check console for data.');
    // Potentially clear form or navigate to a success page
    navigate('/pg-owner/dashboard'); // Navigate to the new PG Owner Dashboard
  };

  const availableAmenities = [
    'WiFi', 'AC', 'Power Backup', 'Laundry Service', 'Housekeeping', 
    'Parking', 'Security (CCTV)', 'Common Room', 'TV', 'Refrigerator',
    'Water Purifier', 'Study Table', 'Wardrobe'
  ];

  // Common input field styling
  const inputClass = "mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Owner Information</h2>
            <div>
              <label htmlFor="ownerFullName" className={labelClass}>Full Name</label>
              <input type="text" name="ownerFullName" id="ownerFullName" value={formData.ownerFullName} onChange={handleInputChange} className={inputClass} placeholder="e.g., Rajesh Kumar" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ownerContactNumber" className={labelClass}>Contact Number</label>
                <input type="tel" name="ownerContactNumber" id="ownerContactNumber" value={formData.ownerContactNumber} onChange={handleInputChange} className={inputClass} placeholder="e.g., 9876543210" />
              </div>
              <div>
                <label htmlFor="ownerEmail" className={labelClass}>Email Address</label>
                <input type="email" name="ownerEmail" id="ownerEmail" value={formData.ownerEmail} onChange={handleInputChange} className={inputClass} placeholder="e.g., owner@example.com" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ownerPassword" className={labelClass}>Password</label>
                <input type="password" name="ownerPassword" id="ownerPassword" value={formData.ownerPassword} onChange={handleInputChange} className={inputClass} placeholder="Create a strong password" required />
              </div>
              <div>
                <label htmlFor="ownerConfirmPassword" className={labelClass}>Confirm Password</label>
                <input type="password" name="ownerConfirmPassword" id="ownerConfirmPassword" value={formData.ownerConfirmPassword} onChange={handleInputChange} className={inputClass} placeholder="Confirm your password" required />
              </div>
            </div>
            <div>
              <label htmlFor="ownerGovId" className={labelClass}>Government ID (e.g., Aadhar Number - Optional)</label>
              <input type="text" name="ownerGovId" id="ownerGovId" value={formData.ownerGovId} onChange={handleInputChange} className={inputClass} placeholder="Enter Government ID Number" />
            </div>
            <div>
              <label htmlFor="ownerProfilePhoto" className={labelClass}>Profile Photo (Optional)</label>
              <input type="file" name="ownerProfilePhoto" id="ownerProfilePhoto" onChange={handleFileChange} className={`${inputClass} p-0 file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100`} accept="image/*" />
              {formData.ownerProfilePhoto && <p className="text-xs text-gray-500 mt-1">{formData.ownerProfilePhoto.name}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Property Details</h2>
            <div>
              <label htmlFor="pgName" className={labelClass}>PG/Hostel Name</label>
              <input type="text" name="pgName" id="pgName" value={formData.pgName} onChange={handleInputChange} className={inputClass} placeholder="e.g., Sunshine Happy Homes" />
            </div>
            <fieldset className="space-y-2">
              <legend className={`${labelClass} mb-0`}>Full Address</legend>
              <input type="text" name="pgAddressStreet" value={formData.pgAddressStreet} onChange={handleInputChange} className={inputClass} placeholder="Street Address, Area" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" name="pgAddressCity" value={formData.pgAddressCity} onChange={handleInputChange} className={inputClass} placeholder="City" />
                <input type="text" name="pgAddressState" value={formData.pgAddressState} onChange={handleInputChange} className={inputClass} placeholder="State" />
                <input type="text" name="pgAddressPincode" value={formData.pgAddressPincode} onChange={handleInputChange} className={inputClass} placeholder="Pincode" />
              </div>
            </fieldset>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="pgPropertyType" className={labelClass}>Property Type</label>
                    <select name="pgPropertyType" id="pgPropertyType" value={formData.pgPropertyType} onChange={handleInputChange} className={inputClass}>
                        <option value="boys">Boys PG</option>
                        <option value="girls">Girls PG</option>
                        <option value="co-ed">Co-ed PG</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="pgCapacity" className={labelClass}>Total Capacity (Beds)</label>
                    <input type="number" name="pgCapacity" id="pgCapacity" value={formData.pgCapacity} onChange={handleInputChange} className={inputClass} placeholder="e.g., 50" min="1"/>
                </div>
            </div>
            <div>
              <label className={labelClass}>Room Types Available</label>
              <div className="mt-2 space-y-2 md:space-y-0 md:flex md:space-x-6">
                {['single', 'double', 'shared'].map(type => (
                  <label key={type} className="flex items-center space-x-2 text-sm text-gray-700">
                    <input type="checkbox" name={`pgRoomTypes.${type}`} checked={formData.pgRoomTypes[type]} onChange={handleInputChange} className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)} Occupancy</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
                <label className={labelClass}>Food Availability</label>
                <select name="pgFoodAvailability" value={formData.pgFoodAvailability} onChange={handleInputChange} className={inputClass}>
                    <option value="not_provided">Not Provided</option>
                    <option value="included">Included in Rent</option>
                    <option value="separate_cost">Available at Separate Cost</option>
                </select>
            </div>
            <div>
              <label className={labelClass}>Amenities Provided</label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                {availableAmenities.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2 text-sm text-gray-700">
                    <input type="checkbox" name="pgAmenities" value={amenity} checked={formData.pgAmenities.includes(amenity)} onChange={handleInputChange} className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Media & Documents</h2>
            <div>
              <label htmlFor="pgPropertyPhotos" className={labelClass}>Property Photos (Multiple images can be selected)</label>
              <input type="file" name="pgPropertyPhotos" id="pgPropertyPhotos" onChange={handleFileChange} multiple className={`${inputClass} p-0 file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100`} accept="image/*" />
              {formData.pgPropertyPhotos.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  {formData.pgPropertyPhotos.map(file => <p key={file.name}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</p>)}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="pgLegalDocuments" className={labelClass}>Legal Documents (Proof of ownership, license, etc. - Optional)</label>
              <input type="file" name="pgLegalDocuments" id="pgLegalDocuments" onChange={handleFileChange} multiple className={`${inputClass} p-0 file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100`} accept=".pdf,.jpg,.jpeg,.png" />
              {formData.pgLegalDocuments.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  {formData.pgLegalDocuments.map(file => <p key={file.name}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</p>)}
                </div>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Review Your Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4 text-sm">
              <div><strong className="text-gray-700">Owner Full Name:</strong> <span className="text-gray-600">{formData.ownerFullName || '-'}</span></div>
              <div><strong className="text-gray-700">Contact:</strong> <span className="text-gray-600">{formData.ownerContactNumber || '-'} | {formData.ownerEmail || '-'}</span></div>
              <div><strong className="text-gray-700">Password:</strong> <span className="text-gray-600">******** (Set)</span></div>
              <div><strong className="text-gray-700">Govt ID:</strong> <span className="text-gray-600">{formData.ownerGovId || '-'}</span></div>
              <div><strong className="text-gray-700">Profile Photo:</strong> <span className="text-gray-600">{formData.ownerProfilePhoto?.name || 'Not uploaded'}</span></div>
              <hr className="my-3" />
              <div><strong className="text-gray-700">PG Name:</strong> <span className="text-gray-600">{formData.pgName || '-'}</span></div>
              <div><strong className="text-gray-700">Address:</strong> <span className="text-gray-600">{`${formData.pgAddressStreet}, ${formData.pgAddressCity}, ${formData.pgAddressState} - ${formData.pgAddressPincode}`.replace(/, , |, -/g, ', ') || '-'}</span></div>
              <div><strong className="text-gray-700">Type:</strong> <span className="text-gray-600">{formData.pgPropertyType}</span> | <strong className="text-gray-700">Capacity:</strong> <span className="text-gray-600">{formData.pgCapacity || '-'} beds</span></div>
              <div><strong className="text-gray-700">Room Types:</strong> <span className="text-gray-600">{Object.entries(formData.pgRoomTypes).filter(([, v]) => v).map(([k]) => k).join(', ') || 'None selected'}</span></div>
              <div><strong className="text-gray-700">Amenities:</strong> <span className="text-gray-600">{formData.pgAmenities.join(', ') || 'None selected'}</span></div>
              <div><strong className="text-gray-700">Food:</strong> <span className="text-gray-600">{formData.pgFoodAvailability.replace('_', ' ')}</span></div>
              <hr className="my-3" />
              <div><strong className="text-gray-700">Property Photos:</strong> <span className="text-gray-600">{formData.pgPropertyPhotos.length} file(s) uploaded</span></div>
              <div><strong className="text-gray-700">Legal Docs:</strong> <span className="text-gray-600">{formData.pgLegalDocuments.length} file(s) uploaded</span></div>
            </div>
            <p className="text-xs text-gray-500">By submitting, you agree to our terms and conditions for PG partnerships.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          {/* Stepper Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
            <nav aria-label="Progress">
              <ol role="list" className="flex items-center">
                {STEPS.map((step, stepIdx) => (
                  <li key={step.name} className={`relative ${stepIdx !== STEPS.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                    {step.id < currentStep ? (
                      <>
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="h-0.5 w-full bg-emerald-600" />
                        </div>
                        <button
                          type="button"
                          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
                          onClick={() => setCurrentStep(step.id)}
                        >
                          <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                          <span className="sr-only">{step.name} - Completed</span>
                        </button>
                      </>
                    ) : step.id === currentStep ? (
                      <>
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className={`h-0.5 w-full ${stepIdx === 0 ? 'bg-transparent' : 'bg-gray-200' }`} />
                        </div>
                        <button
                          type="button"
                          className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-600 bg-white transition-colors"
                          aria-current="step"
                        >
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" aria-hidden="true" />
                          <span className="sr-only">{step.name} - Current</span>
                        </button>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-emerald-600 whitespace-nowrap">{step.name}</span>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="h-0.5 w-full bg-gray-200" />
                        </div>
                        <button
                          type="button"
                          className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 transition-colors"
                          onClick={() => {/* Allow navigation to future steps only if all previous steps are valid - for now, simple click */ setCurrentStep(step.id)}}
                        >
                          <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true" />
                          <span className="sr-only">{step.name} - Upcoming</span>
                        </button>
                      </>
                    )}
                     {step.id < currentStep && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">{step.name}</span>}
                     {step.id > currentStep && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 whitespace-nowrap">{step.name}</span>}
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8 sm:p-10">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              {/* Navigation Buttons */}
              <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center">
                <button 
                  type="button" 
                  onClick={prevStep} 
                  disabled={currentStep === 1}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Back
                </button>
                {currentStep < STEPS.length ? (
                  <button 
                    type="button" 
                    onClick={nextStep} 
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                  >
                    Next: {STEPS.find(s => s.id === currentStep + 1)?.name || 'Review'}
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="px-8 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Submit Registration
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-500">
          Wellzo PG Partnership Program &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default PgRegistrationPage; 