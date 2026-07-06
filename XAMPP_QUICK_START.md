# XAMPP Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Start XAMPP MySQL
- Open XAMPP Control Panel
- Click **Start** next to MySQL
- ✅ MySQL should show as "Running"

### 2. Create Database
**Option A - phpMyAdmin:**
1. Click **Admin** next to MySQL (opens phpMyAdmin)
2. Click **New** → Enter: `dues_collection_db` → **Create**
3. Click **Import** → Choose `database/schema.sql` → **Go**

**Option B - Command Line:**
```bash
mysql -u root -e "CREATE DATABASE dues_collection_db"
mysql -u root dues_collection_db < database/schema.sql
```

### 3. Configure Backend
```bash
cd backend
copy env.example .env
# Edit .env: DB_PASSWORD= (leave empty for XAMPP)
npm install
```

### 4. Create Admin User
```bash
node ../scripts/create-admin.js
# Follow prompts to create admin account
```

### 5. Start Application
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2  
cd frontend
npm run dev
```

### 6. Login
- Open: http://localhost:3000
- Login with admin credentials

## 🔧 Common Issues

**MySQL won't start?**
- Port 3306 in use → Stop other MySQL services
- Run XAMPP as Administrator

**Database connection error?**
- Check MySQL is running in XAMPP
- Verify `.env` has `DB_PASSWORD=` (empty)
- Test: `mysql -u root`

**Import fails?**
- Make sure database exists first
- Check file path is correct
- Try command line import instead

## 📝 Default XAMPP Settings
- Host: `localhost`
- User: `root`
- Password: (empty)
- Port: `3306`

---

**Full guide:** See [XAMPP_SETUP.md](XAMPP_SETUP.md)

