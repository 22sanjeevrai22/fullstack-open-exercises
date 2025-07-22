const Note = ({ note, toggleImportance }) => {
  const label = note.correct ? "make not important" : "make important";
  return (
    <li className="note-item">
      <span className="note-content">{note.content}</span>
      <span
        className={note.correct ? "note-important" : ""}
        style={{ marginLeft: 12, marginRight: 12 }}
      >
        {note.correct ? "important" : "not important"}
      </span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
