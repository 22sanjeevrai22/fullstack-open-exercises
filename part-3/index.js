console.log("Hello world");

const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/info", (req, res) => {
  res.send(`Phonebook has info for ${notes.length} people.`);
});

app.post("/api/notes/create", (req, res) => {
  const data = req.body;

  const doesExist = notes.some((note) => note.id === Number(data.id));
  if (doesExist) {
    res.status(409).json({ message: `${data.id} already exist` });
  } else {
    notes.push(data);
    res.status(200).json({ message: "Created" });
  }
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.status(200).json({ message: `Note of ${id} fetch successfuol`, note });
  } else {
    res.status(400).json({ message: "Very Sad" });
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const doesExist = notes.some((note) => note.id === Number(id));
  if (!doesExist) {
    res.status(404).json({ message: `Note with id:${id} doesn't exist` });
  } else {
    notes = notes.filter((note) => note.id !== id);
    res.status(200).json({ message: "Successfully deleted" });
  }
});

const PORT = 3002;
app.listen(PORT);

console.log("App running at port", PORT);
