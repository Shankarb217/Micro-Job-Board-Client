// Mock Data for Demo - Complete Static Data for All Models

// Users Data
export const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'Admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    email: 'employer@example.com',
    password: 'employer123',
    name: 'Tech Corp',
    role: 'Employer',
    company: 'Tech Corp Solutions',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 3,
    email: 'seeker@example.com',
    password: 'seeker123',
    name: 'John Doe',
    role: 'Seeker',
    phone: '+1234567890',
    resume: 'john-doe-resume.pdf',
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 4,
    email: 'employer2@example.com',
    password: 'employer123',
    name: 'Digital Innovations',
    role: 'Employer',
    company: 'Digital Innovations Inc',
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 5,
    email: 'seeker2@example.com',
    password: 'seeker123',
    name: 'Jane Smith',
    role: 'Seeker',
    phone: '+1234567891',
    resume: 'jane-smith-resume.pdf',
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 6,
    email: 'employer3@example.com',
    password: 'employer123',
    name: 'StartUp Hub',
    role: 'Employer',
    company: 'StartUp Hub Ltd',
    createdAt: '2024-03-01T00:00:00Z',
  },
];

// Jobs Data
export const mockJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    description: 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.',
    requirements: 'Bachelor\'s degree in Computer Science or related field. 5+ years of experience with React, Node.js, and SQL databases. Strong problem-solving skills and ability to work in a team environment.',
    location: 'New York, NY',
    salary: '$120,000 - $150,000',
    jobType: 'Full-time',
    category: 'Technology',
    companyName: 'Tech Corp Solutions',
    employerId: 2,
    status: 'Approved',
    postedDate: '2024-03-01T10:00:00Z',
    deadline: '2024-04-30T23:59:59Z',
    isActive: true,
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    description: 'Join our creative team as a UI/UX Designer. You will design intuitive and beautiful user interfaces for web and mobile applications.',
    requirements: '3+ years of experience in UI/UX design. Proficiency in Figma, Adobe XD, and Sketch. Strong portfolio demonstrating user-centered design principles.',
    location: 'San Francisco, CA',
    salary: '$90,000 - $120,000',
    jobType: 'Full-time',
    category: 'Design',
    companyName: 'Digital Innovations Inc',
    employerId: 4,
    status: 'Approved',
    postedDate: '2024-03-05T14:30:00Z',
    deadline: '2024-05-15T23:59:59Z',
    isActive: true,
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    description: 'We need a skilled DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. Experience with AWS and Kubernetes is essential.',
    requirements: 'Bachelor\'s degree in Computer Science. 4+ years of DevOps experience. Strong knowledge of AWS, Docker, Kubernetes, and Jenkins. Experience with Infrastructure as Code (Terraform).',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    jobType: 'Full-time',
    category: 'Technology',
    companyName: 'Tech Corp Solutions',
    employerId: 2,
    status: 'Approved',
    postedDate: '2024-03-10T09:00:00Z',
    deadline: '2024-05-01T23:59:59Z',
    isActive: true,
  },
  {
    id: 4,
    title: 'Marketing Manager',
    description: 'Lead our marketing efforts and develop strategies to increase brand awareness and drive customer acquisition.',
    requirements: '5+ years of marketing experience. Strong understanding of digital marketing, SEO, and social media. Excellent communication and leadership skills.',
    location: 'Los Angeles, CA',
    salary: '$85,000 - $110,000',
    jobType: 'Full-time',
    category: 'Marketing',
    companyName: 'StartUp Hub Ltd',
    employerId: 6,
    status: 'Approved',
    postedDate: '2024-03-12T11:00:00Z',
    deadline: '2024-04-25T23:59:59Z',
    isActive: true,
  },
  {
    id: 5,
    title: 'Data Scientist',
    description: 'Join our data team to analyze complex datasets and build machine learning models that drive business decisions.',
    requirements: 'Master\'s degree in Data Science, Statistics, or related field. 3+ years of experience with Python, R, and SQL. Strong knowledge of machine learning algorithms and statistical analysis.',
    location: 'Boston, MA',
    salary: '$100,000 - $130,000',
    jobType: 'Full-time',
    category: 'Technology',
    companyName: 'Digital Innovations Inc',
    employerId: 4,
    status: 'Approved',
    postedDate: '2024-03-15T13:00:00Z',
    deadline: '2024-05-10T23:59:59Z',
    isActive: true,
  },
  {
    id: 6,
    title: 'Frontend Developer (React)',
    description: 'We are seeking a talented Frontend Developer with expertise in React to build responsive and performant web applications.',
    requirements: '3+ years of experience with React, JavaScript, HTML, and CSS. Experience with Redux, TypeScript, and modern frontend tools. Strong attention to detail.',
    location: 'Seattle, WA',
    salary: '$95,000 - $125,000',
    jobType: 'Full-time',
    category: 'Technology',
    companyName: 'Tech Corp Solutions',
    employerId: 2,
    status: 'Approved',
    postedDate: '2024-03-18T10:30:00Z',
    deadline: '2024-05-20T23:59:59Z',
    isActive: true,
  },
  {
    id: 7,
    title: 'Product Manager',
    description: 'Lead product development from conception to launch. Work closely with engineering, design, and marketing teams.',
    requirements: '4+ years of product management experience. Strong analytical and communication skills. Experience with Agile methodologies and product roadmap planning.',
    location: 'Chicago, IL',
    salary: '$105,000 - $135,000',
    jobType: 'Full-time',
    category: 'Management',
    companyName: 'StartUp Hub Ltd',
    employerId: 6,
    status: 'Pending',
    postedDate: '2024-03-20T15:00:00Z',
    deadline: '2024-05-30T23:59:59Z',
    isActive: true,
  },
  {
    id: 8,
    title: 'Backend Developer (Node.js)',
    description: 'Build scalable backend services and APIs using Node.js and modern frameworks. Work with microservices architecture.',
    requirements: '4+ years of Node.js development experience. Strong knowledge of Express, MongoDB, and RESTful APIs. Experience with microservices and cloud platforms.',
    location: 'Denver, CO',
    salary: '$100,000 - $130,000',
    jobType: 'Full-time',
    category: 'Technology',
    companyName: 'Digital Innovations Inc',
    employerId: 4,
    status: 'Approved',
    postedDate: '2024-03-22T12:00:00Z',
    deadline: '2024-05-25T23:59:59Z',
    isActive: true,
  },
  {
    id: 9,
    title: 'Mobile App Developer (React Native)',
    description: 'Develop cross-platform mobile applications using React Native. Collaborate with designers and backend developers.',
    requirements: '3+ years of React Native experience. Knowledge of iOS and Android development. Experience with mobile app deployment and optimization.',
    location: 'Miami, FL',
    salary: '$90,000 - $120,000',
    jobType: 'Full-time',
    category: 'Technology',
    companyName: 'Tech Corp Solutions',
    employerId: 2,
    status: 'Approved',
    postedDate: '2024-03-25T09:30:00Z',
    deadline: '2024-06-01T23:59:59Z',
    isActive: true,
  },
  {
    id: 10,
    title: 'Quality Assurance Engineer',
    description: 'Ensure software quality through comprehensive testing strategies. Develop automated test suites and perform manual testing.',
    requirements: '3+ years of QA experience. Knowledge of automated testing tools (Selenium, Jest, Cypress). Strong attention to detail and analytical skills.',
    location: 'Portland, OR',
    salary: '$75,000 - $100,000',
    jobType: 'Full-time',
    category: 'Technology',
    companyName: 'StartUp Hub Ltd',
    employerId: 6,
    status: 'Pending',
    postedDate: '2024-03-28T14:00:00Z',
    deadline: '2024-05-28T23:59:59Z',
    isActive: true,
  },
  {
    id: 11,
    title: 'Content Writer',
    description: 'Create engaging content for our blog, website, and marketing materials. Research and write about technology trends.',
    requirements: '2+ years of content writing experience. Excellent writing and editing skills. Knowledge of SEO best practices.',
    location: 'Remote',
    salary: '$50,000 - $70,000',
    jobType: 'Part-time',
    category: 'Marketing',
    companyName: 'Digital Innovations Inc',
    employerId: 4,
    status: 'Approved',
    postedDate: '2024-03-30T10:00:00Z',
    deadline: '2024-06-15T23:59:59Z',
    isActive: true,
  },
  {
    id: 12,
    title: 'Business Analyst',
    description: 'Analyze business processes and requirements. Work with stakeholders to define project scope and deliverables.',
    requirements: '4+ years of business analysis experience. Strong analytical and communication skills. Experience with requirement gathering and documentation.',
    location: 'Dallas, TX',
    salary: '$80,000 - $105,000',
    jobType: 'Full-time',
    category: 'Business',
    companyName: 'Tech Corp Solutions',
    employerId: 2,
    status: 'Approved',
    postedDate: '2024-04-01T11:00:00Z',
    deadline: '2024-06-10T23:59:59Z',
    isActive: true,
  },
];

