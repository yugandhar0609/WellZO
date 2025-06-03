import SplitText from "../../components/Reactbits/SplitText";
import FluidBackground from "../../components/Reactbits/FluidBackground";
import hero from "../../assets/hero.jpg";
import SpotlightCard from '../../components/Reactbits/Spotlight_Card';
import { 
  RiBrainLine, 
  RiCameraLine, 
  RiShoppingCart2Line,
  RiRobot2Line,
  RiLineChartLine,
  RiRestaurant2Line 
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const navigate = useNavigate();
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  
  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <FluidBackground className="overflow-x-hidden">
      <>
        {/* Hero Section */}
        <section id="hero" className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div data-aos="fade-right" data-aos-duration="1000">
                <SplitText
                  text="AI-Powered Nutrition & Meal Planning, Tailored Just for You"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
                  delay={50}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.2}
                  rootMargin="-50px"
                  onLetterAnimationComplete={handleAnimationComplete}
                />
                
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8" data-aos="fade-up" data-aos-delay="200">
                  Healthy eating made simple with AI-driven meal plans, automated tracking, and personalized health coaching.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-up" data-aos-delay="300">
                  <button 
                    className="w-full sm:w-auto bg-primary-600 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-primary-700 shadow-lg transition-transform hover:scale-105 active:scale-95"
                    onClick={() => navigate('/login')}
                    data-aos="zoom-in" 
                    data-aos-delay="400"
                  >
                    Get Started for Free
                  </button>
                  <button 
                    className="w-full sm:w-auto border-2 border-primary-600 text-primary-600 px-6 sm:px-8 py-3 rounded-full hover:bg-primary-50 transition-transform hover:scale-105 active:scale-95"
                    onClick={() => scrollToSection('how-it-works')}
                    data-aos="zoom-in" 
                    data-aos-delay="500"
                  >
                    Learn More
                  </button>
                </div>
              </div>
              
              <div className="relative" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-300/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-green-300/20 rounded-full blur-3xl"></div>
                <img 
                  src={hero} 
                  alt="Wellzo.ai App Interface" 
                  className="rounded-xl shadow-2xl border border-gray-200 relative z-10 w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="800">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem with Traditional Nutrition Apps</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Most nutrition apps are generic, complicated, and time-consuming. We&apos;ve built something different.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="flip-left" data-aos-duration="1000" data-aos-delay="200">
                <div className="bg-red-50 p-6 rounded-xl mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">The Old Way</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="300">
                      <i className="fas fa-times text-red-500 mr-3"></i>
                      <span>Generic diets don&apos;t work</span>
                    </li>
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="400">
                      <i className="fas fa-times text-red-500 mr-3"></i>
                      <span>Manual food logging is tedious</span>
                    </li>
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="500">
                      <i className="fas fa-times text-red-500 mr-3"></i>
                      <span>No personalized guidance</span>
                    </li>
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="600">
                      <i className="fas fa-times text-red-500 mr-3"></i>
                      <span>Complicated calorie counting</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div data-aos="flip-right" data-aos-duration="1000" data-aos-delay="200">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">The Wellzo.ai Way</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center" data-aos="fade-left" data-aos-delay="300">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span>AI-personalized meal plans</span>
                    </li>
                    <li className="flex items-center" data-aos="fade-left" data-aos-delay="400">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span>Automated food tracking with photos</span>
                    </li>
                    <li className="flex items-center" data-aos="fade-left" data-aos-delay="500">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span>24/7 AI nutrition coach</span>
                    </li>
                    <li className="flex items-center" data-aos="fade-left" data-aos-delay="600">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span>Smart grocery integration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12" data-aos="zoom-in" data-aos-duration="800">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Wellzo.ai Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our AI-powered platform makes healthy eating simple in just a few steps.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md" data-aos="fade-right" data-aos-duration="800" data-aos-delay="100">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Take the AI Health Quiz</h3>
                <p className="text-gray-600">Answer a few questions about your health goals, preferences, and dietary restrictions.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Your Personalized Plan</h3>
                <p className="text-gray-600">Our AI creates a custom meal plan tailored to your unique needs and preferences.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md" data-aos="fade-left" data-aos-duration="800" data-aos-delay="300">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress Effortlessly</h3>
                <p className="text-gray-600">Simply snap photos of your meals and our AI handles the tracking automatically.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="800">
              <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">Discover how our AI-powered platform makes healthy eating simple and personalized.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* AI-Powered Meal Planning */}
              <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                <SpotlightCard className="h-full bg-gray-800/50 backdrop-blur-sm" spotlightColor="rgba(34, 197, 94, 0.2)">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-green-900/30 rounded-2xl flex items-center justify-center">
                      <RiBrainLine className="text-3xl text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">AI-Powered Meal Planning</h3>
                    <p className="text-gray-300">Get personalized meal plans based on your preferences, dietary restrictions, and health goals. Our AI adapts to your lifestyle.</p>
                  </div>
                </SpotlightCard>
              </div>

              {/* Photo-Based Tracking */}
              <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                <SpotlightCard className="h-full bg-gray-800/50 backdrop-blur-sm" spotlightColor="rgba(99, 102, 241, 0.2)">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-indigo-900/30 rounded-2xl flex items-center justify-center">
                      <RiCameraLine className="text-3xl text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Photo-Based Food Tracking</h3>
                    <p className="text-gray-300">Simply take a photo of your meal and our AI will identify the foods and track your nutrition automatically.</p>
                  </div>
                </SpotlightCard>
              </div>

              {/* Smart Grocery Integration */}
              <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
                <SpotlightCard className="h-full bg-gray-800/50 backdrop-blur-sm" spotlightColor="rgba(234, 88, 12, 0.2)">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-orange-900/30 rounded-2xl flex items-center justify-center">
                      <RiShoppingCart2Line className="text-3xl text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Smart Grocery Integration</h3>
                    <p className="text-gray-300">Automatically generate shopping lists based on your meal plan and order groceries with one click.</p>
                  </div>
                </SpotlightCard>
              </div>

              {/* 24/7 AI Coach */}
              <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                <SpotlightCard className="h-full bg-gray-800/50 backdrop-blur-sm" spotlightColor="rgba(37, 99, 235, 0.2)">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-blue-900/30 rounded-2xl flex items-center justify-center">
                      <RiRobot2Line className="text-3xl text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">24/7 AI Nutrition Coach</h3>
                    <p className="text-gray-300">Get real-time guidance, answers to nutrition questions, and personalized recommendations anytime.</p>
                  </div>
                </SpotlightCard>
              </div>

              {/* Progress Tracking */}
              <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
                <SpotlightCard className="h-full bg-gray-800/50 backdrop-blur-sm" spotlightColor="rgba(147, 51, 234, 0.2)">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-purple-900/30 rounded-2xl flex items-center justify-center">
                      <RiLineChartLine className="text-3xl text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Progress Tracking & Analytics</h3>
                    <p className="text-gray-300">Track your progress with detailed analytics and insights to help you reach your health goals.</p>
                  </div>
                </SpotlightCard>
              </div>

              {/* Recipe Customization */}
              <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                <SpotlightCard className="h-full bg-gray-800/50 backdrop-blur-sm" spotlightColor="rgba(236, 72, 153, 0.2)">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-pink-900/30 rounded-2xl flex items-center justify-center">
                      <RiRestaurant2Line className="text-3xl text-pink-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Recipe Customization</h3>
                    <p className="text-gray-300">Discover and customize thousands of recipes that match your dietary preferences and health goals.</p>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Find answers to common questions about Wellzo.ai.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl shadow-md" data-aos="fade-up">
                <h3 className="font-semibold text-lg mb-2">Can I customize my meal plans?</h3>
                <p className="text-gray-600">Yes! You can set dietary preferences, allergies, and even specify foods you don&apos;t like. The AI will adapt accordingly.</p>
              </div>
              <div className="p-6 rounded-xl shadow-md" data-aos="fade-up">
                <h3 className="font-semibold text-lg mb-2">How does the grocery integration work?</h3>
                <p className="text-gray-600">We partner with major grocery delivery services to make ordering ingredients for your meal plan simple with just one click.</p>
              </div>
              <div className="p-6 rounded-xl shadow-md" data-aos="fade-up">
                <h3 className="font-semibold text-lg mb-2">Is my data private and secure?</h3>
                <p className="text-gray-600">Absolutely. We use bank-level encryption and never share your personal data with third parties without your explicit consent.</p>
              </div>
              <div className="p-6 rounded-xl shadow-md" data-aos="fade-up">
                <h3 className="font-semibold text-lg mb-2">How accurate is the photo food tracking?</h3>
                <p className="text-gray-600">Our AI can identify thousands of foods with over 95% accuracy. For any items it can&apos;t identify, you can easily add them manually.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Nutrition?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of users who have made healthy eating simple with Wellzo.ai.</p>
            <button 
              className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95"
              onClick={() => navigate('/login')}
            >
              Get Started for Free
            </button>
          </div>
        </section>
      </>
    </FluidBackground>
  );
};

export default MainContent; 