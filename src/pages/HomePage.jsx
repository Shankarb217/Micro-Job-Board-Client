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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { getJobs, setFilters } from '../features/jobs/jobsSlice';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isLoading, isError, message, filters } = useSelector((state) => state.jobs);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Fetch jobs on component mount with current filters
    dispatch(getJobs(filters));
  }, [dispatch, filters]);

  const handleSearch = () => {
    const newFilters = {
      keyword: searchKeyword,
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

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Find Your Dream Job
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 4 }}>
            Thousands of opportunities waiting for you
          </Typography>

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
            Latest Jobs
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Software Development">Software Development</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Data Science">Data Science</MenuItem>
              <MenuItem value="Product Management">Product Management</MenuItem>
            </Select>
          </FormControl>
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
                      {job.company}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {job.location}
                      </Typography>
                    </Box>
                    <Chip label={job.category} size="small" variant="outlined" sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, mt: 1 }}>
                      {job.description.substring(0, 120)}...
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

export default HomePage;
