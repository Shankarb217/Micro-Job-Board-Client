# 🎭 Mock Mode - Demo with Static Data

## Overview

The application now supports **Mock Mode** - a fully functional demo mode that uses static data instead of a backend API. This allows you to run and test the entire application without needing the ASP.NET Core backend.

## ✨ Features

- ✅ **Complete Static Data** - Users, Jobs, Applications, and Dashboard Stats
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete (in-memory)
- ✅ **Authentication** - Login/Register with mock JWT tokens
- ✅ **Role-Based Access** - Admin, Employer, and Seeker roles
- ✅ **Search & Filters** - Job search, filtering by location, type, category
- ✅ **Application Management** - Apply to jobs, track status, review applications
- ✅ **Admin Dashboard** - Statistics, user management, job approval
- ✅ **Session Persistence** - Changes persist during the session
- ✅ **Realistic Delays** - Simulated network latency for authentic feel

## 🚀 How to Use

### Enable Mock Mode

Mock mode is **enabled by default**. To toggle it:

1. Open `src/api/axiosClient.js`
2. Change the `USE_MOCK_MODE` constant:

```javascript
// Set to true for mock mode (no backend needed)
// Set to false for real backend API
const USE_MOCK_MODE = true;
```

### Run the Application

```bash
cd micro-job-board-client
npm install
npm run dev
```

The app will run at `http://localhost:3000` (or the port shown in terminal)

## 🔑 Test Credentials

Use these pre-configured accounts to test different roles:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Admin** | admin@example.com | admin123 | Full access to dashboard, user management, job approval |
| **Employer** | employer@example.com | employer123 | Post jobs, manage listings, review applications |
| **Seeker** | seeker@example.com | seeker123 | Browse jobs, apply, track applications |
| **Employer 2** | employer2@example.com | employer123 | Additional employer account |
| **Seeker 2** | seeker2@example.com | seeker123 | Additional seeker account |

You can also **register new accounts** - they will be added to the mock data for the session.

## 📊 Available Data

### Users (6 pre-configured)
- 1 Admin
- 3 Employers (from different companies)
- 2 Job Seekers

### Jobs (12 pre-configured)
- **Technology**: Full Stack Developer, DevOps Engineer, Frontend Developer, Backend Developer, Mobile Developer, Data Scientist, QA Engineer
- **Design**: UI/UX Designer
- **Marketing**: Marketing Manager, Content Writer
- **Management**: Product Manager
- **Business**: Business Analyst

### Applications (7 pre-configured)
- Various statuses: Pending, Accepted, Rejected
- Applications from different seekers to different jobs

### Dashboard Statistics
- Real-time calculated stats based on current data
- Charts and graphs with realistic data
- Recent jobs and applications

## 🎯 What You Can Test

### As a Job Seeker
1. ✅ Browse all approved jobs
2. ✅ Search jobs by keyword
3. ✅ Filter by location, job type, category
4. ✅ View job details
5. ✅ Apply to jobs with cover letter
6. ✅ Track application status
7. ✅ View application history

### As an Employer
1. ✅ Post new job listings
2. ✅ View and manage your jobs
3. ✅ Edit job details
4. ✅ Delete jobs
5. ✅ View applications for your jobs
6. ✅ Accept or reject applications
7. ✅ See applicant details

### As an Admin
1. ✅ View dashboard with statistics
2. ✅ See charts and analytics
3. ✅ Manage all users
4. ✅ Change user roles
5. ✅ Approve pending jobs
6. ✅ View all jobs and applications
7. ✅ Access reports

## 🔄 How It Works

### Architecture

```
User Action → Axios Request → Mock Interceptor → Static Data → Response
```

1. **Axios Interceptor**: Intercepts all API calls before they reach the network
2. **Mock Handler**: Processes the request and returns appropriate mock data
3. **In-Memory Storage**: Changes persist during the session (not across page refreshes)
4. **Realistic Simulation**: Includes delays, error handling, and validation

### Key Files

- `src/mock/mockData.js` - All static data (users, jobs, applications, stats)
- `src/mock/mockApiInterceptor.js` - API request handler and business logic
- `src/api/axiosClient.js` - Axios configuration with mock mode toggle

## 🎨 Customization

### Add More Data

Edit `src/mock/mockData.js` to add more:

```javascript
// Add more jobs
export const mockJobs = [
  // ... existing jobs
  {
    id: 13,
    title: 'Your New Job',
    description: '...',
    // ... other fields
  }
];

// Add more users
export const mockUsers = [
  // ... existing users
  {
    id: 7,
    email: 'newuser@example.com',
    password: 'password123',
    // ... other fields
  }
];
```

### Modify API Behavior

Edit `src/mock/mockApiInterceptor.js` to change how endpoints work:

```javascript
// Example: Change delay time
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Example: Add custom validation
if (someCondition) {
  throw {
    response: {
      status: 400,
      data: { message: 'Custom error message' }
    }
  };
}
```

## 🔧 Switching to Real Backend

When your backend is ready:

1. Set `USE_MOCK_MODE = false` in `src/api/axiosClient.js`
2. Ensure backend is running at the configured URL
3. Update `.env` file if needed:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

## 📝 Notes

### Session Data
- Changes made during the session (new jobs, applications, etc.) persist until page refresh
- Refreshing the page resets data to initial state
- To reset data manually, call `resetMockData()` from console

### Limitations
- Data doesn't persist across page refreshes
- No real file uploads (resume files are simulated)
- No real email notifications
- No database constraints (some validations are simplified)

### Console Logs
Mock mode logs all API calls to the console for debugging:
```
[MOCK API] POST /auth/login { email: '...', password: '...' }
[MOCK API] GET /jobs { params: { search: 'developer' } }
```

## 🎉 Benefits

1. **No Backend Required** - Demo the app without setting up backend infrastructure
2. **Fast Development** - Test frontend features without backend dependencies
3. **Presentations** - Perfect for demos and presentations
4. **Testing** - Test UI flows and edge cases with controlled data
5. **Offline Work** - Develop frontend features without internet connection

## 🚨 Troubleshooting

### Mock mode not working?
- Check console for `[MOCK MODE ENABLED]` message
- Verify `USE_MOCK_MODE = true` in `axiosClient.js`
- Clear browser cache and localStorage

### Login not working?
- Use exact credentials from the table above
- Check browser console for error messages
- Verify mock data is loaded correctly

### Changes not persisting?
- Changes only persist during the session
- Page refresh resets to initial data
- This is expected behavior for mock mode

## 📞 Support

For issues or questions:
1. Check console logs for error messages
2. Verify mock mode is enabled
3. Review the mock data structure
4. Test with provided credentials

---

**Happy Testing! 🎉**

*Mock mode makes it easy to demo and test the application without backend dependencies.*
