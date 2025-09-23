import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [orderData, setOrderData] = useState({
    shippingAddress: user?.address || '',
    paymentMethod: 'CARD',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!orderData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'Shipping address is required';
    }
    
    if (orderData.paymentMethod === 'CARD') {
      if (!orderData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (orderData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      
      if (!orderData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      }
      
      if (!orderData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (orderData.cvv.length !== 3) {
        newErrors.cvv = 'CVV must be 3 digits';
      }
      
      if (!orderData.cardHolderName.trim()) {
        newErrors.cardHolderName = 'Card holder name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Creating order with:', {
        userId: user.id,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod
      });
      
      const order = await orderService.createOrder(
        user.id,
        orderData.shippingAddress,
        orderData.paymentMethod
      );
      
      console.log('Order created successfully:', order);
      console.log('Order structure:', JSON.stringify(order, null, 2));
      
      if (order && order.id) {
        toast.success(`Order #${order.id} placed successfully!`);
        clearCart();
        
        // Add small delay to ensure cart clearing and state updates
        setTimeout(() => {
          console.log('Navigating to order-success with orderId:', order.id);
          navigate('/order-success', { 
            state: { orderId: order.id },
            replace: true // Replace current entry in history
          });
        }, 500);
      } else {
        console.error('Order created but missing ID:', order);
        toast.success('Order placed successfully!');
        clearCart();
        
        // Navigate to orders page as fallback
        setTimeout(() => {
          console.log('Navigating to orders page as fallback');
          navigate('/orders');
        }, 500);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      
      // More detailed error handling
      if (error.response?.data?.message) {
        toast.error(`Order failed: ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`Order failed: ${error.message}`);
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setOrderData(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
  };

  const total = getCartTotal();

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h4>Checkout</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <h5 className="mb-3">Shipping Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Shipping Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="shippingAddress"
                    value={orderData.shippingAddress}
                    onChange={handleInputChange}
                    isInvalid={!!errors.shippingAddress}
                    placeholder="Enter your complete shipping address"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.shippingAddress}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Payment Information */}
                <h5 className="mb-3">Payment Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={orderData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="CARD">Credit/Debit Card</option>
                    <option value="COD">Cash on Delivery</option>
                    <option value="UPI">UPI</option>
                  </Form.Select>
                </Form.Group>

                {orderData.paymentMethod === 'CARD' && (
                  <>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Card Number *</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardNumber"
                            value={orderData.cardNumber}
                            onChange={handleCardNumberChange}
                            isInvalid={!!errors.cardNumber}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cardNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Card Holder Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardHolderName"
                            value={orderData.cardHolderName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.cardHolderName}
                            placeholder="John Doe"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cardHolderName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry Date *</Form.Label>
                          <Form.Control
                            type="text"
                            name="expiryDate"
                            value={orderData.expiryDate}
                            onChange={handleInputChange}
                            isInvalid={!!errors.expiryDate}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.expiryDate}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV *</Form.Label>
                          <Form.Control
                            type="text"
                            name="cvv"
                            value={orderData.cvv}
                            onChange={handleInputChange}
                            isInvalid={!!errors.cvv}
                            placeholder="123"
                            maxLength={3}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cvv}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => navigate('/cart')}>
                    Back to Cart
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading || cartItems.length === 0}
                  >
                    {loading ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5>Order Summary</h5>
            </Card.Header>
            <Card.Body>
              {cartItems.map(item => {
                // Handle both DTO format and entity format
                const productName = item.productName || item.product?.name || 'Product';
                const productPrice = item.productPrice || item.product?.price || 0;
                const quantity = item.quantity || 0;
                
                return (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <span>{productName} × {quantity}</span>
                    <span>₹{(productPrice * quantity).toFixed(2)}</span>
                  </div>
                );
              })}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total: ₹{total.toFixed(2)}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;