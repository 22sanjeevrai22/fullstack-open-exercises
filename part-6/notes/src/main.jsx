import { useState } from "react";
import ReactDOM from "react-dom/client";
import { combineReducers, createStore } from "redux";
import notesReducer from "../reducers/noteReducer";
// import App from './App'

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const rootReducer = combineReducers({
  notes: notesReducer,
});

const store = createStore(rootReducer);

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    store.dispatch({
      type: "NEW_NOTE",
      payload: {
        content,
        important: false,
        id: generateId(),
      },
    });
  };

  //action creators
  const createNote = (content) => {
    return {
      type: "NEW_NOTE",
      payload: {
        content,
        important: false,
        id: generateId(),
      },
    };
  };

  const toggleImportance = (id) => {
    store.dispatch({
      type: "TOGGLE_IMPORTANCE",
      payload: { id },
    });
  };

  return (
    <>
      <div>
        <h1>Notes App with reducer</h1>
        <form onSubmit={addNote}>
          <input name="note" />
          <button type="submit">add</button>
        </form>
        <div>
          {store.getState().notes.map((note, index) => (
            <h3 key={index}>
              {note.content}__
              <span>{note.important ? "Important" : "Not Important"}</span>
              <button onClick={() => toggleImportance(note.id)}>
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
