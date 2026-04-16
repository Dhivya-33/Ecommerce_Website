# Switch to MySQL (When Ready)

Your project is **MySQL-ready** but currently uses H2 so it works immediately.

## Current Setup

✅ **H2 Database** - Active (no installation needed)
✅ **MySQL Connector** - Already included in pom.xml
✅ **MySQL Configuration** - Ready to activate

## Switch to MySQL in 3 Steps

### Step 1: Install MySQL

**Easiest - Use XAMPP:**
1. Download: https://www.apachefriends.org/
2. Install XAMPP
3. Open XAMPP Control Panel
4. Click "Start" next to MySQL

**Or Install MySQL:**
1. Download: https://dev.mysql.com/downloads/mysql/
2. Install and set root password to `root`

### Step 2: Update Configuration

Edit `backend/src/main/resources/application.properties`:

**Comment out H2 lines (add # at start):**
```properties
#spring.datasource.url=jdbc:h2:file:./data/shopwave
#spring.datasource.driverClassName=org.h2.Driver
#spring.datasource.username=sa
#spring.datasource.password=
#spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

**Uncomment MySQL lines (remove # at start):**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shopwave?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

**Update password if needed:**
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3: Restart Backend

Stop and restart the backend. It will:
- Connect to MySQL
- Create `shopwave` database
- Create all tables
- Seed initial data

Done! Now using MySQL.

## Verify MySQL Connection

Check backend console for:
```
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
```

This means MySQL is connected!

## View MySQL Data

**Using MySQL Workbench:**
1. Open MySQL Workbench
2. Connect to localhost
3. Select `shopwave` database
4. Browse tables

**Using Command Line:**
```bash
mysql -u root -p
USE shopwave;
SHOW TABLES;
SELECT * FROM products;
```

## Benefits of MySQL

✅ Production-ready database
✅ Better performance for large datasets
✅ Industry standard
✅ Scalable
✅ Supports advanced features

## Rollback to H2

If you want to go back to H2:
1. Comment MySQL lines
2. Uncomment H2 lines
3. Restart backend

## Both Databases Work

Your code works with **both** H2 and MySQL:
- Same JPA repositories
- Same entities
- Same services
- Just change configuration!

---

**Use H2 now, switch to MySQL when ready!** 🚀
