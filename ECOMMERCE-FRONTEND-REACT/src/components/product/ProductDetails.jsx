import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart, isInCart, getCartItemQuantity } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const productData = await productService.getProductById(id);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(product, quantity);
      setQuantity(1); // Reset quantity
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= product.stockQuantity) {
      setQuantity(value);
    }
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

  if (!product) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <h4>Product not found</h4>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  const inCart = isInCart(product.id);
  const cartQuantity = getCartItemQuantity(product.id);

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={product.imageUrl || 'https://via.placeholder.com/500x400?text=No+Image'}
              alt={product.name}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        
        <Col md={6}>
          <div className="product-info">
            <div className="mb-3">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => navigate('/products')}
              >
                ← Back to Products
              </Button>
            </div>

            <h1 className="h2 mb-2">{product.name}</h1>
            
            <div className="mb-3">
              <span className="text-muted">Brand: </span>
              <strong>{product.brand}</strong>
            </div>

            <div className="mb-3">
              <span className="text-muted">Category: </span>
              <Badge bg="secondary">{product.category}</Badge>
            </div>

            <div className="mb-3">
              <h3 className="text-primary">₹{product.price.toFixed(2)}</h3>
            </div>

            <div className="mb-3">
              <h6>Description</h6>
              <p>{product.description}</p>
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2">Stock:</span>
                {product.stockQuantity > 0 ? (
                  <Badge bg={product.stockQuantity <= 5 ? 'warning' : 'success'}>
                    {product.stockQuantity} available
                    {product.stockQuantity <= 5 && ' (Low Stock)'}
                  </Badge>
                ) : (
                  <Badge bg="danger">Out of Stock</Badge>
                )}
              </div>
            </div>

            {product.seller && (
              <div className="mb-3">
                <span className="text-muted">Sold by: </span>
                <strong>{product.seller.businessName || product.seller.username}</strong>
              </div>
            )}

            {user && product.stockQuantity > 0 && (
              <div className="mb-4">
                {!inCart ? (
                  <div>
                    <Form.Group className="mb-3" style={{ maxWidth: '120px' }}>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max={product.stockQuantity}
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                    </Form.Group>
                    
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className="me-2"
                    >
                      {addingToCart ? 'Adding...' : 'Add to Cart'}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Badge bg="success" className="me-2 p-2">
                      ✓ In Cart ({cartQuantity} items)
                    </Badge>
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate('/cart')}
                    >
                      View Cart
                    </Button>
                  </div>
                )}
              </div>
            )}

            {!user && (
              <div className="mb-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Login to Purchase
                </Button>
              </div>
            )}

            {/* Product Features */}
            <Card className="mt-4">
              <Card.Body>
                <h6>Product Features</h6>
                <ul className="list-unstyled mb-0">
                  <li>✓ Genuine product</li>
                  <li>✓ Fast delivery</li>
                  <li>✓ 30-day return policy</li>
                  <li>✓ Customer support</li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
