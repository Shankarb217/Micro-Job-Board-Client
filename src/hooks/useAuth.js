import { useSelector } from 'react-redux';

// Custom hook for authentication
export const useAuth = () => {
  const { user, token, isLoading } = useSelector((state) => state.auth);

  return {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    isSeeker: user?.role === 'Seeker',
    isEmployer: user?.role === 'Employer',
    isAdmin: user?.role === 'Admin',
  };
};

export default useAuth;
