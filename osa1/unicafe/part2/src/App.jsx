import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine =({text, value}) => (
<tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>
)
const Statistics = ( props ) => {
  console.log(props)
  if(props.total === 0){
    return (
      <div>No feedback given</div>
    )
  }
  else {
    return (
    <div>
      <table>
        <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="total" value ={props.total} />
        <StatisticLine text="average" value ={props.average} />
        <StatisticLine text="positive" value ={`${props.positive} %`} /> 
        </tbody>    
      </table>
    </div>
  )
  }
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    updateTotal()
    setAverage((good + 1 - bad)/(total + 1))
    setPositive(100*((good + 1)/(total+1)))
  }

  const handleBad = () => {
    setBad(bad + 1)
    updateTotal()
    setAverage((good - bad - 1)/(total + 1))
    setPositive(100*((good)/(total + 1)))
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    updateTotal()
    setAverage((good - bad)/(total + 1))
    setPositive(100*(good/(total + 1)))
  }

  const updateTotal = () => {
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />

    </div>
  )
}

export default App