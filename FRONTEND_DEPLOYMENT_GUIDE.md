# React Frontend Deployment Guide - AWS EC2

**Project:** MicroJobBoard React Frontend  
**Framework:** React 18 + Vite  
**Deployment:** AWS EC2 with Nginx  
**Backend:** http://15.207.141.51:5000

---

## Overview

This guide covers deploying the React frontend to the same AWS EC2 instance as the backend, using Nginx as the web server.

**Architecture:**
```
User Browser
     ↓
http://EC2-IP:80 (Frontend - Nginx)
     ↓
http://EC2-IP:5000 (Backend - .NET API)
     ↓
AWS RDS MSSQL Server
```

---

## Prerequisites

- ✅ Backend API running on EC2 (port 5000)
- ✅ EC2 instance accessible via SSH
- ✅ GitHub repository for frontend code
- ✅ Node.js 18+ for local development

---

## Step 1: EC2 Setup - Install Nginx

SSH into your EC2 instance:

```bash
ssh -i your-key.pem ubuntu@15.207.141.51
```

Install Nginx:

```bash
# Update package list
sudo apt update

# Install Nginx
sudo apt install nginx -y

# Start Nginx
sudo systemctl start nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

Expected output: `Active: active (running)`

---

## Step 2: Create Frontend Directory

```bash
# Create directory for frontend
sudo mkdir -p /var/www/frontend

# Set ownership
sudo chown -R www-data:www-data /var/www/frontend

# Set permissions
sudo chmod -R 755 /var/www/frontend
```

---

## Step 3: Configure Nginx

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/microjobboard-frontend
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/frontend;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # React Router - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Save: `Ctrl + O`, `Enter`, `Ctrl + X`

Enable the site:

```bash
# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Enable our site
sudo ln -s /etc/nginx/sites-available/microjobboard-frontend /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## Step 4: Update EC2 Security Group

Go to AWS Console → EC2 → Security Groups:

Add inbound rule:

| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| HTTP | TCP | 80 | 0.0.0.0/0 | Frontend access |

**Your security group should now have:**
- Port 22 (SSH)
- Port 80 (Frontend - HTTP)
- Port 5000 (Backend API)

---

## Step 5: Configure GitHub Secrets

Go to GitHub Repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `EC2_HOST` | EC2 public IP | `15.207.141.51` |
| `EC2_USER` | SSH username | `ubuntu` |
| `EC2_SSH_KEY` | Private key content | `-----BEGIN RSA PRIVATE KEY-----...` |
| `VITE_API_BASE_URL` | Backend API URL | `http://15.207.141.51:5000/api` |

---

## Step 6: Update Backend CORS

The backend needs to allow requests from the frontend.

SSH into EC2 and check the backend CORS configuration is updated:

```bash
# The backend should already have FRONTEND_URL secret configured
# Verify it's set to: http://15.207.141.51
```

If needed, update the GitHub secret `FRONTEND_URL` in your backend repository to:
```
http://15.207.141.51
```

Then redeploy the backend:
```bash
git push origin main
```

---

## Step 7: Deploy Frontend

### First Deployment (Manual)

On your local machine, build the frontend:

```bash
# Navigate to frontend directory
cd micro-job-board-client

# Install dependencies
npm install

# Build for production
npm run build
```

Copy build files to EC2:

```bash
# Using SCP
scp -i your-key.pem -r dist/* ubuntu@15.207.141.51:/tmp/frontend-build/

# Then SSH into EC2
ssh -i your-key.pem ubuntu@15.207.141.51

# Move files to web directory
sudo rm -rf /var/www/frontend/*
sudo mv /tmp/frontend-build/* /var/www/frontend/
sudo chown -R www-data:www-data /var/www/frontend
sudo chmod -R 755 /var/www/frontend
```

### Automated Deployment (GitHub Actions)

After first deployment, push code to GitHub:

```bash
# Add all files
git add .

# Commit
git commit -m "Initial frontend deployment setup"

# Add remote (create GitHub repo first)
git remote add origin https://github.com/YOUR_USERNAME/micro-job-board-client.git

# Push
git push -u origin main
```

From now on, every push to `main` will automatically deploy! 🚀

---

## Step 8: Verify Deployment

### Test Frontend

Open in browser:
```
http://15.207.141.51
```

You should see your React application!

### Test API Connection

1. Open browser console (F12)
2. Try to login or register
3. Check Network tab for API calls to `http://15.207.141.51:5000/api`

### Check Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

---

## Troubleshooting

### Issue 1: Nginx Won't Start

