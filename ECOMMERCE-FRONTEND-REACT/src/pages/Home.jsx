import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const [statsCount, setStatsCount] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    sellers: 0
  });

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (statsInView) {
      const animateCounter = (target, key) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setStatsCount(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 20);
      };

      animateCounter(5000, 'products');
      animateCounter(10000, 'customers');
      animateCounter(25000, 'orders');
      animateCounter(500, 'sellers');
    }
  }, [statsInView]);

  useEffect(() => {
    setTimeout(() => {
      setFeaturedProducts([
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: 2999,
          originalPrice: 3999,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.8,
          discount: 25
        },
        {
          id: 2,
          name: "Smart Watch Series 7",
          price: 15999,
          originalPrice: 19999,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.9,
          discount: 20
        },
        {
          id: 3,
          name: "Laptop Backpack Pro",
          price: 1299,
          originalPrice: 1599,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.6,
          discount: 19
        },
        {
          id: 4,
          name: "Mechanical Gaming Keyboard",
          price: 4499,
          originalPrice: 5999,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.7,
          discount: 25
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div style={{ 
      overflow: 'hidden', 
      margin: 0, 
      padding: 0,
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw'
    }}>
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          margin: 0,
          padding: 0
        }}
      >
        <Container fluid style={{ position: 'relative', zIndex: 2, maxWidth: '100%', padding: '0 2rem' }}>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div variants={itemVariants}>
                <div className="d-flex align-items-center mb-3">
                  <span 
                    className="badge bg-warning text-dark px-3 py-2"
                    style={{ borderRadius: '25px', fontSize: '1rem' }}
                  >
                    ✨ New Arrivals
                  </span>
                </div>
                <h1 style={{ 
                  fontSize: '4rem', 
                  fontWeight: '800',
                  marginBottom: '1.5rem',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  lineHeight: '1.2'
                }}>
                  Shop the Future
                  <span className="d-block">Today ✨</span>
                </h1>
              </motion.div>
              <motion.p 
                variants={itemVariants}
                style={{ 
                  fontSize: '1.3rem', 
                  marginBottom: '2rem', 
                  opacity: 0.9,
                  lineHeight: '1.6'
                }}
              >
                Discover amazing products from trusted sellers. Experience shopping 
                like never before with our curated collection of premium items.
              </motion.p>
              <motion.div variants={itemVariants} className="d-flex flex-wrap gap-3">
                <Link 
                  to="/products" 
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    border: 'none',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderRadius: '50px',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 10px 25px rgba(240, 147, 251, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  🛍️ Start Shopping
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-outline-light"
                  style={{ 
                    padding: '15px 30px', 
                    borderRadius: '50px',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  ❤️ Join Community
                </Link>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div variants={itemVariants} className="text-center">
                <motion.img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Shopping Experience"
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        ref={statsRef}
        style={{
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          padding: '80px 0',
          color: 'white',
          width: '100vw',
          margin: 0
        }}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <Container fluid style={{ maxWidth: '100%', padding: '0 2rem' }}>
          <motion.div className="text-center mb-5" variants={itemVariants}>
            <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
              Trusted by Millions
            </h2>
            <p className="lead" style={{ opacity: 0.75 }}>
              Numbers that showcase our commitment to excellence
            </p>
          </motion.div>
          <Row>
            {[
              { icon: '🔥', count: statsCount.products, label: 'Premium Products' },
              { icon: '⭐', count: statsCount.customers, label: 'Happy Customers' },
              { icon: '🚚', count: statsCount.orders, label: 'Orders Delivered' },
              { icon: '🛡️', count: statsCount.sellers, label: 'Trusted Sellers' }
            ].map((stat, index) => (
              <Col md={3} key={index} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '2rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  variants={itemVariants}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{stat.icon}</div>
                  <h3 style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {stat.count.toLocaleString()}+
                  </h3>
                  <p className="mb-0">{stat.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      {/* Features Section */}
      <div style={{ width: '100vw', margin: 0, padding: '80px 0', background: '#f8f9fa' }}>
        <Container fluid style={{ maxWidth: '100%', padding: '0 2rem' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-5" variants={itemVariants}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '700',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Why Choose Us?
            </h2>
            <p className="lead text-muted">Experience the difference with our premium services</p>
          </motion.div>
          <Row>
            {[
              { icon: '🚚', title: 'Lightning Fast Delivery', desc: 'Free shipping on orders over ₹500', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
              { icon: '🛡️', title: 'Bank-Level Security', desc: '100% secure payment processing', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
              { icon: '🔄', title: 'Hassle-Free Returns', desc: '30-day money-back guarantee', gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' },
              { icon: '💬', title: '24/7 Expert Support', desc: 'Always here when you need us', gradient: 'linear-gradient(135deg, #45b7d1 0%, #2196f3 100%)' }
            ].map((feature, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    height: '100%',
                    textAlign: 'center'
                  }}
                >
                  <div 
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                      background: feature.gradient,
                      fontSize: '2rem'
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h5 className="mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
        </Container>
      </div>

      {/* Featured Products */}
      <div style={{ width: '100vw', margin: 0, padding: '80px 0', background: 'white' }}>
        <Container fluid style={{ maxWidth: '100%', padding: '0 2rem' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-5" variants={itemVariants}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Hot Deals 🔥
            </h2>
            <p className="lead text-muted">Limited time offers you can't resist</p>
          </motion.div>
          
          {loading ? (
            <div className="text-center py-5">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1rem'
              }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: '12px',
                      height: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: `pulse 1.4s ease-in-out infinite`,
                      animationDelay: `${i * 0.16}s`
                    }}
                  />
                ))}
              </div>
              <p className="text-muted">Loading amazing deals...</p>
            </div>
          ) : (
            <Row>
              {featuredProducts.map((product) => (
                <Col lg={3} md={6} key={product.id} className="mb-4">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    className="h-100"
                  >
                    <Card style={{ 
                      border: 'none',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease'
                    }} className="h-100">
                      <div className="position-relative">
                        <Card.Img
                          variant="top"
                          src={product.image}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <Badge 
                          bg="danger" 
                          className="position-absolute top-0 start-0 m-2"
                        >
                          -{product.discount}%
                        </Badge>
                        <div className="position-absolute top-0 end-0 m-2">
                          <Button 
                            variant="link" 
                            className="text-white p-1"
                            style={{ fontSize: '1.2rem' }}
                          >
                            ❤️
                          </Button>
                        </div>
                      </div>
                      <Card.Body>
                        <Card.Title className="mb-2">{product.name}</Card.Title>
                        <div className="d-flex align-items-center mb-2">
                          <div className="d-flex text-warning me-2">
                            {'⭐'.repeat(Math.floor(product.rating))}
                          </div>
                          <small className="text-muted">({product.rating})</small>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <span className="h5 text-primary mb-0">₹{product.price.toLocaleString()}</span>
                            <small className="text-muted text-decoration-line-through ms-2">
                              ₹{product.originalPrice.toLocaleString()}
                            </small>
                          </div>
                          <Button 
                            size="sm" 
                            variant="primary"
                            style={{ borderRadius: '50%', padding: '8px 12px' }}
                          >
                            🛍️
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </motion.div>
        </Container>
      </div>

      {/* Call to Action */}
      <motion.section 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px 0',
          color: 'white',
          textAlign: 'center',
          width: '100vw',
          margin: 0
        }}
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <Container fluid style={{ maxWidth: '100%', padding: '0 2rem' }}>
          <motion.div variants={itemVariants}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🎁</div>
            <h2 className="mb-3">Ready to Start Your Shopping Journey?</h2>
            <p className="lead mb-4" style={{ opacity: 0.75 }}>
              Join millions of happy customers and discover amazing deals every day
            </p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Link 
                to="/products" 
                className="btn"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Browse Products
              </Link>
              <Link 
                to="/register" 
                className="btn"
                style={{
                  background: 'transparent',
                  border: '2px solid white',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#667eea';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </Container>
      </motion.section>

      <style jsx>{`
        @keyframes pulse {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        :global(body) {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden !important;
        }
        
        :global(.container),
        :global(.container-fluid) {
          margin: 0 !important;
          padding-left: 2rem !important;
          padding-right: 2rem !important;
          max-width: none !important;
        }
        
        :global(.main-content) {
          margin: 0 !important;
          padding: 0 !important;
          width: 100vw !important;
        }
        
        :global(*) {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
