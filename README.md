# Dues Collection System

A secure, scalable, web-based Dues Collection System for the Department of Information Technology and Decision Sciences.

## ⚠️ Important: Directory Structure

**This project has separate `package.json` files:**
- `backend/package.json` - Run npm commands from `backend/` directory
- `frontend/package.json` - Run npm commands from `frontend/` directory

**❌ Don't run npm from the root directory!**  
**✅ Always navigate to `backend/` or `frontend/` first!**

👉 **New to the project?** Start with [START_HERE.md](START_HERE.md) or [QUICK_START.md](QUICK_START.md)

## 🎯 Features

- **Role-Based Access Control (RBAC)**: Admin, Course Representative, and Head of Department roles
- **Secure Authentication**: JWT-based authentication with password hashing
- **Physical Payment Recording**: Manual recording of payments made physically (cash or mobile money)
- **Email Notifications**: Automatic email confirmations to students and HOD when payments are recorded
- **Activity Monitoring**: Comprehensive activity logging and audit trails
- **Analytics Dashboard**: Real-time statistics and reporting for administrators
- **Student Management**: Course representatives can register and manage students
- **Payment Tracking**: Complete payment history with receipt numbers
- **Admin-Only User Creation**: Only administrators can create course representative accounts

## 🏗️ System Architecture

### Technology Stack

- **Frontend**: React 18 with Vite, TailwindCSS, React Query
- **Backend**: Node.js with Express.js
- **Database**: MySQL 8.0 (via XAMPP)
- **Email Service**: SMTP (configurable - Nodemailer)
- **Authentication**: JWT (JSON Web Tokens)

## 📋 Prerequisites

- **XAMPP** (includes MySQL) - Download from https://www.apachefriends.org/
- **Node.js 18+** and npm - Download from https://nodejs.org/
- SMTP email account (Gmail, SendGrid, etc.) - Required for email notifications

## 🚀 Quick Start

### Option 1: XAMPP Setup (Recommended for Local Development)

**Perfect for Windows users!** See detailed guide: [XAMPP_SETUP.md](XAMPP_SETUP.md)

1. **Install XAMPP** (includes MySQL):
   - Download from: https://www.apachefriends.org/
   - Install and start MySQL service in XAMPP Control Panel

2. **Set up database**:
   ```bash
   # Using phpMyAdmin (http://localhost/phpmyadmin)
   # 1. Create database: dues_collection_db
   # 2. Import database/schema.sql
   
   # OR using command line:
   mysql -u root < database/schema.sql
   ```

3. **Configure backend**:
   ```powershell
   # Navigate to backend directory FIRST!
   cd backend
   
   # Copy environment file
   copy env.example .env
   
   # Edit .env - set DB_PASSWORD= (empty for XAMPP default)
   # You can use: notepad .env
   
   # Install dependencies (must be in backend/ directory!)
   npm install
   ```

4. **Create admin user**:
   ```powershell
   # From project root directory
   node scripts/create-admin.js
   ```

5. **Start services**:
   ```powershell
   # Terminal 1 - Backend (must be in backend/ directory!)
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend (must be in frontend/ directory!)
   cd frontend
   npm run dev
   ```

6. **Access application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Option 2: Manual Setup (Standalone MySQL)

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
# For XAMPP: DB_PASSWORD= (leave empty if no password)
```

4. Set up database:
```bash
# Create database and import schema
mysql -u root -p < ../database/schema.sql

