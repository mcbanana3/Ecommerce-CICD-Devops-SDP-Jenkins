import api from './api';

export const cartService = {
  // Get cart items for a user
  getCartItems: (userId) => {
    console.log('CartService: Getting cart items for user:', userId);
    return api.get(`/cart/user/${userId}`);
  },

  // Add item to cart
  addToCart: (userId, productId, quantity) => {
    console.log('CartService: Adding to cart:', { userId, productId, quantity });
    const params = new URLSearchParams({
      userId: userId.toString(),
      productId: productId.toString(),
      quantity: quantity.toString()
    });
    return api.post(`/cart/add?${params}`);
  },

  // Update cart item quantity
  updateCartItem: (cartItemId, quantity) => {
    console.log('CartService: Updating cart item:', { cartItemId, quantity });
    const params = new URLSearchParams({
      quantity: quantity.toString()
    });
    return api.put(`/cart/${cartItemId}?${params}`);
  },

  // Remove item from cart
  removeFromCart: (cartItemId) => {
    console.log('CartService: Removing from cart:', cartItemId);
    return api.delete(`/cart/${cartItemId}`);
  },

  // Clear entire cart
  clearCart: (userId) => {
    console.log('CartService: Clearing cart for user:', userId);
    return api.delete(`/cart/clear/${userId}`);
  }
};

export default cartService;
