import { useEffect } from 'react';
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
  CircularProgress,
  Alert,
} from '@mui/material';
import { getMyApplications } from '../features/applications/applicationsSlice';

function MyApplicationsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myApplications, isLoading, isError, message } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

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

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Applications
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Track the status of your job applications
        </Typography>

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
                  <TableCell>Company</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading && myApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
                        No applications yet. Start applying to jobs!
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  myApplications.map((application) => (
                    <TableRow key={application.id} hover>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {application.jobTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {application.company}
                        </Typography>
                      </TableCell>
                      <TableCell>{application.location}</TableCell>
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
                          onClick={() => handleViewJob(application.jobId)}
                        >
                          View Job
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
    </Container>
  );
}

export default MyApplicationsPage;
