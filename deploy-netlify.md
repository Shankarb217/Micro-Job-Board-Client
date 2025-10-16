# 🚀 Deploy to Netlify - Quick Guide

## Your app is ready to deploy!

The build was successful and created the `dist/` folder with your production-ready application.

## Option 1: Deploy via Netlify CLI (Fastest)

Run these commands in order:

### Step 1: Login to Netlify
```bash
netlify login
```
This will open a browser window. Sign in with your Netlify account (or create one - it's free!).

### Step 2: Deploy
```bash
netlify deploy --prod
```

When prompted:
- **Create & configure a new site**: Yes
- **Team**: Choose your team
- **Site name**: micro-job-board (or choose your own)
- **Publish directory**: dist

That's it! Your site will be live at: `https://your-site-name.netlify.app`

---

## Option 2: Deploy via Netlify Web UI (Drag & Drop)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign in or create a free account
3. Drag and drop the `dist/` folder onto the Netlify dashboard
4. Your site will be deployed instantly!

---

## Option 3: Deploy via GitHub (Continuous Deployment)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/micro-job-board.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

---

## ⚙️ After Deployment: Update Backend URL

Once your backend is deployed, update the environment variable:

### Via Netlify CLI:
```bash
netlify env:set VITE_API_BASE_URL "https://your-backend-url.onrender.com/api"
```

### Via Netlify Dashboard:
1. Go to Site settings → Environment variables
2. Add: `VITE_API_BASE_URL` = `https://your-backend-url.onrender.com/api`
3. Trigger a new deployment

---

## 📝 Important Notes

- **Free tier limits**: 100 GB bandwidth/month, 300 build minutes/month
- **Custom domain**: You can add a custom domain in Site settings
- **HTTPS**: Automatically enabled
- **Automatic deploys**: If using GitHub, every push triggers a new deployment

---

## 🎯 Next Steps

1. ✅ Deploy frontend to Netlify (you're here!)
2. ⏳ Deploy backend (see DEPLOYMENT_INSTRUCTIONS.md)
3. ⏳ Update frontend environment variable with backend URL
4. ⏳ Test the live application
5. ⏳ Share your URL!

---

## 🔗 Useful Commands

```bash
# Check deployment status
netlify status

# Open site in browser
netlify open

# View site URL
netlify sites:list

# View deployment logs
netlify logs

# Redeploy
netlify deploy --prod
```

---

**Ready to deploy? Run:** `netlify login` then `netlify deploy --prod`
