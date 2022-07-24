import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad }) => {
  const allFeedback = good + neutral + bad;
  const average = (good - bad) / allFeedback;
  const positive = (good / allFeedback) * 100;
  return (
    <section>
      {allFeedback > 0 ? (
        <>
          <h2>Statistics</h2>
          <table>
            <tbody>
              <StatisticsLine text="Good" value={good} />
              <StatisticsLine text="Neutral" value={neutral} />
              <StatisticsLine text="Bad" value={bad} />
              <StatisticsLine text="All" value={allFeedback} />
              <StatisticsLine text="Average" value={average} />
              <StatisticsLine text="Positive" value={`${positive}%`} />
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2>Statistics</h2>
          <p>No feedback given.</p>
        </>
      )}
    </section>
  );
};
export default Statistics;
