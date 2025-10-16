import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
} from '@mui/material';
import { createJob } from '../features/jobs/jobsSlice';

const schema = yup.object({
  title: yup.string().required('Job title is required'),
  company: yup.string().required('Company name is required'),
  location: yup.string().required('Location is required'),
  jobType: yup.string().required('Job type is required'),
  category: yup.string().required('Category is required'),
  salary: yup.string().required('Salary range is required'),
  description: yup.string().required('Job description is required').min(100, 'Description must be at least 100 characters'),
}).required();

function PostJobPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.jobs);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(createJob(data)).unwrap();
      setSubmitSuccess(true);
      reset();
      setTimeout(() => {
        navigate('/my-jobs');
      }, 2000);
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Post a New Job
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Fill in the details below to post a new job opening
          </Typography>

          {submitSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Job posted successfully! Redirecting to My Jobs...
            </Alert>
          )}

          {isError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {message}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  {...register('title')}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  placeholder="e.g., Senior React Developer"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  {...register('company')}
                  error={!!errors.company}
                  helperText={errors.company?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  {...register('location')}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  placeholder="e.g., New York, NY or Remote"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.jobType}>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    label="Job Type"
                    defaultValue=""
                    {...register('jobType')}
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                  </Select>
                  {errors.jobType && <FormHelperText>{errors.jobType?.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    defaultValue=""
                    {...register('category')}
                  >
                    <MenuItem value="Software Development">Software Development</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Data Science">Data Science</MenuItem>
                    <MenuItem value="Product Management">Product Management</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Customer Support">Customer Support</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {errors.category && <FormHelperText>{errors.category?.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Salary Range"
                  {...register('salary')}
                  error={!!errors.salary}
                  helperText={errors.salary?.message}
                  placeholder="e.g., $80,000 - $120,000"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={12}
                  label="Job Description"
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  placeholder="Provide a detailed description of the role, responsibilities, requirements, and benefits..."
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/my-jobs')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : 'Post Job'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default PostJobPage;
