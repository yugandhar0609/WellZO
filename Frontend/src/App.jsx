// import { BrowserRouter as Router } from 'react-router-dom'; // No longer needed here
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useLocation } from 'react-router-dom'; // Import useLocation
import AppRoutes from './routes/AppRoutes'; // Import the new routes component
import BottomNavigationBar from './components/layout/BottomNavigationBar'; // Import the new navigation bar
import LeftSidebar from './components/layout/LeftSidebar'; // Import the new sidebar
import RightProfilePanel from './components/layout/RightProfilePanel'; // Import the new panel

// Replace this with your new client ID from Google Cloud Console
// Make sure to add http://localhost:3000 and http://localhost:5173 to authorized origins
// const GOOGLE_CLIENT_ID = "135364972111-ee73i1i0t9e2bbuhjnqqa11qfui3pvk4.apps.googleusercontent.com"; // THIS LINE IS REMOVED/COMMENTED

function App() {
  const googleClientIdFromEnv = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const location = useLocation(); // Get location object
  
  // It's critical that VITE_GOOGLE_CLIENT_ID is set in your .env file
  // and that .env file is NOT committed to git.
  if (!googleClientIdFromEnv) {
    console.error("CRITICAL: VITE_GOOGLE_CLIENT_ID is not set in your .env file! Authentication will fail.");
    // You could return a message here to make it obvious on the screen:
    // return <p>Error: VITE_GOOGLE_CLIENT_ID is not configured. Please check your .env file.</p>;
  }

  // Paths where the main app layout (sidebar, bottom nav, etc.) should be hidden
  const noLayoutPaths = ['/', '/login', '/register', '/forgot-password', '/pg-partnership/register', '/pg-owner/login'];
  // Check if the current path starts with /pg-owner/
  const isPgOwnerDashboardPath = location.pathname.startsWith('/pg-owner/') && location.pathname !== '/pg-owner/login';
  const showAppLayout = !noLayoutPaths.includes(location.pathname) && !isPgOwnerDashboardPath;

  // Paths where the RightProfilePanel should be visible on desktop (only if main app layout is shown)
  const rightPanelAppPaths = ['/dashboard', '/search', '/community', '/marketplace'];
  const showRightProfilePanel = showAppLayout && rightPanelAppPaths.includes(location.pathname);

  return (
    // Use the env variable. If it's undefined, GoogleOAuthProvider will likely error out or not work.
    // Adding a placeholder like "DISABLED_CLIENT_ID" can make it clear it's not configured if an ID is strictly required by the provider.
    <GoogleOAuthProvider clientId={googleClientIdFromEnv || "MISSING_CLIENT_ID_CHECK_ENV"}> 
      <div className={`flex h-screen bg-gray-50 ${!showAppLayout ? 'block' : ''}`}>
        {/* Main app layout components are now conditional on showAppLayout */}
        {showAppLayout && <LeftSidebar />}
        <main 
          className={`flex-1 flex flex-col overflow-hidden 
            ${showAppLayout ? 'md:ml-64' : ''} 
            ${showRightProfilePanel ? 'lg:mr-72' : ''}`
          }
        >
          {/* The p-0 for noLayout is to ensure LandingPage can control its own padding/margin from the edges */}
          <div className={`flex-1 overflow-x-hidden overflow-y-auto ${showAppLayout ? 'p-4 md:p-6' : 'p-0'}`}> 
            <AppRoutes />
          </div>
          {showAppLayout && <BottomNavigationBar />}
        </main>
        {showRightProfilePanel && <RightProfilePanel />} 
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;