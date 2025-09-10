const initialState = [
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
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const notesReducer = (state = initialState, action) => {
  if (action.type === "NEW_NOTE") {
    return [...state, action.payload];
  } else if (action.type === "TOGGLE_IMPORTANCE") {
    const id = action.payload.id;

    let newNotes = state.map((note) => {
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

//action creators
const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      id: generateId(),
      content,
      important: false,
    },
  };
};

const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
};

export { notesReducer, createNote, toggleImportanceOf };
