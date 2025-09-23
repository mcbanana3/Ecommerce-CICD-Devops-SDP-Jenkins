import api from './api';

export const productService = {
  // Get all products
  getAllProducts: () => api.get('/products'),

  // Get product by ID
  getProductById: (id) => api.get(`/products/${id}`),

  // Get products by category
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),

  // Get products by brand
  getProductsByBrand: (brand) => api.get(`/products/brand/${brand}`),

  // Get products by seller
  getProductsBySeller: (sellerId) => api.get(`/products/seller/${sellerId}`),

  // Search products
  searchProducts: (keyword) => api.get(`/products/search?keyword=${encodeURIComponent(keyword)}`),

  // Get available products
  getAvailableProducts: () => api.get('/products/available'),

  // Create product (for sellers)
  createProduct: (productData, sellerId) => {
    console.log('ProductService - Creating product with data:', productData);
    console.log('ProductService - Seller ID:', sellerId);
    const params = new URLSearchParams({ sellerId: sellerId.toString() });
    return api.post(`/products?${params}`, productData);
  },

  // Update product
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),

  // Delete product
  deleteProduct: (id) => api.delete(`/products/${id}`)
};

export default productService;
