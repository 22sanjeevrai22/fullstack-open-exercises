import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAllAnecdotes, updateAnecdote } from "./services/anectodeServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const App = () => {
  const queryClient = useQueryClient();

  //get
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAllAnecdotes,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  console.log("raw data", result);
  // All functions, Symbols, class instances, Proxies are stripped away. You only keep the pure data (numbers, strings, arrays, objects).
  console.log("after parsing", JSON.parse(JSON.stringify(result)));

  //update
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const newAnecdotes = anecdotes.map((anec) =>
        anec.id === updatedAnecdote.id ? updatedAnecdote : anec
      );
      queryClient.setQueryData(["anecdotes"], newAnecdotes);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
