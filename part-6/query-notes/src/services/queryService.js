import axios from "axios";
const baseUrl = "http://localhost:3001/notes";
const getNotes = () =>
  axios.get(baseUrl).then((res) => {
    // for (let i = 0; i <= 1000000000; i++) {}
    return res.data;
  });

const createNote = (newNote) =>
  axios.post(baseUrl, newNote).then((res) => res.data);

const updateNote = (updatedNote) =>
  axios
    .put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    .then((res) => res.data);

export { getNotes, createNote, updateNote };
