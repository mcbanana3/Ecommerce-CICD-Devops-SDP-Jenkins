import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>ECommerce Shop</h5>
            <p>Your one-stop destination for quality products at great prices.</p>
          </Col>
          <Col md={4}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/products" className="text-light">Products</a></li>
              <li><a href="/about" className="text-light">About Us</a></li>
              <li><a href="/contact" className="text-light">Contact</a></li>
              <li><a href="/seller/register" className="text-light">Become a Seller</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Contact Info</h6>
            <p>
              <i className="fas fa-envelope"></i> support@ecommerceshop.com<br />
              <i className="fas fa-phone"></i> +91 1234567890<br />
              <i className="fas fa-map-marker-alt"></i> 123 Business Street, City
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p>&copy; 2025 ECommerce Shop. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;