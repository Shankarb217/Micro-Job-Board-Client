import axiosClient from '../../api/axiosClient';
import endpoints from '../../api/endpoints';

// Register user
const register = async (userData) => {
  const response = await axiosClient.post(endpoints.auth.register, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axiosClient.post(endpoints.auth.login, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
