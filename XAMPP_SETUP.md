# XAMPP Setup Guide

This guide will help you set up the Dues Collection System using XAMPP for the database.

## 📋 Prerequisites

1. **XAMPP** installed on your system
   - Download from: https://www.apachefriends.org/
   - Install XAMPP (includes MySQL/MariaDB, Apache, PHP)
   
2. **Node.js** 18+ installed
   - Download from: https://nodejs.org/

## 🚀 Step-by-Step Setup

### Step 1: Start XAMPP Services

1. Open **XAMPP Control Panel**
2. Start **MySQL** service (click "Start" button)
   - MySQL should show as "Running" (green)
   - Default port: 3306

### Step 2: Create Database

You have two options:

#### Option A: Using phpMyAdmin (Recommended)

1. In XAMPP Control Panel, click **"Admin"** next to MySQL (or open http://localhost/phpmyadmin)
2. Click on **"New"** in the left sidebar
3. Enter database name: `dues_collection_db`
4. Select collation: `utf8mb4_general_ci` (or `utf8mb4_unicode_ci`)
5. Click **"Create"**

#### Option B: Using MySQL Command Line

1. Open Command Prompt or Terminal
2. Navigate to XAMPP MySQL bin directory:
   ```bash
   # Windows
   cd C:\xampp\mysql\bin
   
   # Or add to PATH
   ```
3. Connect to MySQL:
   ```bash
   mysql -u root
   # (XAMPP default has no password for root)
   ```
4. Create database:
   ```sql
   CREATE DATABASE dues_collection_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   EXIT;
   ```

### Step 3: Import Database Schema

#### Using phpMyAdmin:

1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Select `dues_collection_db` database from left sidebar
3. Click on **"Import"** tab
4. Click **"Choose File"** and select `database/schema.sql`
5. Click **"Go"** at the bottom
6. Wait for import to complete (you should see success message)

#### Using Command Line:

1. Open Command Prompt/Terminal
2. Navigate to project directory:
   ```bash
   cd path/to/Department_ITDS
   ```
3. Import schema:
   ```bash
   # Windows
   C:\xampp\mysql\bin\mysql.exe -u root dues_collection_db < database\schema.sql
   
   # Linux/Mac (if XAMPP is installed)
   /opt/lampp/bin/mysql -u root dues_collection_db < database/schema.sql
   ```

### Step 4: Verify Database Setup

1. Open phpMyAdmin
2. Select `dues_collection_db` database
3. You should see these tables:
   - `roles`
   - `users`
   - `courses`
   - `students`
   - `payment_methods`
   - `payments`
   - `activity_logs`
   - `notifications`
   - `payment_verification_queue`
   - `system_settings`

4. Check if roles are inserted:
   - Click on `roles` table
   - You should see 4 roles: admin, course_rep, student, hod

### Step 5: Configure Backend

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Copy environment file:
   ```bash
   # Windows
   copy env.example .env
   
   # Linux/Mac
   cp env.example .env
   ```

3. Edit `.env` file and update database settings:
   ```env
   # Database Configuration (XAMPP)
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=dues_collection_db
   DB_PORT=3306
   ```
   
   **Important**: 
   - If you set a password for MySQL root user, add it to `DB_PASSWORD`
   - By default, XAMPP MySQL root has no password (leave empty)

4. Install backend dependencies:
   ```bash
   npm install
   ```

### Step 6: Configure Frontend

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

### Step 7: Start the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   You should see: `✅ Database connected successfully`
   Server running on: http://localhost:5000

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend running on: http://localhost:3000

### Step 8: Create Admin User

You need to create an admin user to access the system. You can do this via:

#### Option A: Using MySQL Command Line

```sql
-- Connect to MySQL
mysql -u root dues_collection_db

-- Insert admin user (password: admin123 - CHANGE THIS!)
-- Password hash is for 'admin123'
INSERT INTO users (username, email, password_hash, role_id, full_name, is_active)
VALUES (
  'admin',
  'admin@itds.edu.gh',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqJqJqJqJq', -- Change this!
  (SELECT id FROM roles WHERE name = 'admin'),
  'System Administrator',
  TRUE
);
```

**Better Option**: Use the API to create admin user after starting the server, or create a setup script.

#### Option B: Create Setup Script

Create a file `scripts/create-admin.js`:

```javascript
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: './backend/.env' });

async function createAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dues_collection_db',
  });

  const password = 'admin123'; // CHANGE THIS!
  const hashedPassword = await bcrypt.hash(password, 12);

  await connection.execute(
    `INSERT INTO users (username, email, password_hash, role_id, full_name, is_active)
     VALUES (?, ?, ?, (SELECT id FROM roles WHERE name = 'admin'), ?, TRUE)`,
    ['admin', 'admin@itds.edu.gh', hashedPassword, 'System Administrator']
  );

  console.log('✅ Admin user created!');
  console.log('Username: admin');
  console.log('Password: admin123 (CHANGE THIS IMMEDIATELY!)');
  connection.end();
}

createAdmin().catch(console.error);
```

Run it:
```bash
cd backend
node ../scripts/create-admin.js
```

## 🔧 Troubleshooting

### MySQL Won't Start

1. **Port 3306 already in use**:
   - Check if another MySQL service is running
   - Stop other MySQL services
   - Or change XAMPP MySQL port in `xampp/mysql/bin/my.ini`

2. **Permission issues**:
   - Run XAMPP Control Panel as Administrator (Windows)
   - Check file permissions for XAMPP directory

### Database Connection Error

1. **Check MySQL is running** in XAMPP Control Panel
2. **Verify credentials** in `backend/.env`:
   - `DB_HOST=localhost`
   - `DB_USER=root`
   - `DB_PASSWORD=` (empty if no password set)
   - `DB_NAME=dues_collection_db`
   - `DB_PORT=3306`

3. **Test connection manually**:
   ```bash
   mysql -u root -h localhost dues_collection_db
   ```

### Import Schema Fails

1. **Check file path** is correct
2. **Verify database exists** before importing
3. **Check for syntax errors** in schema.sql
4. **Try importing via command line** instead of phpMyAdmin

### "Access Denied" Error

1. **Check MySQL root password**:
   - If you set a password, update `DB_PASSWORD` in `.env`
   - If no password, leave `DB_PASSWORD=` empty

2. **Reset MySQL root password** (if needed):
   ```sql
   -- In MySQL command line
   ALTER USER 'root'@'localhost' IDENTIFIED BY '';
   FLUSH PRIVILEGES;
   ```

## 📝 Default XAMPP MySQL Settings

- **Host**: localhost
- **Port**: 3306
- **Username**: root
- **Password**: (empty by default)
- **Socket**: (not needed for TCP connection)

## 🔐 Security Notes

⚠️ **Important for Production**:
- XAMPP is for **development only**
- Never use XAMPP in production
- Set strong passwords for MySQL users
- Use proper database user with limited privileges
- Enable MySQL authentication plugin

## ✅ Verification Checklist

- [ ] XAMPP MySQL service is running
- [ ] Database `dues_collection_db` created
- [ ] Schema imported successfully (all tables exist)
- [ ] Roles table has 4 roles
- [ ] Backend `.env` configured correctly
- [ ] Backend connects to database successfully
- [ ] Admin user created
- [ ] Frontend and backend running
- [ ] Can login to system

## 🎯 Next Steps

After setup:
1. Login with admin credentials
2. Create course representatives
3. Create courses and assign reps
4. Configure payment gateway (Paystack)
5. Set up email and SMS services
6. Test the system

---

**Need Help?** Check the main README.md or create an issue.

