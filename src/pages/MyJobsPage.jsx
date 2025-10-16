import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { getMyJobs, deleteJob } from '../features/jobs/jobsSlice';

function MyJobsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myJobs, isLoading, isError, message } = useSelector((state) => state.jobs);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  const handleDeleteClick = (jobId) => {
    setSelectedJobId(jobId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteJob(selectedJobId)).unwrap();
      setDeleteDialogOpen(false);
      setSelectedJobId(null);
      dispatch(getMyJobs()); // Refresh the list
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleViewApplications = (jobId) => {
    navigate(`/applications?jobId=${jobId}`);
  };

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            My Jobs
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/post-job')}
          >
            Post New Job
          </Button>
        </Box>

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Applications</TableCell>
                  <TableCell>Posted Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading && myJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
                        No jobs posted yet. Click "Post New Job" to get started.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  myJobs.map((job) => (
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
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleViewApplications(job.id)}
                        >
                          {job.applicationsCount || 0}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {new Date(job.postedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          title="View"
                          color="primary"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/edit-job/${job.id}`)}
                          title="Edit"
                          color="info"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(job.id)}
                          title="Delete"
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this job posting? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyJobsPage;
