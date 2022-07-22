import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0));

  const refresh = () => {
    const next = Math.floor(Math.random() * 7);
    setSelected(next);
  }

  const vote = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  }

  let highestIndex = 0;

  points.reduce((prev, next, i) => {
    if (next > points[highestIndex]) highestIndex = i;
  })

  return (
    <div>
      {anecdotes[selected]}
      <div>Has {points[selected]} points</div>
      <br />
      <button onClick={vote}>Vote</button>
      
      <br />
      <br />
      <button onClick={refresh}>Refresh</button>
      <br />
      <br />
      <h3>Current winner:</h3>
      {anecdotes[highestIndex]}
      <div>Has {points[highestIndex]} points</div>
    </div>
  )
}

export default App