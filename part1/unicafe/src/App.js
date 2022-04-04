import {useState} from "react";

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, count, unit}) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{count}{unit}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let unit = "";

  return (
    <table>
      <tbody>
        <StatisticLine text="good" count={good} />
        <StatisticLine text="good" count={good} />
        <StatisticLine text="neutral" count={neutral} unit={unit}/>
        <StatisticLine text="bad" count={bad} unit={unit} />
        <StatisticLine text="all" count={good + neutral + bad} unit={unit} />
        <StatisticLine text="average" count={((good + neutral + bad) / 3).toFixed(2)} unit={unit} />
        <StatisticLine text="positive" count={((good / (good + neutral + bad)) * 100).toFixed(2)} unit="%" />
      </tbody>
    </table>

  )
}

export default function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
  
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h2>statistics</h2>
      {!!(good || neutral || bad) && 
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
        />
      }

      {!(good || neutral || bad) && <p>No data yet</p>}

    </div>
  )
}
