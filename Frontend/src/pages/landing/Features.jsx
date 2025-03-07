import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

const Features = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            World's First AI-Powered Health Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience personalized health coaching powered by advanced artificial intelligence, designed to understand and adapt to your unique needs.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* AI Health Coach Feature */}
          <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-robot text-emerald-600 text-3xl"></i>
                </div>
                <h2 className="text-3xl font-bold mb-4">AI-Powered Personal Health Coach</h2>
                <p className="text-gray-600 mb-6">
                  Our advanced AI agent provides 24/7 personalized coaching, offering:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Real-time health insights and recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Adaptive coaching based on your progress</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Natural language interaction for seamless communication</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img src="https://placehold.co/600x400" alt="AI Coach Interface" className="rounded-xl shadow-lg w-full" />
            </div>
          </div>

          {/* Health Analysis Feature */}
          <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://placehold.co/600x400" alt="Health Analysis Dashboard" className="rounded-xl shadow-lg w-full" />
            </div>
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-chart-line text-emerald-600 text-3xl"></i>
                </div>
                <h2 className="text-3xl font-bold mb-4">Comprehensive Health Analysis</h2>
                <p className="text-gray-600 mb-6">
                  Our AI analyzes your health data to create personalized recommendations:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Detailed health report cards</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Age-specific health insights</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Progress tracking and goal monitoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-emerald-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Health Journey?</h2>
          <p className="text-emerald-100 mb-8 text-lg">Start your personalized AI health coaching experience today.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-white text-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50"
            >
              Start Free Trial
            </Link>
            <Link
              to="/how-it-works"
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-emerald-700"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
