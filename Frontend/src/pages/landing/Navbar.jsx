import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background opacity
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["features", "how-it-works", "pricing", "early-access"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.getElementById("navbar-menu");
      
      // Handle mobile menu close
      if (isOpen && nav && !nav.contains(event.target) && 
          !event.target.closest("button[aria-controls='navbar-menu']")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
    setIsOpen(false);
  };

  const navItems = [
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How it Works" },
    { id: "pricing", label: "Pricing" },
    { id: "early-access", label: "Early Access" }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-green-100/70 shadow-lg backdrop-blur-md" 
        : "bg-green-50/50 backdrop-blur-sm"
    } border-b border-green-200/40`}>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
        {/* Logo */}
        <div className="flex-shrink-0 flex-1 md:flex-none md:mr-4">
          <a href="#" className="flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <img src={logo} className="h-9 sm:h-10 md:h-12" alt="Wellzo Logo" />
            <span className="self-center text-xl sm:text-2xl md:text-3xl font-semibold whitespace-nowrap text-gray-800">Wellzo</span>
          </a>
        </div>
        
        {/* Desktop Navigation Links - Center */}
        <div className="hidden md:flex justify-center flex-1">
          <ul className="flex space-x-10 rtl:space-x-reverse">
            {navItems.map(item => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`block py-2 px-1 transition-colors ${
                    activeSection === item.id 
                      ? "text-gray-900 font-bold underline underline-offset-4" 
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Get Started Button (Desktop) */}
        <div className="hidden md:flex flex-shrink-0">
          <button 
            className="bg-green-600/90 text-white px-5 py-2 rounded-md hover:bg-green-700/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg font-medium"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
        </div>
        
        {/* Mobile Menu Toggle Button */}
        <button 
          data-collapse-toggle="navbar-menu" 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-800 rounded-lg md:hidden hover:bg-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-300/50 ml-auto z-50" 
          aria-controls="navbar-menu" 
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only ">Open main menu</span>
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6 " />
          )}
        </button>
        
        {/* Navigation Menu - Mobile */}
        <div 
          className={`${isOpen ? 'block' : 'hidden'} md:hidden`} 
          id="navbar-menu"
        >
          {/* Mobile Menu Container */}
          <div className="fixed inset-x-0 top-[68px] bg-green-50/90 backdrop-blur-md shadow-lg border-t border-green-200/40 max-h-[calc(100vh-68px)] overflow-y-auto">
            {/* Navigation Links */}
            <ul className="flex flex-col p-4 font-medium items-center text-center">
              {navItems.map(item => (
                <li key={item.id} className="mb-2 w-full max-w-[250px]">
                  <a 
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`block py-2.5 px-3 rounded-md transition-colors text-center ${
                      activeSection === item.id 
                        ? "text-gray-900 bg-green-200/50 font-bold" 
                        : "text-gray-700 hover:bg-green-100/50"
                    }`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-4 mb-2 pt-3 border-t border-green-200/40 w-full max-w-[250px]">
                <button 
                  className="w-full bg-green-600/90 text-white px-4 py-2.5 rounded-md hover:bg-green-700/90 transition-colors font-medium"
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                >
                  Get Started
                </button>
              </li>
              
              {/* Safe area for notched devices */}
              <li className="h-6"></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 