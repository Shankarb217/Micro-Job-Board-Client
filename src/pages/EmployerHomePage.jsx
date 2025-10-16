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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import { getMyJobs } from '../features/jobs/jobsSlice';

function EmployerHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { myJobs, isLoading, isError, message } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  const totalJobs = myJobs?.length || 0;
  const activeJobs = myJobs?.filter(job => job.status === 'Approved' && job.isActive).length || 0;
  const pendingJobs = myJobs?.filter(job => job.status === 'Pending').length || 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                Welcome back, {user?.name}!
              </Typography>
              <Typography variant="h6">
                Manage your job postings and applications
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => navigate('/post-job')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Post New Job
            </Button>
          </Box>

          {/* Quick Stats */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WorkIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4">{totalJobs}</Typography>
                    <Typography variant="body2">Total Jobs</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4">{activeJobs}</Typography>
                    <Typography variant="body2">Active Jobs</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PendingIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4">{pendingJobs}</Typography>
                    <Typography variant="body2">Pending Approval</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Recent Jobs */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h2">
            Your Recent Job Postings
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/my-jobs')}
          >
            View All Jobs
          </Button>
        </Box>

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : myJobs && myJobs.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Posted Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myJobs.slice(0, 5).map((job) => (
                  <TableRow key={job.id} hover>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {job.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.jobType}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.status}
                        color={getStatusColor(job.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(job.postedDate)}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate(`/applications?jobId=${job.id}`)}
                        startIcon={<PeopleIcon />}
                      >
                        Applications
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <WorkIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No job postings yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start by posting your first job to attract talented candidates
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => navigate('/post-job')}
            >
              Post Your First Job
            </Button>
          </Paper>
        )}

        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/post-job')}
                  >
                    Post New Job
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<WorkIcon />}
                    onClick={() => navigate('/my-jobs')}
                  >
                    Manage Jobs
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<PeopleIcon />}
                    onClick={() => navigate('/applications')}
                  >
                    View All Applications
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tips for Success
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Write clear and detailed job descriptions
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Respond to applications promptly
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Keep your job postings up to date
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Provide competitive salary information
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EmployerHomePage;
