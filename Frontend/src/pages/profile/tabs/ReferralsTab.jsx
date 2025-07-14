import React, { useState } from 'react';

const ReferralsTab = ({ currentUser, profileData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [referralCode, setReferralCode] = useState('WELLZO-JM2024');
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock referral data
  const referralStats = {
    totalReferrals: 12,
    successfulReferrals: 8,
    pendingReferrals: 3,
    totalEarnings: 240,
    currentMonthEarnings: 60,
    conversionRate: 67
  };

  const referralHistory = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      status: 'completed',
      joinDate: '2024-01-15',
      reward: 30,
      avatar: 'https://via.placeholder.com/40/f59e0b/ffffff?text=SJ'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      status: 'completed',
      joinDate: '2024-01-10',
      reward: 30,
      avatar: 'https://via.placeholder.com/40/3b82f6/ffffff?text=MC'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      status: 'pending',
      joinDate: '2024-01-18',
      reward: 30,
      avatar: 'https://via.placeholder.com/40/ec4899/ffffff?text=EW'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david.r@example.com',
      status: 'completed',
      joinDate: '2024-01-08',
      reward: 30,
      avatar: 'https://via.placeholder.com/40/8b5cf6/ffffff?text=DR'
    },
    {
      id: 5,
      name: 'Lisa Park',
      email: 'lisa.park@example.com',
      status: 'pending',
      joinDate: '2024-01-20',
      reward: 30,
      avatar: 'https://via.placeholder.com/40/f97316/ffffff?text=LP'
    }
  ];

  const rewardTiers = [
    { referrals: 1, reward: 30, title: 'First Referral', description: 'Get $30 for your first successful referral' },
    { referrals: 5, reward: 50, title: 'Bronze Ambassador', description: 'Earn $50 bonus for 5 referrals' },
    { referrals: 10, reward: 100, title: 'Silver Ambassador', description: 'Earn $100 bonus for 10 referrals' },
    { referrals: 25, reward: 250, title: 'Gold Ambassador', description: 'Earn $250 bonus for 25 referrals' },
    { referrals: 50, reward: 500, title: 'Platinum Ambassador', description: 'Earn $500 bonus for 50 referrals' }
  ];

  const shareOptions = [
    { platform: 'WhatsApp', icon: '📱', color: 'bg-green-500', action: () => shareToWhatsApp() },
    { platform: 'Facebook', icon: '📘', color: 'bg-blue-600', action: () => shareToFacebook() },
    { platform: 'Twitter', icon: '🐦', color: 'bg-blue-400', action: () => shareToTwitter() },
    { platform: 'Email', icon: '✉️', color: 'bg-gray-600', action: () => shareViaEmail() },
    { platform: 'Copy Link', icon: '🔗', color: 'bg-emerald-600', action: () => copyReferralLink() }
  ];

  const copyReferralLink = () => {
    const referralLink = `https://wellzo.ai/register?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const shareToWhatsApp = () => {
    const message = `Join me on WellZO - the best wellness platform! Use my code ${referralCode} and get started. https://wellzo.ai/register?ref=${referralCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  const shareToFacebook = () => {
    const url = `https://wellzo.ai/register?ref=${referralCode}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  };

  const shareToTwitter = () => {
    const message = `Join me on WellZO! Use code ${referralCode} for exclusive benefits. https://wellzo.ai/register?ref=${referralCode}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`);
  };

  const shareViaEmail = () => {
    const subject = 'Join me on WellZO!';
    const body = `Hi!\n\nI've been using WellZO for my wellness journey and thought you might be interested too!\n\nUse my referral code: ${referralCode}\nSign up here: https://wellzo.ai/register?ref=${referralCode}\n\nYou'll get exclusive benefits and I'll earn a small reward too!\n\nThanks!`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrentTier = () => {
    const completed = referralStats.successfulReferrals;
    return rewardTiers.reverse().find(tier => completed >= tier.referrals) || rewardTiers[0];
  };

  const getNextTier = () => {
    const completed = referralStats.successfulReferrals;
    return rewardTiers.find(tier => completed < tier.referrals);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Referral Link Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Your Referral Code</h3>
              <p className="text-emerald-100 mb-4">Share this code with friends and earn rewards!</p>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 flex-1">
                  <p className="font-mono text-lg font-bold">{referralCode}</p>
                </div>
                <button 
                  onClick={copyReferralLink}
                  className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-xl transition-colors font-medium"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Quick Share */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Share</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {shareOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={option.action}
                    className={`${option.color} text-white p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-xs font-medium">{option.platform}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Tier Progress */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ambassador Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{getCurrentTier()?.title || 'Getting Started'}</p>
                    <p className="text-sm text-gray-600">{getCurrentTier()?.description || 'Complete your first referral'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">{referralStats.successfulReferrals}</p>
                    <p className="text-sm text-gray-500">Referrals</p>
                  </div>
                </div>
                
                {getNextTier() && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress to {getNextTier().title}</span>
                      <span>{referralStats.successfulReferrals}/{getNextTier().referrals}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(referralStats.successfulReferrals / getNextTier().referrals) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="space-y-4">
            {referralHistory.map((referral) => (
              <div key={referral.id} className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <img 
                      src={referral.avatar} 
                      alt={referral.name} 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">{referral.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{referral.email}</p>
                      <p className="text-xs text-gray-500">Joined {formatDate(referral.joinDate)}</p>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)} mb-2`}>
                      {referral.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                    </div>
                    <p className="text-lg font-bold text-emerald-600">${referral.reward}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'rewards':
        return (
          <div className="space-y-6">
            {rewardTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-6 border-2 ${
                  referralStats.successfulReferrals >= tier.referrals 
                    ? 'border-emerald-300 bg-emerald-50' 
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                      referralStats.successfulReferrals >= tier.referrals 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {referralStats.successfulReferrals >= tier.referrals ? '✓' : '🎯'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{tier.title}</h3>
                      <p className="text-sm text-gray-600">{tier.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{tier.referrals} referrals required</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">${tier.reward}</p>
                    <p className="text-sm text-gray-500">Bonus</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Referrals</p>
              <p className="text-3xl font-bold text-gray-900">{referralStats.totalReferrals}</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Successful</p>
              <p className="text-3xl font-bold text-emerald-600">{referralStats.successfulReferrals}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Earned</p>
              <p className="text-3xl font-bold text-emerald-600">${referralStats.totalEarnings}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Conversion Rate</p>
              <p className="text-3xl font-bold text-blue-600">{referralStats.conversionRate}%</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'history', label: 'History', icon: '📋' },
            { id: 'rewards', label: 'Rewards', icon: '🎁' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ReferralsTab; 