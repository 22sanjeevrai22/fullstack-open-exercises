const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note-item">
      <span className="note-content">Your awesome note: {note.content}</span>
      {/* <span
        className={note.important ? "note-important" : ""}
        style={{ marginLeft: 12, marginRight: 12 }}
      >
        {note.important ? "important" : "not important"}
      </span> */}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
