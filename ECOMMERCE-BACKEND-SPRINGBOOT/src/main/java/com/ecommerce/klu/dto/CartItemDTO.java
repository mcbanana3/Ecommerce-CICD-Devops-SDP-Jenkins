package com.ecommerce.klu.dto;

import java.math.BigDecimal;

public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private String productImageUrl;
    private String productCategory;
    private String productBrand;
    private Integer stockQuantity;
    private Integer quantity;
    private String sellerName;
    private String sellerBusinessName;

    public CartItemDTO() {}

    public CartItemDTO(Long id, Long productId, String productName, String productDescription, 
                       BigDecimal productPrice, String productImageUrl, String productCategory,
                       String productBrand, Integer stockQuantity, Integer quantity, 
                       String sellerName, String sellerBusinessName) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productImageUrl = productImageUrl;
        this.productCategory = productCategory;
        this.productBrand = productBrand;
        this.stockQuantity = stockQuantity;
        this.quantity = quantity;
        this.sellerName = sellerName;
        this.sellerBusinessName = sellerBusinessName;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductDescription() { return productDescription; }
    public void setProductDescription(String productDescription) { this.productDescription = productDescription; }

    public BigDecimal getProductPrice() { return productPrice; }
    public void setProductPrice(BigDecimal productPrice) { this.productPrice = productPrice; }

    public String getProductImageUrl() { return productImageUrl; }
    public void setProductImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; }

    public String getProductCategory() { return productCategory; }
    public void setProductCategory(String productCategory) { this.productCategory = productCategory; }

    public String getProductBrand() { return productBrand; }
    public void setProductBrand(String productBrand) { this.productBrand = productBrand; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getSellerName() { return sellerName; }
    public void setSellerName(String sellerName) { this.sellerName = sellerName; }

    public String getSellerBusinessName() { return sellerBusinessName; }
    public void setSellerBusinessName(String sellerBusinessName) { this.sellerBusinessName = sellerBusinessName; }
}