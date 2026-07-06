# Admin User Setup Guide

This guide will walk you through creating your first admin user for the Dues Collection System.

## 📋 Prerequisites

Before creating an admin user, make sure:

- ✅ XAMPP MySQL is running
- ✅ Database `dues_collection_db` exists
- ✅ Database schema has been imported (`database/schema.sql`)
- ✅ Backend `.env` file is configured

## 🚀 Step-by-Step Setup

### Step 1: Verify Database Setup

First, check if your database is ready:

```powershell
node scripts/check-users.js
```

**Expected output:**
- ✅ Connected to database
- 📋 Found 4 roles (admin, course_rep, student, hod)
- ⚠️ No users found (this is normal if you haven't created any yet)

**If you see errors:**
- **Database connection error**: Check XAMPP MySQL is running and `.env` file is correct
- **Database not found**: Import `database/schema.sql` first
- **Roles not found**: The schema wasn't imported correctly

### Step 2: Create Admin User

Run the admin creation script:

```powershell
node scripts/create-admin.js
```

**The script will ask you for:**

1. **Username** (default: `admin`)
   - Press Enter to use default, or type a custom username
   - Example: `admin` or `john_doe`

2. **Email** (default: `admin@itds.edu.gh`)
   - Press Enter to use default, or type a custom email
   - Example: `admin@itds.edu.gh` or `john.doe@itds.edu.gh`

3. **Full Name** (default: `System Administrator`)
   - Press Enter to use default, or type a custom name
   - Example: `System Administrator` or `John Doe`

4. **Password** (required, minimum 8 characters)
   - Type a strong password (at least 8 characters)
   - Example: `Admin123!` or `SecurePass2024`
   - ⚠️ **Remember this password!** You'll need it to login.

**Example interaction:**
```
🔐 Admin User Creation Script

This script will create an admin user for the Dues Collection System.

Enter admin username (default: admin): [Press Enter]
Enter admin email (default: admin@itds.edu.gh): [Press Enter]
Enter admin full name (default: System Administrator): [Press Enter]
Enter admin password (min 8 characters): Admin123!

📡 Connecting to database...
✅ Connected to database

✅ Admin user created successfully!

📋 User Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Username: admin
Email: admin@itds.edu.gh
Full Name: System Administrator
Role: admin
Status: ✅ Active
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Setup complete! You can now login to the system.
⚠️  Remember to change the password after first login!
```

### Step 3: Verify Admin User

Check that your admin user was created successfully:

```powershell
node scripts/check-users.js
```

**Expected output:**
- ✅ Found 1 user(s)
- ✅ Found 1 active admin user(s)
- Shows your admin user details

### Step 4: Test Login

Test your admin credentials:

```powershell
node scripts/test-login.js admin Admin123!
```

Replace `admin` with your username and `Admin123!` with your password.

**Expected output:**
```
🔐 Testing login endpoint...
URL: http://localhost:5000/api/v1/auth/login
Username: admin

✅ Login successful!

Response: {
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@itds.edu.gh",
      "full_name": "System Administrator",
      "role": "admin",
      "role_id": 1
    }
  }
}
```

### Step 5: Login via Frontend

1. **Make sure backend is running:**
   ```powershell
   cd backend
   npm run dev
   ```

2. **Make sure frontend is running:**
   ```powershell
   cd frontend
   npm run dev
   ```

3. **Open browser:** http://localhost:3000

4. **Login with your credentials:**
   - Username: `admin` (or your custom username)
   - Password: `Admin@123` (or your password)

## 🔧 Troubleshooting

### Issue: "User already exists"

**Solution:** The script will ask if you want to update the existing user. Type `yes` to update the password.

### Issue: "Database connection error"

**Check:**
1. XAMPP MySQL is running (green in XAMPP Control Panel)
2. `backend/.env` file exists and has correct settings:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=          # Empty for XAMPP default
   DB_NAME=dues_collection_db
   DB_PORT=3306
   ```

### Issue: "Database does not exist"

**Solution:**
1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Create database: `dues_collection_db`
3. Import `database/schema.sql`

### Issue: "Roles not found"

**Solution:** The database schema wasn't imported. Import `database/schema.sql` again.

### Issue: "Password reset needed"

If you forgot your password, reset it:

```powershell
node scripts/reset-admin-password.js admin NewPassword123!
```

Or run interactively:
```powershell
node scripts/reset-admin-password.js
```

## 📝 Quick Reference

### Create Admin User
```powershell
node scripts/create-admin.js
```

### Check Existing Users
```powershell
node scripts/check-users.js
```

### Reset Password
```powershell
node scripts/reset-admin-password.js [username] [new_password]
```

### Test Login
```powershell
node scripts/test-login.js [username] [password]
```

## ✅ Success Checklist

- [ ] Database is connected
- [ ] Roles table has 4 roles
- [ ] Admin user created successfully
- [ ] Can verify user exists (`check-users.js`)
- [ ] Can login via test script (`test-login.js`)
- [ ] Can login via frontend (http://localhost:3000)

## 🔐 Security Best Practices

1. **Use a strong password:**
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers, and symbols
   - Example: `Admin@2024!`

2. **Change default password:**
   - After first login, change your password
   - Don't share admin credentials

3. **Keep credentials secure:**
   - Don't commit `.env` file to git
   - Don't share passwords in plain text

## 🆘 Need Help?

If you encounter issues:

1. Run `node scripts/check-users.js` to diagnose
2. Check XAMPP MySQL is running
3. Verify `.env` file configuration
4. Check backend server logs for errors

---

**Ready to proceed?** Start with Step 1: `node scripts/check-users.js`

