package com.ecommerce.klu.service;

import com.ecommerce.klu.model.Product;
import com.ecommerce.klu.model.Seller;
import com.ecommerce.klu.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    public List<Product> getProductsBySeller(Seller seller) {
        return productRepository.findBySeller(seller);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Product> getAvailableProducts() {
        return productRepository.findByStockQuantityGreaterThan(0);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public void updateStock(Long productId, Integer quantity) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            product.setStockQuantity(product.getStockQuantity() - quantity);
            productRepository.save(product);
        }
    }
}