import axiosClient from '../../api/axiosClient';
import endpoints from '../../api/endpoints';

// Get all users
const getUsers = async () => {
  const response = await axiosClient.get(endpoints.admin.getUsers);
  return response.data;
};

// Update user role
const updateUserRole = async (userId, role) => {
  const response = await axiosClient.put(endpoints.admin.updateUserRole(userId), { role });
  return response.data;
};

// Get pending jobs
const getPendingJobs = async () => {
  const response = await axiosClient.get(endpoints.admin.getPendingJobs);
  return response.data;
};

// Approve job
const approveJob = async (jobId) => {
  await axiosClient.put(endpoints.admin.approveJob(jobId));
  return jobId;
};

// Get reports
const getReports = async () => {
  const response = await axiosClient.get(endpoints.admin.getReports);
  return response.data;
};

// Get dashboard stats
const getDashboardStats = async () => {
  const response = await axiosClient.get(endpoints.admin.getDashboardStats);
  return response.data;
};

const adminService = {
  getUsers,
  updateUserRole,
  getPendingJobs,
  approveJob,
  getReports,
  getDashboardStats,
};

export default adminService;
