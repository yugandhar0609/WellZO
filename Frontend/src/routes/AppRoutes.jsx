import { Routes, Route } from 'react-router-dom';

// Landing Pages
// import Home from '../pages/landing/Home'; // Kept commented out
import LandingPage from '../pages/landing/LandingPage';


// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import UserDetails from '../pages/auth/UserDetails';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';
import Workouts from '../pages/dashboard/Workouts';
import Meals from '../pages/dashboard/Meals';
import Progress from '../pages/dashboard/Progress';
import Community from '../pages/dashboard/Community';
import AIChat from '../pages/dashboard/AIChat';
import NutritionAI from '../pages/dashboard/NutritionAI';

// Layout Components (if needed in the future for protected routes)
// import DashboardLayout from '../components/layout/DashboardLayout';
// import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Pages */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<LandingPage />} />


      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user-details" element={<UserDetails />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Dashboard Routes - Consider wrapping these later */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/community" element={<Community />} />
      <Route path="/ai-chat" element={<AIChat />} />
      <Route path="/nutrition-agent" element={<NutritionAI />} />
    </Routes>
  );
};

export default AppRoutes; 