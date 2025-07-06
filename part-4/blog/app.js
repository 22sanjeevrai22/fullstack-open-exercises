const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const blogController = require("./controllers/blogController");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const { MONGODB_URI, PORT } = require("./utils/config");
const {
  errorHandler,
  unknownEndPoint,
  requestLogger,
  tokenExtractor,
  userExtractor,
} = require("./utils/middleware");
const url = MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use(requestLogger);

app.use("/api/auth/login", authController);

app.use(tokenExtractor);
app.use("/api/users", userController);
app.use("/api/blogs", userExtractor, blogController);

app.use(unknownEndPoint);

app.use(errorHandler);

module.exports = app;
