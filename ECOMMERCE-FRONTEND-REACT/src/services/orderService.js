import api from './api';

export const orderService = {
  // Get all orders
  getAllOrders: () => api.get('/orders'),

  // Get order by ID
  getOrderById: (id) => api.get(`/orders/${id}`),

  // Get orders by user
  getOrdersByUser: (userId) => api.get(`/orders/user/${userId}`),

  // Get orders by seller (for seller dashboard)
  getOrdersBySeller: (sellerId) => api.get(`/orders/seller/${sellerId}`),

  // Get orders by status
  getOrdersByStatus: (status) => api.get(`/orders/status/${status}`),

  // Create order
  createOrder: (userId, shippingAddress, paymentMethod) => {
    const params = new URLSearchParams({
      userId: userId.toString(),
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod
    });
    return api.post(`/orders?${params}`);
  },

  // Update order status
  updateOrderStatus: (orderId, status) => {
    const params = new URLSearchParams({
      status: status
    });
    return api.put(`/orders/${orderId}/status?${params}`);
  },

  // Delete order
  deleteOrder: (id) => api.delete(`/orders/${id}`)
};

export default orderService;
