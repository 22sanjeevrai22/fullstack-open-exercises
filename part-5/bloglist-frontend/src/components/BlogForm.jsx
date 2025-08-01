import { useState } from "react";
import { create } from "../services/blogService";
import PropTypes from "prop-types";
import { extractErrorMessage, isAuthError } from "../utils/errorUtils";

const BlogForm = ({ setBlogsWrapper, blogs, setErrorMessageWrapper }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const createdBlog = await create(title, author, url, likes);
      setBlogsWrapper([...blogs, createdBlog]);

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
      const errorMessage = extractErrorMessage(error, "Failed to create blog");
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
            id="input-title"
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
            id="input-author"
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
            id="input-url"
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
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

BlogForm.PropTypes = {
  setBlogsWrapper: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setErrorMessageWrapper: PropTypes.func.isRequired,
};

export default BlogForm;
