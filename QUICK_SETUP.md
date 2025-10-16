# Quick Frontend Deployment - Execute These Commands

Follow these steps in order.

---

## STEP 1: Setup Nginx on EC2

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@15.207.141.51

# Install Nginx
sudo apt update
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify Nginx is running
sudo systemctl status nginx
```

---

## STEP 2: Create Frontend Directory

```bash
# Create directory
sudo mkdir -p /var/www/frontend

# Set ownership
sudo chown -R www-data:www-data /var/www/frontend

# Set permissions
sudo chmod -R 755 /var/www/frontend

# Verify
ls -la /var/www/
```

---

## STEP 3: Configure Nginx

```bash
# Create configuration file
sudo nano /etc/nginx/sites-available/microjobboard-frontend
```

**Paste this content:**

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/frontend;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

**Save:** `Ctrl + O`, `Enter`, `Ctrl + X`

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

## STEP 4: Update EC2 Security Group

Go to AWS Console → EC2 → Security Groups

Add inbound rule:
- **Type:** HTTP
- **Protocol:** TCP
- **Port:** 80
- **Source:** 0.0.0.0/0

---

## STEP 5: Build and Deploy Frontend (First Time)

On your local machine:

```bash
# Navigate to frontend directory
cd c:\Users\Arpitj\Downloads\micro-job-board-client\micro-job-board-client

# Install dependencies
npm install

# Build for production
npm run build
```

Copy to EC2:

```bash
# Create temp directory on EC2
ssh -i your-key.pem ubuntu@15.207.141.51 "mkdir -p /tmp/frontend-build"

# Copy files
scp -i your-key.pem -r dist/* ubuntu@15.207.141.51:/tmp/frontend-build/
```

On EC2:

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@15.207.141.51

# Move files to web directory
sudo rm -rf /var/www/frontend/*
sudo mv /tmp/frontend-build/* /var/www/frontend/
sudo chown -R www-data:www-data /var/www/frontend
sudo chmod -R 755 /var/www/frontend

# Verify files
ls -la /var/www/frontend/
```

---

## STEP 6: Test Frontend

Open in browser:
```
http://15.207.141.51
```

You should see your React app! 🎉

---

## STEP 7: Setup GitHub Repository

On your local machine:

```bash
cd c:\Users\Arpitj\Downloads\micro-job-board-client\micro-job-board-client

# Add all files
git add .

# Commit
git commit -m "Initial frontend deployment setup"

# Create GitHub repository first, then:
git remote add origin https://github.com/YOUR_USERNAME/micro-job-board-client.git

# Push
git push -u origin main
```

---

## STEP 8: Configure GitHub Secrets

Go to GitHub Repository → Settings → Secrets and variables → Actions

Add these 4 secrets:

1. **EC2_HOST**
   - Value: `15.207.141.51`

2. **EC2_USER**
   - Value: `ubuntu`

3. **EC2_SSH_KEY**
   - Value: [Content of your .pem file]
   ```bash
   cat your-key.pem
   ```

4. **VITE_API_BASE_URL**
   - Value: `http://15.207.141.51:5000/api`

---

## STEP 9: Update Backend CORS

Go to backend repository GitHub secrets and verify:

**FRONTEND_URL** = `http://15.207.141.51`

If not set, add it and redeploy backend:
```bash
git push origin main
```

---

## STEP 10: Test Automated Deployment

Make a small change to frontend:

```bash
# Edit any file
# Then commit and push
git add .
git commit -m "Test automated deployment"
git push origin main
```

Watch GitHub Actions deploy automatically! 🚀

---

## Verification Checklist

- [ ] Nginx installed and running
- [ ] Frontend directory created
- [ ] Nginx configuration created
- [ ] Security group allows port 80
- [ ] Frontend accessible at http://15.207.141.51
- [ ] GitHub repository created
- [ ] GitHub secrets configured
- [ ] Backend CORS updated
- [ ] Automated deployment working

---

## Quick Commands Reference

```bash
# Check Nginx status
sudo systemctl status nginx

# Reload Nginx
sudo systemctl reload nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check frontend files
ls -la /var/www/frontend/

# Test frontend
curl -I http://15.207.141.51
```

---

## Troubleshooting

### Nginx won't start
```bash
sudo nginx -t
sudo journalctl -u nginx -n 50
```

### 404 errors
```bash
# Check files exist
ls -la /var/www/frontend/

# Check Nginx config
sudo nginx -t
```

### API calls failing
- Check backend CORS includes: `http://15.207.141.51`
- Check browser console for errors

---

**Ready to deploy!** Start with STEP 1! 🚀
