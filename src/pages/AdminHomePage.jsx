import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getDashboardStats } from '../features/admin/adminSlice';

function AdminHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { dashboardStats, isLoading, isError, message } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  const stats = dashboardStats || {};

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                Admin Dashboard
              </Typography>
              <Typography variant="h6">
                Welcome back, {user?.name}!
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<DashboardIcon />}
              onClick={() => navigate('/admin')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Full Dashboard
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            {/* Overview Stats */}
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              Platform Overview
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                      <Box>
                        <Typography variant="h4">{stats.totalUsers || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Users
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Seekers: {stats.seekers || 0} | Employers: {stats.employers || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <WorkIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                      <Box>
                        <Typography variant="h4">{stats.totalJobs || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Jobs
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Active: {stats.activeJobs || 0} | Approved: {stats.approvedJobs || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AssignmentIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                      <Box>
                        <Typography variant="h4">{stats.totalApplications || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Applications
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Pending: {stats.pendingApplications || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PendingActionsIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                      <Box>
                        <Typography variant="h4">{stats.pendingJobs || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pending Jobs
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Requires approval
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Quick Actions */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
              Quick Actions
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <PendingActionsIcon sx={{ fontSize: 50, color: 'warning.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Pending Job Approvals
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {stats.pendingJobs || 0} jobs waiting for your approval
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate('/admin')}
                      disabled={!stats.pendingJobs}
                    >
                      Review Jobs
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <PeopleIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      User Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Manage user accounts and roles
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate('/admin')}
                    >
                      Manage Users
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <DashboardIcon sx={{ fontSize: 50, color: 'success.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Analytics & Reports
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      View detailed statistics and insights
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate('/admin')}
                    >
                      View Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Recent Activity */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
              Recent Activity
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Recent Jobs
                  </Typography>
                  {stats.recentJobs && stats.recentJobs.length > 0 ? (
                    <Box>
                      {stats.recentJobs.slice(0, 5).map((job) => (
                        <Box
                          key={job.id}
                          sx={{
                            py: 1.5,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            '&:last-child': { borderBottom: 'none' },
                          }}
                        >
                          <Typography variant="body1" fontWeight="medium">
                            {job.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {job.companyName} • {new Date(job.postedDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No recent jobs
                    </Typography>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Recent Applications
                  </Typography>
                  {stats.recentApplications && stats.recentApplications.length > 0 ? (
                    <Box>
                      {stats.recentApplications.slice(0, 5).map((app) => (
                        <Box
                          key={app.id}
                          sx={{
                            py: 1.5,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            '&:last-child': { borderBottom: 'none' },
                          }}
                        >
                          <Typography variant="body1" fontWeight="medium">
                            {app.seekerName || app.applicantName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Applied for {app.jobTitle} • {new Date(app.appliedDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No recent applications
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}

export default AdminHomePage;
