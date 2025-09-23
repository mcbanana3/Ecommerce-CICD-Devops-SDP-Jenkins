import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { toast } from 'react-toastify';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders for user:', user.id);
      const ordersData = await orderService.getOrdersByUser(user.id);
      console.log('Orders received:', ordersData);
      console.log('Orders structure:', JSON.stringify(ordersData, null, 2));
      setOrders(ordersData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
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
      month: 'short',
      day: 'numeric'
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

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>My Orders</h2>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>

          {orders.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-5">
                <h4>No orders found</h4>
                <p className="text-muted">You haven't placed any orders yet.</p>
                <Link to="/products" className="btn btn-primary">
                  Start Shopping
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>
                          <strong>#{order.id}</strong>
                        </td>
                        <td>{formatDate(order.orderDate)}</td>
                        <td>
                          {order.orderItems ? order.orderItems.length : 0} item(s)
                        </td>
                        <td>
                          <strong>₹{order.totalAmount.toFixed(2)}</strong>
                        </td>
                        <td>
                          <Badge bg={getStatusColor(order.status)}>
                            {order.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td>{order.paymentMethod}</td>
                        <td>
                          <Link
                            to={`/orders/${order.id}`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;