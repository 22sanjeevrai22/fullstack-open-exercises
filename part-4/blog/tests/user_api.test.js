const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);
const helper = require("./helper/users_helper");
const bcrypt = require("bcrypt");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: `root_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      passwordHash,
    });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "Goku Tero Dai",
      username: `Goku99_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      password: "goku99",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    // Create a user first
    const existingUser = {
      username: `duplicate_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      name: "Existing User",
      password: "password123",
    };
    await api.post("/api/users").send(existingUser);

    // Try to create another user with the same username
    const newUser = {
      username: existingUser.username,
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(result.body.error).toContain("Username must be unique");
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1); // Only the first user was created
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
