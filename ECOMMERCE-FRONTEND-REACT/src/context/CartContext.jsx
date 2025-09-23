import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { cartService } from '../services/cartService';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart items when user changes
  useEffect(() => {
    if (user) {
      loadCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const loadCartItems = async () => {
    if (!user) {
      console.log('CartContext: No user found, cannot load cart items');
      return;
    }
    
    console.log('CartContext: Loading cart items for user:', user.id);
    setLoading(true);
    try {
      const items = await cartService.getCartItems(user.id);
      console.log('CartContext: Cart items loaded:', items);
      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error('CartContext: Error loading cart items:', error);
      setCartItems([]); // Ensure cartItems is always an array
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    console.log('CartContext: Adding to cart:', { product, quantity, userId: user.id });

    try {
      const cartItem = await cartService.addToCart(user.id, product.id, quantity);
      console.log('CartContext: Cart item added:', cartItem);
      
      // Update local cart state - handle both old and new DTO formats
      const productId = product.id;
      const existingItemIndex = cartItems.findIndex(item => {
        const itemProductId = item.productId || (item.product && item.product.id);
        return itemProductId === productId;
      });
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex] = cartItem;
        setCartItems(updatedItems);
        console.log('CartContext: Updated existing item in cart');
      } else {
        setCartItems(prev => [...prev, cartItem]);
        console.log('CartContext: Added new item to cart');
      }
      
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.error('CartContext: Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const updateCartItem = async (cartItemId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    try {
      const updatedItem = await cartService.updateCartItem(cartItemId, quantity);
      if (updatedItem) {
        setCartItems(prev => 
          prev.map(item => item.id === cartItemId ? updatedItem : item)
        );
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast.error('Failed to update cart item');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await cartService.removeFromCart(cartItemId);
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await cartService.clearCart(user.id);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Handle both old and new DTO format
      const price = item.productPrice || (item.product && item.product.price) || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => {
      // Handle both old and new DTO format
      const itemProductId = item.productId || (item.product && item.product.id);
      return item && itemProductId === productId;
    });
  };

  const getCartItemQuantity = (productId) => {
    const item = cartItems.find(item => {
      // Handle both old and new DTO format
      const itemProductId = item.productId || (item.product && item.product.id);
      return item && itemProductId === productId;
    });
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    getCartItemQuantity,
    loadCartItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
