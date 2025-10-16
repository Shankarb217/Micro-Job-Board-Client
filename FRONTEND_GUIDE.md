# Micro Job Board - Frontend Guide

## Overview

This is a complete React.js frontend application for the Micro Job Board platform. It's built as a clickthrough prototype with all the necessary pages, components, and features as specified in the requirements.

## Tech Stack

- **React 18.2** - UI Library
- **Vite 5.0** - Build Tool & Dev Server
- **Redux Toolkit 1.9** - State Management
- **React Query 3.39** - Server State Management
- **React Router v6.20** - Client-side Routing
- **Material UI v5.14** - UI Component Library
- **Axios 1.6** - HTTP Client
- **React Hook Form 7.48** - Form Management
- **Yup 1.3** - Schema Validation
- **Recharts 2.10** - Data Visualization

## Project Structure

```
src/
├── api/                    # API configuration
│   ├── axiosClient.js     # Axios instance with interceptors
│   └── endpoints.js       # API endpoint definitions
├── app/                   # Redux store configuration
│   └── store.js          # Root store setup
├── features/             # Feature-based modules
│   ├── auth/            # Authentication
│   │   ├── authSlice.js
│   │   ├── authService.js
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── jobs/            # Job management
│   │   ├── jobsSlice.js
│   │   └── jobService.js
│   ├── applications/    # Application management
│   │   ├── applicationsSlice.js
│   │   └── applicationService.js
│   └── admin/          # Admin features
│       ├── adminSlice.js
│       └── adminService.js
├── components/          # Reusable components
│   ├── Layout/
│   │   └── Layout.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx
├── hooks/              # Custom React hooks
│   └── useAuth.js
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── JobDetailsPage.jsx
│   ├── PostJobPage.jsx
│   ├── MyJobsPage.jsx
│   ├── ApplicationsPage.jsx
│   ├── MyApplicationsPage.jsx
│   ├── AdminPage.jsx
│   └── ProfilePage.jsx
├── utils/              # Utility functions
│   ├── authHelpers.js
│   └── errorHandler.js
├── App.jsx            # Main app component with routes
├── main.jsx           # Application entry point
├── theme.js           # MUI theme configuration
└── index.css          # Global styles
```

## Features Implemented

### 1. Authentication Module
- **Login Page** (`/login`)
  - Email and password validation
  - JWT token storage
  - Role-based redirection after login
  - Error handling

- **Register Page** (`/register`)
  - User registration with role selection (Seeker/Employer)
  - Form validation with Yup schema
  - Password confirmation
  - Automatic login after registration

### 2. Job Listings
- **Home Page** (`/`)
  - Hero section with search functionality
  - Job cards with key information
  - Filter by category, location, keyword
  - Responsive grid layout
  - Mock data for demonstration

- **Job Details Page** (`/jobs/:id`)
  - Complete job information
  - Apply button for job seekers
  - Application dialog with cover letter
  - Responsive design

### 3. Employer Features
- **Post Job Page** (`/post-job`)
  - Comprehensive job posting form
  - Form validation
  - Category and job type selection
  - Rich text description

- **My Jobs Page** (`/my-jobs`)
  - Table view of posted jobs
  - Job status indicators (Approved/Pending/Rejected)
  - Application count per job
  - Edit, delete, and view actions

- **Applications Page** (`/applications`)
  - View all applications for jobs
  - Filter by status
  - Accept/reject applications
  - View applicant details and cover letters

### 4. Job Seeker Features
- **My Applications Page** (`/my-applications`)
  - Track all submitted applications
  - Application status tracking
  - View job details
  - Application history

### 5. Admin Features
- **Admin Dashboard** (`/admin`)
  - Statistics cards (Users, Jobs, Applications)
  - Interactive charts with Recharts
  - User management with role updates
  - Pending job approvals
  - Comprehensive overview

### 6. User Profile
- **Profile Page** (`/profile`)
  - View and edit user information
  - Account details
  - Bio and contact information

## Key Components

### Layout Components
- **Navbar**: Responsive navigation with role-based menu items
- **Footer**: Site footer with links and contact info
- **Layout**: Main layout wrapper with navbar and footer
- **ProtectedRoute**: HOC for role-based access control

### State Management
- **Redux Toolkit** for global state
- **React Query** for server state (configured but not fully integrated)
- Separate slices for auth, jobs, applications, and admin

### API Integration
- **Axios Client**: Configured with base URL and interceptors
- **JWT Interceptor**: Automatically adds token to requests
- **Error Interceptor**: Handles 401/403 errors globally
- **Endpoints**: Centralized API endpoint definitions

## Routing Structure

### Public Routes
- `/` - Home page with job listings
- `/login` - Login page
- `/register` - Registration page
- `/jobs/:id` - Job details page

### Protected Routes (Seeker)
- `/my-applications` - Track applications

### Protected Routes (Employer)
- `/post-job` - Post new job
- `/my-jobs` - Manage posted jobs
- `/applications` - View job applications

### Protected Routes (Admin)
- `/admin` - Admin dashboard

### Protected Routes (All Authenticated)
- `/profile` - User profile

## Mock Data

The application includes comprehensive mock data for demonstration purposes:
- Sample jobs with realistic details
- User applications with different statuses
- Admin statistics and charts
- User profiles

This allows the frontend to be fully functional as a clickthrough prototype without requiring a backend API.

## Styling & Theme

- **Material UI Theme**: Custom theme with primary and secondary colors
- **Responsive Design**: Mobile-first approach
- **Custom Components**: Styled MUI components with consistent design
- **CSS-in-JS**: Emotion for component styling

## Form Validation

All forms use React Hook Form with Yup schema validation:
- Login: Email and password validation
- Register: Full name, email, password, role
- Post Job: All job fields with minimum length requirements
- Profile: User information validation

## Security Features

- JWT token storage in localStorage
- Automatic token attachment to API requests
- Protected routes with role-based access control
- Automatic redirect on 401 errors
- Password confirmation on registration

## Getting Started

### Installation

```bash
# Navigate to the project directory
cd micro-job-board-client

# Install dependencies
npm install
```

### Development

```bash
# Start development server (runs on http://localhost:3000)
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests (when implemented)
npm test
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://localhost:5000/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next Steps

To connect this frontend to a real backend:

1. Update the API base URL in `.env`
2. Remove or comment out mock data in pages
3. Uncomment the `dispatch` calls in `useEffect` hooks
4. Implement proper error handling for API responses
5. Add loading states and error boundaries
6. Implement file upload for resumes
7. Add real-time notifications
8. Implement pagination for job listings

## Notes

- All Redux actions are properly configured but currently use mock data
- API endpoints are defined but need a running backend
- The application is fully navigable and demonstrates all features
- Forms are fully functional with validation
- Role-based access control is implemented and working
- The UI is responsive and follows Material Design guidelines

## Demo Credentials (for testing with backend)

When backend is ready, you can use these test accounts:

**Admin:**
- Email: admin@example.com
- Password: admin123

**Employer:**
- Email: employer@example.com
- Password: employer123

**Job Seeker:**
- Email: seeker@example.com
- Password: seeker123
