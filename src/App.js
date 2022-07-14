import { useState } from "react";
import "./App.css";
import questions from "./components/helpers/questions";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleCorrectAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setClicked(true);
  };
  const handleNextButtonClick = () => {
    setClicked(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      alert("you reached the end of the quiz");
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <p>
            You scored {score} out of {questions.length}
          </p>
          <button onClick={refreshPage} className="action-button">
            Play again
          </button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span style={{ paddingRight: "15%" }}>
                Question {currentQuestion + 1} of {questions.length}{" "}
              </span>
              <span>Fill in the blank with the correct translation</span>
            </div>
            <div className="question-text">
              <p>{questions[currentQuestion].questionEnglishText}</p>
              <p>{questions[currentQuestion].questionGermanText}</p>
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button
                disabled={clicked}
                className={`answer-button ${
                  clicked && answerOption.isCorrect && "correct"
                }`}
                onClick={() => handleCorrectAnswer(answerOption.isCorrect)}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
          <button
            disabled={!clicked}
            className={`action-button ${clicked && "green-border"}`}
            onClick={handleNextButtonClick}
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
}

export default App;
