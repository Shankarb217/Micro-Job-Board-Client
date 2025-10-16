import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicationService from './applicationService';

const initialState = {
  applications: [],
  myApplications: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Apply to job
export const applyToJob = createAsyncThunk(
  'applications/apply',
  async ({ jobId, applicationData }, thunkAPI) => {
    try {
      return await applicationService.applyToJob(jobId, applicationData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get my applications (seeker)
export const getMyApplications = createAsyncThunk(
  'applications/getMyApplications',
  async (_, thunkAPI) => {
    try {
      return await applicationService.getMyApplications();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update application status (employer)
export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ applicationId, status }, thunkAPI) => {
    try {
      return await applicationService.updateApplicationStatus(applicationId, status);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get applications by job (employer)
export const getApplicationsByJob = createAsyncThunk(
  'applications/getByJob',
  async (jobId, thunkAPI) => {
    try {
      return await applicationService.getApplicationsByJob(jobId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const applicationsSlice = createSlice({
  name: 'applications',
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
      // Apply to job
      .addCase(applyToJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myApplications.push(action.payload);
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get my applications
      .addCase(getMyApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myApplications = action.payload;
      })
      .addCase(getMyApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update application status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.applications.findIndex(
          (app) => app.id === action.payload.id
        );
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get applications by job
      .addCase(getApplicationsByJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicationsByJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applications = action.payload;
      })
      .addCase(getApplicationsByJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = applicationsSlice.actions;
export default applicationsSlice.reducer;
