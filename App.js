import React, { useState } from 'react';
import quizData from './quizData';
import './App.css';

function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowFeedback(false);
  };

  const handleNext = () => {
    if (selectedOption === '') {
      alert('Please select an option!');
      return;
    }

    if (selectedOption === quizData[currentQ].correctAnswer) {
      setScore(score + 1);
      setShowFeedback(true);
    }

    setTimeout(() => {
      setSelectedOption('');
      setShowFeedback(false);
      if (currentQ + 1 < quizData.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowScore(true);
      }
    }, 500); // Delay to show feedback
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption('');
    setShowFeedback(false);
  };

  return (
    <div className="app">
      <h1>ECE Quiz</h1>

      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score}/{quizData.length}</h2>
          <button onClick={handleRestart}>Retake Quiz</button>
        </div>
      ) : (
        <div className="quiz-section">
          <div className="question-count">
            <span>Question {currentQ + 1}</span>/{quizData.length}
          </div>

          <div className="question-text">
            {quizData[currentQ].questionText}
          </div>

          <div className="options-section">
            {quizData[currentQ].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="feedback">
              {selectedOption === quizData[currentQ].correctAnswer
                ? 'Correct!'
                : 'Wrong!'}
            </div>
          )}

          <button className="next-btn" onClick={handleNext}>
            {currentQ === quizData.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;