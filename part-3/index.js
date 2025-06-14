const express = require("express");
var morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");

const password = "fullstackopen121";

const url = `mongodb+srv://sunzeevraee:${password}@cluster0.4ury8bm.mongodb.net/Institute?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Note = mongoose.model("Note", noteSchema);

app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

// Logging middleware with custom format
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let notes = [];

app.head("/api/notes", (req, res) => {
  res.status(200).end();
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((result) => {
    console.log("jjj", result);
    res.json(result);
  });
});

app.get("/api/info", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const data = req.body;

  const doesExist = notes.some((note) => Number(note.id) === Number(data.id));
  if (doesExist) {
    res.status(409).json({ message: `${data.id} already exist` });
  } else {
    // Generate a new unique id
    const newId = (
      Math.max(...notes.map((n) => Number(n.id)), 0) + 1
    ).toString();
    const newNote = { ...data, id: newId };
    notes.push(newNote);
    res.status(200).json({ message: "Created", note: newNote });
  }
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.status(200).json({ message: `Note of ${id} fetch successfuol`, note });
  } else {
    res.status(400).json({ message: "Very Sad" });
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log("idddd", id);
  const doesExist = notes.some((note) => note.id === id);
  if (!doesExist) {
    res.status(404).json({ message: `Note with id:${id} doesn't exist` });
  } else {
    notes = notes.filter((note) => note.id !== id);
    res.status(200).json({ message: "Successfully deleted" });
  }
});

const PORT = process.env.PORT ? process.env.PORT : 3002;
app.listen(PORT);

console.log("App running at port", PORT);
