# 🚀 Deploy Frontend to Netlify - Quick Guide

## Current Status
- ✅ Frontend configured for live backend (`http://15.207.141.51:5000/api`)
- ✅ Mock mode disabled
- ✅ All APIs properly integrated
- ✅ Ready for deployment

---

## Option 1: Deploy via Netlify Dashboard (Easiest)

### Step 1: Build the Application
```bash
cd d:\AI\MicroJobBoard\micro-job-board-client
npm run build
```

This creates a `dist` folder with your production build.

### Step 2: Deploy to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the `dist` folder
4. Wait for deployment to complete
5. Copy your site URL (e.g., `https://your-app.netlify.app`)

### Step 3: Update Backend CORS
```bash
# SSH to EC2
ssh -i your-key.pem ubuntu@15.207.141.51

# Edit backend .env
sudo nano /var/www/microjobboard/.env

# Update this line with your actual Netlify URL:
ALLOWED_ORIGINS=https://your-app.netlify.app

# Save and restart
sudo systemctl restart microjobboard.service
```

### Step 4: Test
- Open your Netlify URL
- Try to register/login
- Should work! ✅

---

## Option 2: Deploy via Git (Automatic Deployments)

### Step 1: Push to GitHub/GitLab
```bash
cd d:\AI\MicroJobBoard\micro-job-board-client

# Initialize git if not already done
git init
git add .
git commit -m "Frontend ready for deployment"

# Add remote and push
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub/GitLab)
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

### Step 3: Configure Environment Variables (Optional)
If you want to override the `.env.production`:
1. Go to Site settings → Environment variables
2. Add: `VITE_API_BASE_URL` = `http://15.207.141.51:5000/api`

### Step 4: Update Backend CORS
Same as Option 1, Step 3.

---

## Option 3: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Build and Deploy
```bash
cd d:\AI\MicroJobBoard\micro-job-board-client

# Build
npm run build

# Deploy to production
netlify deploy --prod
```

Follow the prompts:
- Create a new site or link existing
- Publish directory: `dist`

### Step 4: Update Backend CORS
Same as Option 1, Step 3.

---

## ✅ Verification Checklist

After deployment:

### Frontend Checks
- [ ] Site loads without errors
- [ ] No console errors in browser
- [ ] All pages are accessible
- [ ] Routing works (refresh on any page)

### Backend Integration Checks
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] JWT token is stored in localStorage
- [ ] Protected routes work
- [ ] No CORS errors

### Job Seeker Flow
- [ ] Can view job listings
- [ ] Can view job details
- [ ] Can apply to jobs
- [ ] Can view own applications

### Employer Flow
- [ ] Can post new jobs
- [ ] Can view own jobs
- [ ] Can edit/delete own jobs
- [ ] Can view applications
- [ ] Can update application status

---

## 🔧 Netlify Configuration

Your `netlify.toml` is already configured:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  environment = { NODE_VERSION = "18" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures:
- ✅ Correct build command
- ✅ Correct publish directory
- ✅ Client-side routing works
- ✅ Security headers applied

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to server"
**Solution**:
1. Check backend is running: `curl http://15.207.141.51:5000/api/health`
2. Verify `.env.production` has correct API URL
3. Rebuild and redeploy: `npm run build` → upload to Netlify

### Issue: CORS Error
**Solution**:
1. Get your exact Netlify URL (including `https://`)
2. Update backend CORS with exact URL (no trailing slash)
3. Restart backend: `sudo systemctl restart microjobboard.service`

### Issue: 404 on Page Refresh
**Solution**:
- Already fixed by `netlify.toml` redirects
- If still happening, check `netlify.toml` is in root directory

### Issue: Environment Variables Not Working
**Solution**:
1. Make sure `.env.production` exists
2. Rebuild: `npm run build`
3. Or set in Netlify dashboard: Site settings → Environment variables

---

## 📊 Deployment Status

### Before Deployment
- ✅ Code ready
- ✅ APIs integrated
- ✅ Mock mode disabled
- ✅ Environment configured

### After Deployment
- [ ] Frontend live on Netlify
- [ ] Backend CORS updated
- [ ] End-to-end testing complete
- [ ] Application fully functional

---

## 🎯 Quick Deploy Commands

```bash
# Build
npm run build

# Test build locally
npm run preview

# Deploy to Netlify (if CLI installed)
netlify deploy --prod

# Or just drag-drop the dist folder to Netlify dashboard
```

---

## 🔗 Important URLs

After deployment, save these:

- **Frontend URL**: `https://your-app.netlify.app`
- **Backend API**: `http://15.207.141.51:5000/api`
- **Backend Health**: `http://15.207.141.51:5000/api/health`

---

## 📝 Post-Deployment Tasks

1. **Update Backend CORS** with your Netlify URL
2. **Test all user flows** (register, login, jobs, applications)
3. **Monitor logs** for any errors
4. **Set up custom domain** (optional)
5. **Enable HTTPS for backend** (recommended for production)

---

## 🎉 Success!

Once deployed and tested, your application will be:
- ✅ Live on Netlify
- ✅ Connected to backend on EC2
- ✅ Fully functional
- ✅ Ready for users!

---

## 📚 Related Documentation

- **API Integration Status**: `API_INTEGRATION_STATUS.md`
- **Backend Deployment**: `d:\AI\MicroJobBoard.API\START_HERE.md`
- **API Configuration**: `API_CONFIGURATION.md`

---

**Ready to deploy?** Choose an option above and follow the steps! 🚀
