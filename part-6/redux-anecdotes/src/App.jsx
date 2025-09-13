import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdote";
import Search from "./components/Search";

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <Search />
      <Anecdotes />
      <AnecdoteForm handleSubmit />
    </>
  );
};

export default App;
