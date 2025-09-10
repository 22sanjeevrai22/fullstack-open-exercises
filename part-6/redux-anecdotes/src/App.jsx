import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdote";

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <AnecdoteForm handleSubmit />
    </>
  );
};

export default App;
