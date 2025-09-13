import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFIlter";
const App = () => {
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
