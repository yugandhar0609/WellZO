import React from 'react';

const TestPage = () => {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold text-green-600">Test Page Working!</h1>
      <p className="mt-4 text-gray-700">If you can see this, routing is working correctly.</p>
      <div className="mt-6 space-y-2">
        <a href="/login" className="block text-blue-600 hover:underline">Go to Login</a>
        <a href="/community" className="block text-blue-600 hover:underline">Go to Community</a>
        <a href="/dashboard" className="block text-blue-600 hover:underline">Go to Dashboard</a>
      </div>
    </div>
  );
};

export default TestPage; 