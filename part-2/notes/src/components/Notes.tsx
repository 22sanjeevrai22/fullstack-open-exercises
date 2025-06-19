import type { Note } from "../services/notes";

interface NotesProps {
  note: Note;
  updateNote: () => void;
}

const Notes = ({ note, updateNote }: NotesProps) => {
  return (
    <li>
      {note.content}{" "}
      <button onClick={updateNote}>
        {note.correct ? "🙆‍♂️Yes🙆‍♀️" : "🙅‍♂️No🙅‍♀️"}
      </button>
    </li>
  );
};

export default Notes;
