import { Routes, Route } from 'react-router-dom';

// Landing Pages
// import Home from '../pages/landing/Home'; // Kept commented out
import LandingPage from '../pages/landing/LandingPage';

// Test Page
import TestPage from '../pages/TestPage';

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
import AIChat from '../pages/dashboard/AIChat';
import NutritionAI from '../pages/dashboard/NutritionAI';

// Community Pages - Updated to use working component
import CommunityPage from '../pages/community/CommunityPage';
import DiscoverPage from '../pages/community/DiscoverPage';

// Search Page
import SearchPage from '../pages/search/SearchPage';

// Marketplace Page
import MarketplacePage from '../pages/marketplace/MarketplacePage';
import ProductDetailPage from '../pages/marketplace/ProductDetailPage';

// PG Partnership Page
import PgRegistrationPage from '../pages/pg-partnership/PgRegistrationPage';

// PG Owner Dashboard
import PgOwnerLayout from '../pages/pg-owner/PgOwnerLayout';
import PgDashboardPage from '../pages/pg-owner/PgDashboardPage';
import PgOwnerLoginPage from '../pages/pg-owner/PgOwnerLoginPage';
// Placeholder for other PG Owner pages that will share the layout
import PgListingsPage from '../pages/pg-owner/PgListingsPage'; 
import PgInquiriesPage from '../pages/pg-owner/PgInquiriesPage';
import PgProfilePage from '../pages/pg-owner/PgProfilePage';
import PgSupportPage from '../pages/pg-owner/PgSupportPage';

// Profile View Page
import ProfileViews from '../components/profile/ProfileViews';

// Layout Components (if needed in the future for protected routes)
// import DashboardLayout from '../components/layout/DashboardLayout';
// import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Pages */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<LandingPage />} />

      {/* Test Route */}
      <Route path="/test" element={<TestPage />} />

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
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/ai-chat" element={<AIChat />} />
      <Route path="/nutrition-agent" element={<NutritionAI />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/marketplace/:productId" element={<ProductDetailPage />} />
      <Route path="/pg-partnership/register" element={<PgRegistrationPage />} />

      {/* PG Owner Login (Does not use PgOwnerLayout) */}
      <Route path="/pg-owner/login" element={<PgOwnerLoginPage />} />

      {/* PG Owner Dashboard Routes */}
      <Route path="/pg-owner" element={<PgOwnerLayout />}>
        <Route path="dashboard" element={<PgDashboardPage />} />
        {/* Add other PG owner routes here, e.g.: */}
        <Route path="listings" element={<PgListingsPage />} />
        <Route path="inquiries" element={<PgInquiriesPage />} />
        <Route path="profile" element={<PgProfilePage />} />
        <Route path="support" element={<PgSupportPage />} />
        {/* Optional: an index route for /pg-owner if needed */}
        {/* <Route index element={<Navigate to="dashboard" replace />} /> */}
      </Route>

      <Route path="/profile-dashboard" element={<ProfileViews />} />
    </Routes>
  );
};

export default AppRoutes; 