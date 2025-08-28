import { useState } from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
// import App from './App'

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const countReducer = (state = 10, action) => {
  //Some Logic Here
  // console.log("state is", state);
  // console.log("action is", action);

  if (action.type === "INCREMENT") {
    return state + 1;
  } else if (action.type === "DECREMENT") {
    return state - 1;
  } else if (action.type === "RESET") {
    return 0;
  }
  return state;
};

const store = createStore(countReducer);

const App = () => {
  const handleIncrease = () => {
    store.dispatch({ type: "INCREMENT" });
  };

  const handleDecrease = () => {
    store.dispatch({ type: "DECREMENT" });
  };

  const handleReset = () => {
    store.dispatch({ type: "RESET" });
  };

  return (
    <div>
      <div>Count:{store.getState()}</div>
      <div>
        <button onClick={handleDecrease}>Decrease</button>
        <button onClick={handleIncrease}>Increase</button>
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

root.render(<App />);
store.subscribe(() => {
  root.render(<App />);
});
