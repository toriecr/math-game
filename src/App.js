import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  const [score, setScore] = React.useState(0)
  const [currentProblem, setCurrentProblem] = React.useState(generateProblem())
  const [userAnswer, setUserAnswer] = React.useState('')
  const [time, setTime] = React.useState(20)
  const answerField = React.useRef(null)

  React.useEffect(() => {
    if (time > 0) {
      setTimeout(() => setTime(time - 1), 1000);
    } 
  });


  function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
  }

  function generateProblem() {
    let operation = ['+', '-', 'x'][generateNumber(2)]
    if (operation === '+' || operation === 'x') {
      return {
        num1: generateNumber(9),
        num2: generateNumber(9),
        operator: operation
      }
    } else {
      let first = generateNumber(18)
      let second = generateNumber(first)
      return {
        num1: first,
        num2: second,
        operator: operation
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    answerField.current.focus()
    let correctAnswer 
    if (currentProblem.operator == '+') correctAnswer = currentProblem.num1 + currentProblem.num2
    if (currentProblem.operator == '-') correctAnswer = currentProblem.num1 - currentProblem.num2
    if (currentProblem.operator == 'x') correctAnswer = currentProblem.num1 * currentProblem.num2

    if (correctAnswer == parseInt(userAnswer, 10)) {
      setScore(prev => prev + 1)
      setCurrentProblem(generateProblem())
      setUserAnswer('')
    }
  }

  function resetGame() {
    setScore(0)
    setUserAnswer('')
    setCurrentProblem(generateProblem())
    setTime(20)
  }

  function saveScore() {
    setScore(0)
    setUserAnswer('')
    setCurrentProblem(generateProblem())
    setTime(20)
  }

  return (
    <div>
      <div className={"main-ui" + (time == 0 ? " blurred" : "")}>
        <h1>Time remaining: {time}</h1>
        <p className="problem">{currentProblem.num1} {currentProblem.operator} {currentProblem.num2}</p>
        <form onSubmit={handleSubmit} action="" class="our-form">
          <input ref={answerField} value={userAnswer} onChange={e => setUserAnswer(e.target.value)} type="text" class="our-field" autocomplete="off" />
          <button>Submit</button>
        </form>

        <p className="status">Your current score is {score}.</p>
      </div>
      <div className={"overlay" + (time == 0 ? " overlay--visible" : "")}>
        <div className="overlay-inner">
          <p className="end-message">Your score is {score}</p>
          <button onClick={resetGame} className="reset-button">Try Again?</button>
          <button onClick={saveScore} className="reset-button">Save score</button>
        </div>
      </div>
    </div>
  )
}

export default App;