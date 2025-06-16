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
  name: String,
  number: Number,
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
app.get("/api/persons/:id", (req, res) => {
  PhoneBook.findById(req.params.id)
    .then((entry) => {
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).end();
      }
    })
    .catch(() => {
      console.log("Error in backend index.js", error);
      res.status(400).json({ error: "malformatted id" });
    });
});

// Add a new phonebook entry
app.post("/api/persons", (req, res) => {
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
      res.status(500).json({ error: error.message });
    });
});

// Delete a phonebook entry
app.delete("/api/persons/:id", (req, res) => {
  PhoneBook.findByIdAndDelete(req.params.id)
    .then((deletedEntry) => {
      res.status(200).json(deletedEntry);
    })
    .catch(() => {
      res.status(400).json({ error: "malformatted id" });
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
