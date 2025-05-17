import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../../assets/login background.jpg';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle, loginWithEmailPassword } from '../../interceptor/services';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    setIsGoogleLoading(true);
    setError('');
    try {
      const backendResponse = await loginWithGoogle(credentialResponse);
      console.log("Backend Response (Google):", backendResponse);

      if (backendResponse.success) {
        setInfoMessage(backendResponse.message);
        
        // Redirect based on profile completion
        if (!backendResponse.isProfileComplete) {
          console.log('Google login successful, redirecting to user-details');
          navigate('/user-details');
        } else {
          console.log('Google login successful, redirecting to dashboard');
          navigate('/dashboard');
        }
      } else {
        setError(backendResponse.message || 'Google Login failed. Please try again.');
      }
    } catch (err) {
      console.error("Google login backend call failed:", err);
      setError(err.message || 'Google login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
    setError('Google login failed. Please try again.');
    setIsGoogleLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const backendResponse = await loginWithEmailPassword(formData.email, formData.password);
      console.log("Backend Response (Email/Pass):", backendResponse);

      if (backendResponse.success) {
        // Store tokens and user data
        localStorage.setItem('tokens', JSON.stringify(backendResponse.tokens));
        localStorage.setItem('user', JSON.stringify(backendResponse.user));
        
        // Check if profile is complete by checking required fields
        const profile = backendResponse.profile;
        const isProfileComplete = profile && 
          profile.full_name && 
          profile.age && 
          profile.gender && 
          profile.nationality && 
          profile.state && 
          profile.city;

        if (!isProfileComplete) {
          console.log('Login successful, redirecting to user-details');
          navigate('/user-details');
        } else {
          console.log('Login successful, redirecting to dashboard');
          navigate('/dashboard');
        }
      } else {
        setError(backendResponse?.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error("Email/Password login failed:", err);
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-end pr-4 md:pr-16 lg:pr-32"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-[400px] transform transition-all">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">Sign in to continue your wellness journey</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 transition-colors"
                  disabled={isLoading || isGoogleLoading}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <Link 
                to="/forgot-password" 
                className={`text-sm text-emerald-600 hover:text-emerald-700 transition-colors ${(isLoading || isGoogleLoading) ? 'pointer-events-none opacity-50' : ''}`}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                theme="outline"
                size="large"
                width="330px"
              />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className={`font-semibold text-emerald-600 hover:text-emerald-700 transition-colors ${(isLoading || isGoogleLoading) ? 'pointer-events-none opacity-50' : ''}`}
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
