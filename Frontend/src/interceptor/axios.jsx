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
  (config) => {
    const token = localStorage.getItem('tokens') ? 
      JSON.parse(localStorage.getItem('tokens')).access : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
          // Use the baseURL and relative path instead of hardcoded URL
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
        localStorage.removeItem('tokens');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default interceptors;
