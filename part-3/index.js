const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// --- MongoDB Connection ---
const password = process.env.MONGO_PW; // Change this to process.env or config for production
const url = `mongodb+srv://sanjeev_rai101:${password}@sanveevcluster0.rpcts8f.mongodb.net/phonebook?retryWrites=true&w=majority&appName=SanveevCluster0`;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// --- Middleware ---
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

// --- Mongoose Schema & Model ---
const phonebookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        // Must match: 2 or 3 digits, dash, then at least 5 digits
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Format must be XX-XXXXXXX or XXX-XXXXXXX`,
    },
  },
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const PhoneBook = mongoose.model("PhoneBook", phonebookSchema);

// --- Morgan Logging ---
morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// --- Routes ---
// Get all phonebook entries
app.get("/api/persons", (req, res) => {
  PhoneBook.find({}).then((result) => {
    res.status(200).json(result);
  });
});

// Get info (count and date)
app.get("/api/info", (req, res) => {
  PhoneBook.countDocuments({}).then((count) => {
    res.send(
      `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`
    );
  });
});

// Get a single phonebook entry by id
app.get("/api/persons/:id", (req, res, next) => {
  PhoneBook.findById(req.params.id)
    .then((entry) => {
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Add a new phonebook entry
app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "name or number missing" });
  }
  const newEntry = new PhoneBook({ name, number });
  newEntry
    .save()
    .then((savedEntry) => {
      res.status(201).json(savedEntry);
    })
    .catch((error) => {
      next(error);
    });
});

// Update a phonebook entry (PUT)
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "name or number missing" });
  }
  PhoneBook.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedEntry) => {
      if (updatedEntry) {
        res.json(updatedEntry);
      } else {
        res.status(404).json({ error: "entry not found" });
      }
    })
    .catch((error) => next(error));
});

// Delete a phonebook entry
app.delete("/api/persons/:id", (req, res,next) => {
  PhoneBook.findByIdAndDelete(req.params.id)
    .then((deletedEntry) => {
      res.status(200).json(deletedEntry);
    })
    .catch((error) => {
      next(error);
    });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    return response.status(500).json({ error: error.message });
  }

  // fallback for any other errors
  response.status(500).json({ error: "internal server error" });
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
