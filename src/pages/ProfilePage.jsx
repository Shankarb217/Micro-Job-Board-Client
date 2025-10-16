import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Avatar,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { updateUser as updateUserStorage } from '../mock/persistentStorage';
import { updateUser as updateUserAction } from '../features/auth/authSlice';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string(),
  location: yup.string(),
  bio: yup.string(),
}).required();

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [profileData, setProfileData] = useState(user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: user?.fullName || user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
    },
  });

  useEffect(() => {
    // Update form when user data changes
    if (user) {
      setProfileData(user);
      reset({
        fullName: user?.fullName || user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        bio: user?.bio || '',
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    // Update user in persistent storage
    const updatedUser = updateUserStorage(user.id, {
      ...user,
      name: data.fullName,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      bio: data.bio,
    });

    if (updatedUser) {
      // Update localStorage user
      const userWithoutPassword = { ...updatedUser };
      delete userWithoutPassword.password;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Update Redux state
      dispatch(updateUserAction(userWithoutPassword));
      
      setProfileData(userWithoutPassword);
      setUpdateSuccess(true);
      setIsEditing(false);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                mr: 3,
              }}
            >
              {(profileData?.fullName || profileData?.name)?.charAt(0).toUpperCase() || <PersonIcon />}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1">
                {profileData?.fullName || profileData?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {profileData?.role}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {updateSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Profile updated successfully!
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  {...register('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  {...register('location')}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  disabled={!isEditing}
                  placeholder="e.g., New York, NY"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  {...register('bio')}
                  error={!!errors.bio}
                  helperText={errors.bio?.message}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Account Type
                </Typography>
                <Typography variant="body1">{profileData?.role}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Member Since
                </Typography>
                <Typography variant="body1">
                  {profileData?.createdAt
                    ? new Date(profileData.createdAt).toLocaleDateString()
                    : 'Recently'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ProfilePage;
