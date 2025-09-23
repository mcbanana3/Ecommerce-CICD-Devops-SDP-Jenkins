import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Button, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const orderData = await orderService.getOrderById(orderId);
      setOrder(orderData);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to load order details');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <h4>Order not found</h4>
          <Button variant="primary" onClick={() => navigate('/orders')}>
            Back to Orders
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Order Details</h2>
            <Button variant="outline-secondary" onClick={() => navigate('/orders')}>
              Back to Orders
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* Order Items */}
          <Card className="mb-4">
            <Card.Header>
              <h5>Order Items</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems && order.orderItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {item.product.imageUrl && (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="me-3"
                            />
                          )}
                          <div>
                            <strong>{item.product.name}</strong>
                            <br />
                            <small className="text-muted">{item.product.brand}</small>
                          </div>
                        </div>
                      </td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Shipping Information */}
          <Card>
            <Card.Header>
              <h5>Shipping Information</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Address:</strong></p>
              <p>{order.shippingAddress}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Order Summary */}
          <Card className="mb-4">
            <Card.Header>
              <h5>Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Order ID:</span>
                <span><strong>#{order.id}</strong></span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Order Date:</span>
                <span>{formatDate(order.orderDate)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Status:</span>
                <Badge bg={getStatusColor(order.status)}>
                  {order.status.toUpperCase()}
                </Badge>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Payment Method:</span>
                <span>{order.paymentMethod}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total Amount:</strong>
                <strong>₹{order.totalAmount.toFixed(2)}</strong>
              </div>
            </Card.Body>
          </Card>

          {/* Order Status Timeline */}
          <Card>
            <Card.Header>
              <h5>Order Timeline</h5>
            </Card.Header>
            <Card.Body>
              <div className="timeline">
                <div className={`timeline-item ${['pending', 'confirmed', 'shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'completed' : ''}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h6>Order Placed</h6>
                    <small>{formatDate(order.orderDate)}</small>
                  </div>
                </div>
                
                <div className={`timeline-item ${['confirmed', 'shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'completed' : ''}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h6>Order Confirmed</h6>
                    <small>Waiting for confirmation</small>
                  </div>
                </div>
                
                <div className={`timeline-item ${['shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'completed' : ''}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h6>Order Shipped</h6>
                    <small>Package is on the way</small>
                  </div>
                </div>
                
                <div className={`timeline-item ${order.status.toLowerCase() === 'delivered' ? 'completed' : ''}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h6>Order Delivered</h6>
                    <small>Package delivered successfully</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .timeline {
          position: relative;
          padding-left: 20px;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          left: 10px;
          top: 0;
          height: 100%;
          width: 2px;
          background: #dee2e6;
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 30px;
        }
        
        .timeline-marker {
          position: absolute;
          left: -15px;
          top: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dee2e6;
          border: 3px solid #fff;
          box-shadow: 0 0 0 2px #dee2e6;
        }
        
        .timeline-item.completed .timeline-marker {
          background: #28a745;
          box-shadow: 0 0 0 2px #28a745;
        }
        
        .timeline-content h6 {
          margin: 0;
          font-size: 0.9rem;
        }
        
        .timeline-content small {
          color: #6c757d;
        }
      `}</style>
    </Container>
  );
};

export default OrderDetails;