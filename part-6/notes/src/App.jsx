import { useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFIlter";
import { useEffect } from "react";
import noteService from "./services/noteService";
import { setNotes } from "../reducers/noteReducer";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, []);
  return (
    <>
      <div>
        <h1>Notes App with reducer</h1>
        <NewNote />
        <VisibilityFilter />
        <Notes />
      </div>
    </>
  );
};

export default App;
