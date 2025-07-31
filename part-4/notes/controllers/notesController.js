//GET req to fetch all notes from MongoDB
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

notesRouter.get("/", async (req, res, next) => {
  try {
    const notes = await Note.find({}).populate("user", {
      userName: 1,
      passwordHash: 1,
      name: 1,
    });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

//POST req to add a new note
notesRouter.post("/", async (req, res, next) => {
  const body = req.body;

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(400).json({ error: "userId missing or not valid" });
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
      user: user._id,
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id); //user.notes = [...user.notes, savedNote._id];
    await user.save();

    res.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

// GET single note
notesRouter.get("/:id", (req, res, next) => {
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

//PUT req to update a note
notesRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { content, important } = req.body;

  Note.findByIdAndUpdate(
    id,
    { content, important },
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
notesRouter.delete("/:id", (req, res, next) => {
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

module.exports = notesRouter;
