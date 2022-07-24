import { useState } from "react";

const History = ({ allClicks }) => {
  return (
    <div>
      {allClicks?.length > 0
        ? `button press history: ${allClicks.join(" ")}`
        : `the app is used by pressing the buttons`}
    </div>
  );
};

const Button = ({ text, handleClick }) => (
  <button type="button" onClick={handleClick}>
    {text}
  </button>
);

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
