import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <div className="overflow-x-hidden w-full relative">
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default App;
