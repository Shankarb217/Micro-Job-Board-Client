import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Public Pages
import RoleBasedHome from './pages/RoleBasedHome';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import JobDetailsPage from './pages/JobDetailsPage';

// Protected Pages
import PostJobPage from './pages/PostJobPage';
import EditJobPage from './pages/EditJobPage';
import ApplicationsPage from './pages/ApplicationsPage';
import MyJobsPage from './pages/MyJobsPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes - Role-based home page */}
        <Route index element={<RoleBasedHome />} />
        <Route 
          path="login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />
        <Route path="jobs/:id" element={<JobDetailsPage />} />

        {/* Protected Routes - Seeker */}
        <Route
          path="my-applications"
          element={
            <ProtectedRoute allowedRoles={['Seeker']}>
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Employer */}
        <Route
          path="post-job"
          element={
            <ProtectedRoute allowedRoles={['Employer', 'Admin']}>
              <PostJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit-job/:id"
          element={
            <ProtectedRoute allowedRoles={['Employer', 'Admin']}>
              <EditJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-jobs"
          element={
            <ProtectedRoute allowedRoles={['Employer', 'Admin']}>
              <MyJobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="applications"
          element={
            <ProtectedRoute allowedRoles={['Employer', 'Admin']}>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Admin */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - All Authenticated Users */}
        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={['Seeker', 'Employer', 'Admin']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
