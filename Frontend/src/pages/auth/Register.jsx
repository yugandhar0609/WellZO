import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Form submitted:', formData);
    // After successful registration, redirect to user details page
    navigate('/user-details');
  };

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Registration Section */}
      <section className="min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600">Start your health transformation journey today</p>
              </div>

              {/* Social Sign Up Buttons */}
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

              {/* Registration Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
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
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">Terms of Service</Link> and{' '}
                    <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</Link>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Right Side - Benefits */}
            <div className="hidden md:block">
              <div className="bg-emerald-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Join HealthAI Coach?</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-robot text-emerald-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">24/7 AI Health Coach</h4>
                      <p className="text-gray-600">Get personalized guidance anytime, anywhere</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-chart-line text-emerald-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Track Your Progress</h4>
                      <p className="text-gray-600">Monitor your health journey with detailed analytics</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-users text-emerald-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Join the Community</h4>
                      <p className="text-gray-600">Connect with others on similar health journeys</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register; 
