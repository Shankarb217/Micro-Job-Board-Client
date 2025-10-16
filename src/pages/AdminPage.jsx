import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  getUsers,
  updateUserRole,
  getPendingJobs,
  approveJob,
  getDashboardStats,
} from '../features/admin/adminSlice';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function AdminPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  // Set initial tab based on URL parameter
  const getInitialTab = () => {
    if (tabParam === 'users') return 0;
    if (tabParam === 'jobs') return 1;
    return 0;
  };
  
  const [tabValue, setTabValue] = useState(getInitialTab());
  const { users, pendingJobs, dashboardStats, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getUsers());
    dispatch(getPendingJobs());
  }, [dispatch]);

  const mockChartData = [
    { month: 'Jan', jobs: 45, applications: 320 },
    { month: 'Feb', jobs: 52, applications: 380 },
    { month: 'Mar', jobs: 48, applications: 350 },
    { month: 'Apr', jobs: 61, applications: 420 },
    { month: 'May', jobs: 55, applications: 390 },
    { month: 'Jun', jobs: 67, applications: 480 },
  ];

  const displayStats = dashboardStats || { totalUsers: 0, totalJobs: 0, totalApplications: 0, activeJobs: 0 };

  useEffect(() => {
    // Update tab when URL parameter changes
    setTabValue(getInitialTab());
  }, [tabParam]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Update URL parameter
    if (newValue === 0) {
      setSearchParams({ tab: 'users' });
    } else if (newValue === 1) {
      setSearchParams({ tab: 'jobs' });
    }
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole({ userId, role: newRole }));
  };

  const handleApproveJob = (jobId) => {
    dispatch(approveJob(jobId));
  };

  const handleRejectJob = (jobId) => {
    // Implement reject functionality
    console.log('Reject job:', jobId);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PeopleIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Users</Typography>
                </Box>
                <Typography variant="h4">{displayStats.totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WorkIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Jobs</Typography>
                </Box>
                <Typography variant="h4">{displayStats.totalJobs}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AssignmentIcon color="warning" sx={{ mr: 1 }} />
                  <Typography variant="h6">Applications</Typography>
                </Box>
                <Typography variant="h4">{displayStats.totalApplications}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon color="info" sx={{ mr: 1 }} />
                  <Typography variant="h6">Active Jobs</Typography>
                </Box>
                <Typography variant="h4">{displayStats.activeJobs}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Chart */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Jobs & Applications Trend
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="jobs" fill="#1976d2" name="Jobs Posted" />
              <Bar dataKey="applications" fill="#2e7d32" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Tabs */}
        <Paper>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Manage Users" />
            <Tab label="Pending Jobs" />
          </Tabs>

          {/* Users Tab */}
          <TabPanel value={tabValue} index={0}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Joined Date</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip label={user.role} size="small" color="primary" />
                        </TableCell>
                        <TableCell>
                          {new Date(user.joinedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            >
                              <MenuItem value="Seeker">Seeker</MenuItem>
                              <MenuItem value="Employer">Employer</MenuItem>
                              <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* Pending Jobs Tab */}
          <TabPanel value={tabValue} index={1}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Job Title</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Employer</TableCell>
                      <TableCell>Posted Date</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingJobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                            No pending jobs to review.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingJobs.map((job) => (
                        <TableRow key={job.id} hover>
                          <TableCell>{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{job.employerName}</TableCell>
                          <TableCell>
                            {new Date(job.postedDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => handleRejectJob(job.id)}
                              sx={{ mr: 1 }}
                            >
                              Reject
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() => handleApproveJob(job.id)}
                            >
                              Approve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
}

export default AdminPage;
