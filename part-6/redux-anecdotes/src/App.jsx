import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";
import Search from "./components/Search";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotesThunk } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotesThunk());
  }, []);

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <Search />
      <Anecdotes />
      <AnecdoteForm />
    </>
  );
};

export default App;
