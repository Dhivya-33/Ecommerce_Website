package com.shop.service;

import com.shop.model.Product;
import com.shop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void init() {
        // Only seed if database is empty
        if (productRepository.count() == 0) {
            productRepository.save(new Product(null, "AuraSound Pro X",
                    "Premium wireless headphones with active noise cancellation, 40h battery, and spatial audio. Crafted with memory foam cushions for all-day comfort.",
                    299.99, "/images/headphones.webp", "Electronics", 25));

            productRepository.save(new Product(null, "NovaPad Ultra",
                    "12.9\" Retina tablet with M3 chip, 256GB storage, Wi-Fi 6E, and Apple Pencil support. Perfect for productivity and creativity on the go.",
                    799.99, "/images/tablet.webp", "Electronics", 12));

            productRepository.save(new Product(null, "ChronoFit Smartwatch",
                    "Advanced fitness smartwatch with heart-rate monitoring, GPS, sleep tracking, and 7-day battery life. Water resistant to 50m.",
                    199.99, "/images/smartwatch.webp", "Electronics", 40));

            productRepository.save(new Product(null, "Meridian Wool Coat",
                    "Italian merino wool overcoat with satin lining and horn buttons. A timeless outerwear piece for the modern professional.",
                    449.99, "/images/coat.webp", "Clothing", 8));

            productRepository.save(new Product(null, "Aether Runner Sneakers",
                    "Ultra-lightweight running shoes with responsive CloudFoam midsole, breathable knit upper, and reflective accents for night runs.",
                    129.99, "/images/sneakers.webp", "Clothing", 35));

            productRepository.save(new Product(null, "Lumino Desk Lamp",
                    "Minimalist LED desk lamp with wireless charging base, adjustable color temperature (2700K–6500K), and touch dimmer control.",
                    89.99, "/images/lamp.webp", "Home & Kitchen", 50));

            productRepository.save(new Product(null, "BrewMaster Espresso Machine",
                    "Professional-grade espresso machine with 15-bar pump, built-in grinder, steam wand, and programmable brew settings.",
                    549.99, "/images/espresso.webp", "Home & Kitchen", 15));

            productRepository.save(new Product(null, "Zenith Backpack",
                    "Water-resistant 30L travel backpack with padded laptop compartment, hidden anti-theft pocket, and USB charging port.",
                    79.99, "/images/backpack.webp", "Clothing", 60));
        }
    }

    public Product addProduct(Product product) {
        product.setId(null); // Ensure new ID is generated
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Optional<Product> updateProduct(Long id, Product updated) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            existing.setPrice(updated.getPrice());
            existing.setImageUrl(updated.getImageUrl());
            existing.setCategory(updated.getCategory());
            existing.setStock(updated.getStock());
            return productRepository.save(existing);
        });
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
