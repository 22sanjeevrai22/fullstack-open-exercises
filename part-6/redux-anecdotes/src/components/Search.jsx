import { useDispatch } from "react-redux";
import { setSearch } from "../reducers/searchReducer";
const Search = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    <>
      <label htmlFor="search">Search Notes</label>
      <div style={{ marginBottom: "2rem" }}>
        <input id="search" type="text" onChange={handleChange} />
      </div>
    </>
  );
};

export default Search;
