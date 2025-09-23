import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, InputGroup, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Products = () => {
  const { addToCart, isInCart, getCartItemQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showOutOfStock, setShowOutOfStock] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesPriceMin = priceRange.min === '' || product.price >= parseFloat(priceRange.min);
    const matchesPriceMax = priceRange.max === '' || product.price <= parseFloat(priceRange.max);
    const matchesStock = showOutOfStock || product.stockQuantity > 0;
    
    return matchesSearch && matchesCategory && matchesPriceMin && matchesPriceMax && matchesStock;
  }).sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'price' || sortBy === 'stockQuantity') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const categories = [...new Set(products.map(product => product.category))];
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
    setSortOrder('asc');
    setShowOutOfStock(true);
  };

  const getSortLabel = () => {
    const labels = {
      name: 'Name',
      price: 'Price',
      stockQuantity: 'Stock',
      category: 'Category'
    };
    return `${labels[sortBy]} (${sortOrder === 'asc' ? 'A-Z' : 'Z-A'})`;
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    
    if (user.role !== 'USER') {
      alert('Only customers can add items to cart');
      return;
    }
    
    await addToCart(product, 1);
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Products</h2>
            <Badge bg="secondary">{filteredProducts.length} items</Badge>
          </div>
          
          {/* Enhanced Filter Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">🔍 Filters & Search</h5>
                <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Search and Category Row */}
              <Row className="mb-3">
                <Col lg={6} md={6} className="mb-2">
                  <Form.Label className="fw-bold">Search Products</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>🔍</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col lg={6} md={6} className="mb-2">
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              {/* Price Range Row */}
              <Row className="mb-3">
                <Col lg={3} md={6} className="mb-2">
                  <Form.Label className="fw-bold">Min Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  />
                </Col>
                <Col lg={3} md={6} className="mb-2">
                  <Form.Label className="fw-bold">Max Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="No limit"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  />
                </Col>
                <Col lg={3} md={6} className="mb-2">
                  <Form.Label className="fw-bold">Sort By</Form.Label>
                  <Dropdown as={ButtonGroup} className="w-100">
                    <Button variant="outline-primary" className="text-start">
                      {getSortLabel()}
                    </Button>
                    <Dropdown.Toggle split variant="outline-primary" />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => { setSortBy('name'); setSortOrder('asc'); }}>
                        Name (A-Z)
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => { setSortBy('name'); setSortOrder('desc'); }}>
                        Name (Z-A)
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => { setSortBy('price'); setSortOrder('asc'); }}>
                        Price (Low to High)
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => { setSortBy('price'); setSortOrder('desc'); }}>
                        Price (High to Low)
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => { setSortBy('stockQuantity'); setSortOrder('desc'); }}>
                        Stock (Most Available)
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => { setSortBy('category'); setSortOrder('asc'); }}>
                        Category (A-Z)
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col lg={3} md={6} className="mb-2">
                  <Form.Label className="fw-bold">Stock Filter</Form.Label>
                  <Form.Check
                    type="switch"
                    id="stock-switch"
                    label="Show Out of Stock"
                    checked={showOutOfStock}
                    onChange={(e) => setShowOutOfStock(e.target.checked)}
                    className="mt-2"
                  />
                </Col>
              </Row>

              {/* Active Filters Display */}
              {(searchTerm || selectedCategory || priceRange.min || priceRange.max || !showOutOfStock) && (
                <div className="mt-3 pt-3 border-top">
                  <small className="text-muted fw-bold">Active Filters:</small>
                  <div className="mt-2">
                    {searchTerm && (
                      <Badge bg="primary" className="me-2 mb-1">
                        Search: "{searchTerm}"
                        <Button 
                          variant="link" 
                          className="p-0 ms-1 text-white" 
                          style={{ fontSize: '10px' }}
                          onClick={() => setSearchTerm('')}
                        >
                          ✕
                        </Button>
                      </Badge>
                    )}
                    {selectedCategory && (
                      <Badge bg="success" className="me-2 mb-1">
                        Category: {selectedCategory}
                        <Button 
                          variant="link" 
                          className="p-0 ms-1 text-white" 
                          style={{ fontSize: '10px' }}
                          onClick={() => setSelectedCategory('')}
                        >
                          ✕
                        </Button>
                      </Badge>
                    )}
                    {(priceRange.min || priceRange.max) && (
                      <Badge bg="warning" className="me-2 mb-1">
                        Price: ₹{priceRange.min || '0'} - ₹{priceRange.max || '∞'}
                        <Button 
                          variant="link" 
                          className="p-0 ms-1 text-dark" 
                          style={{ fontSize: '10px' }}
                          onClick={() => setPriceRange({ min: '', max: '' })}
                        >
                          ✕
                        </Button>
                      </Badge>
                    )}
                    {!showOutOfStock && (
                      <Badge bg="info" className="me-2 mb-1">
                        In Stock Only
                        <Button 
                          variant="link" 
                          className="p-0 ms-1 text-white" 
                          style={{ fontSize: '10px' }}
                          onClick={() => setShowOutOfStock(true)}
                        >
                          ✕
                        </Button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Products Display */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="mt-3">
                <h5>Loading amazing products...</h5>
                <p className="text-muted">Please wait while we fetch the latest deals for you!</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting your search or filter criteria.</p>
              <Button variant="primary" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <Row>
              {filteredProducts.map((product) => (
                <Col lg={3} md={4} sm={6} key={product.id} className="mb-4">
                  <Card className="h-100 shadow-sm border-0 product-card" style={{ transition: 'all 0.3s ease' }}>
                    <div className="position-relative">
                      <Card.Img
                        variant="top"
                        src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Product+Image'}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      {product.stockQuantity === 0 && (
                        <div 
                          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                          style={{ 
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                          }}
                        >
                          OUT OF STOCK
                        </div>
                      )}
                      {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
                        <Badge 
                          bg="warning" 
                          className="position-absolute top-0 end-0 m-2"
                        >
                          Only {product.stockQuantity} left!
                        </Badge>
                      )}
                      <Badge 
                        bg="primary" 
                        className="position-absolute top-0 start-0 m-2"
                      >
                        {product.category}
                      </Badge>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold" style={{ fontSize: '1.1rem' }}>
                        {product.name}
                      </Card.Title>
                      <Card.Text className="text-muted small flex-grow-1">
                        {product.description ? product.description.substring(0, 100) + '...' : 'No description available'}
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <span className="h5 mb-0 text-primary fw-bold">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div>
                                <small className="text-muted text-decoration-line-through">
                                  ₹{product.originalPrice.toLocaleString()}
                                </small>
                                <Badge bg="danger" className="ms-2">
                                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </Badge>
                              </div>
                            )}
                          </div>
                          <small className={`fw-bold ${product.stockQuantity > 10 ? 'text-success' : product.stockQuantity > 0 ? 'text-warning' : 'text-danger'}`}>
                            {product.stockQuantity > 10 ? 'In Stock' : product.stockQuantity > 0 ? `${product.stockQuantity} left` : 'Out of Stock'}
                          </small>
                        </div>
                        <div className="d-grid gap-2">
                          <Button 
                            variant={product.stockQuantity > 0 ? (isInCart(product.id) ? "success" : "primary") : "secondary"} 
                            disabled={product.stockQuantity === 0 || (!user || user.role !== 'USER')}
                            className="fw-bold"
                            onClick={() => handleAddToCart(product)}
                          >
                            {product.stockQuantity === 0 ? "Out of Stock" : 
                             isInCart(product.id) ? `✅ In Cart (${getCartItemQuantity(product.id)})` : 
                             "🛍️ Add to Cart"}
                          </Button>
                          <Link 
                            to={`/products/${product.id}`} 
                            className="btn btn-outline-primary btn-sm"
                          >
                            👁️ View Details
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
      
      <style jsx>{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </Container>
  );
};

export default Products;
