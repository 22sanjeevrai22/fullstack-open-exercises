import { useState, useEffect } from "react";
import { getAll, update } from "../services/blogService";
import { extractErrorMessage, isAuthError } from "../utils/errorUtils";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const SingleBlog = ({ blog, handleSetBlogs, setErrorMessageWrapper }) => {
  const [blogs, setBlogs] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const sortedBlogs = [...blogs].sort((a, b) => a.likes - b.likes);

  useEffect(() => {
    getAll()
      .then((blogs) => {
        setBlogs(blogs);
        console.log("This is Blog rendering in first page load.", blogs);
      })
      .catch((error) => {
        const message = extractErrorMessage(error, "Failed to load blogs");
        setErrorMessageWrapper(message);
        setTimeout(() => setErrorMessageWrapper(null), 5000);
      });
  }, []);

  const handleClickLike = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 };
      const updatedBlog = await update(blog.id, newBlog);

      //I was confused here, I was passing just updated blog and writing below written code inside the setBlogs in App.jsx, sad
      handleSetBlogs((prevBlogs) => {
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

  return (
    <div style={blogStyle}>
      <button onClick={() => setShowDetails((prev) => !prev)}>
        {showDetails ? "hide" : "view"}
      </button>
      {sortedBlogs.map((blog) => (
        <div
          handleSetBlogs={handleSetBlogs}
          setErrorMessageWrapper={setErrorMessageWrapper}
          key={blog.id}
          blog={blog}
        >
          {showDetails && (
            <>
              <h3>Title: {blog.title}</h3>
              <h5>Author: {blog.author}</h5>
              <h5>
                Likes:{blog.likes}
                <button onClick={handleClickLike}>like</button>
              </h5>
              <h5>Blog created By: {blog.user.name || "Donald Trump"}</h5>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SingleBlog;
