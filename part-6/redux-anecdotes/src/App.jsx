import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";
import Search from "./components/Search";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteService from "./services/anecdoteService";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      console.log(anecdotes);
      dispatch(setAnecdotes(anecdotes));
    });
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
