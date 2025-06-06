import axios from "axios";
import { useEffect, useState } from "react";
interface Person {
  id: number;
  name: string;
  number?: string;
}

interface InputProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newName: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newNumber: string;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface SearchProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ handleSearchChange }: SearchProps) => {
  return (
    <>
      <h3>Search</h3>
      <input placeholder="Search" type="text" onChange={handleSearchChange} />
    </>
  );
};

const DisplayNumbers = ({ filteredPersons }: { filteredPersons: Person[] }) => {
  return (
    <>
      <h3>Numbers</h3>
      {filteredPersons.map((person: Person) => (
        <div key={person.name}>
          {person?.name}:<span>{person?.number}</span>
        </div>
      ))}
    </>
  );
};

const Input = ({
  handleSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
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
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number:{" "}
          <input
            placeholder="Input Number"
            value={newNumber}
            onChange={handleNumberChange}
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
  const [persons, setPersons] = useState<Person[]>([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      const data = res.data;
      console.log("dataaa", data);
      setPersons(data);
    });
  }, []);

  const filteredPersons: Person[] = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const checkDuplicate = () => {
    return persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName.trim() === "") return;
    if (checkDuplicate()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons((prev) => [
        ...prev,
        {
          name: newName,
          number: newNumber,
          id: prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        },
      ]);
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} />
      <br />
      <br />
      <Input
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <DisplayNumbers filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
