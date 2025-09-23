package com.ecommerce.klu.repository;

import com.ecommerce.klu.model.Product;
import com.ecommerce.klu.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByBrand(String brand);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findBySeller(Seller seller);
    List<Product> findByStockQuantityGreaterThan(Integer quantity);
}