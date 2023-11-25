import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const clicked = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
    console.log(selected)
    mostVoted()
  }

  const voted = () =>{
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log(votes)
    mostVoted()
  }

  const mostVoted = () => {
    var max = votes[0];
    var maxIndex = 0;
    console.log(max)
    console.log(maxIndex)
    for (var i = 1; i < votes.length; i++) {
        if (votes[i] > max) {
            maxIndex = i;
            max = votes[i];
        }
    }
    console.log(maxIndex)
    setMostVotes(maxIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      <Button handleClick={voted} text='vote' />
      <Button handleClick={clicked} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
    </div>
  )
}


export default App
