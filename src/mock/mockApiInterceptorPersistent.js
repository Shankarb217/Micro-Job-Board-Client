// Mock API Interceptor with Persistent Storage
// All CRUD operations are saved to localStorage (like MAUI Preferences)

import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getJobs,
  addJob,
  updateJob,
  deleteJob,
  getJobById,
  getJobsByEmployer as getJobsByEmployerStorage,
  getApplications,
  addApplication,
  updateApplication,
  deleteApplication,
  getApplicationsBySeeker as getApplicationsBySeekerStorage,
  getApplicationsByJob as getApplicationsByJobStorage,
  getStorageStats,
} from './persistentStorage';

import { generateMockToken, filterJobs as filterJobsHelper } from './mockData';

// Helper to simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get current user from token
const getCurrentUserFromToken = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Mock API Handler with Persistent Storage
export const mockApiHandler = async (config) => {
  await delay(300); // Simulate network delay

  const { method, url, data, params } = config;
  const currentUser = getCurrentUserFromToken();

  console.log(`[PERSISTENT MOCK API] ${method.toUpperCase()} ${url}`);

  try {
    // ============ AUTH ENDPOINTS ============
    
    // POST /auth/register
    if (method === 'post' && url.includes('/auth/register')) {
      const { email, password, name, role, company, phone } = data;
      
      // Check if user already exists
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        throw {
          response: {
            status: 400,
            data: { message: 'User with this email already exists' }
          }
        };
      }

      // Create new user with persistent storage
      const newUser = addUser({
        email,
        password,
        name,
        role: role || 'Seeker',
        company: role === 'Employer' ? company : undefined,
        phone: role === 'Seeker' ? phone : undefined,
      });

      const token = generateMockToken(newUser);
      const userResponse = { ...newUser };
      delete userResponse.password;

      console.log('[PERSISTENT STORAGE] User registered and saved:', userResponse.email);

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
      
      const user = getUserByEmail(email);
      
      if (!user || user.password !== password) {
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

      console.log('[PERSISTENT STORAGE] User logged in:', userResponse.email);

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
      const allJobs = getJobs();
      const filteredJobs = filterJobsHelper(params, allJobs);
      
      console.log('[PERSISTENT STORAGE] Retrieved jobs:', filteredJobs.length);
      
      return {
        data: filteredJobs,
        status: 200,
      };
    }

    // GET /jobs/:id - Get job by ID
    if (method === 'get' && url.match(/\/jobs\/\d+$/) && !url.includes('/applications')) {
      const jobId = parseInt(url.match(/\/jobs\/(\d+)/)[1]);
      const job = getJobById(jobId);
      
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

      const employerJobs = getJobsByEmployerStorage(currentUser.id);
      console.log('[PERSISTENT STORAGE] Retrieved employer jobs:', employerJobs.length);
      
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

      const newJob = addJob({
        ...data,
        employerId: currentUser.id,
        companyName: currentUser.company || currentUser.name,
        status: 'Pending',
      });

      console.log('[PERSISTENT STORAGE] Job created and saved:', newJob.title);

      return {
        data: newJob,
        status: 201,
      };
    }

    // PUT /jobs/:id - Update job
    if (method === 'put' && url.match(/\/jobs\/\d+$/) && !url.includes('/approve')) {
      const jobId = parseInt(url.match(/\/jobs\/(\d+)/)[1]);
      const job = getJobById(jobId);
      
      if (!job) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      if (currentUser.role !== 'Admin' && job.employerId !== currentUser.id) {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. You can only update your own jobs.' }
          }
        };
      }

      const updatedJob = updateJob(jobId, data);
      console.log('[PERSISTENT STORAGE] Job updated:', updatedJob.title);

      return {
        data: updatedJob,
        status: 200,
      };
    }

    // DELETE /jobs/:id - Delete job
    if (method === 'delete' && url.match(/\/jobs\/\d+$/)) {
      const jobId = parseInt(url.match(/\/jobs\/(\d+)/)[1]);
      const job = getJobById(jobId);
      
      if (!job) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      if (currentUser.role !== 'Admin' && job.employerId !== currentUser.id) {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. You can only delete your own jobs.' }
          }
        };
      }

      deleteJob(jobId);
      console.log('[PERSISTENT STORAGE] Job deleted:', job.title);

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
      const job = getJobById(jobId);
      
      if (!job) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      // Check if already applied
      const existingApplications = getApplicationsByJobStorage(jobId);
      const alreadyApplied = existingApplications.some(app => app.seekerId === currentUser.id);

      if (alreadyApplied) {
        throw {
          response: {
            status: 400,
            data: { message: 'You have already applied to this job' }
          }
        };
      }

      const newApplication = addApplication({
        jobId,
        jobTitle: job.title,
        seekerId: currentUser.id,
        seekerName: currentUser.name,
        seekerEmail: currentUser.email,
        coverLetter: data.coverLetter,
        resume: currentUser.resume || 'resume.pdf',
        companyName: job.companyName,
      });

      console.log('[PERSISTENT STORAGE] Application created and saved');

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

      const myApplications = getApplicationsBySeekerStorage(currentUser.id);
      console.log('[PERSISTENT STORAGE] Retrieved seeker applications:', myApplications.length);
      
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
      const job = getJobById(jobId);
      
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

      const applications = getApplicationsByJobStorage(jobId);
      console.log('[PERSISTENT STORAGE] Retrieved job applications:', applications.length);
      
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
      const applications = getApplications();
      const application = applications.find(a => a.id === applicationId);
      
      if (!application) {
        throw {
          response: {
            status: 404,
            data: { message: 'Application not found' }
          }
        };
      }

      const job = getJobById(application.jobId);
      
      if (job.employerId !== currentUser.id) {
        throw {
          response: {
            status: 403,
            data: { message: 'Access denied. You can only update applications for your own jobs.' }
          }
        };
      }

      const updatedApplication = updateApplication(applicationId, { status: data.status });
      console.log('[PERSISTENT STORAGE] Application status updated:', updatedApplication.status);

      return {
        data: updatedApplication,
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

      const allUsers = getUsers();
      const usersWithoutPasswords = allUsers.map(u => {
        const user = { ...u };
        delete user.password;
        return user;
      });

      console.log('[PERSISTENT STORAGE] Retrieved all users:', usersWithoutPasswords.length);

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
      const updatedUser = updateUser(userId, { role: data.role });
      
      if (!updatedUser) {
        throw {
          response: {
            status: 404,
            data: { message: 'User not found' }
          }
        };
      }

      const userResponse = { ...updatedUser };
      delete userResponse.password;

      console.log('[PERSISTENT STORAGE] User role updated:', userResponse.email, '->', data.role);

      return {
        data: userResponse,
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

      const allJobs = getJobs();
      const pendingJobs = allJobs.filter(j => j.status === 'Pending');
      
      console.log('[PERSISTENT STORAGE] Retrieved pending jobs:', pendingJobs.length);
      
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
      const updatedJob = updateJob(jobId, { status: 'Approved' });
      
      if (!updatedJob) {
        throw {
          response: {
            status: 404,
            data: { message: 'Job not found' }
          }
        };
      }

      console.log('[PERSISTENT STORAGE] Job approved:', updatedJob.title);

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

      const stats = getStorageStats();
      const allJobs = getJobs();
      const allApplications = getApplications();
      
      const dashboardStats = {
        ...stats,
        recentJobs: allJobs.slice(-5).reverse(),
        recentApplications: allApplications.slice(-5).reverse(),
        jobsByCategory: [
          { name: 'Technology', value: allJobs.filter(j => j.category === 'Technology').length },
          { name: 'Design', value: allJobs.filter(j => j.category === 'Design').length },
          { name: 'Marketing', value: allJobs.filter(j => j.category === 'Marketing').length },
          { name: 'Management', value: allJobs.filter(j => j.category === 'Management').length },
          { name: 'Business', value: allJobs.filter(j => j.category === 'Business').length },
        ],
        applicationsByStatus: [
          { name: 'Pending', value: stats.pendingApplications },
          { name: 'Accepted', value: stats.acceptedApplications },
          { name: 'Rejected', value: stats.rejectedApplications },
        ],
        jobsByMonth: [
          { month: 'Jan', jobs: 2 },
          { month: 'Feb', jobs: 3 },
          { month: 'Mar', jobs: 7 },
          { month: 'Apr', jobs: allJobs.length },
        ],
      };

      console.log('[PERSISTENT STORAGE] Retrieved dashboard stats');

      return {
        data: dashboardStats,
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

      const stats = getStorageStats();
      return {
        data: stats,
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

      const allUsers = getUsers();
      const user = allUsers.find(u => u.id === currentUser.id);
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

      const updatedUser = updateUser(currentUser.id, data);
      const userResponse = { ...updatedUser };
      delete userResponse.password;

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(userResponse));

      console.log('[PERSISTENT STORAGE] User profile updated:', userResponse.email);

      return {
        data: userResponse,
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
    console.error('[PERSISTENT MOCK API ERROR]', error);
    throw error;
  }
};

// Function to enable mock mode
export const enableMockMode = () => {
  console.log('%c[PERSISTENT MOCK MODE ENABLED]', 'color: green; font-weight: bold; font-size: 14px;');
  console.log('%c✅ All data is saved to localStorage', 'color: blue;');
  console.log('%c✅ CRUD operations persist across sessions', 'color: blue;');
  console.log('%c✅ Works like MAUI Preferences', 'color: blue;');
  console.log('%cTest Credentials:', 'color: orange; font-weight: bold;');
  console.log('Admin: admin@example.com / admin123');
  console.log('Employer: employer@example.com / employer123');
  console.log('Seeker: seeker@example.com / seeker123');
};

// Function to reset session data
export const resetMockData = () => {
  const { resetToDefaults } = require('./persistentStorage');
  resetToDefaults();
  console.log('[PERSISTENT MOCK MODE] Data reset to initial state');
};

export default mockApiHandler;
