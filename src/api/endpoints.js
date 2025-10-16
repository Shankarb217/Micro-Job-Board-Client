// API Endpoints Configuration

const endpoints = {
  // Authentication
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    refreshToken: '/auth/refresh-token',
  },

  // Jobs
  jobs: {
    getAll: '/jobs',
    getById: (id) => `/jobs/${id}`,
    create: '/jobs',
    update: (id) => `/jobs/${id}`,
    delete: (id) => `/jobs/${id}`,
    getMyJobs: '/my-jobs',
    apply: (jobId) => `/jobs/${jobId}/apply`,
  },

  // Applications
  applications: {
    getMyApplications: '/my-applications',
    updateStatus: (applicationId) => `/applications/${applicationId}/status`,
    getApplicationsByJob: (jobId) => `/jobs/${jobId}/applications`,
  },

  // Admin
  admin: {
    getUsers: '/admin/users',
    updateUserRole: (userId) => `/admin/users/${userId}/role`,
    getPendingJobs: '/admin/pending-jobs',
    approveJob: (jobId) => `/admin/jobs/${jobId}/approve`,
    getReports: '/admin/reports',
    getDashboardStats: '/admin/dashboard/stats',
  },

  // User Profile
  user: {
    getProfile: '/user/profile',
    updateProfile: '/user/profile',
  },
};

export default endpoints;
