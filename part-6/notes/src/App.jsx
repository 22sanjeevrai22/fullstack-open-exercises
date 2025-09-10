import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
const App = () => {
  return (
    <>
      <div>
        <h1>Notes App with reducer</h1>
        <NewNote />
        <Notes />
      </div>
    </>
  );
};

export default App;
