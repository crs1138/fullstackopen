import { useState } from "react";

const Button = ({ children, handleClick }) => (
  <button type="button" onClick={handleClick}>
    {children}
  </button>
);

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    console.log(`Value now ${newValue}`);
    setValue(newValue);
  };

  return (
    <div>
      <p>{value}</p>
      <Button handleClick={setToValue(1000)}>thousand</Button>
      <Button handleClick={setToValue(0)}>reset</Button>
      <Button handleClick={setToValue(value + 1)}>increment</Button>
    </div>
  );
};

export default App;
