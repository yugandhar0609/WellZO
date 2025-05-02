import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.MODE === "production" 
    ? import.meta.env.VITE_API_URL_PRODUCTION || "https://muscle-mind-crm.vercel.app/"
    : import.meta.env.VITE_API_URL_LOCAL || "http://localhost:8000",
  // baseURL: "https://muscle-mind-crm.vercel.app/",
});

apiInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error Interceptors", error);
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - logging out...");
      localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
