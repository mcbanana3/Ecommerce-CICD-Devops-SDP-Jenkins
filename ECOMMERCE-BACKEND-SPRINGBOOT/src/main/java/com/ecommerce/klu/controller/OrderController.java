package com.ecommerce.klu.controller;

import com.ecommerce.klu.dto.OrderDTO;
import com.ecommerce.klu.model.Order;
import com.ecommerce.klu.model.User;
import com.ecommerce.klu.service.OrderService;
import com.ecommerce.klu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:2030/reactecommerceapi")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrdersDTO());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        Optional<OrderDTO> order = orderService.getOrderByIdDTO(id);
        return order.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUser(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(orderService.getOrdersByUserDTO(user.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<OrderDTO>> getOrdersByStatus(@PathVariable String status) {
        return ResponseEntity.ok(orderService.getOrdersByStatusDTO(status));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<OrderDTO>> getOrdersBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(orderService.getOrdersBySellerDTO(sellerId));
    }

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestParam Long userId,
                                             @RequestParam String shippingAddress,
                                             @RequestParam String paymentMethod) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            OrderDTO order = orderService.createOrderDTO(user.get(), shippingAddress, paymentMethod);
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        OrderDTO updatedOrder = orderService.updateOrderStatusDTO(id, status);
        if (updatedOrder != null) {
            return ResponseEntity.ok(updatedOrder);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}