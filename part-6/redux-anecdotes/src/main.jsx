import ReactDOM from "react-dom/client";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import { reducer } from "./reducers/anecdoteReducer";
import searchReducer from "./reducers/searchReducer";

const rootReducer = combineReducers({
  anecdotes: reducer,
  search: searchReducer,
});

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
