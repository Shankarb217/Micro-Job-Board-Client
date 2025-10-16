// Authentication helper functions

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const hasRole = (requiredRole) => {
  const user = getUser();
  return user && user.role === requiredRole;
};

export const hasAnyRole = (requiredRoles) => {
  const user = getUser();
  return user && requiredRoles.includes(user.role);
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
