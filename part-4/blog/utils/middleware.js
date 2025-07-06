const { info } = require("./logger");
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
};
