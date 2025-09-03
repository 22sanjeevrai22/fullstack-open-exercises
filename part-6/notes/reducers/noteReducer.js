const notesReducer = (
  state = [
    {
      content: "the app state is in redux store",
      important: true,
      id: 1,
    },
    {
      content: "state changes are made with actions",
      important: false,
      id: 2,
    },
  ],
  action
) => {
  if (action.type === "NEW_NOTE") {
    return [...state, action.payload];
  } else if (action.type === "TOGGLE") {
    const id = action.payload.id;

    let newNotes = state.map((note, index) => {
      if (note.id !== id) {
        return note;
      } else {
        return { ...note, important: !note.important };
      }
    });

    return newNotes;
  } else {
    return state;
  }
};

export default notesReducer;
