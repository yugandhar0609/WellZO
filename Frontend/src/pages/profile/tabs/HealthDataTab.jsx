import React, { useState } from 'react';

const HealthDataTab = ({ currentUser, profileData, setProfileData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const bodyMetrics = [
    { label: 'Weight', value: '75.2 kg', change: '-0.8 kg', trend: 'down', icon: '⚖️' },
    { label: 'BMI', value: '22.4', change: '+0.2', trend: 'up', icon: '📊' },
    { label: 'Body Fat', value: '15.8%', change: '-1.2%', trend: 'down', icon: '🎯' },
    { label: 'Muscle Mass', value: '63.4 kg', change: '+0.5 kg', trend: 'up', icon: '💪' }
  ];

  const vitalSigns = [
    { label: 'Heart Rate', value: '72 bpm', range: '60-100 bpm', status: 'normal', icon: '❤️' },
    { label: 'Blood Pressure', value: '120/80', range: '<140/90', status: 'normal', icon: '🩸' },
    { label: 'Temperature', value: '36.8°C', range: '36.1-37.2°C', status: 'normal', icon: '🌡️' },
    { label: 'Oxygen Saturation', value: '98%', range: '95-100%', status: 'normal', icon: '🫁' }
  ];

  const sleepData = [
    { label: 'Sleep Duration', value: '7h 23m', target: '8h', progress: 92 },
    { label: 'Deep Sleep', value: '1h 45m', target: '2h', progress: 87 },
    { label: 'REM Sleep', value: '2h 12m', target: '2h', progress: 106 },
    { label: 'Sleep Quality', value: '85%', target: '90%', progress: 94 }
  ];

  const connectedDevices = [
    { name: 'Apple Watch Series 9', type: 'Smartwatch', status: 'connected', lastSync: '2 min ago', icon: '⌚' },
    { name: 'Fitbit Charge 5', type: 'Fitness Tracker', status: 'connected', lastSync: '5 min ago', icon: '📱' },
    { name: 'Withings Scale', type: 'Smart Scale', status: 'connected', lastSync: '1 hour ago', icon: '⚖️' },
    { name: 'Oura Ring', type: 'Sleep Tracker', status: 'disconnected', lastSync: '2 days ago', icon: '💍' }
  ];

  const nutritionData = [
    { label: 'Calories', consumed: 1850, target: 2000, unit: 'kcal', color: 'emerald' },
    { label: 'Protein', consumed: 85, target: 120, unit: 'g', color: 'blue' },
    { label: 'Carbs', consumed: 220, target: 250, unit: 'g', color: 'orange' },
    { label: 'Fat', consumed: 65, target: 80, unit: 'g', color: 'purple' }
  ];

  const hydrationData = {
    consumed: 2.1,
    target: 2.5,
    unit: 'L',
    sessions: [
      { time: '07:00', amount: 0.3 },
      { time: '09:30', amount: 0.4 },
      { time: '12:00', amount: 0.5 },
      { time: '15:00', amount: 0.4 },
      { time: '18:00', amount: 0.3 },
      { time: '20:00', amount: 0.2 }
    ]
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  };

  const getProgressColor = (color) => {
    const colors = {
      emerald: 'bg-emerald-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500'
    };
    return colors[color] || 'bg-emerald-500';
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Health Data</h2>
        <div className="flex space-x-2">
          {['day', 'week', 'month'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Body Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Body Metrics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {bodyMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg sm:text-2xl">{metric.icon}</span>
                <span className="text-xs sm:text-sm">{getTrendIcon(metric.trend)}</span>
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">{metric.label}</div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className={`text-xs sm:text-sm ${getTrendColor(metric.trend)}`}>
                {metric.change} this week
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vital Signs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Vital Signs</h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {vitalSigns.map((vital, index) => (
            <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl sm:text-3xl">{vital.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-600">{vital.label}</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">{vital.value}</div>
                <div className="text-xs text-gray-500">Normal range: {vital.range}</div>
              </div>
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                vital.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {vital.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep & Nutrition Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sleep Data */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sleep Analysis</h3>
            <span className="text-2xl">😴</span>
          </div>
          <div className="space-y-4">
            {sleepData.map((sleep, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{sleep.label}</span>
                  <span className="text-sm text-gray-500">{sleep.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(sleep.progress, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">Target: {sleep.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Intake */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Nutrition Intake</h3>
            <span className="text-2xl">🍎</span>
          </div>
          <div className="space-y-4">
            {nutritionData.map((nutrition, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{nutrition.label}</span>
                  <span className="text-sm text-gray-500">
                    {nutrition.consumed}/{nutrition.target} {nutrition.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(nutrition.color)}`}
                    style={{ width: `${Math.min((nutrition.consumed / nutrition.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round((nutrition.consumed / nutrition.target) * 100)}% of daily goal
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hydration Tracking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Hydration Tracking</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl">💧</span>
            <span className="text-sm text-gray-600">
              {hydrationData.consumed}L / {hydrationData.target}L
            </span>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
            <div 
              className="bg-cyan-500 h-3 sm:h-4 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((hydrationData.consumed / hydrationData.target) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 mt-2">
            {Math.round((hydrationData.consumed / hydrationData.target) * 100)}% of daily goal
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2">
          {hydrationData.sessions.map((session, index) => (
            <div key={index} className="text-center">
              <div className="bg-cyan-100 rounded-lg p-1 sm:p-2 mb-1">
                <div className="text-xs text-cyan-800">{session.time}</div>
                <div className="text-xs sm:text-sm font-bold text-cyan-600">{session.amount}L</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Devices */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Devices</h3>
        <div className="space-y-3">
          {connectedDevices.map((device, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{device.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{device.name}</div>
                  <div className="text-xs text-gray-500">{device.type}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  device.status === 'connected' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-1 ${
                    device.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  {device.status}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Last sync: {device.lastSync}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthDataTab; 