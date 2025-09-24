import { useState } from "react";

const useCounter = (count = 0) => {
  const [counter, setCounter] = useState(count);

  const handleIncrease = () => {
    setCounter(counter + 1);
  };

  const handleDecrease = () => {
    setCounter(counter - 1);
  };

  const handleReset = () => {
    setCounter(0);
  };

  console.log("apple");

  return {
    counter,
    handleDecrease,
    handleIncrease,
    handleReset,
  };
};

export default useCounter;
