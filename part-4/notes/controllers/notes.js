//GET request to fetch all notes from MongoDB
const app = require("express").Router();
const Note = require("../models/note");

app.get("/", async (req, res, next) => {
  try {
    let notes = await Note.find({});
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

//POST request to add a new note
app.post("/", (req, res, next) => {
  const newNote = req.body;
  const note = new Note({
    content: newNote.content,
    correct: newNote.correct || false,
  });

  note
    .save()
    .then((savedNote) => res.status(201).json(savedNote))
    .catch((error) => next(error));
});

// GET single note
app.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    })
    .catch((error) => next(error));
});

//PUT request to update a note
app.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { content, correct } = req.body;

  Note.findByIdAndUpdate(
    id,
    { content, correct },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      if (updatedNote) {
        res.json(updatedNote);
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    })
    .catch((error) => next(error));
});

//DELETE note
app.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    })
    .catch((error) => next(error));
});

module.exports = app;
