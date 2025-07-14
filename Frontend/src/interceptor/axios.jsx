import axios from "axios";

// Helper function to safely parse JSON
const safeJSONParse = (data) => {
  if (!data) return {};
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn("Failed to parse JSON data:", e);
    return {};
  }
};

// Helper function to get tokens safely
const getStoredTokens = () => {
  const tokensStr = localStorage.getItem("tokens");
  if (!tokensStr) return {};
  
  // If it starts with the encryption signature, return empty object
  // Later we can add decryption if needed
  if (tokensStr.startsWith('U2FsdGVkX1')) {
    return {};
  }
  
  return safeJSONParse(tokensStr);
};

// Helper function to check if session needs extension
const shouldExtendSession = () => {
  const session = safeJSONParse(localStorage.getItem("session"));
  if (!session?.expires_at) return false;

  const expiryDate = new Date(session.expires_at);
  const now = new Date();
  const daysUntilExpiry = (expiryDate - now) / (1000 * 60 * 60 * 24);

  // Extend if less than 7 days until expiry
  return daysUntilExpiry < 7;
};

// Create axios instance with base URL
const interceptors = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Update this with your Django backend URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor
interceptors.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('tokens') ? 
      JSON.parse(localStorage.getItem('tokens')).access : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      // Check if we need to extend session
      if (shouldExtendSession() && config.url !== 'users/extend-session/') {
        try {
          const session = safeJSONParse(localStorage.getItem("session"));
          const response = await interceptors.post('users/extend-session/', {
            session_token: session.token
          });
          
          if (response.data.success) {
            localStorage.setItem("session", JSON.stringify(response.data.session));
          }
        } catch (error) {
          console.warn("Failed to extend session:", error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
interceptors.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = localStorage.getItem('tokens') ? 
          JSON.parse(localStorage.getItem('tokens')) : null;

        if (tokens?.refresh) {
          const res = await interceptors.post('users/token/refresh/', {
            refresh: tokens.refresh
          });

          if (res.data.access) {
            localStorage.setItem('tokens', JSON.stringify({
              ...tokens,
              access: res.data.access
            }));

            originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
            return interceptors(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Clear all auth data on refresh failure
        localStorage.removeItem('tokens');
        localStorage.removeItem('user');
        localStorage.removeItem('session');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default interceptors;
