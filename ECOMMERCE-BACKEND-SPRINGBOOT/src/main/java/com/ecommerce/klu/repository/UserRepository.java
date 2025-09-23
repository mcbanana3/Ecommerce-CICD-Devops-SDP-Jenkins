package com.ecommerce.klu.repository;

import com.ecommerce.klu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}