import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { getApplicationsByJob, updateApplicationStatus } from '../features/applications/applicationsSlice';

function ApplicationsPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const { applications, isLoading, isError, message } = useSelector((state) => state.applications);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    if (jobId) {
      dispatch(getApplicationsByJob(jobId));
    }
  }, [dispatch, jobId]);

  // If no jobId is provided, show a message
  if (!jobId) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Alert severity="info">
            Please select a job from "My Jobs" to view its applications.
          </Alert>
        </Box>
      </Container>
    );
  }

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setViewDialogOpen(true);
  };

  const handleUpdateStatus = (applicationId, status) => {
    dispatch(updateApplicationStatus({ applicationId, status }));
    setViewDialogOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredApplications = filterStatus === 'All'
    ? applications
    : applications.filter(app => app.status === filterStatus);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Job Applications
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={filterStatus}
              label="Filter by Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
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
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Applicant Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                        No applications found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.map((application) => (
                    <TableRow key={application.id} hover>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {application.seekerName || application.applicantName}
                        </Typography>
                      </TableCell>
                      <TableCell>{application.seekerEmail || application.applicantEmail}</TableCell>
                      <TableCell>{application.jobTitle}</TableCell>
                      <TableCell>
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={application.status}
                          color={getStatusColor(application.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleViewApplication(application)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* View Application Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedApplication.seekerName || selectedApplication.applicantName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedApplication.seekerEmail || selectedApplication.applicantEmail}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Applied for: {selectedApplication.jobTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                Applied on: {new Date(selectedApplication.appliedDate).toLocaleDateString()}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Cover Letter:
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 2 }}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {selectedApplication.coverLetter}
                </Typography>
              </Paper>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Resume:
              </Typography>
              <Button variant="outlined" size="small">
                Download {selectedApplication.resume}
              </Button>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Current Status:
                </Typography>
                <Chip
                  label={selectedApplication.status}
                  color={getStatusColor(selectedApplication.status)}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          {selectedApplication?.status === 'Pending' && (
            <>
              <Button
                onClick={() => handleUpdateStatus(selectedApplication.id, 'Rejected')}
                color="error"
              >
                Reject
              </Button>
              <Button
                onClick={() => handleUpdateStatus(selectedApplication.id, 'Accepted')}
                variant="contained"
                color="success"
              >
                Accept
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ApplicationsPage;
