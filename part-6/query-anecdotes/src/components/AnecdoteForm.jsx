import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anectodeServices";
import { useContext } from "react";
import NotificationContext from "../context/notificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const [, setNotification] = useContext(NotificationContext);

  //Create
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);

      //dispatching using useContext and useReducer
      setNotification(`new anecdote '${newAnecdote.content}' created!`);
    },
    onError: (error) => {
      let errorMessage = error?.response?.data?.error;

      //dispatching using useContext and useReducer
      setNotification(errorMessage);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
