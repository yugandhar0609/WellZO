import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up & Profile Creation",
      description: "Create your account and complete a comprehensive health assessment to help us understand your goals and needs.",
      icon: "fa-user-plus",
    },
    {
      title: "AI Analysis & Planning",
      description: "Our AI analyzes your profile to create personalized workout and nutrition plans tailored to your goals.",
      icon: "fa-brain",
    },
    {
      title: "Daily Guidance & Tracking",
      description: "Get daily recommendations and track your progress with our easy-to-use tools and AI coach.",
      icon: "fa-chart-line",
    },
    {
      title: "Continuous Adaptation",
      description: "Your plan automatically adjusts based on your progress and feedback to ensure optimal results.",
      icon: "fa-sync",
    },
  ];

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How HealthAI Coach Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your journey to better health made simple with our AI-powered coaching system.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <i className={`fas ${step.icon} text-emerald-600 text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Your Journey with HealthAI Coach</h2>
          
          <div className="space-y-24">
            {/* Initial Assessment */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">1. Initial Assessment</h3>
                <p className="text-gray-600 mb-6">
                  Complete a comprehensive health assessment that covers your:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Current fitness level and health status</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Dietary preferences and restrictions</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Health goals and timeline</span>
                  </li>
                </ul>
              </div>
              <div>
                <img src="https://placehold.co/600x400" alt="Assessment Process" className="rounded-xl shadow-lg w-full" />
              </div>
            </div>

            {/* AI Planning */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img src="https://placehold.co/600x400" alt="AI Planning Process" className="rounded-xl shadow-lg w-full" />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-4">2. AI-Powered Planning</h3>
                <p className="text-gray-600 mb-6">
                  Our advanced AI creates your personalized plans:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Custom workout routines based on your fitness level</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Personalized meal plans and nutrition advice</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                    <span>Progress milestones and achievement tracking</span>
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
          <h2 className="text-3xl font-bold text-white mb-6">Start Your Health Journey Today</h2>
          <p className="text-emerald-100 mb-8 text-lg">Join thousands of users who have transformed their lives with HealthAI Coach.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-white text-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50"
            >
              Get Started Now
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-emerald-700"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
