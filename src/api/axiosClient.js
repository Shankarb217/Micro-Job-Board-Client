import axios from 'axios';
import mockApiHandler, { enableMockMode } from '../mock/mockApiInterceptorPersistent';

// Enable/Disable Mock Mode
// Set to true to use static data (no backend required)
// Set to false to use real backend API
// ENABLED WITH PERSISTENT STORAGE - Data saved in localStorage
const USE_MOCK_MODE = true;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://15.207.141.51:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enable mock mode if configured
if (USE_MOCK_MODE) {
  enableMockMode();
}

// Request interceptor - Add JWT token to all requests OR use mock data
axiosClient.interceptors.request.use(
  async (config) => {
    // If mock mode is enabled, intercept and return mock data
    if (USE_MOCK_MODE) {
      try {
        const mockResponse = await mockApiHandler(config);
        // Create a custom response that axios will accept
        config.adapter = () => Promise.resolve(mockResponse);
      } catch (error) {
        // Return error in axios format
        config.adapter = () => Promise.reject(error);
      }
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized - redirect to login (only in real API mode)
      if (error.response.status === 401 && !USE_MOCK_MODE) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      // Handle 403 Forbidden - show access denied message
      if (error.response.status === 403) {
        console.error('Access Denied: You do not have permission to access this resource');
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
