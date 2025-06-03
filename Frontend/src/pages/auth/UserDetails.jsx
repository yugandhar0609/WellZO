import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../../interceptor/services';
import { useAuth } from '../../hooks/useAuth';

const UserDetails = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Basic Info
    full_name: '',
    nationality: '',
    state: '',
    city: '',
    language: '',
    age: '',
    gender: '',
    date_of_birth: '',
    location: '',
    bio: '',

    // Lifestyle
    activityLevel: '',
    favoriteActivities: [],
    dietaryPreferences: [],

    // Health
    medicalConditions: [],
    allergies: '',

    // Goals
    primaryGoal: '',
    goalDetails: ''
  });

  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError('');
      setInfoMessage('');
      const response = await getUserProfile();
      if (response.success && response.data) {
        const profile = response.data;
        setFormData(prev => ({
          ...prev,
          full_name: profile.full_name || '',
          nationality: profile.nationality || '',
          state: profile.state || '',
          city: profile.city || '',
          language: profile.preferred_language || '',
          age: profile.age?.toString() || '',
          gender: profile.gender || '',
          date_of_birth: profile.date_of_birth || '',
          location: profile.location || '',
          bio: profile.bio || '',
        }));
      } else if (!response.success) {
        console.warn("Could not load profile. A new profile will be created on save.", response.message);
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setInfoMessage('');

    if (currentStep === totalSteps) {
      if (!formData.full_name) {
        setError('Full name is required.');
        setCurrentStep(1);
        return;
      }
      if (!formData.age || parseInt(formData.age, 10) <= 0) {
        setError('Please enter a valid age.');
        setCurrentStep(1);
        return;
      }
      if (!formData.gender) {
        setError('Please select your gender.');
        setCurrentStep(1);
        return;
      }
    }

    setIsLoading(true);

    let consolidatedBio = formData.bio;
    if (formData.activityLevel) consolidatedBio += `\nActivity Level: ${formData.activityLevel}`;
    if (formData.allergies) consolidatedBio += `\nAllergies: ${formData.allergies}`;
    if (formData.primaryGoal) consolidatedBio += `\nPrimary Goal: ${formData.primaryGoal}`;
    if (formData.goalDetails) consolidatedBio += `\nGoal Details: ${formData.goalDetails}`;
    if (formData.dietaryPreferences.length > 0) consolidatedBio += `\nDietary Preferences: ${formData.dietaryPreferences.join(', ')}`;
    if (formData.medicalConditions.length > 0) consolidatedBio += `\nMedical Conditions: ${formData.medicalConditions.join(', ')}`;

    const profilePayload = {
      full_name: formData.full_name,
      nationality: formData.nationality,
      state: formData.state,
      city: formData.city,
      preferred_language: formData.language,
      age: formData.age ? parseInt(formData.age, 10) : null,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth || null,
      location: formData.location,
      bio: consolidatedBio.trim(),
    };

    try {
      const response = await updateUserProfile(profilePayload);
      if (response.success) {
        setInfoMessage(response.message || 'Profile updated successfully!');
        localStorage.setItem('isProfileComplete', 'true');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(response.message || 'Failed to update profile. Please check the details.');
      }
    } catch (err) {
      console.error('Error submitting profile:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.full_name) { setError('Full name is required.'); return; }
      if (!formData.age || parseInt(formData.age, 10) <= 0) { setError('Valid age is required.'); return; }
      if (!formData.gender) { setError('Gender is required.'); return; }
    }
    setError('');

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Handler for deleting account
  const handleDeleteAccount = async () => {
    setError('');
    setInfoMessage('');

    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible and all your data will be lost."
    );

    if (isConfirmed) {
      setIsLoading(true);
      try {
        const response = await deleteUserAccount();
        if (response.success) {
          setInfoMessage(response.message || "Account deleted successfully. Logging you out...");
          logout(); // Call logout from useAuth hook
          // No need to navigate here, useAuth's logout already handles navigation to /login
        } else {
          setError(response.message || "Failed to delete account. Please try again.");
        }
      } catch (err) {
        console.error('Error deleting account:', err);
        setError("An unexpected error occurred while deleting your account. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {isLoading && (
            <div className="mb-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700 text-sm rounded">
              Processing...
            </div>
          )}
          {infoMessage && (
            <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 text-sm rounded">
              {infoMessage}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {currentStep === 1 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Tell us about yourself</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                      <select 
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                      >
                        <option value="">Select nationality</option>
                        <option value="Indian">Indian</option>
                        <option value="American">American</option>
                        <option value="British">British</option>
                        <option value="Australian">Australian</option>
                        <option value="Canadian">Canadian</option>
                        <option value="Other">Other</option>
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
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender <span className="text-red-500">*</span></label>
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
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                      <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        placeholder="e.g., English, Spanish"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location (e.g. Country)</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        placeholder="e.g., USA, India"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Short Bio (Other details from next steps will be added here)</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        placeholder="A little about yourself... Other details like activity level, allergies, goals will be appended here if not stored separately."
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Lifestyle</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {['Sedentary', 'Light', 'Moderate', 'Very Active'].map((level) => (
                          <label key={level} className={`relative flex flex-col items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 ${formData.activityLevel === level.toLowerCase() ? 'border-emerald-500 ring-2 ring-emerald-500' : 'border-gray-300'}`}>
                            <input
                              type="radio"
                              name="activityLevel"
                              value={level.toLowerCase()}
                              checked={formData.activityLevel === level.toLowerCase()}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`p-2 rounded-full ${formData.activityLevel === level.toLowerCase() ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                              <span className={`text-2xl ${formData.activityLevel === level.toLowerCase() ? 'text-emerald-600' : 'text-gray-600'}`}>{level.charAt(0)}</span> 
                            </div>
                            <span className="mt-2 font-medium">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences (select multiple)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low-Carb'].map((preference) => (
                          <label key={preference} className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${formData.dietaryPreferences.includes(preference.toLowerCase()) ? 'border-emerald-500 ring-2 ring-emerald-500' : 'border-gray-300'}`}>
                            <input
                              type="checkbox"
                              name="dietaryPreferences"
                              value={preference.toLowerCase()}
                              checked={formData.dietaryPreferences.includes(preference.toLowerCase())}
                              onChange={handleChange}
                              className="form-checkbox rounded h-5 w-5 text-emerald-600 border-gray-300 focus:ring-emerald-500 mr-3"
                            />
                            <span>{preference}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Health Background</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pre-existing medical conditions (select multiple)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 'None'].map((condition) => (
                          <label key={condition} className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${formData.medicalConditions.includes(condition.toLowerCase()) ? 'border-emerald-500 ring-2 ring-emerald-500' : 'border-gray-300'}`}>
                            <input
                              type="checkbox"
                              name="medicalConditions"
                              value={condition.toLowerCase()}
                              checked={formData.medicalConditions.includes(condition.toLowerCase())}
                              onChange={handleChange}
                              className="form-checkbox rounded h-5 w-5 text-emerald-600 border-gray-300 focus:ring-emerald-500 mr-3"
                            />
                            <span>{condition}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                      <input
                        type="text"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="e.g., Peanuts, Shellfish, None"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Health Goals</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
                      <div className="grid md:grid-cols-3 gap-4">
                        {['Weight Loss', 'Muscle Gain', 'Overall Health', 'Improve Stamina', 'Reduce Stress'].map((goal) => (
                          <label key={goal} className={`relative flex flex-col items-center p-6 border rounded-xl cursor-pointer hover:bg-gray-50 ${formData.primaryGoal === goal.toLowerCase().replace(/\s+/g, '-') ? 'border-emerald-500 ring-2 ring-emerald-500' : 'border-gray-300'}`}>
                            <input
                              type="radio"
                              name="primaryGoal"
                              value={goal.toLowerCase().replace(/\s+/g, '-')}
                              checked={formData.primaryGoal === goal.toLowerCase().replace(/\s+/g, '-')}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`p-3 rounded-full ${formData.primaryGoal === goal.toLowerCase().replace(/\s+/g, '-') ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                              <span className={`text-3xl ${formData.primaryGoal === goal.toLowerCase().replace(/\s+/g, '-') ? 'text-emerald-600' : 'text-gray-600'}`}>{goal.substring(0,2)}</span>
                            </div>
                            <span className="mt-2 font-medium text-center">{goal}</span>
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
                        placeholder="What would you like to achieve? Be specific."
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 rounded-lg border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Previous
                  </button>
                )}
                <div className="flex-grow"></div>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isLoading}
                  className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors ml-auto disabled:opacity-50"
                >
                  {isLoading ? (currentStep === totalSteps ? 'Saving Profile...' : 'Processing...') : (currentStep === totalSteps ? 'Complete Profile & View Dashboard' : 'Next Step')}
                </button>
              </div>

              {/* Delete Account Section */}
              {currentStep === totalSteps && (
                <div className="mt-12 pt-8 border-t border-dashed border-gray-300">
                  <h3 className="text-xl font-semibold text-red-600 mb-3">Danger Zone</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Deleting your account will remove all your personal information and data permanently. 
                    This action cannot be undone.
                  </p>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className="w-full md:w-auto px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition ease-in-out duration-150"
                  >
                    {isLoading ? 'Deleting...' : 'Delete My Account'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails; 