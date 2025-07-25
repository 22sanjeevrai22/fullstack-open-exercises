import { useState } from "react";
import { update } from "../services/blogService";
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, handleSetBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClickLike = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await update(blog.id, newBlog);
    handleSetBlogs(newBlog);
  };

  return (
    <div style={blogStyle}>
      <h3>Title: {blog.title}</h3>{" "}
      <button onClick={() => setShowDetails((prev) => !prev)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && (
        <>
          <h5>Author: {blog.author}</h5>
          <h5>
            Likes:{blog.likes}
            <button onClick={handleClickLike}>like</button>
          </h5>
        </>
      )}
    </div>
  );
};

export default Blog;
