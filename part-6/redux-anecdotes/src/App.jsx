import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdote";
import Search from "./components/Search";
import Notification from "./components/Notification";

const App = () => {
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
