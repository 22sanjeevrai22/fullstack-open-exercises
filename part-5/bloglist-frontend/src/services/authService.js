import axios from "axios";

const baseUrl = "/api/auth";

const login = ({ username, password }) => {
  const response = axios.post(`${baseUrl}/login`, { username, password });
  return response
    .then((users) => users.data)
    .catch((error) => console.log(error));
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
