import { useEffect } from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import LandingPage from "./components/LandingPage";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 120,
    });
  }, []);

  return (
    <div className="overflow-x-hidden w-full relative">
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default App;
