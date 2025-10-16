// Mock API Interceptor - Intercepts all API calls and returns static data
import {
  mockUsers,
  mockJobs,
  mockApplications,
  mockDashboardStats,
  generateMockToken,
  findUserByCredentials,
  getJobsByEmployer,
  getApplicationsBySeeker,
  getApplicationsByJob,
  filterJobs,
} from './mockData';

// In-memory storage for dynamic data during the session
let sessionUsers = [...mockUsers];
let sessionJobs = [...mockJobs];
let sessionApplications = [...mockApplications];

// Helper to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get current user from token
const getCurrentUserFromToken = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Mock API Handler
export const mockApiHandler = async (config) => {
  await delay(300); // Simulate network delay

  const { method, url, data, params } = config;
  const currentUser = getCurrentUserFromToken();

  // console.log(`[MOCK API] ${method.toUpperCase()} ${url}`, { data, params });

  try {
    // ============ AUTH ENDPOINTS ============
    
    // POST /auth/register
    if (method === 'post' && url.includes('/auth/register')) {
      const { email, password, name, role, company, phone } = data;
      
      // Check if user already exists
      const existingUser = sessionUsers.find(u => u.email === email);
      if (existingUser) {
        throw {
          response: {
            status: 400,
            data: { message: 'User with this email already exists' }
          }
        };
      }

      // Create new user
      const newUser = {
        id: sessionUsers.length + 1,
        email,
        password,
        name,
        role: role || 'Seeker',
        company: role === 'Employer' ? company : undefined,
        phone: role === 'Seeker' ? phone : undefined,
        createdAt: new Date().toISOString(),
      };

      sessionUsers.push(newUser);

      const token = generateMockToken(newUser);
      const userResponse = { ...newUser };
      delete userResponse.password;

      return {
        data: {
          user: userResponse,
          token,
          message: 'Registration successful',
        },
        status: 201,
      };
    }

    // POST /auth/login
    if (method === 'post' && url.includes('/auth/login')) {
      const { email, password } = data;
      
      const user = findUserByCredentials(email, password);
      
      if (!user) {
        throw {
          response: {
            status: 401,
            data: { message: 'Invalid email or password' }
          }
        };
      }

      const token = generateMockToken(user);
      const userResponse = { ...user };
      delete userResponse.password;

      return {
        data: {
          user: userResponse,
          token,
          message: 'Login successful',
        },
        status: 200,
      };
    }

    // ============ JOBS ENDPOINTS ============

    // GET /jobs - Get all jobs (with filters)
    if (method === 'get' && url.includes('/jobs') && !url.includes('/my-jobs') && !url.match(/\/jobs\/\d+/)) {
      const filteredJobs = filterJobs(params);
      return {
        data: filteredJobs,
        status: 200,
      };
    }

    // GET /jobs/:id - Get job by ID
    if (method === 'get' && url.match(/\/jobs\/\d+$/) && !url.includes('/applications')) {
      const jobId = parseInt(url.match(/\/jobs\/(\d+)/)[1]);
      const job = sessionJobs.find(j => j.id === jobId);
      
      if (!job) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      return {
        data: job,
        status: 200,
      };
    }

    // GET /my-jobs - Get employer's jobs
    if (method === 'get' && url.includes('/my-jobs')) {
      if (!currentUser || currentUser.role !== 'Employer') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Employer role required.' }
          }
        };
      }

      const employerJobs = getJobsByEmployer(currentUser.id);
      return {
        data: employerJobs,
        status: 200,
      };
    }

    // POST /jobs - Create job
    if (method === 'post' && url.includes('/jobs') && !url.includes('/apply')) {
      if (!currentUser || currentUser.role !== 'Employer') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Employer role required.' }
          }
        };
      }

      const newJob = {
        id: sessionJobs.length + 1,
        ...data,
        employerId: currentUser.id,
        companyName: currentUser.company || currentUser.name,
        status: 'Pending',
        postedDate: new Date().toISOString(),
        isActive: true,
      };

      sessionJobs.push(newJob);

      return {
        data: newJob,
        status: 201,
      };
    }

    // PUT /jobs/:id - Update job
    if (method === 'put' && url.match(/\/jobs\/\d+$/) && !url.includes('/approve')) {
      const jobId = parseInt(url.match(/\/jobs\/(\d+)/)[1]);
      const jobIndex = sessionJobs.findIndex(j => j.id === jobId);
      
      if (jobIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      const job = sessionJobs[jobIndex];
      
      if (currentUser.role !== 'Admin' && job.employerId !== currentUser.id) {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. You can only update your own jobs.' }
          }
        };
      }

      sessionJobs[jobIndex] = { ...job, ...data };

      return {
        data: sessionJobs[jobIndex],
        status: 200,
      };
    }

    // DELETE /jobs/:id - Delete job
    if (method === 'delete' && url.match(/\/jobs\/\d+$/)) {
      const jobId = parseInt(url.match(/\/jobs\/(\d+)/)[1]);
      const jobIndex = sessionJobs.findIndex(j => j.id === jobId);
      
      if (jobIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      const job = sessionJobs[jobIndex];
      
      if (currentUser.role !== 'Admin' && job.employerId !== currentUser.id) {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. You can only delete your own jobs.' }
          }
        };
      }

      sessionJobs.splice(jobIndex, 1);

      return {
        data: { message: 'Job deleted successfully' },
        status: 200,
      };
    }

    // ============ APPLICATIONS ENDPOINTS ============

    // POST /jobs/:jobId/apply - Apply to job
    if (method === 'post' && url.includes('/apply')) {
      if (!currentUser || currentUser.role !== 'Seeker') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Seeker role required.' }
          }
        };
      }

      const jobId = parseInt(url.match(/\/jobs\/(\d+)/)[1]);
      const job = sessionJobs.find(j => j.id === jobId);
      
      if (!job) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      // Check if already applied
      const existingApplication = sessionApplications.find(
        app => app.jobId === jobId && app.seekerId === currentUser.id
      );

      if (existingApplication) {
        throw {
          response: {
            status: 400,
            data: { message: 'You have already applied to this job' }
          }
        };
      }

      const newApplication = {
        id: sessionApplications.length + 1,
        jobId,
        jobTitle: job.title,
        seekerId: currentUser.id,
        seekerName: currentUser.name,
        seekerEmail: currentUser.email,
        coverLetter: data.coverLetter,
        resume: currentUser.resume || 'resume.pdf',
        status: 'Pending',
        appliedDate: new Date().toISOString(),
        companyName: job.companyName,
      };

      sessionApplications.push(newApplication);

      return {
        data: newApplication,
        status: 201,
      };
    }

    // GET /my-applications - Get seeker's applications
    if (method === 'get' && url.includes('/my-applications')) {
      if (!currentUser || currentUser.role !== 'Seeker') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Seeker role required.' }
          }
        };
      }

      const myApplications = getApplicationsBySeeker(currentUser.id);
      return {
        data: myApplications,
        status: 200,
      };
    }

    // GET /jobs/:jobId/applications - Get applications for a job
    if (method === 'get' && url.match(/\/jobs\/\d+\/applications/)) {
      if (!currentUser || currentUser.role !== 'Employer') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Employer role required.' }
          }
        };
      }

      const jobId = parseInt(url.match(/\/jobs\/(\d+)/)[1]);
      const job = sessionJobs.find(j => j.id === jobId);
      
      if (!job) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      if (job.employerId !== currentUser.id) {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. You can only view applications for your own jobs.' }
          }
        };
      }

      const applications = getApplicationsByJob(jobId);
      return {
        data: applications,
        status: 200,
      };
    }

    // PUT /applications/:id/status - Update application status
    if (method === 'put' && url.match(/\/applications\/\d+\/status/)) {
      if (!currentUser || currentUser.role !== 'Employer') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Employer role required.' }
          }
        };
      }

      const applicationId = parseInt(url.match(/\/applications\/(\d+)/)[1]);
      const appIndex = sessionApplications.findIndex(a => a.id === applicationId);
      
      if (appIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'Application not found' }
          }
        };
      }

      const application = sessionApplications[appIndex];
      const job = sessionJobs.find(j => j.id === application.jobId);
      
      if (job.employerId !== currentUser.id) {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. You can only update applications for your own jobs.' }
          }
        };
      }

      sessionApplications[appIndex] = { ...application, status: data.status };

      return {
        data: sessionApplications[appIndex],
        status: 200,
      };
    }

    // ============ ADMIN ENDPOINTS ============

    // GET /admin/users - Get all users
    if (method === 'get' && url.includes('/admin/users')) {
      if (!currentUser || currentUser.role !== 'Admin') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Admin role required.' }
          }
        };
      }

      const usersWithoutPasswords = sessionUsers.map(u => {
        const user = { ...u };
        delete user.password;
        return user;
      });

      return {
        data: usersWithoutPasswords,
        status: 200,
      };
    }

    // PUT /admin/users/:id/role - Update user role
    if (method === 'put' && url.match(/\/admin\/users\/\d+\/role/)) {
      if (!currentUser || currentUser.role !== 'Admin') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Admin role required.' }
          }
        };
      }

      const userId = parseInt(url.match(/\/admin\/users\/(\d+)/)[1]);
      const userIndex = sessionUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'User not found' }
          }
        };
      }

      sessionUsers[userIndex].role = data.role;
      const updatedUser = { ...sessionUsers[userIndex] };
      delete updatedUser.password;

      return {
        data: updatedUser,
        status: 200,
      };
    }

    // GET /admin/pending-jobs - Get pending jobs
    if (method === 'get' && url.includes('/admin/pending-jobs')) {
      if (!currentUser || currentUser.role !== 'Admin') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Admin role required.' }
          }
        };
      }

      const pendingJobs = sessionJobs.filter(j => j.status === 'Pending');
      return {
        data: pendingJobs,
        status: 200,
      };
    }

    // PUT /admin/jobs/:id/approve - Approve job
    if (method === 'put' && url.match(/\/admin\/jobs\/\d+\/approve/)) {
      if (!currentUser || currentUser.role !== 'Admin') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Admin role required.' }
          }
        };
      }

      const jobId = parseInt(url.match(/\/admin\/jobs\/(\d+)/)[1]);
      const jobIndex = sessionJobs.findIndex(j => j.id === jobId);
      
      if (jobIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      sessionJobs[jobIndex].status = 'Approved';

      return {
        data: { message: 'Job approved successfully' },
        status: 200,
      };
    }

    // GET /admin/dashboard/stats - Get dashboard statistics
    if (method === 'get' && url.includes('/admin/dashboard/stats')) {
      if (!currentUser || currentUser.role !== 'Admin') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Admin role required.' }
          }
        };
      }

      // Calculate dynamic stats based on current session data
      const stats = {
        totalUsers: sessionUsers.length,
        totalJobs: sessionJobs.length,
        totalApplications: sessionApplications.length,
        pendingJobs: sessionJobs.filter(job => job.status === 'Pending').length,
        approvedJobs: sessionJobs.filter(job => job.status === 'Approved').length,
        activeJobs: sessionJobs.filter(job => job.isActive).length,
        seekers: sessionUsers.filter(user => user.role === 'Seeker').length,
        employers: sessionUsers.filter(user => user.role === 'Employer').length,
        admins: sessionUsers.filter(user => user.role === 'Admin').length,
        pendingApplications: sessionApplications.filter(app => app.status === 'Pending').length,
        acceptedApplications: sessionApplications.filter(app => app.status === 'Accepted').length,
        rejectedApplications: sessionApplications.filter(app => app.status === 'Rejected').length,
        recentJobs: sessionJobs.slice(-5).reverse(),
        recentApplications: sessionApplications.slice(-5).reverse(),
        jobsByCategory: mockDashboardStats.jobsByCategory,
        applicationsByStatus: [
          { name: 'Pending', value: sessionApplications.filter(app => app.status === 'Pending').length },
          { name: 'Accepted', value: sessionApplications.filter(app => app.status === 'Accepted').length },
          { name: 'Rejected', value: sessionApplications.filter(app => app.status === 'Rejected').length },
        ],
        jobsByMonth: mockDashboardStats.jobsByMonth,
      };

      return {
        data: stats,
        status: 200,
      };
    }

    // GET /admin/reports - Get reports
    if (method === 'get' && url.includes('/admin/reports')) {
      if (!currentUser || currentUser.role !== 'Admin') {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. Admin role required.' }
          }
        };
      }

      return {
        data: mockDashboardStats,
        status: 200,
      };
    }

    // ============ USER PROFILE ENDPOINTS ============

    // GET /user/profile - Get user profile
    if (method === 'get' && url.includes('/user/profile')) {
      if (!currentUser) {
        throw {
          response: {
            status: 401,
            data: { message: 'Unauthorized' }
          }
        };
      }

      const user = sessionUsers.find(u => u.id === currentUser.id);
      const userResponse = { ...user };
      delete userResponse.password;

      return {
        data: userResponse,
        status: 200,
      };
    }

    // PUT /user/profile - Update user profile
    if (method === 'put' && url.includes('/user/profile')) {
      if (!currentUser) {
        throw {
          response: {
            status: 401,
            data: { message: 'Unauthorized' }
          }
        };
      }

      const userIndex = sessionUsers.findIndex(u => u.id === currentUser.id);
      sessionUsers[userIndex] = { ...sessionUsers[userIndex], ...data };
      
      const updatedUser = { ...sessionUsers[userIndex] };
      delete updatedUser.password;

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return {
        data: updatedUser,
        status: 200,
      };
    }

    // If no endpoint matched, return 404
    throw {
      response: {
        status: 404,
        data: { message: 'Endpoint not found' }
      }
    };

  } catch (error) {
    // console.error('[MOCK API ERROR]', error);
    throw error;
  }
};

// Function to enable mock mode
export const enableMockMode = () => {
  // Silent mode - no console logs to hide mock mode from clients
  // console.log('%c[MOCK MODE ENABLED] All API calls will use static data', 'color: green; font-weight: bold; font-size: 14px;');
  // console.log('%c[MOCK MODE] Test Credentials:', 'color: blue; font-weight: bold;');
  // console.log('Admin: admin@example.com / admin123');
  // console.log('Employer: employer@example.com / employer123');
  // console.log('Seeker: seeker@example.com / seeker123');
};

// Function to reset session data
export const resetMockData = () => {
  sessionUsers = [...mockUsers];
  sessionJobs = [...mockJobs];
  sessionApplications = [...mockApplications];
  // console.log('[MOCK MODE] Data reset to initial state');
};

export default mockApiHandler;
