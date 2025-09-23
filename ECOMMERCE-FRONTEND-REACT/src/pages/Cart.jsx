import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart, loading, getCartItemCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = getCartTotal();
  const itemCount = getCartItemCount();
  const shippingCost = total > 500 ? 0 : 50;
  const finalTotal = total + shippingCost;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      try {
        await clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Please <Link to="/login">login</Link> to view your cart.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Shopping Cart {itemCount > 0 && <Badge bg="primary">{itemCount}</Badge>}</h2>
            {cartItems.length > 0 && (
              <Button variant="outline-danger" onClick={handleClearCart}>
                Clear Cart
              </Button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-5">
                <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h4>Your cart is empty</h4>
                <p className="text-muted">Start shopping to add items to your cart</p>
                <Link to="/products" className="btn btn-primary">
                  Continue Shopping
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              <Col lg={8}>
                <div className="cart-items">
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                <Link to="/products" className="btn btn-outline-primary mt-3">
                  Continue Shopping
                </Link>
              </Col>
              <Col lg={4}>
                <Card className="sticky-top">
                  <Card.Header>
                    <h5>Order Summary</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal ({itemCount} items):</span>
                      <span>?{total.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-success">FREE</span>
                        ) : (
                          `?${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                      <strong>Total:</strong>
                      <strong>?{finalTotal.toFixed(2)}</strong>
                    </div>
                    {shippingCost > 0 && (
                      <Alert variant="info" className="small">
                        Add ?{(500 - total).toFixed(2)} more for free shipping!
                      </Alert>
                    )}
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
