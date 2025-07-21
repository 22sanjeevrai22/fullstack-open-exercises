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
  const response = axios.post(baseUrl, { title, author, url, likes }, config);

  const createdBlog = response.then((blog) => blog.data);
  return createdBlog;
};

const update = (id, newBlog) => {
  const respnose = axios.put(`${baseUrl}/${id}`, newBlog);
  return respnose.then((updatedBlog) => updatedBlog.data);
};

export { getAll, create, setToken, update };
