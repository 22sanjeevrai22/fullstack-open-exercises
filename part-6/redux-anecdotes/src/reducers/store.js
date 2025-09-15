import reducer from "./anecdoteReducer";
import searchReducer from "./searchReducer";
import notificationReducer from "./notificationReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    search: searchReducer,
    notification: notificationReducer,
  },
});

console.log(store.getState());

export default store;
