import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export const sellerService = {
  register: (sellerData) => api.post('/sellers/register', sellerData),
  login: (credentials) => api.post('/sellers/login', credentials),
  getAllSellers: () => api.get('/sellers'),
  getSellerById: (id) => api.get(`/sellers/${id}`),
  getSellerByEmail: async (email) => {
    try {
      const sellers = await api.get('/sellers');
      return sellers.find(seller => seller.email === email);
    } catch (error) {
      throw error;
    }
  },
  updateSeller: (id, sellerData) => api.put(`/sellers/${id}`, sellerData),
  deleteSeller: (id) => api.delete(`/sellers/${id}`)
};

export default sellerService;