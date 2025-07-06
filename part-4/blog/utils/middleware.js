const { info } = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  info("Method:", req.method);
  info("Path:  ", req.path);
  info("Body:  ", req.body);
  info("---");
  next();
};

const tokenExtractor = (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      req.token = authorization.replace("Bearer ", "");
    } else {
      req.token = null;
    }
    next();
  } catch (err) {
    next(err);
  }
};

const userExtractor = async (req, res, next) => {
  console.log("token of user", req.token);
  console.log("secret key", process.env.SECRET);
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    console.log("decodedToken", decodedToken);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(400).json({ error: "userId missing or not valid" });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({
      error: "malformatted id",
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    return res.status(409).json({
      error: "duplicate key error",
    });
  }

  next(error);
};

module.exports = {
  unknownEndPoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
