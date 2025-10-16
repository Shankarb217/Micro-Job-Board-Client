# 🔧 CORS Error Fix Guide

## ❌ Problem

You're getting: **"Cannot connect to server. Please make sure the backend is running."**

**Root Cause**: CORS (Cross-Origin Resource Sharing) is blocking your frontend from accessing the backend API.

---

## ✅ Backend is Working

I tested the backend and it's responding correctly:
- ✅ Backend URL: `http://15.207.141.51:5000/api`
- ✅ Jobs endpoint: Working
- ✅ Login endpoint: Working

**The issue is CORS configuration on the backend.**

---

## 🔧 Solution: Update Backend CORS

Your backend needs to allow requests from:
- `http://localhost:3000` (development)
- `https://micro-job-board-app.netlify.app` (production)

### For ASP.NET Core Backend

Add this to your `Program.cs` or `Startup.cs`:

```csharp
// Add CORS service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",           // Local development
            "http://localhost:5173",           // Vite default port
            "https://micro-job-board-app.netlify.app"  // Production
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// ... other services ...

var app = builder.Build();

// Use CORS (MUST be before UseAuthorization)
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

// ... rest of middleware ...
```

### Alternative: Allow All Origins (Development Only)

**⚠️ WARNING: Only use this for development/testing!**

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Use CORS
app.UseCors("AllowAll");
```

---

## 🚀 Quick Fix: Use Mock Mode Temporarily

While you fix the backend CORS, you can use mock mode:

### Step 1: Enable Mock Mode

**File**: `src/api/axiosClient.js`

```javascript
const USE_MOCK_MODE = true; // ✅ Enable mock mode
```

### Step 2: Restart Dev Server

```bash
npm run dev
```

### Step 3: Test with Mock Data

You can now login with:
- Email: `admin@example.com`
- Password: `admin123`

Or:
- Email: `seeker@example.com`
- Password: `seeker123`

---

## 🔍 How to Verify CORS Issue

### Open Browser Console

1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Try to login
4. Look for error message like:

```
Access to XMLHttpRequest at 'http://15.207.141.51:5000/api/auth/login' 
from origin 'http://localhost:3000' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This confirms it's a CORS issue.

---

## 📝 Step-by-Step Backend Fix

### 1. Locate Your Backend Code

Find your `Program.cs` file in the backend project.

### 2. Add CORS Configuration

Add the CORS code shown above.

### 3. Restart Backend

```bash
dotnet run
```

### 4. Test Again

Try logging in from your frontend.

---

## 🧪 Test Backend CORS

After updating backend, test if CORS is fixed:

### Using Browser Console

```javascript
fetch('http://15.207.141.51:5000/api/jobs')
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
```

If this works, CORS is fixed!

---

## 🎯 Current Workaround

**Option 1: Use Mock Mode** (Recommended for now)

```javascript
// In src/api/axiosClient.js
const USE_MOCK_MODE = true;
```

**Option 2: Contact Backend Developer**

Ask them to add CORS configuration for:
- `http://localhost:3000`
- `https://micro-job-board-app.netlify.app`

**Option 3: Use Proxy** (Development only)

Add to `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://15.207.141.51:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

Then update `.env`:
```
VITE_API_BASE_URL=/api
```

---

## 📊 Summary

| Issue | Status | Solution |
|-------|--------|----------|
| Backend Running | ✅ Yes | No action needed |
| Backend Responding | ✅ Yes | No action needed |
| CORS Configured | ❌ No | Update backend CORS |
| Frontend Working | ⏳ Waiting | Enable mock mode temporarily |

---

## 🔄 Quick Actions

### Immediate Fix (Use Mock Mode)

```bash
# 1. Edit src/api/axiosClient.js
# Set: const USE_MOCK_MODE = true;

# 2. Restart dev server
npm run dev

# 3. Login with mock credentials
# Email: admin@example.com
# Password: admin123
```

### Permanent Fix (Update Backend)

```bash
# 1. Update backend Program.cs with CORS config
# 2. Restart backend
dotnet run

# 3. Switch back to real API
# In src/api/axiosClient.js
# Set: const USE_MOCK_MODE = false;

# 4. Restart frontend
npm run dev
```

---

## 💡 Why This Happens

**CORS** is a security feature in browsers that prevents websites from making requests to different domains unless explicitly allowed.

Your frontend (`http://localhost:3000`) is trying to access backend (`http://15.207.141.51:5000`), which is a different origin.

The backend must explicitly allow this by sending proper CORS headers.

---

## 📞 Need Help?

1. **Check browser console** for exact error message
2. **Enable mock mode** to continue development
3. **Contact backend developer** to add CORS configuration
4. **Test backend directly** using the commands above

---

**Quick Fix**: Enable mock mode in `src/api/axiosClient.js` and set `USE_MOCK_MODE = true`
