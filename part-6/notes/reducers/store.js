import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterReducer";
import noteReducer, { setNotes } from "../reducers/noteReducer";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

export default store;
