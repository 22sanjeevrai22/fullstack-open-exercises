import Blog from "./components/Blog";
import Notification from "./components/Notification";
import { getAll, setToken, create } from "./services/blogService";
import Togglable from "./components/Togglable";
import LoginForm from "./components/auth/LoginForm";
import { useEffect, useState } from "react";
import { extractErrorMessage, isAuthError } from "./utils/errorUtils";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  //A wrapper for setUser setter

  useEffect(() => {
    getAll()
      .then((blogs) => {
        setBlogs(blogs);
      })
      .catch((error) => {
        const message = extractErrorMessage(error, "Failed to load blogs");
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(null), 5000);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogUserInfo");
    if (loggedUserJSON && loggedUserJSON !== "undefined") {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const setUserWrapper = (inputUser) => {
    setUser(inputUser);
  };

  const setErrorMessageWrapper = (err) => {
    setErrorMessage(err);
  };

  const handleSetBlogs = (newBlog) => {
    setBlogs(newBlog);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("blogUserInfo");
    setUser(null);
    setToken(null);
  };

  const LoginFormComponent = ({ setUserWrapper, setErrorMessageWrapper }) => {
    return (
      <Togglable buttonLabel="Add New Note">
        <LoginForm
          setUserWrapper={setUserWrapper}
          setErrorMessageWrapper={setErrorMessageWrapper}
        />
      </Togglable>
    );
  };

  const BlogForm = ({ handleSetBlogs, blogs, setErrorMessageWrapper }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [likes, setLikes] = useState(0);

    const addBlog = async (e) => {
      e.preventDefault();
      try {
        const createdBlog = await create(title, author, url, likes);
        handleSetBlogs([...blogs, createdBlog]);
        setSuccessMessage(
          `A new blog ${createdBlog.title} by ${createdBlog.author} added`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);

        // Clear form after successful creation
        setTitle("");
        setAuthor("");
        setUrl("");
        setLikes(0);
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error,
          "Failed to create blog"
        );
        setErrorMessageWrapper(errorMessage);
        setTimeout(() => {
          setErrorMessageWrapper(null);
        }, 5000);

        // Handle authentication errors
        if (isAuthError(error)) {
          handleLogout();
        }
      }
    };
    return (
      <>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              placeholder="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">Url:</label>
            <input
              type="text"
              name="url"
              placeholder="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="likes">Likes:</label>
            <input
              type="text"
              name="likes"
              placeholder="likes"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </>
    );
  };

  return (
    <div>
      <h2>My Blog App</h2>

      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      {!user && (
        <LoginFormComponent
          setUserWrapper={setUserWrapper}
          setErrorMessageWrapper={setErrorMessageWrapper}
        />
      )}
      {user && (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>Create New Blog</h2>
          <BlogForm
            handleSetBlogs={handleSetBlogs}
            blogs={blogs}
            setErrorMessageWrapper={setErrorMessageWrapper}
          />
        </div>
      )}

      {blogs.map((blog) => (
        <Blog
          handleSetBlogs={handleSetBlogs}
          setErrorMessageWrapper={setErrorMessageWrapper}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
