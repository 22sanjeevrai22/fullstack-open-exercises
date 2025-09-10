const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

//action creators
const increaseVote = (id) => {
  return {
    type: "VOTE_ANECDOTES",
    payload: { id },
  };
};

const createAnecdote = (anecdote) => {
  return {
    type: "ADD_ANECDOTE",
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ANECDOTE": {
      return [...state, action.payload];
    }

    case "VOTE_ANECDOTES": {
      let myAnecdote = state.find(
        (anecdote) => anecdote.id === action.payload.id
      );
      const editedAnecdote = {
        ...myAnecdote,
        votes: myAnecdote.votes + 1,
      };
      const newState = state.map((anecdote) => {
        return anecdote.id === action.payload.id ? editedAnecdote : anecdote;
      });
      return newState;
    }

    default:
      return state;
  }
};

export { reducer, increaseVote, createAnecdote };
