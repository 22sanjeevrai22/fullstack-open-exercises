// const Header = (props) => {
//   return <h1>{props.course}</h1>;
// };

// const Part = (props) => {
//   return (
//     <div>
//       <p>{props.name}</p>
//       <p>{props.exercises}</p>
//     </div>
//   );
// };

// const Content = (props) => {
//   return (
//     <>
//       <Part name={props.part1.name} exercises={props.part1.exercises} />
//       <Part name={props.part2.name} exercises={props.part2.exercises} />
//       <Part name={props.part3.name} exercises={props.part3.exercises} />
//     </>
//   );
// };

// const App = () => {
//   const course = "Half Stack application development";
//   const part1 = {
//     name: "Fundamentals of React",
//     exercises: 10,
//   };
//   const part2 = {
//     name: "Using props to pass data",
//     exercises: 7,
//   };
//   const part3 = {
//     name: "State of a component",
//     exercises: 14,
//   };

//   return (
//     <div>
//       <Header course={course} />
//       <Content part1={part1} part2={part2} part3={part3} />

//     </div>
//   );
// };

// export default App;

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.exercises}</p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, currentValue) => {
    return currentValue.exercises + acc;
  }, 0);
  return (
    <>
      <span>Total:{total}</span>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
