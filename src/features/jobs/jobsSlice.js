import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobService from './jobService';

const initialState = {
  jobs: [],
  job: null,
  myJobs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10,
  },
  filters: {
    keyword: '',
    category: '',
    location: '',
    jobType: '',
  },
};

// Get all jobs
export const getJobs = createAsyncThunk(
  'jobs/getAll',
  async (params, thunkAPI) => {
    try {
      return await jobService.getJobs(params);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get job by ID
export const getJobById = createAsyncThunk(
  'jobs/getById',
  async (id, thunkAPI) => {
    try {
      return await jobService.getJobById(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create job
export const createJob = createAsyncThunk(
  'jobs/create',
  async (jobData, thunkAPI) => {
    try {
      return await jobService.createJob(jobData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update job
export const updateJob = createAsyncThunk(
  'jobs/update',
  async ({ id, jobData }, thunkAPI) => {
    try {
      return await jobService.updateJob(id, jobData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete job
export const deleteJob = createAsyncThunk(
  'jobs/delete',
  async (id, thunkAPI) => {
    try {
      return await jobService.deleteJob(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get my jobs (employer)
export const getMyJobs = createAsyncThunk(
  'jobs/getMyJobs',
  async (_, thunkAPI) => {
    try {
      return await jobService.getMyJobs();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        keyword: '',
        category: '',
        location: '',
        jobType: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all jobs
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = action.payload.jobs || action.payload;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get job by ID
      .addCase(getJobById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.job = action.payload;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create job
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myJobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update job
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.job = action.payload;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete job
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myJobs = state.myJobs.filter((job) => job.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get my jobs
      .addCase(getMyJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myJobs = action.payload;
      })
      .addCase(getMyJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setFilters, clearFilters } = jobsSlice.actions;
export default jobsSlice.reducer;
