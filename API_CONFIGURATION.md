# API Configuration Guide

## ✅ Current Configuration

Your application is now configured to use the **LIVE BACKEND API**.

- **Backend URL**: `http://15.207.141.51:5000/api`
- **Mock Mode**: Disabled
- **Static Data**: Preserved in `src/mock/mockData.js`

---

## 🔄 Switching Between Real API and Mock Data

### Using Real Backend API (Current Setup)

**File**: `src/api/axiosClient.js`

```javascript
const USE_MOCK_MODE = false; // ✅ Currently set to false
```

**Environment File**: `.env`
```
VITE_API_BASE_URL=http://15.207.141.51:5000/api
```

### Using Mock Data (Static Data)

If you want to use static data without backend:

1. **Open**: `src/api/axiosClient.js`
2. **Change**:
   ```javascript
   const USE_MOCK_MODE = true; // Enable mock mode
   ```
3. **Restart** the development server

---

## 📁 Static Data Location

All static/mock data is preserved in:

**File**: `src/mock/mockData.js`

This file contains:
- ✅ Mock Users (6 users with different roles)
- ✅ Mock Jobs (12 job listings)
- ✅ Mock Applications (7 applications)
- ✅ Mock Dashboard Stats
- ✅ Helper functions for filtering and searching

**File**: `src/mock/mockApiInterceptor.js`

This file contains:
- ✅ Complete API interceptor logic
- ✅ All endpoint handlers
- ✅ Authentication simulation
- ✅ CRUD operations simulation

---

## 🧪 Test Credentials (For Mock Mode)

When using mock mode, you can login with:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Employer | employer@example.com | employer123 |
| Job Seeker | seeker@example.com | seeker123 |

---

## 🌐 API Endpoints (Real Backend)

Your app now connects to these endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (Employer)
- `PUT /api/jobs/:id` - Update job (Employer)
- `DELETE /api/jobs/:id` - Delete job (Employer)
- `GET /api/my-jobs` - Get employer's jobs

### Applications
- `POST /api/jobs/:jobId/apply` - Apply to job (Seeker)
- `GET /api/my-applications` - Get seeker's applications
- `GET /api/jobs/:jobId/applications` - Get job applications (Employer)
- `PUT /api/applications/:id/status` - Update application status (Employer)

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `GET /api/admin/pending-jobs` - Get pending jobs
- `PUT /api/admin/jobs/:id/approve` - Approve job
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

---

## 🔧 Configuration Files

### Development Environment
**File**: `.env`
```
VITE_API_BASE_URL=http://15.207.141.51:5000/api
```

### Production Environment
**File**: `.env.production`
```
VITE_API_BASE_URL=http://15.207.141.51:5000/api
```

### Axios Client
**File**: `src/api/axiosClient.js`
- Base URL configuration
- Request/Response interceptors
- JWT token handling
- Error handling
- Mock mode toggle

---

## 🚀 Deployment with Real API

Your app is configured for deployment with the real backend:

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

The production build will automatically use the backend URL from `.env.production`.

---

## 🐛 Troubleshooting

### Cannot Connect to Backend

**Check**:
1. Backend server is running at `http://15.207.141.51:5000`
2. CORS is configured on backend to allow your frontend domain
3. Network/firewall allows connection to the backend

**Solution**: Open browser console and check for CORS or network errors.

### Getting 401 Unauthorized

**Reason**: JWT token expired or invalid

**Solution**: Logout and login again to get a new token.

### Getting 403 Forbidden

**Reason**: User doesn't have permission for the requested resource

**Solution**: Check user role and ensure they have proper permissions.

### Want to Test Without Backend

**Solution**: Enable mock mode:
```javascript
// In src/api/axiosClient.js
const USE_MOCK_MODE = true;
```

---

## 📊 Mock Data vs Real API

| Feature | Mock Mode | Real API Mode |
|---------|-----------|---------------|
| Backend Required | ❌ No | ✅ Yes |
| Data Persistence | ❌ Session only | ✅ Database |
| Network Calls | ❌ Simulated | ✅ Real HTTP |
| Authentication | ✅ Simulated | ✅ JWT-based |
| Response Time | ⚡ Instant | 🌐 Network dependent |
| Best For | Demo, Testing | Production, Real users |

---

## 💡 Quick Commands

### Switch to Mock Mode
```bash
# Edit src/api/axiosClient.js
# Set: const USE_MOCK_MODE = true;
npm run dev
```

### Switch to Real API
```bash
# Edit src/api/axiosClient.js
# Set: const USE_MOCK_MODE = false;
npm run dev
```

### Change Backend URL
```bash
# Edit .env file
VITE_API_BASE_URL=http://your-new-backend-url/api
npm run dev
```

### Build with Real API
```bash
npm run build
# Uses .env.production automatically
```

---

## 📝 Notes

- ✅ Mock data is preserved and can be used anytime
- ✅ Switching between modes is as simple as changing one variable
- ✅ All mock data files are kept in `src/mock/` folder
- ✅ Real API integration is complete and ready
- ✅ JWT authentication works with real backend
- ✅ All CRUD operations are connected to real API

---

## 🎯 Current Status

- **Mode**: Real API ✅
- **Backend URL**: http://15.207.141.51:5000/api ✅
- **Mock Data**: Preserved for future use ✅
- **Ready for**: Production deployment ✅

---

**Need to switch back to mock mode?** Just set `USE_MOCK_MODE = true` in `src/api/axiosClient.js`!
