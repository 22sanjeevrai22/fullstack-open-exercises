import axios from "axios";
const baseUrl = "/api/auth";

const login = async ({ username, password }) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, { username, password });
    console.log("Logged in USERRRR", res.data);
    return res.data;
  } catch (error) {
    console.log("Error during login", error);
  }
};

export { login };
