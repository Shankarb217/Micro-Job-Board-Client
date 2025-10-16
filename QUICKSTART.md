# Quick Start Guide - Micro Job Board Frontend

## Installation & Running

### Step 1: Install Dependencies
```bash
cd micro-job-board-client
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Testing the Clickthrough Prototype

### 1. Home Page
- Visit `http://localhost:3000`
- Browse mock job listings
- Use the search bar to filter jobs
- Click on any job card to view details

### 2. Register a New Account
- Click "Register" in the navbar
- Fill in the form:
  - Full Name: Test User
  - Email: test@example.com
  - Password: password123
  - Confirm Password: password123
  - Role: Choose "Job Seeker" or "Employer"
- Click "Register"

### 3. Login
- Click "Login" in the navbar
- Use the credentials you just created
- You'll be redirected based on your role

### 4. As a Job Seeker
After logging in as a Seeker:
- Browse jobs on the home page
- Click "View Details" on any job
- Click "Apply Now" button
- Fill in the cover letter
- Submit application
- Go to "My Applications" to see your applications

### 5. As an Employer
After logging in as an Employer:
- Click "Post Job" in the navbar
- Fill in the job posting form
- Submit the job
- Go to "My Jobs" to see your posted jobs
- Click on application count to view applicants
- Accept or reject applications

### 6. As an Admin (Manual Testing)
To test admin features, you need to manually set the role in localStorage:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Find the "user" key
4. Edit the JSON and change `"role": "Seeker"` to `"role": "Admin"`
5. Refresh the page
6. You'll now see "Admin Dashboard" in the navbar
7. Access admin features:
   - View statistics
   - Manage users
   - Approve pending jobs
   - View charts and reports

### 7. Profile Management
- Click on your avatar in the top right
- Select "Profile"
- Click "Edit Profile"
- Update your information
- Click "Save Changes"

## Features to Explore

### Navigation
- **Public**: Home, Login, Register
- **Job Seeker**: Home, My Applications, Profile
- **Employer**: Home, Post Job, My Jobs, Applications, Profile
- **Admin**: Home, Admin Dashboard, My Jobs, Profile

### Forms & Validation
All forms have validation:
- Try submitting empty forms to see error messages
- Password must be at least 6 characters
- Email must be valid format
- Job description must be at least 100 characters

### UI Components
- Responsive navbar with mobile menu
- Data tables with sorting and filtering
- Modal dialogs for actions
- Status chips with color coding
- Interactive charts (Admin dashboard)
- Form validation feedback

### Mock Data
The app includes realistic mock data:
- 6 sample jobs on the home page
- 3 sample jobs in "My Jobs" (Employer)
- 4 sample applications in "My Applications" (Seeker)
- Admin statistics and charts
- Sample user data

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically use the next available port (3001, 3002, etc.)

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors
Make sure you're using Node.js version 18 or higher:
```bash
node --version
```

## Project Structure Overview

```
micro-job-board-client/
├── src/
│   ├── api/              # API client & endpoints
│   ├── app/              # Redux store
│   ├── features/         # Feature modules (auth, jobs, etc.)
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utilities
│   ├── App.jsx           # Main app with routes
│   ├── main.jsx          # Entry point
│   └── theme.js          # MUI theme
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
└── vite.config.js        # Vite configuration
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Next Steps

1. **Explore all pages** - Navigate through different user roles
2. **Test forms** - Try all form validations
3. **Check responsiveness** - Resize browser to see mobile layout
4. **Review code** - Check the clean architecture implementation
5. **Connect backend** - When ready, update API base URL

## Tips

- Use browser DevTools to inspect Redux state
- Check Network tab to see API calls (currently mocked)
- The app is fully functional without a backend
- All routes are protected based on user roles
- Mock data makes it easy to demo all features

## Support

For questions or issues:
- Check FRONTEND_GUIDE.md for detailed documentation
- Review the requirements.md file
- Inspect component code for implementation details

Enjoy exploring the Micro Job Board platform! 🚀
