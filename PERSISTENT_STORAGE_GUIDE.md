// ✅ PERSISTENT STORAGE ENABLED - Full CRUD with localStorage

Your app now has **persistent storage** similar to MAUI Preferences! All data is saved to localStorage and persists across sessions.

---

## 🎯 What's New

### ✅ Full CRUD Operations
- **Create**: Add new users, jobs, applications
- **Read**: Get all data or filter by criteria
- **Update**: Edit existing records
- **Delete**: Remove records permanently

### ✅ Persistent Storage
- All data saved to **localStorage**
- Data persists across browser sessions
- Works like MAUI Preferences
- No backend required

### ✅ Real-time Updates
- Changes are immediately saved
- Refresh page - data is still there
- Close browser - data is preserved

---

## 📦 Storage Structure

### Data Stored in localStorage:

```javascript
{
  "microjobboard_users": [...],        // All users
  "microjobboard_jobs": [...],         // All jobs
  "microjobboard_applications": [...], // All applications
  "microjobboard_initialized": "true"  // Initialization flag
}
```

---

## 🔧 How It Works

### 1. **Initialization**
On first load, default data is loaded into localStorage:
- 6 users (Admin, Employers, Seekers)
- 12 jobs
- 7 applications

### 2. **CRUD Operations**
All operations automatically save to localStorage:

```javascript
// Create
addUser(userData)       // Saves to localStorage
addJob(jobData)         // Saves to localStorage
addApplication(appData) // Saves to localStorage

// Read
getUsers()              // Loads from localStorage
getJobs()               // Loads from localStorage
getApplications()       // Loads from localStorage

// Update
updateUser(id, data)    // Updates localStorage
updateJob(id, data)     // Updates localStorage
updateApplication(id, data) // Updates localStorage

// Delete
deleteUser(id)          // Removes from localStorage
deleteJob(id)           // Removes from localStorage
deleteApplication(id)   // Removes from localStorage
```

### 3. **Persistence**
- Data survives page refresh
- Data survives browser close/reopen
- Data only clears if you clear browser data

---

## 🧪 Test the Persistence

### Test 1: Create and Persist
1. **Register a new user**
2. **Close the browser**
3. **Reopen and login** - Your user is still there! ✅

### Test 2: CRUD Operations
1. **Login as Employer** (employer@example.com / employer123)
2. **Post a new job**
3. **Refresh the page**
4. **Check "My Jobs"** - Your job is still there! ✅

### Test 3: Update and Persist
1. **Login as Admin** (admin@example.com / admin123)
2. **Approve a pending job**
3. **Close browser and reopen**
4. **Check dashboard** - Job is still approved! ✅

---

## 🎮 Available Operations

### Users
```javascript
// Get all users
const users = getUsers();

// Add new user
const newUser = addUser({
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
  role: 'Seeker'
});

// Update user
const updated = updateUser(userId, { name: 'New Name' });

// Delete user
deleteUser(userId);

// Find by email
const user = getUserByEmail('test@example.com');
```

### Jobs
```javascript
// Get all jobs
const jobs = getJobs();

// Add new job
const newJob = addJob({
  title: 'Software Engineer',
  description: 'Great opportunity',
  location: 'Remote',
  salary: '$100k',
  employerId: 2,
  companyName: 'Tech Corp'
});

// Update job
const updated = updateJob(jobId, { salary: '$120k' });

// Delete job (also deletes related applications)
deleteJob(jobId);

// Get by employer
const myJobs = getJobsByEmployer(employerId);
```

### Applications
```javascript
// Get all applications
const apps = getApplications();

// Add new application
const newApp = addApplication({
  jobId: 1,
  seekerId: 3,
  coverLetter: 'I am interested...'
});

// Update application status
const updated = updateApplication(appId, { status: 'Accepted' });

// Delete application
deleteApplication(appId);

// Get by seeker
const myApps = getApplicationsBySeeker(seekerId);

// Get by job
const jobApps = getApplicationsByJob(jobId);
```

---

## 🔍 Storage Management

### View Storage Stats
```javascript
import { getStorageStats } from './mock/persistentStorage';

const stats = getStorageStats();
console.log(stats);
// {
//   totalUsers: 6,
//   totalJobs: 12,
//   totalApplications: 7,
//   seekers: 2,
//   employers: 3,
//   admins: 1,
//   ...
// }
```

