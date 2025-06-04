import { useEffect, useState } from "react";

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <>
      {total && (
        <>
          <h1>Statistics</h1>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={(good - bad) / total} />
          <StatisticsLine text="positive" value={`${(good / total) * 100}%`} />
        </>
      )}
    </>
  );
};
const StatisticsLine = ({ text, value }) => {
  return (
    <div>
      {text}:{value}
    </div>
  );
};

const Button = ({ onClick, name }) => {
  return (
    <>
      <button onClick={onClick}>{name}</button>
    </>
  );
};

const App = () => {
  //This is 1.7
  // save clicks of each button to its own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(good + neutral + bad);
  }, [good, bad, neutral]);

  const handleGood = () => {
    setGood((prev) => prev + 1);
  };

  return (
    <>
      <h1>Give Feedback</h1>
      <Button name="good" onClick={handleGood} />
      <Button name="neutral" onClick={() => setNeutral((prev) => prev + 1)} />
      <Button name="bad" onClick={() => setBad((prev) => prev + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </>
  );
};

export default App;
