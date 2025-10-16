# 🚀 DEPLOY NOW - Quick Start

## ✅ Everything is Ready!

Your app has been built and is ready to deploy. Follow these simple steps:

---

## 🎯 Deploy Frontend (2 Commands)

Open your terminal in this folder and run:

### Command 1: Login to Netlify
```bash
netlify login
```
*This opens a browser. Sign in with GitHub, GitLab, Bitbucket, or email (free account).*

### Command 2: Deploy
```bash
netlify deploy --prod
```

**When prompted, answer:**
- Create & configure a new site? **Yes**
- Team: **Choose your team**
- Site name: **micro-job-board** (or your choice)
- Publish directory: **dist**

**Done!** Your site will be live at: `https://your-site-name.netlify.app` 🎉

---

## 📱 Alternative: Drag & Drop (No Commands)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign in (free)
3. Drag the `dist/` folder onto the page
4. Done! Site is live instantly! 🎉

---

## 🔧 Next: Deploy Backend

Your frontend is now live, but it needs a backend API. Choose one:

### Option 1: Render.com (Recommended - Free & Easy)
1. Go to [https://render.com](https://render.com)
2. Sign up (free)
3. Click "New +" → "Web Service"
4. Connect your backend GitHub repo
5. Render auto-deploys your .NET app
6. Add PostgreSQL database (also free)

### Option 2: Railway.app (Also Great)
1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → Deploy from GitHub
4. Select backend repo
5. Add PostgreSQL database

### Option 3: Azure (Microsoft)
See `FREE_DEPLOYMENT_GUIDE.md` for detailed Azure instructions.

---

## 🔗 Connect Frontend to Backend

After backend is deployed:

```bash
# Set the backend URL
netlify env:set VITE_API_BASE_URL "https://your-backend-url.onrender.com/api"

# Redeploy
netlify deploy --prod
```

---

## 📋 Complete Checklist

- [ ] Run `netlify login`
- [ ] Run `netlify deploy --prod`
- [ ] Get your frontend URL
- [ ] Deploy backend (Render/Railway/Azure)
- [ ] Get your backend URL
- [ ] Update frontend env var with backend URL
- [ ] Test the live app
- [ ] Share your URL! 🎉

---

## 🎉 That's It!

**Start now:** `netlify login`

**Questions?** See `DEPLOYMENT_READY.md` for detailed guide.

---

**Your app will be live in 5 minutes!** ⚡
