import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  const inputField = {
    type,
    value,
    onChange,
  };

  return {
    inputField,
    reset,
  };
};

export { useField };
