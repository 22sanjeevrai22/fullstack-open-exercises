const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);

let authToken; // Will hold the JWT for authenticated requests

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
  await User.deleteMany({});

  // Create a test user and get a token
  const testUser = {
    username: "testuser",
    name: "Test User",
    password: "testpassword",
  };
  await api.post("/api/users").send(testUser);
  const loginRes = await api
    .post("/api/auth/login")
    .send({ username: testUser.username, password: testUser.password });
  authToken = loginRes.body.token;

  // Add initial blogs as the test user
  for (const blog of initialBlogs) {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(blog);
  }
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
    .set("Authorization", `Bearer ${authToken}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain("New blog post");
});

test("adding a blog fails with 401 if token is not provided", async () => {
  const newBlog = {
    title: "Unauthorized blog",
    author: "No Token",
    url: "http://example.com/unauth",
    likes: 1,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
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
    .set("Authorization", `Bearer ${authToken}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

test("if title is missing the status code 400 Bad Request is sent", async () => {
  const newBlog = {
    author: "Author NoLikes",
    url: "http://example.com/nolikes",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${authToken}`)
    .send(newBlog)
    .expect(400);
});

test("if url is missing the status code 400 Bad Request is sent", async () => {
  const newBlog = {
    title: "Missing URL",
    author: "Author NoUrl",
    // url is missing
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${authToken}`)
    .send(newBlog)
    .expect(400);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${authToken}`)
    .expect(204);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test("a blog's likes can be updated", async () => {
  const blogsAtStart = await Blog.find({});
  const blogToUpdate = blogsAtStart[0];

  const updatedData = {
    ...blogToUpdate.toJSON(),
    likes: blogToUpdate.likes + 10,
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set("Authorization", `Bearer ${authToken}`)
    .send(updatedData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(blogToUpdate.likes + 10);

  const blogsAtEnd = await Blog.find({});
  const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);
  expect(updatedBlog.likes).toBe(blogToUpdate.likes + 10);
});

afterAll(async () => {
  await mongoose.connection.close();
});
