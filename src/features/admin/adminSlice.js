import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from './adminService';

const initialState = {
  users: [],
  pendingJobs: [],
  reports: [],
  dashboardStats: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get all users
export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (_, thunkAPI) => {
    try {
      return await adminService.getUsers();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, thunkAPI) => {
    try {
      return await adminService.updateUserRole(userId, role);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get pending jobs
export const getPendingJobs = createAsyncThunk(
  'admin/getPendingJobs',
  async (_, thunkAPI) => {
    try {
      return await adminService.getPendingJobs();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Approve job
export const approveJob = createAsyncThunk(
  'admin/approveJob',
  async (jobId, thunkAPI) => {
    try {
      return await adminService.approveJob(jobId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get reports
export const getReports = createAsyncThunk(
  'admin/getReports',
  async (_, thunkAPI) => {
    try {
      return await adminService.getReports();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get dashboard stats
export const getDashboardStats = createAsyncThunk(
  'admin/getDashboardStats',
  async (_, thunkAPI) => {
    try {
      return await adminService.getDashboardStats();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update user role
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get pending jobs
      .addCase(getPendingJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPendingJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pendingJobs = action.payload;
      })
      .addCase(getPendingJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Approve job
      .addCase(approveJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pendingJobs = state.pendingJobs.filter(
          (job) => job.id !== action.payload
        );
      })
      .addCase(approveJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get reports
      .addCase(getReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get dashboard stats
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboardStats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