### Export Data
```javascript
import { exportData } from './mock/persistentStorage';

const backup = exportData();
// Download or save this JSON
```

### Import Data
```javascript
import { importData } from './mock/persistentStorage';

const data = {
  users: [...],
  jobs: [...],
  applications: [...]
};

importData(data);
```

### Reset to Defaults
```javascript
import { resetToDefaults } from './mock/persistentStorage';

resetToDefaults(); // Clears all and loads default data
```

### Clear All Data
```javascript
import { clearAllData } from './mock/persistentStorage';

clearAllData(); // Removes everything from localStorage
```

---

## 🎯 Use Cases

### 1. **Demo/Portfolio**
- Show full CRUD functionality
- No backend setup required
- Data persists for reviewers

### 2. **Development**
- Test features without backend
- Quick prototyping
- Offline development

### 3. **Testing**
- Test user flows
- Test edge cases
- Test data persistence

### 4. **Offline Mode**
- Works without internet
- No API calls needed
- Full app functionality

---

## 🔄 Switching Modes

### Enable Persistent Mock Mode (Current)
```javascript
// In src/api/axiosClient.js
const USE_MOCK_MODE = true;
```

### Disable Mock Mode (Use Real API)
```javascript
// In src/api/axiosClient.js
const USE_MOCK_MODE = false;
```

---

## 📊 Console Logs

When using persistent storage, you'll see helpful logs:

```
[PERSISTENT STORAGE] Initializing with default data...
[PERSISTENT STORAGE] Initialization complete!
[PERSISTENT MOCK MODE ENABLED]
✅ All data is saved to localStorage
✅ CRUD operations persist across sessions
✅ Works like MAUI Preferences
```

When performing operations:
```
[PERSISTENT STORAGE] User registered and saved: test@example.com
[PERSISTENT STORAGE] Job created and saved: Software Engineer
[PERSISTENT STORAGE] Application created and saved
[PERSISTENT STORAGE] Job updated: Software Engineer
[PERSISTENT STORAGE] Job deleted: Old Job
```

---

## 🧹 Clearing Data

### Method 1: Browser DevTools
1. Press `F12`
2. Go to **Application** tab
3. Click **Local Storage**
4. Select your domain
5. Delete keys starting with `microjobboard_`

### Method 2: Console Command
```javascript
localStorage.clear();
location.reload();
```

### Method 3: Reset Function
```javascript
// In browser console
import { resetToDefaults } from './src/mock/persistentStorage';
resetToDefaults();
```

---

## 🎓 Test Credentials

Login with these accounts:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@example.com | admin123 |
| **Employer** | employer@example.com | employer123 |
| **Job Seeker** | seeker@example.com | seeker123 |

---

## 🔐 Security Note

**Important**: This is for development/demo purposes only!

- Passwords are stored in plain text in localStorage
- No encryption
- Not suitable for production with real user data
- For production, always use a real backend with proper security

---

## 📁 Files Created

1. **`persistentStorage.js`** - Storage manager with CRUD operations
2. **`mockApiInterceptorPersistent.js`** - API interceptor using persistent storage
3. **`PERSISTENT_STORAGE_GUIDE.md`** - This documentation

---

## ✅ Benefits

- ✅ **No Backend Required** - Full app functionality offline
- ✅ **Data Persistence** - Survives page refresh and browser restart
- ✅ **Full CRUD** - Create, Read, Update, Delete all work
- ✅ **Real-time Updates** - Changes saved immediately
- ✅ **Easy Testing** - Test all features without API setup
- ✅ **MAUI-like** - Works similar to MAUI Preferences
- ✅ **Developer Friendly** - Easy to debug and inspect

---

## 🎉 Summary

Your app now has **full persistent storage** with CRUD operations!

- ✅ All data saved to localStorage
- ✅ Persists across sessions
- ✅ Full CRUD operations
- ✅ Works like MAUI Preferences
- ✅ No backend required

**Start the app and test it:**
```bash
npm run dev
```

**Try it:**
1. Register a new user
2. Post a job
3. Apply to jobs
4. Close browser
5. Reopen - Everything is still there! 🎉

---

**Your app is now a fully functional offline application with persistent storage!** 🚀
