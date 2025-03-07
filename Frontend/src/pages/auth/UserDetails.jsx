import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Basic Info
    nationality: '',
    state: '',
    language: '',
    profession: '',
    age: '',
    gender: '',
    height: '',
    weight: '',

    // Lifestyle
    activityLevel: '',
    favoriteActivities: [],
    wakeUpTime: '',
    bedTime: '',
    dietaryPreferences: [],

    // Health
    medicalConditions: [],
    allergies: '',

    // Goals
    primaryGoal: '',
    goalDetails: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    // Validate required fields
    const requiredFields = {
      nationality: 'Nationality',
      state: 'State/Region',
      age: 'Age',
      gender: 'Gender'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Save user details to localStorage
    try {
      // For testing, create a mock user if none exists
      const mockUser = {
        userId: 'test-user',
        email: 'test@example.com'
      };

      // Combine user data with profile data
      const completeProfile = {
        ...formData,
        ...mockUser
      };

      console.log('Saving profile data:', completeProfile);
      localStorage.setItem('userProfile', JSON.stringify(completeProfile));
      localStorage.setItem('user', JSON.stringify(mockUser)); // Save mock user data
      console.log('Profile data saved successfully');
      
      // Navigate to dashboard after successful save
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('There was an error saving your profile. Please try again.');
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // If we're on the last step, submit the form
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="fixed top-0 w-full bg-white shadow-sm z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-emerald-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-600">Profile Completion</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Tell us about yourself</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                      <select 
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        required
                      >
                        <option value="">Select nationality</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="in">India</option>
                        <option value="au">Australia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State/Region</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Lifestyle */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Lifestyle</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {['Sedentary', 'Light', 'Moderate', 'Very Active'].map((level) => (
                          <label key={level} className="relative flex flex-col items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="activityLevel"
                              value={level.toLowerCase()}
                              checked={formData.activityLevel === level.toLowerCase()}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`p-2 rounded-full ${formData.activityLevel === level.toLowerCase() ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                              <i className={`fas ${level === 'Sedentary' ? 'fa-couch' : level === 'Light' ? 'fa-walking' : level === 'Moderate' ? 'fa-running' : 'fa-dumbbell'} text-2xl ${formData.activityLevel === level.toLowerCase() ? 'text-emerald-600' : 'text-gray-600'}`}></i>
                            </div>
                            <span className="mt-2 font-medium">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Daily Schedule</label>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Wake-up Time</label>
                          <input
                            type="time"
                            name="wakeUpTime"
                            value={formData.wakeUpTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Bedtime</label>
                          <input
                            type="time"
                            name="bedTime"
                            value={formData.bedTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Health Background */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Health Background</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any pre-existing medical conditions?</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid'].map((condition) => (
                          <label key={condition} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="checkbox"
                              name="medicalConditions"
                              value={condition.toLowerCase()}
                              checked={formData.medicalConditions.includes(condition.toLowerCase())}
                              onChange={handleChange}
                              className="rounded border-gray-300 text-emerald-600 mr-3"
                            />
                            <span>{condition}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Any allergies?</label>
                      <input
                        type="text"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="Enter allergies (if any)"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Goals */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Health Goals</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">What's your primary goal?</label>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { name: 'Weight Loss', icon: 'weight' },
                          { name: 'Muscle Gain', icon: 'dumbbell' },
                          { name: 'Overall Health', icon: 'heart' }
                        ].map((goal) => (
                          <label key={goal.name} className="relative flex flex-col items-center p-6 border rounded-xl cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="primaryGoal"
                              value={goal.name.toLowerCase().replace(' ', '-')}
                              checked={formData.primaryGoal === goal.name.toLowerCase().replace(' ', '-')}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`p-3 rounded-full ${formData.primaryGoal === goal.name.toLowerCase().replace(' ', '-') ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                              <i className={`fas fa-${goal.icon} text-3xl ${formData.primaryGoal === goal.name.toLowerCase().replace(' ', '-') ? 'text-emerald-600' : 'text-gray-600'}`}></i>
                            </div>
                            <span className="mt-2 font-medium">{goal.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Describe your goal in detail</label>
                      <textarea
                        name="goalDetails"
                        value={formData.goalDetails}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        placeholder="What would you like to achieve?"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 rounded-lg border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors ml-auto"
                >
                  {currentStep === totalSteps ? 'Complete Profile' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails; 