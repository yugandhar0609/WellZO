import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing Pages
import Home from './pages/landing/Home';
import Features from './pages/landing/Features';
import HowItWorks from './pages/landing/HowItworks';
import Pricing from './pages/landing/Pricing';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserDetails from './pages/auth/UserDetails';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Workouts from './pages/dashboard/Workouts';
import Meals from './pages/dashboard/Meals';
import Progress from './pages/dashboard/Progress';
import Community from './pages/dashboard/Community';
import AIChat from './pages/dashboard/AIChat';
import NutritionAI from './pages/dashboard/NutritionAI';

// Layout Components
// import DashboardLayout from './components/layout/DashboardLayout';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-details" element={<UserDetails />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/community" element={<Community />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/nutrition-agent" element={<NutritionAI />} />  
      </Routes>
    </Router>
  );
}

export default App;