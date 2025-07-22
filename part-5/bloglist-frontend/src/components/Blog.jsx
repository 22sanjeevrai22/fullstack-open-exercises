import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
            <button>like</button>
          </h5>
        </>
      )}
    </div>
  );
};

export default Blog;
