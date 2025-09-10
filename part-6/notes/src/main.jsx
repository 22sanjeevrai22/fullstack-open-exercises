import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { notesReducer } from "../reducers/noteReducer";
import App from "./App";

const rootReducer = combineReducers({
  notes: notesReducer,
});

const store = createStore(rootReducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
