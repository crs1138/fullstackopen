import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((partData, index) => (
        <Part name={partData.name} exercises={partData.exercises} key={index} />
      ))}
    </div>
  );
};
export default Content;
