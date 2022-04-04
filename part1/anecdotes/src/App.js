import { useState } from "react";
import "./App.css";


export default function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [index, setIndex] = useState(null);

  const generateRandomNum = () => Math.trunc(Math.random() * anecdotes.length);

  const findIndexOfHighestValue = (array) => {
    const highestValue = Math.max(...array);
    return array.indexOf(highestValue);
  }

  
  const handleClickNext = () => {
    const randomNum = generateRandomNum();
    setSelected(randomNum);
  }
  
  const handleClickVote = () => {
    let newVotes = [...votes];
    newVotes[selected]++;
    setIndex(findIndexOfHighestValue(newVotes));
    setVotes(newVotes);
  }

  console.log(votes, "VOTES")
  console.log(index);
  


  return (
    <div>
      <div style={{minHeight: "50px"}}>
        {anecdotes[selected]}
      </div>
      <p>has {votes[selected]} votes</p>

    <button onClick={handleClickVote}>Vote {"\u263A"}</button>
    <button onClick={handleClickNext}>Next {"\u2192"}</button>

    <hr />

    {!!index &&
    <div>
    <h2>Anecdote with most votes:</h2>
      {anecdotes[index]}
      <p>has {votes[index]} votes</p>
    </div>
    }
    </div>

  );
}
