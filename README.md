# Micro Job Board - Frontend
Hi
A modern job board platform built with React.js, Redux Toolkit, and Material UI.

## 🚀 READY TO DEPLOY!

**Your app is built and ready for deployment!** See `DEPLOY_NOW.md` for quick deployment guide.

```bash
# Deploy to Netlify (2 commands)
netlify login
netlify deploy --prod
```

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool
- **Redux Toolkit** - State Management
- **React Query** - Server State Management
- **React Router v6** - Routing
- **Material UI v5** - UI Components
- **Axios** - HTTP Client
- **React Hook Form + Yup** - Form Handling & Validation
- **Recharts** - Data Visualization

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Quick Deploy to Netlify (FREE)

```bash
# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

**See `DEPLOY_NOW.md` for detailed deployment instructions.**

## Project Structure

```
src/
├── api/              # API client and endpoints
├── app/              # Redux store configuration
├── features/         # Feature-based modules
├── components/       # Reusable components
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── utils/            # Utility functions
└── main.jsx          # Application entry point
```

## Features

- **Authentication** - JWT-based login/register
- **Job Listings** - Browse and search jobs
- **Applications** - Apply and track applications
- **Employer Dashboard** - Post and manage jobs
- **Admin Panel** - Manage users, jobs, and reports
- **Role-Based Access Control** - Seeker, Employer, Admin roles

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=https://localhost:5000/api
```

## License

MIT
