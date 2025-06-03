import { useState, useEffect } from "react";
import { message } from "antd";
import { registerEarlyAccess } from "../../interceptor/services";
import Counter from "../../components/Reactbits/Counter";

const EarlyAccess = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    healthGoal: "",
    betaTester: false
  });
  const [loading, setLoading] = useState(false);

  // Define duration constant at the top level
  const FIVE_DAYS_IN_SECONDS = 5 * 24 * 60 * 60 * 1000; // in milliseconds

  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: FIVE_DAYS_IN_SECONDS / 1000
  });

  useEffect(() => {
    // Check if there's a saved end time in localStorage
    let targetEndTime = localStorage.getItem('earlyAccessEndTime');
    
    // If no end time stored or it's in the past, set a new one
    if (!targetEndTime || new Date(parseInt(targetEndTime)) <= new Date()) {
      targetEndTime = new Date().getTime() + FIVE_DAYS_IN_SECONDS;
      localStorage.setItem('earlyAccessEndTime', targetEndTime.toString());
    }
    
    // Function to calculate and update the countdown
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const endTime = parseInt(targetEndTime);
      
      // Calculate remaining time
      let timeRemaining = endTime - now;
      
      // If countdown finished, set a new target 5 days from now
      if (timeRemaining <= 0) {
        const newEndTime = now + FIVE_DAYS_IN_SECONDS;
        localStorage.setItem('earlyAccessEndTime', newEndTime.toString());
        timeRemaining = FIVE_DAYS_IN_SECONDS;
      }
      
      // Convert to days, hours, minutes, seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      const totalSeconds = Math.floor(timeRemaining / 1000);
      
      setCountdown({
        days,
        hours, 
        minutes,
        seconds,
        totalSeconds
      });
    };
    
    // Initial calculation
    calculateTimeRemaining();
    
    // Update countdown every second
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerEarlyAccess(formData);
      message.success("Thank you for signing up! We'll be in touch soon.");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        location: "",
        healthGoal: "",
        betaTester: false
      });
    } catch (error) {
      console.error("Registration error:", error);
      message.error(error.message || "Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="early-access" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">🚀 Get Early Access</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Be among the first to experience Wellzo.ai and get 6 months free premium access!</p>
          
          {/* Early Access Form */}
          <form id="earlyAccessForm" className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name" 
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name" 
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" 
                  required 
                />
              </div>
            </div>
            <div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address" 
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" 
                required 
              />
            </div>
            <div>
              <input 
                type="tel" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number" 
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" 
                required 
              />
            </div>
            <div>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location" 
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" 
                required 
              />
            </div>
            <div>
              <select 
                name="healthGoal"
                value={formData.healthGoal}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" 
                required
              >
                <option value="">What&apos;s your primary health goal?</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="healthy-eating">Healthy Eating</option>
                <option value="meal-planning">Better Meal Planning</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-start">
              <input 
                type="checkbox" 
                id="beta" 
                name="betaTester"
                checked={formData.betaTester}
                onChange={handleInputChange}
                className="mt-1" 
              />
              <label htmlFor="beta" className="ml-2 text-sm text-gray-600">I&apos;m interested in being a beta tester and providing feedback</label>
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Processing..." : "Join Early Access Waitlist"}
            </button>
          </form>

          {/* Benefits List */}
          <div className="mt-6 sm:mt-8 text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Early Access Benefits:</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-center text-gray-600">
                <i className="fas fa-check-circle text-primary-600 mr-2"></i>
                3 months free premium access
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fas fa-check-circle text-primary-600 mr-2"></i>
                Priority onboarding support
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fas fa-check-circle text-primary-600 mr-2"></i>
                Exclusive early access to new features
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fas fa-check-circle text-primary-600 mr-2"></i>
                Direct access to founding team
              </li>
            </ul>
          </div>

          {/* Countdown Timer */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Early Access Spots Limited! Closing in:</p>
            <div className="flex justify-center space-x-3 sm:space-x-4 flex-wrap">
              <div className="bg-primary-50 px-3 sm:px-4 py-2 rounded-lg shadow">
                <div className="flex flex-col items-center">
                  <Counter
                    value={countdown.days}
                    places={countdown.days >= 100 ? [100, 10, 1] : (countdown.days >= 10 ? [10, 1] : [1])}
                    fontSize={28}
                    padding={2}
                    gap={2}
                    textColor="#2563EB"
                    fontWeight={700}
                    gradientFrom="rgba(229, 231, 235, 0.8)"
                    gradientTo="transparent"
                    gradientHeight={10}
                  />
                  <span className="text-xs mt-1 text-gray-600">days</span>
                </div>
              </div>
              <div className="bg-primary-50 px-3 sm:px-4 py-2 rounded-lg shadow">
                <div className="flex flex-col items-center">
                  <Counter
                    value={countdown.hours}
                    places={[10, 1]}
                    fontSize={28}
                    padding={2}
                    gap={2}
                    textColor="#2563EB"
                    fontWeight={700}
                    gradientFrom="rgba(229, 231, 235, 0.8)"
                    gradientTo="transparent"
                    gradientHeight={10}
                  />
                  <span className="text-xs mt-1 text-gray-600">hours</span>
                </div>
              </div>
              <div className="bg-primary-50 px-3 sm:px-4 py-2 rounded-lg shadow">
                <div className="flex flex-col items-center">
                  <Counter
                    value={countdown.minutes}
                    places={[10, 1]}
                    fontSize={28}
                    padding={2}
                    gap={2}
                    textColor="#2563EB"
                    fontWeight={700}
                    gradientFrom="rgba(229, 231, 235, 0.8)"
                    gradientTo="transparent"
                    gradientHeight={10}
                  />
                  <span className="text-xs mt-1 text-gray-600">minutes</span>
                </div>
              </div>
              <div className="bg-primary-50 px-3 sm:px-4 py-2 rounded-lg shadow">
                <div className="flex flex-col items-center">
                  <Counter
                    value={countdown.seconds}
                    places={[10, 1]}
                    fontSize={28}
                    padding={2}
                    gap={2}
                    textColor="#2563EB"
                    fontWeight={700}
                    gradientFrom="rgba(229, 231, 235, 0.8)"
                    gradientTo="transparent"
                    gradientHeight={10}
                  />
                  <span className="text-xs mt-1 text-gray-600">seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess; 