const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

//Getting Token from Bearer

blogRouter.get("/", (req, res, next) => {
  Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .then((blogs) => {
      // console.log("Blogs fetched from Database", blogs);
      res.json(blogs);
    })
    .catch((err) => next(err));
});

blogRouter.post("/", userExtractor, async (req, res, next) => {
  console.log("I am in the blogController", req.body);
  const newBlog = req.body;
  const user = req.user;

  try {
    if (!newBlog.title || !newBlog.url) {
      return res.status(400).json({ error: "title or url missing" });
    }

    const blog = new Blog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      user: user._id || user.id,
    });

    const savedBlog = await blog.save();
    await savedBlog.populate({
      path: "user",
      select: "username name",
    });

    user.blogs = [...user.blogs, savedBlog];
    await user.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.get("/:id", userExtractor, (req, res, next) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({ error: "Blog not found" });
      }
    })
    .catch((err) => next(err));
});

blogRouter.put("/:id", userExtractor, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, author, url, likes } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: "query" }
    );

    await updatedBlog.populate({
      path: "user",
      select: "name username",
    });

    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:id", userExtractor, async (req, res, next) => {
  const user = req.user;
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toString() !== user.id.toString()) {
      return res
        .status(403)
        .json({ error: "Only the creator can delete this blog" });
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (deletedBlog) {
      console.log("Deleted Blog in Blog Controller", deletedBlog);
      res.status(200).json(deletedBlog);
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
