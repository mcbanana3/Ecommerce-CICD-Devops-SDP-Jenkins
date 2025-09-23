import React, { useContext } from 'react';
import { Card, Row, Col, Button, Form, Image } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useContext(CartContext);

  // Handle both DTO format and entity format
  const productName = item.productName || item.product?.name || 'Product';
  const productPrice = item.productPrice || item.product?.price || 0;
  const productImage = item.productImageUrl || item.product?.imageUrl;
  const productDescription = item.productDescription || item.product?.description;
  const productCategory = item.productCategory || item.product?.category;
  const productBrand = item.productBrand || item.product?.brand;
  const sellerName = item.sellerName || item.product?.seller?.firstName + ' ' + item.product?.seller?.lastName;
  const businessName = item.businessName || item.product?.seller?.businessName;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      updateCartItem(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(item.id);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          {/* Product Image */}
          <Col md={2} className="text-center">
            {productImage ? (
              <Image
                src={productImage}
                alt={productName}
                className="img-fluid rounded"
                style={{ maxHeight: '80px', maxWidth: '80px' }}
              />
            ) : (
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center"
                style={{ height: '80px', width: '80px' }}
              >
                <i className="fas fa-image text-muted"></i>
              </div>
            )}
          </Col>

          {/* Product Details */}
          <Col md={4}>
            <h6 className="mb-1">{productName}</h6>
            {productBrand && (
              <small className="text-muted d-block">Brand: {productBrand}</small>
            )}
            {productCategory && (
              <small className="text-muted d-block">Category: {productCategory}</small>
            )}
            {(sellerName || businessName) && (
              <small className="text-muted d-block">
                Sold by: {businessName || sellerName}
              </small>
            )}
          </Col>

          {/* Price */}
          <Col md={2} className="text-center">
            <div className="fw-bold text-primary">₹{productPrice.toFixed(2)}</div>
            <small className="text-muted">per item</small>
          </Col>

          {/* Quantity Controls */}
          <Col md={2} className="text-center">
            <div className="d-flex align-items-center justify-content-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                style={{ width: '30px', height: '30px' }}
              >
                -
              </Button>
              <Form.Control
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="mx-2 text-center"
                style={{ width: '60px' }}
                min="1"
                max="10"
              />
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= 10}
                style={{ width: '30px', height: '30px' }}
              >
                +
              </Button>
            </div>
            <small className="text-muted d-block mt-1">Max: 10</small>
          </Col>

          {/* Total & Actions */}
          <Col md={2} className="text-center">
            <div className="fw-bold mb-2">₹{(productPrice * item.quantity).toFixed(2)}</div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleRemove}
              className="d-flex align-items-center justify-content-center mx-auto"
              style={{ width: '36px', height: '36px' }}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
