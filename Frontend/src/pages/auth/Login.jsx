import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Add state for error handling
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const checkProfileCompletion = async (userId) => {
    // This would be an API call to your backend
    // For demo, we'll simulate with localStorage
    const userProfile = localStorage.getItem('userProfile');
    console.log('Checking profile:', userProfile);
    return userProfile ? JSON.parse(userProfile) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Here you would typically make an API call to authenticate the user
      console.log('Login attempt with:', formData);
      
      // For demo purposes, we'll simulate a login response
      const mockLoginResponse = {
        success: true,
        userId: '123',
        email: formData.email
      };

      if (mockLoginResponse.success) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(mockLoginResponse));
        console.log('User data saved:', mockLoginResponse);
        
        // Check if profile is complete
        const userProfile = await checkProfileCompletion(mockLoginResponse.userId);
        console.log('Profile check result:', userProfile);
        
        if (userProfile && Object.keys(userProfile).length > 0) {
          console.log('Profile complete, redirecting to dashboard');
          navigate('/dashboard');
        } else {
          console.log('Profile incomplete, redirecting to user-details');
          navigate('/user-details');
        }
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Login Section */}
      <section className="min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-md mx-auto w-full">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Continue your health journey</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {/* Social Login Buttons */}
            <div className="space-y-4 mb-8">
              <button className="w-full py-3 px-4 flex items-center justify-center space-x-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                <span>Continue with Google</span>
              </button>
              <button className="w-full py-3 px-4 flex items-center justify-center space-x-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#1865D9] transition-colors">
                <i className="fab fa-facebook text-xl"></i>
                <span>Continue with Facebook</span>
              </button>
              <button className="w-full py-3 px-4 flex items-center justify-center space-x-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <i className="fab fa-apple text-xl"></i>
                <span>Continue with Apple</span>
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