// Applications Data
export const mockApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Senior Full Stack Developer',
    seekerId: 3,
    seekerName: 'John Doe',
    seekerEmail: 'seeker@example.com',
    coverLetter: 'I am excited to apply for the Senior Full Stack Developer position. With over 6 years of experience in React and Node.js, I have successfully delivered multiple enterprise applications. I am passionate about clean code and best practices.',
    resume: 'john-doe-resume.pdf',
    status: 'Pending',
    appliedDate: '2024-03-02T14:30:00Z',
    companyName: 'Tech Corp Solutions',
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: 'UI/UX Designer',
    seekerId: 5,
    seekerName: 'Jane Smith',
    seekerEmail: 'seeker2@example.com',
    coverLetter: 'I am a creative UI/UX designer with 4 years of experience designing user-centered interfaces. My portfolio showcases my work on mobile and web applications for various industries.',
    resume: 'jane-smith-resume.pdf',
    status: 'Accepted',
    appliedDate: '2024-03-06T10:00:00Z',
    companyName: 'Digital Innovations Inc',
  },
  {
    id: 3,
    jobId: 3,
    jobTitle: 'DevOps Engineer',
    seekerId: 3,
    seekerName: 'John Doe',
    seekerEmail: 'seeker@example.com',
    coverLetter: 'I have extensive experience managing cloud infrastructure on AWS and implementing CI/CD pipelines. I am proficient in Kubernetes, Docker, and Terraform.',
    resume: 'john-doe-resume.pdf',
    status: 'Rejected',
    appliedDate: '2024-03-11T09:15:00Z',
    companyName: 'Tech Corp Solutions',
  },
  {
    id: 4,
    jobId: 5,
    jobTitle: 'Data Scientist',
    seekerId: 5,
    seekerName: 'Jane Smith',
    seekerEmail: 'seeker2@example.com',
    coverLetter: 'With a Master\'s degree in Data Science and 4 years of experience, I have built predictive models and performed statistical analysis for various business problems. I am proficient in Python, R, and machine learning frameworks.',
    resume: 'jane-smith-resume.pdf',
    status: 'Pending',
    appliedDate: '2024-03-16T13:45:00Z',
    companyName: 'Digital Innovations Inc',
  },
  {
    id: 5,
    jobId: 6,
    jobTitle: 'Frontend Developer (React)',
    seekerId: 3,
    seekerName: 'John Doe',
    seekerEmail: 'seeker@example.com',
    coverLetter: 'I am a passionate React developer with 5 years of experience building responsive and performant web applications. I have deep knowledge of Redux, TypeScript, and modern frontend tools.',
    resume: 'john-doe-resume.pdf',
    status: 'Pending',
    appliedDate: '2024-03-19T11:20:00Z',
    companyName: 'Tech Corp Solutions',
  },
  {
    id: 6,
    jobId: 8,
    jobTitle: 'Backend Developer (Node.js)',
    seekerId: 5,
    seekerName: 'Jane Smith',
    seekerEmail: 'seeker2@example.com',
    coverLetter: 'I have 5 years of experience building scalable backend services using Node.js. I have worked with microservices architecture and deployed applications on AWS and Azure.',
    resume: 'jane-smith-resume.pdf',
    status: 'Accepted',
    appliedDate: '2024-03-23T15:00:00Z',
    companyName: 'Digital Innovations Inc',
  },
  {
    id: 7,
    jobId: 4,
    jobTitle: 'Marketing Manager',
    seekerId: 3,
    seekerName: 'John Doe',
    seekerEmail: 'seeker@example.com',
    coverLetter: 'Although my background is in technology, I have led marketing initiatives for tech products and have a strong understanding of digital marketing strategies.',
    resume: 'john-doe-resume.pdf',
    status: 'Rejected',
    appliedDate: '2024-03-13T16:30:00Z',
    companyName: 'StartUp Hub Ltd',
  },
];

