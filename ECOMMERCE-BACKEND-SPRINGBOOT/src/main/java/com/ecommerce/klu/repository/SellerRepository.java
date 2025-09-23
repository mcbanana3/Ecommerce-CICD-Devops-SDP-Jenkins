package com.ecommerce.klu.repository;

import com.ecommerce.klu.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    Optional<Seller> findByUsername(String username);
    Optional<Seller> findByEmail(String email);
    Optional<Seller> findByEmailAndPassword(String email, String password);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}