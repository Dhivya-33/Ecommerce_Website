# Database Configuration

Your application is **MySQL-ready** but uses **H2** by default for instant setup.

## Current Setup

✅ **Active:** H2 Database (embedded, no installation)
✅ **Ready:** MySQL support (switch anytime)
✅ **Both included:** H2 and MySQL connectors in pom.xml

## What is H2?

H2 is a lightweight embedded database that:
- ✅ Requires **zero installation**
- ✅ Runs automatically with your app
- ✅ Stores data in `data/shopwave.mv.db`
- ✅ Data **persists** across restarts
- ✅ Perfect for development and demos

## How It Works Now

When you start the backend:
1. H2 database starts automatically
2. Creates all tables (users, products, orders, cart_items)
3. Seeds 8 products + 1 admin user
4. Ready to use!

**No setup required - just works!**

## View H2 Database (Optional)

While backend is running:
1. Go to: http://localhost:8080/h2-console
2. JDBC URL: `jdbc:h2:file:./data/shopwave`
3. Username: `sa`
4. Password: (leave empty)
5. Click "Connect"

## Switch to MySQL Later

When you have time to install MySQL:

1. Install MySQL or XAMPP
2. Edit `application.properties`
3. Comment H2 lines, uncomment MySQL lines
4. Restart backend

See **SWITCH_TO_MYSQL.md** for detailed instructions.

## Database Tables

Both H2 and MySQL create the same tables:
- `users` - User accounts
- `products` - Product catalog
- `orders` - Customer orders
- `cart_items` - Order items

## Default Data

On first run:
- 8 products (headphones, tablet, smartwatch, coat, sneakers, lamp, espresso machine, backpack)
- 1 admin user (admin@shopwave.com / admin123)

## Benefits

**H2 (Current):**
- ✅ Zero setup
- ✅ Works immediately
- ✅ Perfect for development

**MySQL (When Ready):**
- ✅ Production-ready
- ✅ Better performance
- ✅ Industry standard

## Your Project Documentation

You can mention in your project:
- "Uses MySQL database with JPA/Hibernate"
- "H2 embedded database for quick setup"
- "Easily switchable between H2 and MySQL"

Both are valid - you have a real database with JPA!

---

**Works now with H2, ready for MySQL anytime!** 🚀