# OR for XAMPP (no password):
mysql -u root < ../database/schema.sql
```

5. Create admin user:
```bash
node ../scripts/create-admin.js
```

6. Start the server:
```bash
npm run dev
```

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## 📁 Project Structure

```
Department_ITDS/
├── backend/
│   ├── config/          # Configuration files (database, auth)
│   ├── middleware/      # Express middleware (auth, validation)
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic services
│   ├── utils/           # Utility functions (notifications, logging)
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts (Auth)
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── App.jsx      # Main app component
│   └── package.json
├── database/
│   └── schema.sql       # Database schema
└── README.md
```

## 🔐 User Roles & Permissions

### Admin
- Create, update, and delete user accounts
- Assign course representatives to courses
- View all transactions and activities
- Access analytics and reports
- Export data (PDF/Excel)

### Course Representative
- Register students under assigned courses
- Initiate payments on behalf of students
- View payment status for their courses
- Cannot modify confirmed financial records

### Student
- **Note**: Students do not have login access to the system
- Information is recorded by course representatives when they make physical payments
- Receive email confirmation when payment is recorded

### Head of Department (HOD)
- Receive automatic email notifications for all payments
- View read-only dashboard with payment summaries
- Access analytics and reports

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user (Admin only)
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user profile

### Students
- `POST /api/v1/students` - Register new student
- `GET /api/v1/students` - Get all students (with filters)
- `GET /api/v1/students/:id` - Get student by ID
- `PUT /api/v1/students/:id` - Update student
- `DELETE /api/v1/students/:id` - Deactivate student

### Courses
- `POST /api/v1/courses` - Create new course (Admin only)
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get course by ID
- `PUT /api/v1/courses/:id` - Update course
- `DELETE /api/v1/courses/:id` - Deactivate course

### Payments
- `POST /api/v1/payments/record` - Record a physical payment (Course Rep, Admin)
- `GET /api/v1/payments` - Get all payments (with filters)
- `GET /api/v1/payments/:id` - Get payment by ID
- `GET /api/v1/payments/student/:indexNumber` - Get payments by student index number
- `GET /api/v1/payments/statistics/summary` - Get payment statistics (Admin, HOD)

### Dashboard
- `GET /api/v1/dashboard/admin` - Admin dashboard data
- `GET /api/v1/dashboard/course-rep` - Course rep dashboard data
- `GET /api/v1/dashboard/hod` - HOD dashboard data

### Activity Logs
- `GET /api/v1/activity` - Get activity logs (Admin only)

## 🔒 Security Features

- **Password Hashing**: bcrypt with configurable rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for all inputs
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Helmet.js security headers
- **Rate Limiting**: Express rate limiting middleware
- **CORS Configuration**: Configured for frontend origin
- **Activity Logging**: Comprehensive audit trail

## 📧 Notification System

### Email Notifications (Email-Only)
- **Student Confirmation**: Automatic email sent to student when payment is recorded
  - Includes: Student details, amount, payment mode, receipt number, date
- **HOD Notification**: Automatic email sent to Head of Department for each recorded payment
  - Includes: Payment summary and details
- **HTML Email Templates**: Professional styled email templates
- **SMTP Configuration**: Supports Gmail, SendGrid, and other SMTP providers

### No SMS Notifications
- This system uses **email-only notifications**
- SMS functionality has been removed

## 💳 Payment Recording System

The system is designed for **physical payment recording only**:

1. Students pay physically (cash or mobile money) to course representatives
2. Course representative records the payment in the system:
   - Selects student and course
   - Enters payment amount
   - Selects payment mode (Cash or Mobile Money)
   - Optionally enters receipt number (auto-generated if not provided)
   - Adds optional notes
3. System automatically:
   - Generates unique receipt number (if not provided)
   - Records payment with status 'recorded'
   - Sends email confirmation to student
   - Sends email notification to HOD
   - Logs activity for audit trail

### Payment Modes
- **Cash**: Physical cash payments
- **Mobile Money**: Mobile money transfers (MTN, Vodafone, etc.)

### No Online Payment Processing
- **No payment gateway integration**
- **No online payment processing**
- All payments are recorded **after** they have been made physically

## 📊 Database Schema

Key tables:
- `users` - System users (Admin, Course Rep, HOD)
- `roles` - User roles and permissions
- `students` - Student information
- `courses` - Course details and assignments
- `payments` - Payment transactions
- `activity_logs` - System activity audit trail
- `notifications` - Notification history

See `database/schema.sql` for complete schema.

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 📝 Environment Variables

### Backend (.env)
```env
# Server
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=dues_collection_db
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=24h

# Email (Required for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@itds.edu.gh
EMAIL_ENABLED=true

# HOD
HOD_EMAIL=hod@itds.edu.gh

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Frontend
FRONTEND_URL=http://localhost:3000
```

## 🚢 Deployment

### Production Deployment

1. **Build frontend**:
```bash
cd frontend
npm run build
```

2. **Set production environment variables**

3. **Use process manager** (PM2 recommended):
```bash
npm install -g pm2
pm2 start backend/server.js --name dues-backend
```

4. **Configure reverse proxy** (Nginx):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
    }

    location / {
        root /path/to/frontend/dist;
        try_files $uri /index.html;
    }
}
```

5. **Enable HTTPS** with Let's Encrypt

## 📚 Documentation

- API documentation available at `/api/v1` endpoint
- Database schema: `database/schema.sql`
- Environment configuration: `backend/env.example`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is proprietary software for the Department of Information Technology and Decision Sciences.

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Contact the development team

## 🔄 Version History

- **v2.0.0** - Physical Payment Recording System
  - Manual payment recording for physical payments
  - Email-only notifications
  - Admin-only user creation
  - Course rep access control
  - Receipt number generation
  - Complete audit trail

- **v1.0.0** - Initial release (deprecated)
  - Original version with payment gateway integration

---

**Developed for the Department of Information Technology and Decision Sciences**

