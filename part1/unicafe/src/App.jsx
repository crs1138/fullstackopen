import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="App">
      <h2>Give Feedaback</h2>
      <Button
        handleClick={() => {
          setGood(good + 1);
        }}
      >
        Good
      </Button>
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
        }}
      >
        Netural
      </Button>
      <Button
        handleClick={() => {
          setBad(bad + 1);
        }}
      >
        Bad
      </Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