```bash
# Check configuration
sudo nginx -t

# Check status
sudo systemctl status nginx

# View logs
sudo journalctl -u nginx -n 50
```

### Issue 2: 404 on React Routes

Make sure Nginx configuration has:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Then reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Issue 3: API Calls Failing (CORS)

Check backend CORS configuration includes frontend URL:
```
http://15.207.141.51
```

Update backend `FRONTEND_URL` secret and redeploy.

### Issue 4: White Screen

```bash
# Check if files exist
ls -la /var/www/frontend/

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check file permissions
sudo chown -R www-data:www-data /var/www/frontend
sudo chmod -R 755 /var/www/frontend
```

---

## Useful Commands

### Nginx Management

```bash
# Start Nginx
sudo systemctl start nginx

# Stop Nginx
sudo systemctl stop nginx

# Restart Nginx
sudo systemctl restart nginx

# Reload configuration (no downtime)
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx

# Test configuration
sudo nginx -t
```

### View Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log

# Last 100 lines
sudo tail -n 100 /var/log/nginx/error.log
```

### File Management

```bash
# Check frontend files
ls -la /var/www/frontend/

# Check file sizes
du -sh /var/www/frontend/*

# Clear frontend directory
sudo rm -rf /var/www/frontend/*
```

---

## Deployment Workflow

### Automated (GitHub Actions)

```
Developer commits code
        ↓
    git push origin main
        ↓
GitHub Actions triggered
        ↓
Build Stage (2-3 minutes)
  - Install dependencies
  - Build React app
  - Create production bundle
        ↓
Deploy Stage (1 minute)
  - Copy files to EC2
  - Set permissions
  - Reload Nginx
        ↓
Deployment Complete ✅
Frontend: http://15.207.141.51
```

**Total Time:** 3-4 minutes

---

## Environment Variables

### Development (.env)
```
VITE_API_BASE_URL=http://15.207.141.51:5000/api
```

### Production (.env.production)
```
VITE_API_BASE_URL=http://15.207.141.51:5000/api
```

**Note:** Both point to the same backend since we're using HTTP-only deployment.

---

## Performance Optimization

### Nginx Configuration

Already included in the config:
- ✅ Gzip compression
- ✅ Static file caching (1 year)
- ✅ Security headers
- ✅ Access log optimization

### React Build Optimization

```bash
# Build with source maps (for debugging)
npm run build

# Build without source maps (smaller size)
npm run build -- --mode production
```

---

## Security Considerations

### Current Setup (HTTP)
- ⚠️ Traffic not encrypted
- ⚠️ Suitable for development/testing
- ⚠️ Not recommended for production with sensitive data

### Future HTTPS Setup (Optional)
If you get a domain later:
1. Point domain to EC2 IP
2. Install Certbot
3. Get free SSL from Let's Encrypt
4. Update Nginx to listen on port 443
5. Enable HTTPS redirection

---

## Monitoring

### Check Application Status

```bash
# Frontend accessible?
curl -I http://15.207.141.51

# Backend accessible?
curl -I http://15.207.141.51:5000/swagger

# Nginx running?
sudo systemctl is-active nginx
```

### Monitor Resource Usage

```bash
# Disk space
df -h

# Memory usage
free -h

# Nginx processes
ps aux | grep nginx
```

---

## Rollback Procedure

If deployment fails:

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@15.207.141.51

# Restore from backup (if you created one)
sudo cp -r /var/www/frontend-backup/* /var/www/frontend/

# Or redeploy previous version from GitHub
# Revert commit and push
```

---

## Cost Summary

| Service | Configuration | Monthly Cost |
|---------|--------------|--------------|
| EC2 Instance | Shared with backend | $0 (already running) |
| Data Transfer | Minimal | ~$1-2 |
| **Total** | | **~$1-2/month** |

---

## URLs Summary

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://15.207.141.51 | 80 |
| Backend API | http://15.207.141.51:5000 | 5000 |
| Swagger | http://15.207.141.51:5000/swagger | 5000 |

---

## Next Steps After Deployment

1. ✅ Test all frontend features
2. ✅ Verify API integration
3. ✅ Test user registration/login
4. ✅ Test job posting and applications
5. ✅ Monitor logs for errors
6. ✅ Set up monitoring (optional)

---

## Support

**Frontend Repository:** [Your GitHub URL]  
**Backend Repository:** https://github.com/Shankarb217/MicroJobBoard.API1  
**Frontend URL:** http://15.207.141.51  
**Backend API:** http://15.207.141.51:5000

---

**Document Version:** 1.0  
**Last Updated:** October 16, 2025  
**Status:** Ready for Deployment ✅
