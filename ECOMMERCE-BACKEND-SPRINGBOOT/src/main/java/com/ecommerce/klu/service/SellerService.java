package com.ecommerce.klu.service;

import com.ecommerce.klu.model.Seller;
import com.ecommerce.klu.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public Optional<Seller> getSellerById(Long id) {
        return sellerRepository.findById(id);
    }

    public Optional<Seller> getSellerByUsername(String username) {
        return sellerRepository.findByUsername(username);
    }

    public Optional<Seller> getSellerByEmail(String email) {
        return sellerRepository.findByEmail(email);
    }

    public Optional<Seller> login(String email, String password) {
        return sellerRepository.findByEmailAndPassword(email, password);
    }

    public Seller registerSeller(Seller seller) {
        seller.setRole("SELLER");
        return sellerRepository.save(seller);
    }

    public Seller createSeller(Seller seller) {
        return sellerRepository.save(seller);
    }

    public Seller updateSeller(Seller seller) {
        return sellerRepository.save(seller);
    }

    public void deleteSeller(Long id) {
        sellerRepository.deleteById(id);
    }

    public boolean existsByUsername(String username) {
        return sellerRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return sellerRepository.existsByEmail(email);
    }
}