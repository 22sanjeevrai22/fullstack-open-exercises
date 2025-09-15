import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import filterReducer from "../reducers/filterReducer";
import noteReducer, { setNotes } from "../reducers/noteReducer";
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

console.log("This is store.getState()", store.getState());

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
