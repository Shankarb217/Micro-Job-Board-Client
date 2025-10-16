import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
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
  Alert,
  CircularProgress,
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { register as registerUser, reset } from './authSlice';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup.string().required('Role is required'),
}).required();

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'Seeker',
    },
  });

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isSuccess) {
      // Navigate based on role after successful registration
      const role = user?.role;
      if (role === 'Admin') {
        navigate('/admin');
      } else if (role === 'Employer') {
        navigate('/my-jobs');
      } else {
        navigate('/');
      }
      
      // Reset state after navigation
      setTimeout(() => {
        dispatch(reset());
      }, 100);
    }
  }, [isSuccess, user, navigate, dispatch]);

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;
    dispatch(registerUser(userData));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Register
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Create your account to get started
          </Typography>

          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              {...register('fullName')}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel>I am a</InputLabel>
              <Select
                label="I am a"
                defaultValue="Seeker"
                {...register('role')}
              >
                <MenuItem value="Seeker">Job Seeker</MenuItem>
                <MenuItem value="Employer">Employer</MenuItem>
              </Select>
              {errors.role && <FormHelperText>{errors.role?.message}</FormHelperText>}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Register'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <MuiLink component={Link} to="/login" underline="hover">
                  Login here
                </MuiLink>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default RegisterPage;
