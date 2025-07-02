const User = require("../models/user");
const bcrypt = require("bcrypt");

const userRouter = require("express").Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/", async (req, res) => {
  const { name, password, username } = req.body;

  const userExist = await User.findOne({ username });
  if (userExist) {
    res.status(422).json({ error: "Cannot save duplicate username" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = userRouter;
