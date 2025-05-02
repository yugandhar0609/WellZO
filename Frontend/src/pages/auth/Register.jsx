import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../../assets/login background.jpg'; // Use the same background as Login
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin
import { loginWithGoogle, initiateRegistration, verifyOtp } from '../../interceptor/services'; // Import updated services

const Register = () => {
  const navigate = useNavigate();
  const [registrationStep, setRegistrationStep] = useState('details'); // 'details' or 'otp'
  const [formData, setFormData] = useState({
    name: '', // Changed from firstName, lastName
    email: '',
    password: '',
    confirmPassword: '', // Added confirm password
    terms: false
  });
  const [otp, setOtp] = useState(''); // State for OTP input

  const [error, setError] = useState(''); // Add state for error handling
  const [infoMessage, setInfoMessage] = useState(''); // For messages like "OTP sent"
  const [isLoading, setIsLoading] = useState(false); // For email/pass form
  const [isOtpLoading, setIsOtpLoading] = useState(false); // For OTP form
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // For Google button

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOtpChange = (e) => {
    // Allow only digits and limit length (e.g., 6 digits)
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  // Handle Google Login Success (Registration context)
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log("Google Login/Register Success:", credentialResponse);
    setIsGoogleLoading(true);
    setError('');
    setInfoMessage('');
    try {
      const backendResponse = await loginWithGoogle(credentialResponse);
      console.log("Backend Response (Google Register/Login):", backendResponse);

      if (backendResponse && backendResponse.token) {
        localStorage.setItem('token', backendResponse.token);
        if (backendResponse.isProfileComplete === false) {
           console.log('Registration via Google successful, redirecting to user-details');
           navigate('/user-details');
        } else {
           console.log('Login/Registration via Google successful, redirecting to dashboard');
           navigate('/dashboard'); 
        }
      } else {
        setError(backendResponse?.message || 'Google Sign-Up failed. Please try again.');
      }
    } catch (err) {
      console.error("Google sign-up backend call failed:", err);
      setError(err?.message || 'Google Sign-Up failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Handle Google Login Error
  const handleGoogleLoginError = () => {
    console.error("Google Login/Register Failed");
    setError('Google Sign-Up failed. Please try again.');
    setIsGoogleLoading(false); 
  };

  // Step 1: Handle Initial Registration Form Submit
  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    setInfoMessage(''); // Clear previous info messages
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.terms) {
      setError('You must agree to the Terms and Privacy Policy.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      console.log('Initiating registration:', registrationData);
      const backendResponse = await initiateRegistration(registrationData);
      console.log("Backend Response (Initiate Register):", backendResponse);

      // Assuming backend returns a success message if OTP was sent
      if (backendResponse && backendResponse.success) { 
        setInfoMessage(`An OTP has been sent to ${formData.email}. Please check your inbox.`);
        setRegistrationStep('otp'); // Move to OTP step
      } else {
         setError(backendResponse?.message || 'Failed to send OTP. Please try again.');
      }

    } catch (err) {
      console.error("Registration initiation failed:", err);
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle OTP Verification Submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) { // Basic OTP validation
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setError('');
    setInfoMessage('');
    setIsOtpLoading(true);

    try {
      console.log(`Verifying OTP ${otp} for email ${formData.email}`);
      const backendResponse = await verifyOtp(formData.email, otp);
      console.log("Backend Response (Verify OTP):", backendResponse);

      // Handle successful verification
      // Option A: Backend returns token for auto-login
      if (backendResponse && backendResponse.token) {
        localStorage.setItem('token', backendResponse.token);
        console.log('OTP verified successfully, logged in. Redirecting to user-details...');
        // Redirect to user-details as user is newly registered
        navigate('/user-details'); 
      } 
      // Option B: Backend confirms verification, redirect to login
      // else if (backendResponse && backendResponse.success) {
      //   console.log('OTP verified successfully. Redirecting to login...');
      //   navigate('/login');
      // }
      else {
        // Handle cases where backend confirms verification but doesn't provide token (if applicable)
         console.log('OTP verified successfully. Redirecting to login...');
         navigate('/login'); // Default to login if no token
         // setError('OTP verified, but login failed. Please try logging in.');
      }

    } catch (err) {
      console.error("OTP verification failed:", err);
      setError(err?.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setIsOtpLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-end pr-4 md:pr-16 lg:pr-32"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-[450px] transform transition-all">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
          {/* Conditional Header */} 
           <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {registrationStep === 'details' ? 'Create Your Account' : 'Verify Your Email'}
            </h2>
            <p className="text-gray-500 mt-2">
              {registrationStep === 'details' 
                ? 'Start your wellness transformation' 
                : `Enter the code sent to ${formData.email}`}
            </p>
          </div>

          {/* Info Message (e.g., for OTP sent) */} 
          {infoMessage && (
             <div className="mb-6 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm rounded">
               {infoMessage}
             </div>
          )}

          {/* Error Message */} 
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
          
           {/* --- Step 1: Registration Details Form --- */} 
          {registrationStep === 'details' && (
            <form onSubmit={handleSubmitDetails} className="space-y-5">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name" // Changed name
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white disabled:opacity-70"
                    placeholder="Enter your full name"
                    required
                    disabled={isLoading || isGoogleLoading}
                  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white disabled:opacity-70"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white disabled:opacity-70"
                  placeholder="Create a password"
                  required
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword" // Added name
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white disabled:opacity-70"
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 transition-colors flex-shrink-0 disabled:opacity-70"
                  required
                  disabled={isLoading || isGoogleLoading}
                />
                <label htmlFor="terms" className={`ml-2 text-sm text-gray-600 ${(isLoading || isGoogleLoading) ? 'opacity-70' : ''}`}>
                  I agree to the <Link to="/terms" className={`font-medium text-emerald-600 hover:text-emerald-700 ${(isLoading || isGoogleLoading) ? 'pointer-events-none' : ''}`}>Terms</Link> and{' '}
                  <Link to="/privacy" className={`font-medium text-emerald-600 hover:text-emerald-700 ${(isLoading || isGoogleLoading) ? 'pointer-events-none' : ''}`}>Privacy Policy</Link>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading} 
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                   <span className="flex items-center justify-center"> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> Sending OTP... </span>
                ) : 'Continue & Verify Email'} 
              </button>

              {/* Separator */} 
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              {/* Google Sign Up Button */} 
              <div className="flex justify-center">
                <div className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                      theme="outline" 
                      size="large" 
                      width="380px" 
                    />
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className={`font-semibold text-emerald-600 hover:text-emerald-700 transition-colors ${(isLoading || isGoogleLoading) ? 'pointer-events-none opacity-50' : ''}`}
                >
                  Sign in
                </Link>
              </p>
            </form>
          )} 
          {/* --- End Step 1 Form --- */} 

           {/* --- Step 2: OTP Verification Form --- */} 
           {registrationStep === 'otp' && (
             <form onSubmit={handleOtpSubmit} className="space-y-6">
               <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1.5">Verification Code</label>
                  <input
                    type="text" // Use text to allow pasting, validation handles digits
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-center text-lg tracking-[0.5em] font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white disabled:opacity-70"
                    placeholder="------"
                    maxLength="6"
                    required
                    disabled={isOtpLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isOtpLoading}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isOtpLoading ? (
                    <span className="flex items-center justify-center"> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> Verifying... </span>
                  ) : 'Verify Code'}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Didn't receive the code? 
                  {/* TODO: Add Resend OTP functionality */}
                  <button type="button" className="font-medium text-emerald-600 hover:text-emerald-700 ml-1 disabled:opacity-50" disabled={isOtpLoading}>
                    Resend
                  </button>
                </p>

                 <p className="mt-4 text-center text-sm text-gray-600">
                    <button 
                       type="button" 
                       onClick={() => { setRegistrationStep('details'); setError(''); setInfoMessage(''); }} 
                       className="font-semibold text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                       disabled={isOtpLoading}
                     >
                       &larr; Back to details
                    </button>
                 </p>
             </form>
           )}
           {/* --- End Step 2 Form --- */} 

        </div>
      </div>
    </div>
  );
};

export default Register; 
