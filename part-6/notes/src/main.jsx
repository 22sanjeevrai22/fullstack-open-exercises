import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "../reducers/store";

console.log("This is store.getState()", store.getState());

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
