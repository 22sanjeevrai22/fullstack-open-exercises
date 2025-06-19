import { useEffect, useState } from "react";
import { getAll, create, remove, update } from "./phoneBookService";
interface PhoneBook {
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
  filteredPhoneBooks: PhoneBook[];
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
  filteredPhoneBooks,
  handleRemove,
}: DisplayNumberProps) => {
  return (
    <>
      <h3>Numbers</h3>
      {filteredPhoneBooks.map((phoneBook: PhoneBook) => (
        <div
          key={phoneBook.id}
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
          {phoneBook?.name}:{phoneBook?.number}
          <button
            style={{
              display: "",
              background: "red",
              margin: "3px",
              textAlign: "right",
            }}
            onClick={() => handleRemove(phoneBook.id)}
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
  const [phoneBooks, setPhoneBooks] = useState<PhoneBook[]>([]);
  const [formData, setFormData] = useState<{ name: string; number: string }>({
    name: "",
    number: "",
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    getAll().then((res: { data: PhoneBook[] }) => {
      const data: PhoneBook[] = res.data;
      console.log("dataaa", data);
      setPhoneBooks(data);
    });
  }, []);

  const filteredPhoneBooks: PhoneBook[] = phoneBooks.filter((phoneBook) =>
    phoneBook.name?.toLowerCase().includes(search.toLowerCase())
  );

  const checkAlreadyExisted = () => {
    return phoneBooks.find(
      (phoneBook) =>
        phoneBook.name.toLowerCase() === formData.name.toLowerCase()
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

    const existingPhoneBook = checkAlreadyExisted();

    if (existingPhoneBook) {
      const confirmUpdate = window.confirm(
        `${formData.name} is already in the phonebook. Replace the old number with the new one?`
      );
      if (confirmUpdate) {
        const updatedPhoneBook = {
          ...existingPhoneBook,
          number: formData.number,
        };
        update(updatedPhoneBook, existingPhoneBook.id).then((res) => {
          setPhoneBooks((prev: PhoneBook[]) =>
            prev.map((phoneBook) => {
              if (phoneBook.id === existingPhoneBook.id) {
                return res.data;
              } else {
                return phoneBook;
              }
            })
          );
        });
      }
    } else {
      create(formData)
        .then((res: { data: PhoneBook }) => {
          setPhoneBooks((prev: PhoneBook[]) => [...prev, res.data]);
        })
        .catch((err) => {
          console.log("errrrrr", err);
          setError(err);
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
        setPhoneBooks((prev) =>
          prev.filter((phoneBook) => phoneBook.id !== inputId)
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook-Listen-My-Son</h2>
      {error && (
        <h2 className="" style={{ background: "red" }}>
          {error?.message}
        </h2>
      )}
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
        filteredPhoneBooks={filteredPhoneBooks}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default App;