// Dashboard Stats (for Admin)
export const mockDashboardStats = {
  totalUsers: mockUsers.length,
  totalJobs: mockJobs.length,
  totalApplications: mockApplications.length,
  pendingJobs: mockJobs.filter(job => job.status === 'Pending').length,
  approvedJobs: mockJobs.filter(job => job.status === 'Approved').length,
  activeJobs: mockJobs.filter(job => job.isActive).length,
  seekers: mockUsers.filter(user => user.role === 'Seeker').length,
  employers: mockUsers.filter(user => user.role === 'Employer').length,
  admins: mockUsers.filter(user => user.role === 'Admin').length,
  pendingApplications: mockApplications.filter(app => app.status === 'Pending').length,
  acceptedApplications: mockApplications.filter(app => app.status === 'Accepted').length,
  rejectedApplications: mockApplications.filter(app => app.status === 'Rejected').length,
  recentJobs: mockJobs.slice(0, 5),
  recentApplications: mockApplications.slice(0, 5),
  jobsByCategory: {
    Technology: mockJobs.filter(job => job.category === 'Technology').length,
    Design: mockJobs.filter(job => job.category === 'Design').length,
    Marketing: mockJobs.filter(job => job.category === 'Marketing').length,
    Management: mockJobs.filter(job => job.category === 'Management').length,
    Business: mockJobs.filter(job => job.category === 'Business').length,
  },
  applicationsByStatus: [
    { name: 'Pending', value: mockApplications.filter(app => app.status === 'Pending').length },
    { name: 'Accepted', value: mockApplications.filter(app => app.status === 'Accepted').length },
    { name: 'Rejected', value: mockApplications.filter(app => app.status === 'Rejected').length },
  ],
  jobsByMonth: [
    { month: 'Jan', jobs: 2 },
    { month: 'Feb', jobs: 3 },
    { month: 'Mar', jobs: 7 },
    { month: 'Apr', jobs: 0 },
  ],
};

