const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Menu = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.exercises}</p>
    </div>
  );
};

const Content = (props) => {
  return (
    <>
      <Menu name={props.part1.name} exercises={props.part1.exercises} />
      <Menu name={props.part2.name} exercises={props.part2.exercises} />
      <Menu name={props.part3.name} exercises={props.part3.exercises} />
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
    </div>
  );
};

export default App;
