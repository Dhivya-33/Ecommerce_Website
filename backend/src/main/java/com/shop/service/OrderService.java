package com.shop.service;

import com.shop.model.Order;
import com.shop.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(Order order) {
        order.setId(null); // Ensure new ID is generated
        order.setTimestamp(LocalDateTime.now());
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByTimestampDesc();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }
}
