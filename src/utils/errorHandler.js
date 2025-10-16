// Global error handler utilities

export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data?.message || error.response.data || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'No response from server. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error);
  return getErrorMessage(error) || defaultMessage;
};

export const isNetworkError = (error) => {
  return !error.response && error.request;
};

export const isAuthError = (error) => {
  return error.response && (error.response.status === 401 || error.response.status === 403);
};
