import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PublicRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    // User is already authenticated, redirect to appropriate page based on role
    const role = user?.role;
    if (role === 'Admin') {
      return <Navigate to="/admin" replace />;
    } else if (role === 'Employer') {
      return <Navigate to="/my-jobs" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // User is not authenticated, allow access to public routes
  return children;
}

export default PublicRoute;
