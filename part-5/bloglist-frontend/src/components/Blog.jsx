import { useState } from "react";
import { deleteBlog, getAll, update } from "../services/blogService";
import { extractErrorMessage, isAuthError } from "../utils/errorUtils";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, setBlogsWrapper, setErrorMessageWrapper }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClickLike = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 };
      const updatedBlog = await update(blog.id, newBlog);

      //I was confused here, I was passing just updated blog and writing below code inside the setBlogs in App.jsx, sad
      setBlogsWrapper((prevBlogs) => {
        const updated = prevBlogs.map((blog) => {
          if (blog.id === updatedBlog.id) {
            console.log("Updating blog:", blog, "to", updatedBlog);
            return updatedBlog;
          } else {
            return blog;
          }
        });

        console.log("Updated blogs array:", updated);
        return updated;
      });
    } catch (error) {
      const errorMessage = extractErrorMessage(error, "Failed to update blog");
      setErrorMessageWrapper(errorMessage);
      setTimeout(() => {
        setErrorMessageWrapper(null);
      }, 3000);

      // Handle authentication errors
      if (isAuthError(error)) {
        // You might want to trigger logout here or handle auth errors differently
        console.log("Authentication error in like operation");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const deletedBlog = await deleteBlog(id);
      console.log("this is handleDelete", deletedBlog);

      setBlogsWrapper((prev) =>
        prev.filter((blog) => blog.id !== deletedBlog.id)
      );
    } catch (error) {
      const errorMessage = extractErrorMessage(error, "Failed to update blog");
      setErrorMessageWrapper(errorMessage);
      setTimeout(() => {
        setErrorMessageWrapper(null);
      }, 3000);

      // Handle authentication errors
      if (isAuthError(error)) {
        // You might want to trigger logout here or handle auth errors differently
        console.log("Authentication error in like operation");
      }
    }
  };

  return (
    <div style={blogStyle}>
      <h2 className="title" style={{ display: "inline-block" }}>
        Title: {blog.title}
      </h2>
      <h3 className="author">Author: {blog.author}</h3>
      <button
        className="show-hide-button"
        style={{ backgroundColor: "gray", marginLeft: "2rem" }}
        onClick={() => setShowDetails((prev) => !prev)}
      >
        {showDetails ? "hide" : "show"}
      </button>
      <button
        style={{ backgroundColor: "red", marginLeft: "2rem" }}
        onClick={() => handleDelete(blog.id)}
      >
        Delete
      </button>

      {showDetails && (
        <>
          <h5 className="likes">
            Likes:{blog.likes}
            <button className="like-button" onClick={handleClickLike}>
              like
            </button>
          </h5>
          <h5 className="url">{blog.url}</h5>
          <h5>Blog created By: {blog.user.name || "Donald Trump"}</h5>
        </>
      )}
    </div>
  );
};

export default Blog;
