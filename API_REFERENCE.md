# API Reference

Complete REST API documentation for ShopWave backend.

**Base URL:** `http://localhost:8080/api`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Public Endpoints

### Get All Products

```http
GET /api/products
```

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "AuraSound Pro X",
    "description": "Premium wireless headphones...",
    "price": 299.99,
    "imageUrl": "/images/headphones.webp",
    "category": "Electronics",
    "stock": 25
  }
]
```

### Get Product by ID

```http
GET /api/products/{id}
```

**Parameters:**
- `id` (path) - Product ID

**Response:** `200 OK`

```json
{
  "id": 1,
  "name": "AuraSound Pro X",
  "description": "Premium wireless headphones...",
  "price": 299.99,
  "imageUrl": "/images/headphones.webp",
  "category": "Electronics",
  "stock": 25
}
```

**Error Response:** `404 Not Found`

---

## Authentication Endpoints

### Login

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe",
  "role": "USER"
}
```

**Error Response:** `401 Unauthorized`

```json
{
  "message": "Invalid email or password"
}
```

### Register

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe",
  "role": "USER"
}
```

**Error Response:** `409 Conflict`

```json
{
  "message": "Email already registered"
}
```

---

## Order Endpoints

### Create Order

```http
POST /api/orders
```

**Authentication:** Required

**Request Body:**

```json
{
  "customerName": "John Doe",
  "email": "john@example.com",
  "shippingAddress": "123 Main St, City, State, ZIP",
  "items": [
    {
      "productId": 1,
      "productName": "AuraSound Pro X",
      "quantity": 2,
      "price": 299.99
    }
  ],
  "total": 599.98
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "customerName": "John Doe",
  "email": "john@example.com",
  "shippingAddress": "123 Main St, City, State, ZIP",
  "items": [...],
  "total": 599.98,
  "timestamp": "2024-01-15T10:30:00"
}
```

### Get All Orders

```http
GET /api/orders
```

**Authentication:** Required

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "customerName": "John Doe",
    "email": "john@example.com",
    "shippingAddress": "123 Main St, City, State, ZIP",
    "items": [...],
    "total": 599.98,
    "timestamp": "2024-01-15T10:30:00"
  }
]
```

---

## Admin Endpoints

All admin endpoints require `ADMIN` role.

### Add Product

```http
POST /api/admin/products
```

**Authentication:** Required (ADMIN role)

**Request Body:**

```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "imageUrl": "/images/product.webp",
  "category": "Electronics",
  "stock": 50
}
```

**Response:** `201 Created`

```json
{
  "id": 9,
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "imageUrl": "/images/product.webp",
  "category": "Electronics",
  "stock": 50
}
```

### Update Product

```http
PUT /api/admin/products/{id}
```

**Authentication:** Required (ADMIN role)

**Parameters:**
- `id` (path) - Product ID

**Request Body:**

```json
{
  "name": "Updated Product",
  "description": "Updated description",
  "price": 89.99,
  "imageUrl": "/images/product.webp",
  "category": "Electronics",
  "stock": 45
}
```

**Response:** `200 OK`

```json
{
  "id": 9,
  "name": "Updated Product",
  "description": "Updated description",
  "price": 89.99,
  "imageUrl": "/images/product.webp",
  "category": "Electronics",
  "stock": 45
}
```

**Error Response:** `404 Not Found`

### Delete Product

```http
DELETE /api/admin/products/{id}
```

**Authentication:** Required (ADMIN role)

**Parameters:**
- `id` (path) - Product ID

**Response:** `204 No Content`

**Error Response:** `404 Not Found`

---

## Error Responses

### 400 Bad Request

```json
{
  "message": "Invalid request data"
}
```

### 401 Unauthorized

```json
{
  "message": "Unauthorized"
}
```

Token is missing, invalid, or expired.

### 403 Forbidden

```json
{
  "message": "Access denied"
}
```

User doesn't have required role (e.g., trying to access admin endpoints without ADMIN role).

### 404 Not Found

```json
{
  "message": "Resource not found"
}
```

### 409 Conflict

```json
{
  "message": "Resource already exists"
}
```

---

## CORS Configuration

The API accepts requests from:
- `http://localhost:3000`
- `http://localhost:5500`
- `http://localhost:8081`
- `http://127.0.0.1:*` (all ports)

Allowed methods: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`

---

## JWT Token

### Token Structure

The JWT token contains:
- `sub` (subject) - Username
- `role` - User role (USER or ADMIN)
- `iat` (issued at) - Token creation timestamp
- `exp` (expiration) - Token expiration timestamp

### Token Expiration

Tokens expire after 24 hours (86400000 milliseconds).

### Token Usage

Include the token in the Authorization header for all authenticated requests:

```javascript
fetch('http://localhost:8080/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify(orderData)
})
```

---

## Testing with cURL

### Get Products

```bash
curl http://localhost:8080/api/products
```

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shopwave.com","password":"admin123"}'
```

### Create Order (with token)

```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "customerName": "John Doe",
    "email": "john@example.com",
    "shippingAddress": "123 Main St",
    "items": [{"productId":1,"productName":"Product","quantity":1,"price":99.99}],
    "total": 99.99
  }'
```

### Add Product (admin only)

```bash
curl -X POST http://localhost:8080/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE" \
  -d '{
    "name": "New Product",
    "description": "Description",
    "price": 99.99,
    "imageUrl": "/images/product.webp",
    "category": "Electronics",
    "stock": 50
  }'
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production use, consider adding rate limiting to prevent abuse.

## Pagination

Currently, all endpoints return complete datasets. For production use with large datasets, implement pagination.

---

**Last Updated:** 2024
