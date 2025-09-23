import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('API Base URL:', API_BASE_URL); // Debug log

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    console.error('API Error URL:', error.config?.url);
    console.error('API Error Status:', error.response?.status);
    console.error('API Error Data:', error.response?.data);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
