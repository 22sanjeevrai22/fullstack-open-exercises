const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../models/note");
const api = supertest(app);
const helpers = require("./helper/tests_helper");

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjects = helpers.initialNotes.map((note) => new Note(note));
  const promiseArray = noteObjects.map((note) => note.save());
  await Promise.all(promiseArray);
});

describe("Testing GET Method", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 5000);

  test("there are 2 notes", async () => {
    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(2);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((e) => e.content);
    expect(contents.includes("HTML is easy")).toBe(true);
  });

  test("the first note is about HTTP methods", async () => {
    const response = await helpers.notesInDb();
    const contents = response.map((r) => r.content);
    expect(contents).toContain(helpers.initialNotes[0].content);
  });
});

describe("Testing the POST mehod", () => {
  test("a valid note can be added ", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/notes");

    const contents = response.body.map((r) => r.content);

    expect(response.body).toHaveLength(helpers.initialNotes.length + 1);

    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("notes in db match initial notes after setup", async () => {
    const notesAtEnd = await helpers.notesInDb();
    expect(notesAtEnd).toHaveLength(helpers.initialNotes.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
