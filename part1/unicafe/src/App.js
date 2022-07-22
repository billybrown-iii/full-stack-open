import { useState } from "react";

const Button = ({ handler, text }) => {
  return <button onClick={() => handler((prev) => prev + 1)}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{ width: "5em" }}>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;

  const calculateAverage = () => {
    if (sum === 0) return 0;
    const score = good - bad;
    return score / sum;
  };

  const percentagePositive = () => {
    if (sum === 0) return "0%";
    return (good / sum) * 100 + "%";
  };

  if (sum === 0)
    return (
      <div>
        <br />
        No feedback has yet been collected.
      </div>
    );

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Sum" value={sum} />
          <StatisticLine text="Average" value={calculateAverage()} />
          <StatisticLine text="Positive" value={percentagePositive()} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <br />
      <Button handler={setGood} text="Good" />
      <Button handler={setNeutral} text="Neutral" />
      <Button handler={setBad} text="Bad" />

      <br />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
