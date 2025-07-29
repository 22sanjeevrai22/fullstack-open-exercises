import { useState } from "react";

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

export default BlogForm;
