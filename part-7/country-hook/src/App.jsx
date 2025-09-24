import React, { useState, useEffect } from "react";
import getAllCountries from "../services/countryService";
const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      try {
        const response = await getAllCountries(name);
        if (response) {
          setCountry({ found: true, data: response });
        } else {
          setCountry({ found: false });
        }
      } catch (error) {
        setCountry({ found: false });
      }
    };
    fetchData();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) return null;
  if (!country.found) return <div>not found...</div>;

  const data = country.data;

  return (
    <div>
      <h3>{data.name.common}</h3>
      <div>capital {data.capital}</div>
      <div>population {data.population}</div>
      <img
        src={data.flags.png}
        height="100"
        alt={`flag of ${data.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
