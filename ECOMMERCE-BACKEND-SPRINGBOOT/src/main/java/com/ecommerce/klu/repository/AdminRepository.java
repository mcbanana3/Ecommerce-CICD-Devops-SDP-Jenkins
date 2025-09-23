package com.ecommerce.klu.repository;

import com.ecommerce.klu.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
    Optional<Admin> findByEmail(String email);
    Optional<Admin> findByEmailAndPassword(String email, String password);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}