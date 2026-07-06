# Quick Start Guide

## ⚠️ Important: Directory Structure

This project has **separate** `package.json` files:
- `backend/package.json` - Backend dependencies
- `frontend/package.json` - Frontend dependencies

**You must run npm commands from the correct directory!**

## 🚀 Setup Steps

### Step 1: Start XAMPP MySQL
1. Open **XAMPP Control Panel**
2. Click **Start** next to **MySQL**
3. ✅ MySQL should show as "Running"

### Step 2: Create Database

**Using phpMyAdmin (Easiest):**
1. Click **Admin** next to MySQL in XAMPP (opens http://localhost/phpmyadmin)
2. Click **New** in left sidebar
3. Database name: `dues_collection_db`
4. Click **Create**
5. Select the database, click **Import** tab
6. Choose file: `database/schema.sql`
7. Click **Go**

**Using Command Line:**
```powershell
# Navigate to XAMPP MySQL (adjust path if needed)
cd C:\xampp\mysql\bin

# Create database
.\mysql.exe -u root -e "CREATE DATABASE dues_collection_db"

# Import schema (from project root)
.\mysql.exe -u root dues_collection_db < C:\Users\Amoak\Desktop\Department_ITDS\database\schema.sql
```

### Step 3: Setup Backend

```powershell
# Navigate to backend directory
cd backend

# Copy environment file
copy env.example .env

# Edit .env file (leave DB_PASSWORD empty for XAMPP)
notepad .env

# Install backend dependencies
npm install

# Create admin user
cd ..
node scripts/create-admin.js
```

### Step 4: Setup Frontend

```powershell
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install
```

### Step 5: Start the Application

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```
✅ Should see: `✅ Database connected successfully`  
✅ Server running on: http://localhost:5000

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```
✅ Frontend running on: http://localhost:3000

### Step 6: Login

1. Open browser: http://localhost:3000
2. Login with admin credentials you created

## 📁 Project Structure

```
Department_ITDS/
├── backend/              ← npm commands here
│   ├── package.json
│   ├── .env             ← Create from env.example
│   └── ...
├── frontend/             ← npm commands here
│   ├── package.json
│   └── ...
├── database/
│   └── schema.sql        ← Import this
└── scripts/
    └── create-admin.js    ← Run from root
```

## ❌ Common Mistakes

### ❌ Running npm from root directory
```powershell
# WRONG - Don't do this!
cd C:\Users\Amoak\Desktop\Department_ITDS
npm install  # ❌ Error: no package.json
```

### ✅ Run npm from correct directory
```powershell
# CORRECT - Backend
cd C:\Users\Amoak\Desktop\Department_ITDS\backend
npm install  # ✅ Works!

# CORRECT - Frontend
cd C:\Users\Amoak\Desktop\Department_ITDS\frontend
npm install  # ✅ Works!
```

## 🔧 Troubleshooting

### "Cannot find package.json"
- **Problem**: Running npm from wrong directory
- **Solution**: Navigate to `backend/` or `frontend/` first

### "Database connection error"
- Check XAMPP MySQL is running
- Verify `.env` file exists in `backend/` directory
- Check `DB_PASSWORD=` is empty (for XAMPP default)

### "Module not found"
- Make sure you ran `npm install` in the correct directory
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## 📝 Commands Cheat Sheet

```powershell
# Backend
cd backend
npm install          # Install dependencies
npm run dev         # Start development server
npm start           # Start production server

# Frontend
cd frontend
npm install         # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production

# Database (from project root)
node scripts/create-admin.js  # Create admin user
```

## ✅ Verification Checklist

- [ ] XAMPP MySQL is running
- [ ] Database `dues_collection_db` created
- [ ] Schema imported (all tables exist)
- [ ] `backend/.env` file created and configured
- [ ] Backend dependencies installed (`backend/node_modules` exists)
- [ ] Frontend dependencies installed (`frontend/node_modules` exists)
- [ ] Admin user created
- [ ] Backend server running (http://localhost:5000)
- [ ] Frontend server running (http://localhost:3000)
- [ ] Can login to system

---

**Need help?** Check [XAMPP_SETUP.md](XAMPP_SETUP.md) for detailed instructions.

