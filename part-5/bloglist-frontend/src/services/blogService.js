import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log("Error fetching blogs:", error.response?.data);
    throw error;
  }
};

const create = async (title, author, url, likes) => {
  try {
    console.log("In blog create frontend", token);

    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(
      baseUrl,
      { title, author, url, likes },
      config
    );

    return response.data;
  } catch (error) {
    console.log("Error creating blog:", error.response?.data);
    throw error;
  }
};

const update = async (id, newBlog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);
    return response.data;
  } catch (error) {
    console.log("Error updating blog:", error.response?.data);
    throw error;
  }
};

export { getAll, create, setToken, update };
