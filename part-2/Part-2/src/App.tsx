import { useState } from "react";
interface Person {
  name: string;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const checkDuplicate = () => {
    return persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName.trim() === "") return;
    if (checkDuplicate()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons((prev) => [...prev, { name: newName }]);
    }
    setNewName("");
  };

  console.log("newname", newName);
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person?.name}</div>
      ))}
    </div>
  );
};

export default App;
