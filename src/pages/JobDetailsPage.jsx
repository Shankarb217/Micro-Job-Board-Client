import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { getJobById } from '../features/jobs/jobsSlice';
import { applyToJob, reset as resetApplications } from '../features/applications/applicationsSlice';

function JobDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { job, isLoading, isError, message } = useSelector((state) => state.jobs);
  const { isLoading: applyLoading, isSuccess: applySuccess } = useSelector((state) => state.applications);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Reset application state when component mounts
    dispatch(resetApplications());
    dispatch(getJobById(id));
    setHasSubmitted(false); // Reset submission flag
  }, [dispatch, id]);

  useEffect(() => {
    // Only navigate if user actually submitted an application
    if (applySuccess && hasSubmitted) {
      alert('Application submitted successfully!');
      // Reset state before navigation
      dispatch(resetApplications());
      setHasSubmitted(false);
      navigate('/my-applications');
    }
  }, [applySuccess, hasSubmitted, navigate, dispatch]);

  const handleApplyClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'Seeker') {
      alert('Only job seekers can apply to jobs');
      return;
    }
    setOpenApplyDialog(true);
  };

  const handleApplySubmit = () => {
    const applicationData = {
      coverLetter: coverLetter,
    };
    setHasSubmitted(true); // Set flag before submitting
    dispatch(applyToJob({ jobId: id, applicationData }));
    setOpenApplyDialog(false);
    setCoverLetter('');
  };

  if (isLoading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (isError || !job) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {message || 'Job not found'}
        </Alert>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Jobs
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Button onClick={() => navigate(-1)} sx={{ mt: 2, mb: 2 }}>
        ← Back
      </Button>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {job.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {job.company}
              </Typography>
            </Box>
            <Chip label={job.jobType} color="primary" size="large" />
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">{job.location}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">{job.category}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1" fontWeight="bold">{job.salary}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">
                  {new Date(job.postedDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {user?.role === 'Seeker' && (
            <Button variant="contained" size="large" onClick={handleApplyClick}>
              Apply Now
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Job Description
          </Typography>
          <Typography
            variant="body1"
            sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}
            color="text.secondary"
          >
            {job.description}
          </Typography>
        </Box>
      </Paper>

      {/* Apply Dialog */}
      <Dialog open={openApplyDialog} onClose={() => setOpenApplyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, mt: 1 }}>
            Please provide a cover letter to support your application.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Cover Letter *"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Tell us why you're a great fit for this position..."
            helperText="Minimum 50 characters"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApplyDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleApplySubmit} 
            disabled={!coverLetter.trim() || coverLetter.length < 50 || applyLoading}
          >
            {applyLoading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default JobDetailsPage;
