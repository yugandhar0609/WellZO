import { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

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
      // Handle mobile menu close if clicking outside the menu components
      if (isOpen && 
          !event.target.closest('button[aria-expanded="true"]') && 
          !event.target.closest('.mobile-menu-container')) {
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
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 overflow-hidden ${
        isScrolled 
          ? "bg-green-100/70 shadow-lg backdrop-blur-md" 
          : "bg-green-50/50 backdrop-blur-sm"
      } border-b border-green-200/40`}
      style={{ "--navbar-height": "64px" }}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3 w-full">
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
            onClick={() => scrollToSection("early-access")}
          >
            Get Started
          </button>
        </div>
        
        {/* Mobile Menu Toggle Button */}
        <button 
          type="button" 
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-700 rounded-md md:hidden hover:bg-green-100/80 focus:outline-none focus:ring-2 focus:ring-green-400/70 ml-auto z-50 transition-all duration-200 ease-in-out" 
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
        
        {/* Navigation Menu - Mobile */}
        <div 
          className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`} 
        >
          {/* Semi-transparent overlay */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" onClick={() => setIsOpen(false)} />
          
          {/* Mobile Menu Container */}
          <div className={`mobile-menu-container fixed inset-x-0 top-[calc(var(--navbar-height,64px))] bg-white/95 backdrop-blur-md shadow-lg border-t border-green-200/50 max-h-[calc(100vh-var(--navbar-height,64px))] overflow-y-auto z-50 transition-all duration-300 ease-in-out transform ${
            isOpen ? 'translate-y-0' : '-translate-y-4 opacity-80'
          }`}>
            {/* Navigation Links */}
            <ul className="flex flex-col py-3 px-4 font-medium">
              {navItems.map(item => (
                <li key={item.id} className="py-1.5">
                  <a 
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`block py-3 px-4 rounded-lg transition-colors duration-200 text-base ${
                      activeSection === item.id 
                        ? "text-gray-900 bg-green-100/70 font-medium" 
                        : "text-gray-700 hover:bg-green-50/80 active:bg-green-100/50"
                    }`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 mb-2 pt-3 border-t border-green-200/40">
                <button 
                  className="w-full bg-green-600/90 text-white px-4 py-3.5 rounded-lg hover:bg-green-700/90 active:bg-green-800/90 transition-colors duration-200 font-medium text-base"
                  onClick={() => scrollToSection("early-access")}
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