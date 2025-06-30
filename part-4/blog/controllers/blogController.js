const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      console.log("Blogs fetched from Database", blogs);
      res.json(blogs);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  const newBlog = req.body;
  if (!newBlog.title || !newBlog.url) {
    return res.status(400).json({ error: "title or url missing" });
  }
  const blog = new Blog({
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes,
  });

  blog
    .save()
    .then((savedBlog) => res.json(savedBlog))
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { title, author, url, likes } = req.body;

  Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedBlog) => {
      if (updatedBlog) {
        res.json(updatedBlog);
      } else {
        res.status(404).json({ error: "Blog not found" });
      }
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((deletedBlog) => {
      if (deletedBlog) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Blog not found" });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
