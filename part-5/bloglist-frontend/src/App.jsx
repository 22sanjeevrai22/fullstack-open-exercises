import Blog from "./components/Blog";
import Notification from "./components/Notification";
import { getAll, setToken, create } from "./services/blogService";
import Togglable from "./components/Togglable";
import LoginForm from "./components/auth/LoginForm";
import { useEffect, useState } from "react";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  //A wrapper for setUser setter
  const handleSetUser = (inputUser) => {
    setUser(inputUser);
  };

  const setErrorMessageWrapper = (err) => {
    setErrorMessage(err);
  };

  const handleSetBlogs = (newBlog) => {
    console.log(newBlog.id);
    setBlogs((prevBlogs) => {
      const updated = prevBlogs.map((blog) => {
        if (blog.id === newBlog.id) {
          console.log("Updating blog:", blog, "to", newBlog);
          return newBlog;
        } else {
          return blog;
        }
      });

      console.log("Updated blogs array:", updated);
      return updated;
    });
  };

  useEffect(() => {
    getAll().then((blogs) => {
      console.log("All blog list ", blogs);
      setBlogs(blogs);
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

  const handleLogout = () => {
    window.localStorage.removeItem("blogUserInfo");
    setUser(null);
    setToken(null);
  };

  const LoginFormComponent = ({ handleSetUser }) => {
    return (
      <Togglable buttonLabel="New note">
        <LoginForm handleSetUser={handleSetUser} />
      </Togglable>
    );
  };

  const BlogForm = ({ handleSetBlogs }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [likes, setLikes] = useState(0);

    const addBlog = async (e) => {
      e.preventDefault();
      try {
        const createdBlog = await create(title, author, url, likes);
        handleSetBlogs(createdBlog);
        setSuccessMessage(
          `A new blog ${createdBlog.title} by ${createdBlog.author} added`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } catch (error) {
        setErrorMessage("Error Occured During Blog Creation!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        console.log(error);
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
        setErrorMessageWrapper={setErrorMessageWrapper}
        successMessage={successMessage}
      />
      {!user && <LoginFormComponent handleSetUser={handleSetUser} />}
      {user && (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>Create New Blog</h2>
          <BlogForm handleSetBlogs={handleSetBlogs} />
        </div>
      )}

      {blogs.map((blog) => (
        <Blog handleSetBlogs={handleSetBlogs} key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
