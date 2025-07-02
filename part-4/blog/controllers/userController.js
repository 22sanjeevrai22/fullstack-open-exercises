const User = require("../models/user");
const bcrypt = require("bcrypt");

const userRouter = require("express").Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate({
      path: "blogs",
      select: "title author url likes",
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/", async (req, res) => {
  const { name, password, username, blogs } = req.body;

  // Check for missing username or password
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Check for minimum length
  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" });
  }
  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }

  // Check for unique username
  const userExist = await User.findOne({ username });
  if (userExist) {
    return res.status(400).json({ error: "Username must be unique" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  console.log("blogs", blogs);
  const user = new User({
    username,
    name,
    passwordHash,
    blogs,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = userRouter;
