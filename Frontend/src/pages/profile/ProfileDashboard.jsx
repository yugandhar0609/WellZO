import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../interceptor/services';
import PageLayout from '../../components/layout/PageLayout';

// Tab Components
import OverviewTab from './tabs/OverviewTab';
import HealthDataTab from './tabs/HealthDataTab';
import AIMealPlanTab from './tabs/AIMealPlanTab';
import CommunityProfileTab from './tabs/CommunityProfileTab';
import BadgesTab from './tabs/BadgesTab';
import ReferralsTab from './tabs/ReferralsTab';
import SettingsTab from './tabs/SettingsTab';

const ProfileDashboard = () => {
  const { currentUser, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'health', label: 'Health Data', icon: '📊' },
    { id: 'meals', label: 'AI Meal Plan', icon: '🍽️' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'badges', label: 'Badges', icon: '🏆' },
    { id: 'referrals', label: 'Referrals', icon: '🎁' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
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
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred while fetching profile.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      fetchProfile();
    }
  }, [currentUser, authLoading]);

  if (authLoading || isLoading) {
    return (
      <PageLayout title="Profile">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="Profile">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded-md shadow-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <Link to="/dashboard" className="text-emerald-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </PageLayout>
    );
  }

  if (!profileData && !currentUser) {
    return (
      <PageLayout title="Profile">
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No profile data available. User might not be logged in.</p>
          <Link to="/login" className="mt-4 inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Login
          </Link>
        </div>
      </PageLayout>
    );
  }

  const renderTabContent = () => {
    const commonProps = {
      currentUser,
      profileData,
      setProfileData
    };

    switch (activeTab) {
      case 'overview':
        return <OverviewTab {...commonProps} />;
      case 'health':
        return <HealthDataTab {...commonProps} />;
      case 'meals':
        return <AIMealPlanTab {...commonProps} />;
      case 'community':
        return <CommunityProfileTab {...commonProps} />;
      case 'badges':
        return <BadgesTab {...commonProps} />;
      case 'referrals':
        return <ReferralsTab {...commonProps} />;
      case 'settings':
        return <SettingsTab {...commonProps} />;
      default:
        return <OverviewTab {...commonProps} />;
    }
  };

  return (
    <PageLayout title="My Profile">
      <div className="max-w-6xl mx-auto w-full px-2 sm:px-0">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <img
                src={currentUser?.profile_picture_url || profileData?.profile_picture_url || 'https://via.placeholder.com/150/cccccc/808080?Text=User'}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-emerald-500 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {currentUser?.name || profileData?.full_name || 'User'}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">{currentUser?.email}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                  Premium Member
                </span>
                <span className="text-sm text-gray-500">
                  Member since {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm mb-4 sm:mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto scrollbar-hide profile-tab-nav px-2 sm:px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 flex flex-col items-center space-y-1 min-w-[70px] sm:min-w-0 sm:flex-row sm:space-y-0 sm:space-x-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg sm:text-xl">{tab.icon}</span>
                  <span className="text-xs sm:text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden min-h-[500px]">
          {renderTabContent()}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfileDashboard; 