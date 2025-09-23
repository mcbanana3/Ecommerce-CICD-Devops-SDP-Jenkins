import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { orderService } from '../services/orderService';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get order ID from URL params or location state
  const orderId = location.state?.orderId || new URLSearchParams(location.search).get('orderId');

  console.log('OrderSuccess component mounted');
  console.log('OrderId from location:', orderId);
  console.log('Location state:', location.state);

  useEffect(() => {
    console.log('useEffect triggered with orderId:', orderId);
    if (orderId) {
      fetchOrderDetails();
    } else {
      console.log('No orderId found, setting loading to false');
      setLoading(false);
    }
  }, [orderId]); // Only re-run when orderId changes

  const fetchOrderDetails = async () => {
    try {
      console.log('Fetching order details for orderId:', orderId);
      setLoading(true);
      setError(null);
      const orderData = await orderService.getOrderById(orderId);
      console.log('Order data received:', orderData);
      setOrder(orderData);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Failed to load order details. The order may still be processing.');
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'CONFIRMED': return 'primary';
      case 'SHIPPED': return 'info';
      case 'DELIVERED': return 'success';
      default: return 'secondary';
    }
  };

  const calculateTotal = () => {
    if (!order?.orderItems) return 0;
    return order.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-2">Loading order details...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="text-center border-danger">
              <Card.Body className="py-5">
                <div style={{ fontSize: '4rem', color: '#dc3545', marginBottom: '1rem' }}>
                  ⚠️
                </div>
                <h3 className="text-danger">Error Loading Order</h3>
                <p className="text-muted mb-4">{error}</p>
                <div>
                  <Button variant="primary" onClick={() => navigate('/orders')} className="me-3">
                    View All Orders
                  </Button>
                  <Button variant="outline-primary" onClick={() => navigate('/products')}>
                    Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!orderId) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="text-center border-success">
              <Card.Body className="py-5">
                <div style={{ fontSize: '4rem', color: '#28a745', marginBottom: '1rem' }}>
                  ✅
                </div>
                <h1 className="text-success mb-3">Order Placed Successfully!</h1>
                <p className="lead text-muted mb-4">
                  Thank you for your purchase! Your order has been received and is being processed.
                </p>
                <div>
                  <Button variant="primary" onClick={() => navigate('/orders')} className="me-3">
                    View All Orders
                  </Button>
                  <Button variant="outline-primary" onClick={() => navigate('/products')}>
                    Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Success Header */}
          <Card className="mb-4 text-center border-success">
            <Card.Body className="py-5">
              <div style={{ fontSize: '4rem', color: '#28a745', marginBottom: '1rem' }}>
                ✅
              </div>
              <h1 className="text-success mb-3">Order Placed Successfully!</h1>
              <p className="lead text-muted">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              {order && (
                <Alert variant="success" className="mt-3">
                  <strong>Order ID: #{order.id}</strong>
                  <br />
                  <small>Please save this order ID for future reference</small>
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Order Details */}
          {order ? (
            <>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Order Details</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                      <p><strong>Status:</strong> 
                        <Badge bg={getStatusBadgeColor(order.status)} className="ms-2">
                          {order.status}
                        </Badge>
                      </p>
                      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    </Col>
                    <Col md={6}>
                      <p><strong>Shipping Address:</strong></p>
                      <p className="text-muted">{order.shippingAddress}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Order Items</h5>
                </Card.Header>
                <Card.Body>
                  {order.orderItems && order.orderItems.length > 0 ? (
                    <div>
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center border-bottom py-2">
                          <div>
                            <strong>{item.productName || item.product?.name || 'Product'}</strong>
                            <br />
                            <small className="text-muted">Quantity: {item.quantity}</small>
                          </div>
                          <div className="text-end">
                            <div>₹{item.price ? item.price.toLocaleString() : '0'} each</div>
                            <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
                          </div>
                        </div>
                      ))}
                      <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                        <h5>Total Amount:</h5>
                        <h5 className="text-success">₹{calculateTotal().toLocaleString()}</h5>
                      </div>
                    </div>
                  ) : (
                    <p>No items found for this order.</p>
                  )}
                </Card.Body>
              </Card>
            </>
          ) : (
            <Card className="mb-4">
              <Card.Body className="text-center">
                <p>Order details are not available at the moment.</p>
              </Card.Body>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="text-center">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/orders')} 
              className="me-3"
            >
              View All Orders
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg" 
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </div>

          {/* Order Status Information */}
          <Card className="mt-4">
            <Card.Body>
              <h6>What happens next?</h6>
              <div className="row text-center mt-3">
                <div className="col-3">
                  <div className="p-2">
                    <Badge bg="warning" className="fs-6 mb-2">PENDING</Badge>
                    <div className="small">Order received and being reviewed</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2">
                    <Badge bg="primary" className="fs-6 mb-2">CONFIRMED</Badge>
                    <div className="small">Order confirmed and preparing</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2">
                    <Badge bg="info" className="fs-6 mb-2">SHIPPED</Badge>
                    <div className="small">Order shipped and on the way</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2">
                    <Badge bg="success" className="fs-6 mb-2">DELIVERED</Badge>
                    <div className="small">Order delivered successfully</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccess;