import axiosClient from '../../api/axiosClient';
import endpoints from '../../api/endpoints';

// Get all jobs
const getJobs = async (params) => {
  const response = await axiosClient.get(endpoints.jobs.getAll, { params });
  return response.data;
};

// Get job by ID
const getJobById = async (id) => {
  const response = await axiosClient.get(endpoints.jobs.getById(id));
  return response.data;
};

// Create job
const createJob = async (jobData) => {
  const response = await axiosClient.post(endpoints.jobs.create, jobData);
  return response.data;
};

// Update job
const updateJob = async (id, jobData) => {
  const response = await axiosClient.put(endpoints.jobs.update(id), jobData);
  return response.data;
};

// Delete job
const deleteJob = async (id) => {
  await axiosClient.delete(endpoints.jobs.delete(id));
  return id;
};

// Get my jobs (employer)
const getMyJobs = async () => {
  const response = await axiosClient.get(endpoints.jobs.getMyJobs);
  return response.data;
};

const jobService = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
};

export default jobService;
