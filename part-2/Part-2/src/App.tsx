import { useState } from "react";
interface Person {
  name: string;
  number?: string;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName.trim() === "") return;
    if (checkDuplicate()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons((prev) => [...prev, { name: newName, number: newNumber }]);
    }
    setNewName("");
    setNewNumber("");
  };

  console.log("newname", newName);
  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person?.name}
          <span>{person?.number}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
