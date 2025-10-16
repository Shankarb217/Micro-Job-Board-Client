import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { getJobs, setFilters } from '../features/jobs/jobsSlice';
import { getMyApplications } from '../features/applications/applicationsSlice';

function SeekerHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { jobs, isLoading, isError, message, filters } = useSelector((state) => state.jobs);
  const { applications } = useSelector((state) => state.applications);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(getJobs(filters));
    dispatch(getMyApplications());
  }, [dispatch, filters]);

  const handleSearch = () => {
    const newFilters = {
      search: searchKeyword,
      location: location,
      category: category,
    };
    dispatch(setFilters(newFilters));
    dispatch(getJobs(newFilters));
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const pendingApplications = applications?.filter(app => app.status === 'Pending').length || 0;
  const acceptedApplications = applications?.filter(app => app.status === 'Accepted').length || 0;

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
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome back, {user?.name}!
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Find your next opportunity
          </Typography>

          {/* Quick Stats */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                <Typography variant="h4">{applications?.length || 0}</Typography>
                <Typography variant="body2">Total Applications</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                <Typography variant="h4">{pendingApplications}</Typography>
                <Typography variant="body2">Pending</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                <Typography variant="h4">{acceptedApplications}</Typography>
                <Typography variant="body2">Accepted</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder="Job title, keywords..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    sx: { bgcolor: 'rgba(255,255,255,0.15)', color: 'white' },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    sx: { bgcolor: 'rgba(255,255,255,0.15)', color: 'white' },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSearch}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    height: '56px',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Jobs Listing */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h2">
            Recommended Jobs
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<AssignmentIcon />}
              onClick={() => navigate('/my-applications')}
            >
              My Applications
            </Button>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
        ) : (
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} md={6} key={job.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" component="h3">
                        {job.title}
                      </Typography>
                      <Chip label={job.jobType} size="small" color="primary" />
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {job.companyName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {job.location}
                      </Typography>
                    </Box>
                    <Chip label={job.category} size="small" variant="outlined" sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, mt: 1 }}>
                      {job.description?.substring(0, 120)}...
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                      {job.salary}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Posted {formatDate(job.postedDate)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined" onClick={() => handleViewJob(job.id)}>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {jobs.length === 0 && !isLoading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <WorkIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No jobs found. Try adjusting your search criteria.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default SeekerHomePage;
