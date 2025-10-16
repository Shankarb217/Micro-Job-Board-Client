import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SeekerHomePage from './SeekerHomePage';
import EmployerHomePage from './EmployerHomePage';
import AdminHomePage from './AdminHomePage';
import HomePage from './HomePage';

function RoleBasedHome() {
  const { user } = useSelector((state) => state.auth);

  // If user is not logged in, show public home page
  if (!user) {
    return <HomePage />;
  }

  // Route to role-specific home page
  switch (user.role) {
    case 'Admin':
      return <AdminHomePage />;
    case 'Employer':
      return <EmployerHomePage />;
    case 'Seeker':
      return <SeekerHomePage />;
    default:
      return <HomePage />;
  }
}

export default RoleBasedHome;
