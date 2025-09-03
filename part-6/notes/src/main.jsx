import { useState } from "react";
import ReactDOM from "react-dom/client";
import { combineReducers, createStore } from "redux";
import notesReducer from "../reducers/noteReducer";
// import App from './App'

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const rootReducer = combineReducers({
  notes: notesReducer,
});

const store = createStore(rootReducer);

const addNote = () => {
  store.dispatch({
    type: "NEW_NOTE",
    payload: {
      content: "Brother brother yes papa, eating sugar no papa?",
      important: true,
      id: 2,
    },
  });
};

const toggleImportant = (id) => {
  store.dispatch({
    type: "TOGGLE",
    payload: {
      id: id,
    },
  });
};

const App = () => {
  const { notes } = store.getState();
  return (
    <>
      <div>
        <h1>Notes App with reducer</h1>
        <button onClick={addNote}>Click</button>
        <div>
          {notes.map((note, index) => (
            <h3 key={index}>
              {note.content}
              <span>{note.important ? "Important" : "Not Important"}</span>
              <button onClick={() => toggleImportant(note.id)}>
                Toggle Important
              </button>
            </h3>
          ))}
        </div>
      </div>
    </>
  );
};

root.render(<App />);
store.subscribe(() => {
  root.render(<App />);
});
