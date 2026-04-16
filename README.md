# ShopWave - Full-Stack Ecommerce Application

A complete ecommerce web application built with **HTML/CSS/JavaScript** (frontend) and **Java Spring Boot** (backend REST API).

## Features

- **Product Catalog** - Browse products with search and category filtering
- **Product Details** - View individual product information with stock status
- **Shopping Cart** - Add, update, and remove items with live cart count
- **User Authentication** - Register and login with JWT-based authentication
- **Checkout Flow** - Complete orders with shipping information
- **Admin Panel** - Manage products (add, edit, delete) - admin access only
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- HTML5 with semantic markup
- CSS3 with modern design tokens and responsive layout
- Vanilla JavaScript (no frameworks)
- LocalStorage for cart persistence
- Fetch API for backend communication

### Backend
- Java 21
- Spring Boot 3.4.4
- Spring Security with JWT authentication
- In-memory data storage (no database required)
- RESTful API architecture
- CORS configured for frontend access

## Project Structure

```
├── backend/
│   ├── src/main/java/com/shop/
│   │   ├── config/          # Security, JWT, CORS configuration
│   │   ├── controller/      # REST API endpoints
│   │   ├── dto/             # Data transfer objects
│   │   ├── model/           # Domain models
│   │   ├── service/         # Business logic
│   │   └── ShopApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── css/
    │   └── styles.css       # Complete styling
    ├── js/
    │   ├── api.js           # API communication
    │   ├── auth.js          # Authentication module
    │   ├── cart.js          # Cart management
    │   ├── products.js      # Product display logic
    │   ├── checkout.js      # Checkout flow
    │   ├── admin.js         # Admin panel logic
    │   └── components.js    # Shared UI components
    ├── index.html           # Product listing page
    ├── product.html         # Product detail page
    ├── cart.html            # Shopping cart page
    ├── checkout.html        # Checkout page
    ├── login.html           # Login page
    ├── register.html        # Registration page
    └── admin.html           # Admin panel
```

## Prerequisites

- **Java 21** or higher
- **Maven 3.6+** (or use your IDE)
- A modern web browser (Chrome, Firefox, Safari, Edge)

**No database installation needed!** H2 embedded database is included.

## Getting Started

### 1. Build and Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Build the project using Maven:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Or run the JAR file directly:

```bash
java -jar target/shop-0.0.1-SNAPSHOT.jar
```

The backend will start on **http://localhost:8080**

You should see output like:
```
Started ShopApplication in X.XXX seconds
```

### 2. Run the Frontend

The frontend consists of static HTML/CSS/JavaScript files. You have several options:

#### Option A: Using Python (Recommended)

If you have Python installed:

```bash
cd frontend

# Python 3
python -m http.server 5500

# Python 2
python -m SimpleHTTPServer 5500
```

Access the app at **http://localhost:5500**

#### Option B: Using Node.js

If you have Node.js installed:

```bash
cd frontend
npx http-server -p 5500
```

Access the app at **http://localhost:5500**

#### Option C: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `frontend/index.html`
3. Select "Open with Live Server"

#### Option D: Direct File Access

You can open `frontend/index.html` directly in your browser, but some features may not work due to CORS restrictions. Using a local server is recommended.

## Default Credentials

The application comes with a pre-configured admin account:

- **Email:** admin@shopwave.com
- **Password:** admin123

You can also register new user accounts through the registration page.

## API Endpoints

### Public Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Authenticated Endpoints

- `POST /api/orders` - Create new order (requires authentication)

### Admin Endpoints

- `POST /api/admin/products` - Add new product (requires ADMIN role)
- `PUT /api/admin/products/{id}` - Update product (requires ADMIN role)
- `DELETE /api/admin/products/{id}` - Delete product (requires ADMIN role)

## Sample Products

The application comes pre-loaded with 8 sample products across three categories:

- **Electronics:** Headphones, Tablet, Smartwatch
- **Clothing:** Wool Coat, Sneakers, Backpack
- **Home & Kitchen:** Desk Lamp, Espresso Machine

## Usage Guide

### For Customers

1. **Browse Products** - View all products on the home page
2. **Search & Filter** - Use the search bar and category filter
3. **View Details** - Click on any product to see full details
4. **Add to Cart** - Click "Add to Cart" on products
5. **Manage Cart** - View and update quantities in the cart
6. **Checkout** - Complete your order with shipping information
7. **Create Account** - Register for a personalized experience

### For Admins

1. **Login** - Use admin credentials
2. **Access Admin Panel** - Click "Admin" in the navigation
3. **Add Products** - Click "+ Add Product" button
4. **Edit Products** - Click "Edit" on any product row
5. **Delete Products** - Click "Delete" to remove products
6. **Manage Inventory** - Update stock levels as needed

## Features Explained

### Authentication & Authorization

- JWT-based authentication with secure token storage
- Role-based access control (USER and ADMIN roles)
- Protected routes for admin functionality
- Automatic token refresh and session management

### Shopping Cart

- Persistent cart using localStorage
- Real-time cart count badge in navigation
- Quantity controls with validation
- Automatic total calculation

### Product Management

- In-memory product catalog (8 pre-loaded products)
- Full CRUD operations for admins
- Stock tracking with low-stock warnings
- Category-based organization

### Responsive Design

- Mobile-first approach
- Flexbox and Grid layouts
- Touch-friendly controls
- Optimized for all screen sizes

## Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Server port
server.port=8080

# JWT settings
jwt.secret=YourSecretKeyHere
jwt.expiration=86400000
```

### Frontend Configuration

Edit `frontend/js/api.js` to change the API base URL:

```javascript
const API_BASE = 'http://localhost:8080/api';
```

### CORS Configuration

The backend is configured to accept requests from:
- http://localhost:3000
- http://localhost:5500
- http://localhost:8081
- http://127.0.0.1 variants

To add more origins, edit `backend/src/main/java/com/shop/config/CorsConfig.java`

## Troubleshooting

### Backend Issues

**Problem:** Port 8080 already in use
```
Solution: Change the port in application.properties or stop the conflicting process
```

**Problem:** Maven build fails
```
Solution: Ensure Java 21 is installed and JAVA_HOME is set correctly
```

### Frontend Issues

**Problem:** Cannot connect to backend
```
Solution: Verify the backend is running on http://localhost:8080
Check the browser console for CORS errors
```

**Problem:** Cart not persisting
```
Solution: Ensure localStorage is enabled in your browser
Check browser privacy settings
```

**Problem:** Images not loading
```
Solution: The app uses placeholder image URLs (/images/*.webp)
Replace with actual image URLs in ProductService.java
```

## Development Notes

### Adding New Products

Edit `backend/src/main/java/com/shop/service/ProductService.java` and add products in the `init()` method:

```java
addProduct(new Product(null, "Product Name",
    "Description",
    99.99,
    "/images/product.webp",
    "Category",
    50)); // stock quantity
```

### Customizing Styles

All styles are in `frontend/css/styles.css` using CSS custom properties (variables) for easy theming.

### Security Considerations

This is a demonstration application. For production use:
- Use a real database instead of in-memory storage
- Implement proper password policies
- Add rate limiting and input validation
- Use HTTPS for all communications
- Implement CSRF protection
- Add proper error handling and logging

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is provided as-is for educational and demonstration purposes.

## Support

For issues or questions, please check:
1. Backend logs in the terminal where Spring Boot is running
2. Browser console for frontend errors
3. Network tab in browser DevTools for API calls

---

**Enjoy building with ShopWave!** 🛍️
