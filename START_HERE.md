# 🎯 START HERE - Dues Collection System

## ⚠️ First Time Setup? Read This!

This project has **TWO separate applications**:
1. **Backend** (Node.js/Express) - in `backend/` folder
2. **Frontend** (React) - in `frontend/` folder

**Each has its own `package.json` file!**

## 🚀 Quick Setup (5 Steps)

### 1️⃣ Start XAMPP MySQL
- Open XAMPP Control Panel
- Click **Start** next to MySQL ✅

### 2️⃣ Create Database
- Open phpMyAdmin: http://localhost/phpmyadmin
- Create database: `dues_collection_db`
- Import: `database/schema.sql`

### 3️⃣ Setup Backend
```powershell
cd backend
copy env.example .env
npm install
```

### 4️⃣ Setup Frontend
```powershell
cd frontend
npm install
```

### 5️⃣ Create Admin & Start
```powershell
# Create admin user (from project root)
node scripts/create-admin.js

# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

## 📚 Documentation

- **[ADMIN_SETUP.md](ADMIN_SETUP.md)** - ⭐ **Complete admin setup guide** (start here!)
- **[QUICK_START.md](QUICK_START.md)** - Detailed setup guide
- **[XAMPP_SETUP.md](XAMPP_SETUP.md)** - Complete XAMPP instructions
- **[README.md](README.md)** - Full documentation

## ❌ Common Error

If you see:
```
npm error Could not read package.json
```

**You're in the wrong directory!**

✅ **Solution**: Navigate to `backend/` or `frontend/` folder first

```powershell
# Wrong ❌
cd C:\Users\Amoak\Desktop\Department_ITDS
npm install

# Right ✅
cd C:\Users\Amoak\Desktop\Department_ITDS\backend
npm install
```

## 🆘 Need Help?

1. Check [QUICK_START.md](QUICK_START.md)
2. Read error messages carefully
3. Verify you're in the correct directory
4. Check XAMPP MySQL is running

---

**Ready?** Start with Step 1 above! 🚀

