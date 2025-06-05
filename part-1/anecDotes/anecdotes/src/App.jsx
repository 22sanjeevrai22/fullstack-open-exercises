import { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const voteObject = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

  const [vote, setVote] = useState(voteObject);
  const [selected, setSelected] = useState(0);

  const mostVotedIndex = Object.keys(vote).reduce((a, b) =>
    vote[a] > vote[b] ? a : b
  );

  const handleClick = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = (selected) => {
    setVote((prev) => ({ ...prev, [selected]: prev[selected] + 1 }));
  };
  useEffect(() => {
    console.log("votee", vote);
    console.log("voteeObject", voteObject);
  }, [vote, voteObject]);

  return (
    <>
      <h2>Quote of the Day</h2>
      <div>{anecdotes[selected]}</div>
      <br />
      <button onClick={handleClick}>Next</button>
      <button onClick={() => handleVote(selected)}>Vote</button>
      <h3>Vote:{vote[selected]}</h3>
      <hr />
      <hr />
      <h2>Top voted quote</h2>
      <div>{anecdotes[mostVotedIndex]}</div>
      <div>{vote[mostVotedIndex]}</div>
    </>
  );
};

export default App;
