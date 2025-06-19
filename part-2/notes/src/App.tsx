import Notes from "./components/Notes";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import noteService from "./services/notes";

interface Note {
  id?: number;
  content: string;
  date: string;
  correct: boolean;
}

const App = () => {
  const [myNotes, setMyNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(true);

  useEffect(() => {
    const myAxiosData = noteService.getAll();
    console.log("Fetching notes from server");
    myAxiosData
      .then((myData: Note[]) => {
        myData.push({
          id: 0,
          content: "This is a fake note",
          date: "2023-10-01",
          correct: true,
        }); // Adding a sample note
        setMyNotes(myData);
      })
      .catch((error: unknown) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Adding a new note");
    const myNote: Omit<Note, "id"> = {
      content: newNote,
      date: new Date().toISOString().split("T")[0],
      correct: Math.random() > 0.5,
    };
    const postData = noteService.create(myNote);
    postData
      .then((response: { data: Note }) => {
        console.log("Note added successfully:", response.data);
        setMyNotes([...myNotes, response.data]); // Update state after getting response with ID
      })
      .catch((error: unknown) => {
        console.error("Error adding note:", error);
      });
    setNewNote("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote(e.target.value);
  };

  const notesToShow = myNotes.filter((note) => (showAll ? true : note.correct));

  const handleShow = () => {
    setShowAll(!showAll);
  };

  const updateNote = (id: number) => {
    console.log("Updating note with id:", id);
    const currentNode = myNotes.find((note) => note.id === id);
    if (!currentNode) {
      alert(`Sorry! this note "${id}" does not exist in the database`);
      return;
    }
    const updatedNote = { ...currentNode, correct: !currentNode.correct };
    const putPromise = noteService.update(id, updatedNote);
    putPromise
      .then((response: { data: Note }) => {
        const updatedData = response.data;
        setMyNotes(
          myNotes.map((note) => (note.id === id ? updatedData : note))
        );
      })
      .catch((error: unknown) => {
        console.error("Error updating note:", error);
      });
  };

  return (
    <>
      <h1>Notes</h1>
      <button onClick={handleShow}>
        💡 Show {showAll ? "Correct Only" : "All"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}>
            {note.content} ({note.date}) [
            {note.correct ? "correct" : "incorrect"}]
            {typeof note.id === "number" && (
              <button
                onClick={() => note.id !== undefined && updateNote(note.id)}
              >
                Toggle Correct
              </button>
            )}
          </li>
        ))}
      </ul>
      <p>Note count: {myNotes.length}</p>
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleChange} />
        <button>Add Note</button>
      </form>
    </>
  );
};

export default App;
