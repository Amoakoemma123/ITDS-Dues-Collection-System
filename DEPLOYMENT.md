# Deployment Guide

This guide covers deploying the Dues Collection System to production.

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database schema applied
- [ ] SSL certificate obtained
- [ ] Domain name configured
- [ ] Payment gateway configured (Paystack)
- [ ] Email service configured
- [ ] SMS service configured (Twilio)
- [ ] Backup strategy in place
- [ ] Monitoring set up

## ☁️ Cloud Deployment

> **Note**: Docker deployment configurations have been removed for now. For containerized deployment, you can add Docker configuration files when ready for production deployment.

### AWS Deployment

#### Option 1: EC2 + RDS

1. **Launch EC2 instance** (Ubuntu 22.04 LTS)
2. **Set up RDS MySQL instance** (or use existing MySQL server)
3. **Install Node.js**:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clone and deploy**:
```bash
git clone <repository>
cd Department_ITDS
# Follow manual setup instructions
```

5. **Set up Nginx reverse proxy**:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }
}
```

6. **Set up SSL with Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### Option 2: AWS ECS/Fargate

1. **Build frontend for production**:
```bash
cd frontend
npm install
npm run build
```

2. **Set up backend**:
```bash
cd backend
npm install --production
```

3. **Use process manager** (PM2 recommended):
```bash
npm install -g pm2
pm2 start server.js --name dues-backend
```

4. **Set up ALB/ELB with SSL**

### DigitalOcean Deployment

1. **Create Droplet** (Ubuntu, 2GB RAM minimum)
2. **Install Node.js**:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Deploy application**:
```bash
git clone <repository>
cd Department_ITDS
# Follow manual setup instructions in README.md
```

4. **Set up firewall**:
```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### Heroku Deployment

1. **Install Heroku CLI**
2. **Create Heroku apps**:
```bash
heroku create dues-backend
heroku create dues-frontend
```

3. **Add MySQL addon**:
```bash
heroku addons:create cleardb:ignite -a dues-backend
```

4. **Set environment variables**:
```bash
heroku config:set JWT_SECRET=your_secret -a dues-backend
# ... set other variables
```

5. **Deploy**:
```bash
git subtree push --prefix backend heroku main
```

## 🔧 Manual Deployment

### Backend Deployment

1. **Server setup**:
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

2. **Deploy application**:
```bash
cd backend
npm install --production
pm2 start server.js --name dues-backend
pm2 save
pm2 startup
```

3. **Set up Nginx**:
```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Frontend Deployment

1. **Build for production**:
```bash
cd frontend
npm install
npm run build
```

2. **Serve with Nginx**:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/dues-frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

## 🔄 Database Migration

1. **Backup existing database** (if any):
```bash
mysqldump -u root -p dues_collection_db > backup.sql
```

2. **Apply schema**:
```bash
mysql -u root -p dues_collection_db < database/schema.sql
```

3. **Verify**:
```bash
mysql -u root -p -e "USE dues_collection_db; SHOW TABLES;"
```

## 🔐 SSL/HTTPS Setup

### Let's Encrypt (Free)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Auto-renewal

```bash
sudo certbot renew --dry-run
# Add to crontab if successful
```

## 📊 Monitoring

### Application Monitoring

1. **PM2 Monitoring**:
```bash
pm2 monit
pm2 logs
```

2. **Set up monitoring service** (e.g., PM2 Plus, New Relic)

### Database Monitoring

- Enable MySQL slow query log
- Monitor connection pool usage
- Set up database backups

### Uptime Monitoring

- Use services like UptimeRobot, Pingdom
- Monitor API endpoints
- Set up alerts

## 🔄 Backup Strategy

### Database Backups

1. **Automated daily backups**:
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u root -p$DB_PASSWORD dues_collection_db > /backups/db_$DATE.sql
# Keep only last 30 days
find /backups -name "db_*.sql" -mtime +30 -delete
```

2. **Add to crontab**:
```bash
0 2 * * * /path/to/backup.sh
```

### Application Backups

- Version control (Git)
- Application backups
- Configuration file backups

## 🚨 Troubleshooting

### Common Issues

1. **Database connection errors**:
   - Check database credentials
   - Verify database is running
   - Check firewall rules

2. **Payment gateway errors**:
   - Verify API keys
   - Check webhook configuration
   - Review payment logs

3. **Email/SMS not sending**:
   - Verify credentials
   - Check service status
   - Review notification logs

### Logs Location

- Backend: `pm2 logs dues-backend`
- PM2: `pm2 logs`
- Nginx: `/var/log/nginx/error.log`

## 📈 Performance Optimization

1. **Enable database indexing**
2. **Use CDN for frontend assets**
3. **Implement caching** (Redis recommended)
4. **Optimize database queries**
5. **Enable gzip compression**

## 🔐 Security Hardening

1. **Firewall configuration**:
```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

2. **Fail2ban setup** (prevent brute force)
3. **Regular security updates**
4. **Disable unnecessary services**

---

**For production support, contact the development team.**

