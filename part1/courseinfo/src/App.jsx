import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
  const course = {
    title: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  const getTotalExercises = (parts) =>
    parts.reduce((acc, { exercises }) => acc + exercises, 0);

  return (
    <div>
      <Header course={course.title} />
      <Content parts={course.parts} />
      <Total totalExercises={getTotalExercises(course.parts)} />
    </div>
  );
};

export default App;
