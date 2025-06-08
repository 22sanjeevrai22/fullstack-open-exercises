import { useEffect, useState } from "react";
import { getAll, create, remove, update } from "./personService";
interface Person {
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
  filteredPersons: Person[];
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
  filteredPersons,
  handleRemove,
}: DisplayNumberProps) => {
  return (
    <>
      <h3>Numbers</h3>
      {filteredPersons.map((person: Person) => (
        <div
          key={person.id}
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
          {person?.name}:{person?.number}
          <button
            style={{
              display: "",
              background: "red",
              margin: "3px",
              textAlign: "right",
            }}
            onClick={() => handleRemove(person.id)}
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
  const [persons, setPersons] = useState<Person[]>([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [formData, setFormData] = useState<{ name: string; number: string }>({
    name: "",
    number: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll().then((res: { data: Person[] }) => {
      const data: Person[] = res.data;
      console.log("dataaa", data);
      setPersons(data);
    });
  }, []);

  const filteredPersons: Person[] = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const checkAlreadyExisted = () => {
    return persons.find(
      (person) => person.name.toLowerCase() === formData.name.toLowerCase()
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

    const existingPerson = checkAlreadyExisted();

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${formData.name} is already in the phonebook. Replace the old number with the new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = {
          ...existingPerson,
          number: formData.number,
        };
        update(updatedPerson, existingPerson.id).then((res) => {
          setPersons((prev: Person[]) =>
            prev.map((person) => {
              if (person.id === existingPerson.id) {
                ////??????????
                return res.data;
              } else {
                return person;
              }
            })
          );
        });
      }
    } else {
      create(formData).then((res: { data: Person }) => {
        setPersons((prev: Person[]) => [...prev, res.data]);
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
        setPersons((prev) => prev.filter((person) => person.id !== inputId));
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
        filteredPersons={filteredPersons}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default App;
