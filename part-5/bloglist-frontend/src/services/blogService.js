import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((blogs) => blogs.data);
};

const create = (title, author, url, likes) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = axios.post(baseUrl, { title, author, url, likes });
  const createdBlog = response.then((blog) => blog.data);
  return createdBlog;
};

export { getAll, create, setToken };
