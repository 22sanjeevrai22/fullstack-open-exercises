import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import { getAll, setToken, create } from "./services/blogService";
import { login } from "./services/authService";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //A wrapper for setUser setter
  const handleSetUser = (inputUser) => {
    setUser(inputUser);
  };

  const handleSetBlogs = (createdBlog) => {
    setBlogs((prev) => [...prev, createdBlog]);
  };

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogUserInfo");
    if (loggedUserJSON) {
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

  const LoginForm = ({ handleSetUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const user = await login({ username, password });
        window.localStorage.setItem("blogUserInfo", JSON.stringify(user));
        setToken(user.token);
        handleSetUser(user);
        setUsername("");
        setPassword("");
      } catch (error) {
        setErrorMessage("Wrong credentials");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    };
    return (
      <>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              placeholder="Username hmm.."
              value={username}
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              placeholder="Password hmm.."
              value={password}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </>
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
      } catch (error) {}
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

  console.log("USerrrr", user);

  return (
    <div>
      <h2>My Blog App</h2>

      <Notification message={errorMessage} />

      {!user && <LoginForm handleSetUser={handleSetUser} />}
      {user && (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>Create New Blog</h2>
          <BlogForm handleSetBlogs={handleSetBlogs} />
        </div>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
