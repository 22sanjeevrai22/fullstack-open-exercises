const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res, next) => {
  try {
    console.log("userRouter getAll");
    const users = await User.find({}).populate("notes", {
      content: 1,
      correct: 1,
    });
    console.log("userRouter fetched", users);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
