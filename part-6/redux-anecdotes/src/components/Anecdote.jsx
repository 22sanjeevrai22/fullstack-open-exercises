import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anec, onClick }) => {
  return (
    <>
      <div key={anec.id}>
        <div>{anec.content}</div>
        <div>
          has {anec.votes}
          <button onClick={onClick}>vote</button>
        </div>
      </div>
    </>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch(); // like setState
  const anecdotes = useSelector((state) => state.anecdotes); //equivalent to state
  const searchInput = useSelector((state) => state.search);
  const filteredAnecdotes = anecdotes.filter((anec) =>
    anec.content.includes(searchInput)
  );
  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes
  );

  return (
    <>
      {sortedAnecdotes.map((anec) => (
        <Anecdote
          key={anec.id}
          anec={anec}
          onClick={() => dispatch(increaseVote(anec.id))}
        />
      ))}
    </>
  );
};

export default Anecdotes;
