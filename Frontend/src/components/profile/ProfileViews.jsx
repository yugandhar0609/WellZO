import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../interceptor/services';

// Placeholder for a more sophisticated loading spinner if you have one
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
  </div>
);

// Placeholder for a more structured error display
const ErrorDisplay = ({ message }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded-md shadow-md">
    <p className="font-bold">Error</p>
    <p>{message || 'An unexpected error occurred.'}</p>
  </div>
);

const ProfileViews = () => {
  const { currentUser, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
        // User might not be loaded yet, or not logged in.
        // useAuth handles redirection if not logged in after its loading completes.
        if (!authLoading) {
            setError("User not authenticated. Please log in.");
            setIsLoading(false);
        }
        return;
      }
      
      setIsLoading(true);
      setError('');
      try {
        const response = await getUserProfile();
        if (response.success && response.data) {
          setProfileData(response.data);
    } else {
          setError(response.message || 'Could not load profile data.');
          console.warn("Profile fetch warning:", response.message);
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred while fetching profile.');
        console.error("Fetch profile error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) { // Only fetch if auth status is determined
        fetchProfile();
    }
  }, [currentUser, authLoading]);

  if (authLoading || isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorDisplay message={error} />
        <Link to="/dashboard" className="text-emerald-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
    </div>
  );
  }

  if (!profileData && !currentUser) { // Should be caught by error or loading, but as a fallback
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-lg">No profile data available. User might not be logged in.</p>
        <Link to="/login" className="mt-4 inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          Login
        </Link>
      </div>
    );
  }

  // Combine data from currentUser (e.g., email, name from Google) and profileData (from UserProfile model)
  const displayName = currentUser?.name || profileData?.full_name || 'User';
  const displayEmail = currentUser?.email || 'No email provided';
  const avatarUrl = currentUser?.profile_picture_url || profileData?.profile_picture_url || 'https://via.placeholder.com/150/cccccc/808080?Text=User';

  // Helper to display profile fields
  const ProfileField = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || <span className="text-gray-400">Not set</span>}</dd>
    </div>
  );

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl mx-auto my-8 p-6 md:p-10">
      <div className="md:flex md:items-start md:space-x-8 mb-8 pb-8 border-b">
        <div className="flex-shrink-0 mb-6 md:mb-0 text-center md:text-left">
          <img 
            className="h-32 w-32 rounded-full object-cover mx-auto md:mx-0 border-4 border-emerald-100 shadow-md"
            src={avatarUrl} 
            alt={`${displayName}'s profile`} 
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{displayName}</h1>
          <p className="text-md text-gray-600 mt-1">{displayEmail}</p>
          {profileData?.city && <p className="text-sm text-gray-500 mt-1"><i className="fas fa-map-marker-alt mr-2 text-emerald-500"></i>{profileData.city}{profileData.location ? `, ${profileData.location}` : ''}</p>}
          <Link 
            to="/user-details"
            className="mt-6 inline-block px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-150 ease-in-out shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            <i className="fas fa-pencil-alt mr-2"></i>Edit Profile
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Details</h2>
        <dl className="divide-y divide-gray-200">
          <ProfileField label="Full Name" value={profileData?.full_name} />
          <ProfileField label="Age" value={profileData?.age} />
          <ProfileField label="Gender" value={profileData?.gender} />
          <ProfileField label="Date of Birth" value={profileData?.date_of_birth} />
          <ProfileField label="Nationality" value={profileData?.nationality} />
          <ProfileField label="State/Region" value={profileData?.state} />
          <ProfileField label="City" value={profileData?.city} />
          <ProfileField label="Location (Country)" value={profileData?.location} />
          <ProfileField label="Preferred Language" value={profileData?.preferred_language} />
          {profileData?.bio && (
            <div className="py-3">
              <dt className="text-sm font-medium text-gray-500 mb-1">Bio & Additional Info</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">{profileData.bio}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default ProfileViews;