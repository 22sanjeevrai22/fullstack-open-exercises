import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNote, getNotes, updateNote } from "./services/queryService";

const App = () => {
  const queryClient = useQueryClient();

  //get
  const result = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  //Mutation hook to create
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      // queryClient.invalidateQueries({ queryKey: ["notes"] });//Instead ot this use the below
      const notes = queryClient.getQueryData(["notes"]);
      queryClient.setQueryData(["notes"], notes.concat(newNote));
    },
  });

  //create
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    newNoteMutation.mutate({ content, important: true });
  };

  //Mutation hook to Update
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (updatedNote) => {
      // queryClient.invalidateQueries({ queryKey: ["notes"] });
      const notes = queryClient.getQueryData(["notes"]);
      const newNotes = notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      queryClient.setQueryData(["notes"], newNotes);
    },
  });

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  if (result.status === "pending") {
    return <span>Loading...</span>;
  }

  if (result.status === "error") {
    return <span>Error: {result.error.message}</span>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : "not-important"}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
