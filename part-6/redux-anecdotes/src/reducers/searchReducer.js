const searchReducer = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SEARCH": {
      return payload;
    }
    default:
      return state;
  }
};

const setSearch = (value) => {
  return {
    type: "SET_SEARCH",
    payload: value,
  };
};

export { setSearch };
export default searchReducer;
