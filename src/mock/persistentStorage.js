// Persistent Storage Manager - Similar to MAUI Preferences
// Stores all mock data in localStorage with automatic save/load

import { mockUsers, mockJobs, mockApplications } from './mockData';

const STORAGE_KEYS = {
  USERS: 'microjobboard_users',
  JOBS: 'microjobboard_jobs',
  APPLICATIONS: 'microjobboard_applications',
  INITIALIZED: 'microjobboard_initialized',
};

// Initialize storage with default data if not exists
export const initializeStorage = () => {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  
  if (!isInitialized) {
    console.log('[PERSISTENT STORAGE] Initializing with default data...');
    saveUsers(mockUsers);
    saveJobs(mockJobs);
    saveApplications(mockApplications);
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    console.log('[PERSISTENT STORAGE] Initialization complete!');
  } else {
    console.log('[PERSISTENT STORAGE] Loading existing data from localStorage...');
  }
};

// ============ USERS CRUD ============

export const getUsers = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [...mockUsers];
};

export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const addUser = (user) => {
  const users = getUsers();
  const newUser = {
    ...user,
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const updateUser = (id, userData) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    saveUsers(users);
    return users[index];
  }
  return null;
};

export const deleteUser = (id) => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== id);
  saveUsers(filtered);
  return filtered.length < users.length;
};

export const getUserById = (id) => {
  const users = getUsers();
  return users.find(u => u.id === id);
};

export const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

// ============ JOBS CRUD ============

export const getJobs = () => {
  const data = localStorage.getItem(STORAGE_KEYS.JOBS);
  return data ? JSON.parse(data) : [...mockJobs];
};

export const saveJobs = (jobs) => {
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
};

export const addJob = (job) => {
  const jobs = getJobs();
  const newJob = {
    ...job,
    id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
    postedDate: new Date().toISOString(),
    isActive: true,
  };
  jobs.push(newJob);
  saveJobs(jobs);
  return newJob;
};

export const updateJob = (id, jobData) => {
  const jobs = getJobs();
  const index = jobs.findIndex(j => j.id === id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...jobData };
    saveJobs(jobs);
    return jobs[index];
  }
  return null;
};

export const deleteJob = (id) => {
  const jobs = getJobs();
  const filtered = jobs.filter(j => j.id !== id);
  saveJobs(filtered);
  
  // Also delete related applications
  const applications = getApplications();
  const filteredApps = applications.filter(a => a.jobId !== id);
  saveApplications(filteredApps);
  
  return filtered.length < jobs.length;
};

export const getJobById = (id) => {
  const jobs = getJobs();
  return jobs.find(j => j.id === id);
};

export const getJobsByEmployer = (employerId) => {
  const jobs = getJobs();
  return jobs.filter(j => j.employerId === employerId);
};

// ============ APPLICATIONS CRUD ============

export const getApplications = () => {
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return data ? JSON.parse(data) : [...mockApplications];
};

export const saveApplications = (applications) => {
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
};

export const addApplication = (application) => {
  const applications = getApplications();
  const newApplication = {
    ...application,
    id: applications.length > 0 ? Math.max(...applications.map(a => a.id)) + 1 : 1,
    appliedDate: new Date().toISOString(),
    status: 'Pending',
  };
  applications.push(newApplication);
  saveApplications(applications);
  return newApplication;
};

export const updateApplication = (id, appData) => {
  const applications = getApplications();
  const index = applications.findIndex(a => a.id === id);
  if (index !== -1) {
    applications[index] = { ...applications[index], ...appData };
    saveApplications(applications);
    return applications[index];
  }
  return null;
};

export const deleteApplication = (id) => {
  const applications = getApplications();
  const filtered = applications.filter(a => a.id !== id);
  saveApplications(filtered);
  return filtered.length < applications.length;
};

export const getApplicationById = (id) => {
  const applications = getApplications();
  return applications.find(a => a.id === id);
};

export const getApplicationsBySeeker = (seekerId) => {
  const applications = getApplications();
  return applications.filter(a => a.seekerId === seekerId);
};

export const getApplicationsByJob = (jobId) => {
  const applications = getApplications();
  return applications.filter(a => a.jobId === jobId);
};

// ============ UTILITY FUNCTIONS ============

export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.JOBS);
  localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  console.log('[PERSISTENT STORAGE] All data cleared!');
};

export const resetToDefaults = () => {
  clearAllData();
  initializeStorage();
  console.log('[PERSISTENT STORAGE] Reset to default data!');
};

export const exportData = () => {
  return {
    users: getUsers(),
    jobs: getJobs(),
    applications: getApplications(),
    exportedAt: new Date().toISOString(),
  };
};

export const importData = (data) => {
  if (data.users) saveUsers(data.users);
  if (data.jobs) saveJobs(data.jobs);
  if (data.applications) saveApplications(data.applications);
  console.log('[PERSISTENT STORAGE] Data imported successfully!');
};

export const getStorageStats = () => {
  const users = getUsers();
  const jobs = getJobs();
  const applications = getApplications();
  
  return {
    totalUsers: users.length,
    totalJobs: jobs.length,
    totalApplications: applications.length,
    seekers: users.filter(u => u.role === 'Seeker').length,
    employers: users.filter(u => u.role === 'Employer').length,
    admins: users.filter(u => u.role === 'Admin').length,
    activeJobs: jobs.filter(j => j.isActive).length,
    pendingJobs: jobs.filter(j => j.status === 'Pending').length,
    approvedJobs: jobs.filter(j => j.status === 'Approved').length,
    pendingApplications: applications.filter(a => a.status === 'Pending').length,
    acceptedApplications: applications.filter(a => a.status === 'Accepted').length,
    rejectedApplications: applications.filter(a => a.status === 'Rejected').length,
  };
};

// Initialize storage on module load
initializeStorage();

export default {
  // Users
  getUsers,
  saveUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  
  // Jobs
  getJobs,
  saveJobs,
  addJob,
  updateJob,
  deleteJob,
  getJobById,
  getJobsByEmployer,
  
  // Applications
  getApplications,
  saveApplications,
  addApplication,
  updateApplication,
  deleteApplication,
  getApplicationById,
  getApplicationsBySeeker,
  getApplicationsByJob,
  
  // Utilities
  clearAllData,
  resetToDefaults,
  exportData,
  importData,
  getStorageStats,
  initializeStorage,
};
