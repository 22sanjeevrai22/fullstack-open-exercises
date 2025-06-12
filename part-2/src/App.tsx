import { useEffect, useState } from "react";
import { getAll, create, remove, update } from "./noteService";
interface Note {
  id: number;
  name: string;
  number?: string;
}
interface InputProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newNumber: string;
}
interface SearchProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface DisplayNumberProps {
  filteredNotes: Note[];
  handleRemove: (id: number) => void;
}

const Search = ({ handleSearchChange }: SearchProps) => {
  return (
    <>
      <h3>Search</h3>
      <input placeholder="Search" type="text" onChange={handleSearchChange} />
    </>
  );
};

const DisplayNumbers = ({
  filteredNotes,
  handleRemove,
}: DisplayNumberProps) => {
  return (
    <>
      <h3>Numbers</h3>
      {filteredNotes.map((note: Note) => (
        <div
          key={note.id}
          style={{
            backgroundColor: "#A9A9A9",
            padding: "4px",
            margin: "2px",
            width: "50%",
            display: "flex",
            alignItems: "center", // Add this
            justifyContent: "space-between",
          }}
        >
          {note?.name}:{note?.number}
          <button
            style={{
              display: "",
              background: "red",
              margin: "3px",
              textAlign: "right",
            }}
            onClick={() => handleRemove(note.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

const Input = ({
  handleSubmit,
  newName,
  handleChange,
  newNumber,
}: InputProps) => {
  return (
    <>
      <h3>Input</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <input
            placeholder="Input Name"
            value={newName}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          Number:{" "}
          <input
            placeholder="Input Number"
            name="number"
            value={newNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};
const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [formData, setFormData] = useState<{ name: string; number: string }>({
    name: "",
    number: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll().then((res: { data: Note[] }) => {
      const data: Note[] = res.data;
      console.log("dataaa", data);
      setNotes(data);
    });
  }, []);

  const filteredNotes: Note[] = notes.filter((note) =>
    note.name?.toLowerCase().includes(search.toLowerCase())
  );

  const checkAlreadyExisted = () => {
    return notes.find(
      (note) => note.name.toLowerCase() === formData.name.toLowerCase()
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name.trim() === "") {
      alert("Name cannot be empty.");
      return;
    }

    const existingNote = checkAlreadyExisted();

    if (existingNote) {
      const confirmUpdate = window.confirm(
        `${formData.name} is already in the phonebook. Replace the old number with the new one?`
      );
      if (confirmUpdate) {
        const updatedNote = {
          ...existingNote,
          number: formData.number,
        };
        update(updatedNote, existingNote.id).then((res) => {
          setNotes((prev: Note[]) =>
            prev.map((note) => {
              if (note.id === existingNote.id) {
                ////??????????
                return res.data;
              } else {
                return note;
              }
            })
          );
        });
      }
    } else {
      create(formData).then((res: { data: Note }) => {
        setNotes((prev: Note[]) => [...prev, res.data]);
      });
    }
    setFormData({
      name: "",
      number: "",
    });
  };

  const handleRemove = (inputId: number) => {
    if (confirm("Are you sure you want to remove?")) {
      remove(inputId).then(() => {
        setNotes((prev) => prev.filter((note) => note.id !== inputId));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} />
      <br />
      <br />
      <Input
        handleSubmit={handleSubmit}
        newName={formData.name}
        newNumber={formData.number}
        handleChange={handleChange}
      />

      <DisplayNumbers
        filteredNotes={filteredNotes}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default App;
