export const extractErrorMessage = (
  error,
  defaultMessage = "An unexpected error occurred"
) => {
  // Handle axios errors with response data
  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  // Handle axios errors with status codes
  if (error.response?.status) {
    switch (error.response.status) {
      case 401:
        return "Unauthorized - Please log in again";
      case 403:
        return "Forbidden - You don't have permission to perform this action";
      case 404:
        return "Resource not found";
      case 409:
        return "Conflict - This resource already exists";
      case 422:
        return "Validation error - Please check your input";
      case 500:
        return "Server error - Please try again later";
      default:
        return `Error ${error.response.status} - ${error.response.statusText}`;
    }
  }

  // Handle network errors
  if (
    error.code === "NETWORK_ERROR" ||
    error.message?.includes("Network Error")
  ) {
    return "Network error - Please check your connection";
  }

  // Handle timeout errors
  if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
    return "Request timeout - Please try again";
  }

  // Handle generic error messages
  if (error.message) {
    return error.message;
  }

  return defaultMessage;
};

export const isAuthError = (error) => {
  return error.response?.status === 401 || error.response?.status === 403;
};
