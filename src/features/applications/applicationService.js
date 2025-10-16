import axiosClient from '../../api/axiosClient';
import endpoints from '../../api/endpoints';

// Apply to job
const applyToJob = async (jobId, applicationData) => {
  const response = await axiosClient.post(endpoints.jobs.apply(jobId), applicationData);
  return response.data;
};

// Get my applications (seeker)
const getMyApplications = async () => {
  const response = await axiosClient.get(endpoints.applications.getMyApplications);
  return response.data;
};

// Update application status (employer)
const updateApplicationStatus = async (applicationId, status) => {
  const response = await axiosClient.put(
    endpoints.applications.updateStatus(applicationId),
    { status }
  );
  return response.data;
};

// Get applications by job (employer)
const getApplicationsByJob = async (jobId) => {
  const response = await axiosClient.get(endpoints.applications.getApplicationsByJob(jobId));
  return response.data;
};

const applicationService = {
  applyToJob,
  getMyApplications,
  updateApplicationStatus,
  getApplicationsByJob,
};

export default applicationService;
