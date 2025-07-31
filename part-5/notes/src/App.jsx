import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/noteService";
import { login } from "./services/authService";
import Togglable from "./components/Togglable";
import LoginForm from "./components/auth/LoginForm";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("noteUserInfo");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const createNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    console.log("noteee", note);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("noteUserInfo");
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("noteUserInfo", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={createNote} />
      </Togglable>
    );
  };

  return (
    <div className="app-container">
      <h1>My Note App</h1>
      <Notification message={errorMessage} />

      <h2>Login</h2>

      {!user && loginForm()}
      {user && (
        <div>
          <p style={{ color: "#6366f1", fontWeight: "bold", marginBottom: 8 }}>
            {user?.name} logged-in
          </p>
          <button style={{ marginBottom: 16 }} onClick={handleLogOut}>
            Logout
          </button>
          {noteForm()}
        </div>
      )}

      <div style={{ margin: "24px 0" }}>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul className="note-list">
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
