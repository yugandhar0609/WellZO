import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  
  return (
    <section id="pricing" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Basic</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-4">Free</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Basic meal recommendations</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Manual food tracking</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Limited recipe access</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50">
              <button 
                className="w-full py-2 px-4 border-2 border-primary-600 text-primary-600 rounded-full hover:bg-primary-50"
                onClick={() => navigate('/login')}
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Premium Plan */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform scale-100 sm:scale-105 my-8 sm:my-0">
            <div className="bg-primary-600 text-white text-center py-2 text-sm sm:text-base">Most Popular</div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Premium</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-4">$9.99<span className="text-base sm:text-lg">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Full AI nutrition experience</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>AI photo food recognition</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Personalized meal plans</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Unlimited recipe access</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50">
              <button 
                className="w-full py-2 px-4 bg-primary-600 text-white rounded-full hover:bg-primary-700"
                onClick={() => navigate('/login')}
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Pro Plan */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Pro</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-4">$19.99<span className="text-base sm:text-lg">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Advanced AI coaching</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Meal delivery integration</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary-600 mr-3"></i>
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50">
              <button 
                className="w-full py-2 px-4 border-2 border-primary-600 text-primary-600 rounded-full hover:bg-primary-50"
                onClick={() => navigate('/login')}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 