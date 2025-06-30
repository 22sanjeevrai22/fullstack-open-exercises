const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    title: "First blog",
    author: "Author One",
    url: "http://example.com/1",
    likes: 5,
  },
  {
    title: "Second blog",
    author: "Author Two",
    url: "http://example.com/2",
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "New blog post",
    author: "Author Three",
    url: "http://example.com/3",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await Blog.find({});

  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain("New blog post");
});

test("if like property is missing it will default to 0", async () => {
  const newBlog = {
    title: "Blog with no likes",
    author: "Author NoLikes",
    url: "http://example.com/nolikes",
    // likes is intentionally missing
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

test("if title is missing the status code 400 Bad Request is sent", async () => {
  const newBlog = {
    author: "Author NoLikes",
    url: "http://example.com/nolikes",
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(400);
});

test("if url is missing the status code 400 Bad Request is sent", async () => {
  const newBlog = {
    title: "Missing URL",
    author: "Author NoUrl",
    // url is missing
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
