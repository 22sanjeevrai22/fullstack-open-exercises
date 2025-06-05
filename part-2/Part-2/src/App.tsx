interface Part {
  name: string;
  exercises: number;
}

interface CourseProps {
  course: string;
  parts: Part[];
}

interface HeaderProps {
  course: string;
}

interface ContentProps {
  parts: Part[];
}

interface PartProps {
  name: string;
  exercises: number;
}

interface TotalProps {
  parts: Part[];
}

const App = () => {
  const course: string = "Half Stack application development";

  const parts: Part[] = [
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
      <Course course={course} parts={parts} />
    </div>
  );
};

const Course = ({ course, parts }: CourseProps) => {
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

const Header = ({ course }: HeaderProps) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, exercises }: PartProps) => {
  return (
    <div>
      <p>{name}</p>
      <p>{exercises}</p>
    </div>
  );
};

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }: TotalProps) => {
  const total = parts.reduce((acc, currentValue) => {
    return currentValue.exercises + acc;
  }, 0);
  return (
    <>
      <span>Total:{total}</span>
    </>
  );
};

export default App;
