import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Container, Typography, Button } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    // User is not authenticated, redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is authenticated but doesn't have the required role
    // Show a friendly message and redirect options based on their role
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <LockIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Access Restricted
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            You don't have permission to access this page.
            {user.role === 'Seeker' && ' This page is only available for Employers and Admins.'}
            {user.role === 'Employer' && ' This page is only available for Job Seekers or Admins.'}
            {user.role === 'Admin' && ' This page is restricted.'}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {user.role === 'Seeker' && (
              <>
                <Button variant="contained" component={Link} to="/">
                  Browse Jobs
                </Button>
                <Button variant="outlined" component={Link} to="/my-applications">
                  My Applications
                </Button>
              </>
            )}
            {user.role === 'Employer' && (
              <>
                <Button variant="contained" component={Link} to="/my-jobs">
                  My Jobs
                </Button>
                <Button variant="outlined" component={Link} to="/post-job">
                  Post a Job
                </Button>
              </>
            )}
            {user.role === 'Admin' && (
              <>
                <Button variant="contained" component={Link} to="/admin">
                  Admin Dashboard
                </Button>
                <Button variant="outlined" component={Link} to="/">
                  Home
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    );
  }

  // User is authenticated and has the required role
  return children;
}

export default ProtectedRoute;
