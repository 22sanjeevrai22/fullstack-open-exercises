interface Part {
  name: string;
  exercises: number;
  id: number;
}

interface Course {
  id: number;
  name: string;
  parts: Part[];
}

interface CourseProps {
  course: Course;
}

interface HeaderProps {
  course: Course;
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
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

const Course = ({ course }: CourseProps) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      {/* Included the total too */}
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ course }: HeaderProps) => {
  return <h1>{course.name}</h1>;
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
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

//Included the Total Too
//Included reduce method too
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
