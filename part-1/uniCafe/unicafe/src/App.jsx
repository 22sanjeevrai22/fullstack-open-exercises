import { useEffect, useState } from "react";

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

      <button onClick={handleGood}>good</button>
      <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
      <button onClick={() => setBad((prev) => prev + 1)}>bad</button>
      <h1>Statistics</h1>
      <div>good:{good}</div>
      <div>neutral:{neutral}</div>
      <div>bad:{bad}</div>
      <div>all:{total}</div>
      <div>average:{(good - bad) / (good + neutral + bad)}</div>
      <div>positive:{(good / total) * 100}%</div>
    </>
  );
};

export default App;