// Helper function to generate JWT-like token
export const generateMockToken = (user) => {
  return `mock_token_${user.id}_${Date.now()}`;
};

// Helper function to find user by credentials
export const findUserByCredentials = (email, password) => {
  return mockUsers.find(user => user.email === email && user.password === password);
};

// Helper function to get jobs by employer
export const getJobsByEmployer = (employerId) => {
  return mockJobs.filter(job => job.employerId === employerId);
};

// Helper function to get applications by seeker
export const getApplicationsBySeeker = (seekerId) => {
  return mockApplications.filter(app => app.seekerId === seekerId);
};

// Helper function to get applications by job
export const getApplicationsByJob = (jobId) => {
  return mockApplications.filter(app => app.jobId === jobId);
};

// Helper function to filter jobs
export const filterJobs = (params = {}, jobs = mockJobs) => {
  let filtered = [...jobs];

  // Filter by status (only show approved jobs for non-admin users)
  if (params.status) {
    filtered = filtered.filter(job => job.status === params.status);
  } else {
    filtered = filtered.filter(job => job.status === 'Approved');
  }

  // Filter by search query
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(job =>
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.companyName.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower)
    );
  }

  // Filter by location
  if (params.location) {
    filtered = filtered.filter(job =>
      job.location.toLowerCase().includes(params.location.toLowerCase())
    );
  }

  // Filter by job type
  if (params.jobType) {
    filtered = filtered.filter(job => job.jobType === params.jobType);
  }

  // Filter by category
  if (params.category) {
    filtered = filtered.filter(job => job.category === params.category);
  }

  return filtered;
};

export default {
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
};
