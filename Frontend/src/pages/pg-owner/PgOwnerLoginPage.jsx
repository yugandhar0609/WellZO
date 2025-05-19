import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth'; // Placeholder if you adapt useAuth for PG owners

const PgOwnerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const { login } = useAuth(); // Or a new pgOwnerLogin function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // --- MOCK LOGIN --- 
    // In a real app, call your backend API here to authenticate the PG owner
    console.log('Attempting PG Owner Login with:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    if (email === 'owner@example.com' && password === 'password123') {
      console.log('PG Owner Mock Login Successful');
      // Mock successful login: store a mock token/user data if needed for PgOwnerLayout
      // For now, just navigate to the dashboard
      navigate('/pg-owner/dashboard');
    } else {
      setError('Invalid PG owner credentials. Please try again.');
    }
    // --- END MOCK LOGIN ---
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          {/* You can replace this with the Wellzo logo if you have one */}
          <svg className="h-12 w-auto text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-1.5m-15-13.5H18M3.75 7.5h16.5M3.75 7.5V3.545M3.75 7.5A2.25 2.25 0 011.5 5.25V3A2.25 2.25 0 013.75.75h16.5A2.25 2.25 0 0122.5 3v2.25a2.25 2.25 0 01-2.25 2.25M16.5 7.5V21" />
          </svg>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          PG Owner Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your PG Management Dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Your password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              >
                {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to Wellzo PG Partnership?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/pg-partnership/register"
                className="w-full flex justify-center py-3 px-4 border border-emerald-500 rounded-md shadow-sm text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition duration-150 ease-in-out"
              >
                Register your PG here
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-gray-500">
        Wellzo PG Partnership Program &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default PgOwnerLoginPage; 