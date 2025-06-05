import { useState } from "react";
interface Person {
  id: number;
  name: string;
  number?: string;
}

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

  const filteredPersons = persons.filter((person) =>
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

  console.log("newname", newName);
  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search</h3>
      <input placeholder="Search" type="text" onChange={handleSearchChange} />
      <br />
      <br />
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
          <button type="submit">add</button>
        </div>
      </form>
      {}
      <h3>Numbers</h3>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person?.name}
          <span>{person?.number}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
