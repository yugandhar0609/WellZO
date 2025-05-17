// import { BrowserRouter as Router } from 'react-router-dom'; // No longer needed here
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from './routes/AppRoutes'; // Import the new routes component

// Replace this with your new client ID from Google Cloud Console
// Make sure to add http://localhost:3000 and http://localhost:5173 to authorized origins
// const GOOGLE_CLIENT_ID = "135364972111-ee73i1i0t9e2bbuhjnqqa11qfui3pvk4.apps.googleusercontent.com"; // THIS LINE IS REMOVED/COMMENTED

function App() {
  const googleClientIdFromEnv = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  // It's critical that VITE_GOOGLE_CLIENT_ID is set in your .env file
  // and that .env file is NOT committed to git.
  if (!googleClientIdFromEnv) {
    console.error("CRITICAL: VITE_GOOGLE_CLIENT_ID is not set in your .env file! Authentication will fail.");
    // You could return a message here to make it obvious on the screen:
    // return <p>Error: VITE_GOOGLE_CLIENT_ID is not configured. Please check your .env file.</p>;
  }

  return (
    // Use the env variable. If it's undefined, GoogleOAuthProvider will likely error out or not work.
    // Adding a placeholder like "DISABLED_CLIENT_ID" can make it clear it's not configured if an ID is strictly required by the provider.
    <GoogleOAuthProvider clientId={googleClientIdFromEnv || "MISSING_CLIENT_ID_CHECK_ENV"}> 
      <AppRoutes />
    </GoogleOAuthProvider>
  );
}

export default App;