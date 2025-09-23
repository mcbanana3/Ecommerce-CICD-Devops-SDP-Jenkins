package com.ecommerce.klu.dto;

import java.math.BigDecimal;

public class OrderItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productBrand;
    private String productCategory;
    private String productImageUrl;
    private BigDecimal productPrice;
    private BigDecimal price;
    private Integer quantity;
    private Long sellerId;
    private String sellerBusinessName;
    private String sellerFirstName;
    private String sellerLastName;

    // Constructors
    public OrderItemDTO() {}

    public OrderItemDTO(Long id, Long productId, String productName, String productBrand, 
                       String productCategory, String productImageUrl, BigDecimal productPrice,
                       BigDecimal price, Integer quantity, Long sellerId, String sellerBusinessName,
                       String sellerFirstName, String sellerLastName) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.productBrand = productBrand;
        this.productCategory = productCategory;
        this.productImageUrl = productImageUrl;
        this.productPrice = productPrice;
        this.price = price;
        this.quantity = quantity;
        this.sellerId = sellerId;
        this.sellerBusinessName = sellerBusinessName;
        this.sellerFirstName = sellerFirstName;
        this.sellerLastName = sellerLastName;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductBrand() {
        return productBrand;
    }

    public void setProductBrand(String productBrand) {
        this.productBrand = productBrand;
    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public void setProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public String getSellerBusinessName() {
        return sellerBusinessName;
    }

    public void setSellerBusinessName(String sellerBusinessName) {
        this.sellerBusinessName = sellerBusinessName;
    }

    public String getSellerFirstName() {
        return sellerFirstName;
    }

    public void setSellerFirstName(String sellerFirstName) {
        this.sellerFirstName = sellerFirstName;
    }

    public String getSellerLastName() {
        return sellerLastName;
    }

    public void setSellerLastName(String sellerLastName) {
        this.sellerLastName = sellerLastName;
    }
}