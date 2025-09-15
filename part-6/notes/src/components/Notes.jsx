import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <h3 key={note.id}>
      {note.content}__
      <span>{note.important ? "Important" : "Not Important"}</span>
      <button onClick={handleClick}>Toggle Important</button>
    </h3>
  );
};

const Notes = () => {
  //like setState
  const dispatch = useDispatch();

  //like state
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  return (
    <>
      <div>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => dispatch(toggleImportanceOf(note.id))}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
