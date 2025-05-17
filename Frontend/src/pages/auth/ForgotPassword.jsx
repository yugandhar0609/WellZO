import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../../assets/login background.jpg'; // Assuming same background
import { requestPasswordResetOtp, confirmPasswordReset } from '../../interceptor/services'; // UNCOMMENTED

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 for email input, 2 for OTP and new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setIsLoading(true);
    try {
      const response = await requestPasswordResetOtp(email); // USING REAL API CALL
      if (response.success) {
        setInfoMessage(response.message || 'OTP sent to your email if it exists.');
        setStep(2);
      } else {
        setError(response.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      // This catch block might be redundant if requestPasswordResetOtp always returns a structured error
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }
    setError('');
    setInfoMessage('');
    setIsLoading(true);
    try {
      const response = await confirmPasswordReset(email, otp, newPassword); // USING REAL API CALL
      if (response.success) {
        setInfoMessage(response.message || 'Password reset successfully! Please log in.');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login
      } else {
        let errorMessage = response.message || 'Failed to reset password. Invalid OTP or other error.';
        if (response.errors) {
            // Construct a more detailed error message if backend provides specific field errors
            const fieldErrors = Object.values(response.errors).flat().join(' ');
            if (fieldErrors) errorMessage = fieldErrors;
        }
        setError(errorMessage);
      }
    } catch (err) {
      // This catch block might be redundant
      setError(err.message || 'An error occurred. Please try again.');
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
              {step === 1 ? 'Forgot Password' : 'Reset Your Password'}
            </h2>
            <p className="text-gray-500 mt-2">
              {step === 1 ? 'Enter your email to receive a reset code.' : `Enter the OTP sent to ${email} and your new password.`}
            </p>
          </div>

          {infoMessage && (
            <div className="mb-6 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded">
              {infoMessage}
            </div>
          )}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Enter your registered email"
                  required
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
              <p className="text-center text-sm">
                <Link to="/login" className="text-emerald-600 hover:text-emerald-700">
                  &larr; Back to Login
                </Link>
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Enter OTP from email"
                  maxLength="6"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Enter new password"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Confirm new password"
                  required
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
               <p className="text-center text-sm">
                <button 
                    type="button" 
                    onClick={() => { setStep(1); setError(''); setInfoMessage(''); setEmail(''); setOtp(''); setNewPassword(''); setConfirmNewPassword('');}}
                    className="text-emerald-600 hover:text-emerald-700"
                    disabled={isLoading}
                >
                  &larr; Back to email entry
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 