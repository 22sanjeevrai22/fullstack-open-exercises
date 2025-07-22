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
  }
};
const register = ({ username, password, confirmPassword }) => {
  const response = axios.post(`${baseUrl}/register`, {
    username,
    password,
    confirmPassword,
  });
  return response
    .then((users) => users.data)
    .catch((error) => console.log(error));
};

export { login, register };
