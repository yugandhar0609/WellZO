import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

const Home = () => {
  const features = [
    {
      title: "Smart Meal Planning",
      description: "AI-generated meal plans based on your preferences, allergies, and nutritional goals.",
      icon: "fa-utensils",
    },
    {
      title: "Workout Analytics",
      description: "Track your workouts and get AI-powered insights to optimize your fitness routine.",
      icon: "fa-dumbbell",
    },
    {
      title: "Health Monitoring",
      description: "Monitor vital health metrics and receive personalized recommendations.",
      icon: "fa-heart",
    },
  ];

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Personal AI Health Coach Available 24/7
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Experience personalized nutrition advice, workout plans, and health tracking powered by advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 text-center"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/how-it-works"
                  className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://placehold.co/600x400"
                alt="AI Health Coach Dashboard"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Smart Features for Your Health Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <i className={`fas ${feature.icon} text-emerald-600 text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Health Journey?</h2>
          <p className="text-emerald-100 mb-8 text-lg">Join thousands of users who have already achieved their health goals.</p>
          <Link
            to="/register"
            className="bg-white text-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HealthAI Coach</h3>
            <p className="text-gray-400">Your personal AI-powered health companion available 24/7.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Meal Planning</li>
              <li>Workout Tracking</li>
              <li>Health Analytics</li>
              <li>AI Coaching</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-instagram"></i>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
