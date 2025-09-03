console.log("Starting Notes Server...");
//test - test2
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const notesController = require("./controllers/notesController");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const { MONGODB_URI, PORT } = require("./utils/config");
const {
  errorHandler,
  unknownEndPoint,
  requestLogger,
} = require("./utils/middleware");

// MongoDB connection setup
const url = MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use(requestLogger);

app.use("/api/auth", authController);
app.use("/api/users", userController);
app.use("/api/notes", notesController);
app.use(unknownEndPoint);

// this has to be the last loaded middleware,
app.use(errorHandler);

module.exports = app;
