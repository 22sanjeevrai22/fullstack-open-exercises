import useCounter from "../hooks/useCounter";
import Form from "./Form";

const CounterOne = () => {
  const count1 = useCounter();
  return (
    <>
      <div>
        <h1>France</h1>
        <div>{count1.counter}</div>
        <button onClick={count1.handleDecrease}>minus</button>
        <button onClick={count1.handleIncrease}>plus</button>
        <button onClick={count1.handleReset}>zero</button>
      </div>
    </>
  );
};

const CounterTwo = () => {
  const count2 = useCounter();
  return (
    <>
      <div>
        <h1>France</h1>
        <div>{count2.counter}</div>
        <button onClick={count2.handleDecrease}>minus</button>
        <button onClick={count2.handleIncrease}>plus</button>
        <button onClick={count2.handleReset}>zero</button>
      </div>
    </>
  );
};

const App = () => {
  console.log("ball");
  return (
    <>
      {/* <div style={{ display: "flex" }}>
        <CounterOne />
        <hr />
        <CounterTwo />
      </div> */}
      <Form />
    </>
  );
};

export default App;
