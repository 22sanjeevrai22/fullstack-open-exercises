import axios from "axios";

const baseUrl = "/api/auth";

const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      username,
      password,
    });
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("Error Logging in User", error.response.data);
    throw error;
  }
};

const register = async ({ username, password, confirmPassword }) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, {
      username,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.log("Error Registering User", error.response?.data);
    throw error;
  }
};

export { login, register };
