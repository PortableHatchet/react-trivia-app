import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import  fetchTriviaQuestions  from './apiConfig';

function App() {
    const [questionCount, setQuestionCount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const handleInputChange = (event) => {
        const count = parseInt(event.target.value, 10);
        setQuestionCount(count);
    };
    const handleButtonClick = async () => {
        try {
            const fetchedQuestions = await fetchTriviaQuestions(questionCount);
            setQuestions(fetchedQuestions);
        } catch (error) {
            console.error('Error fetching trivia questions:', error);
        }
    };

  return (
    <div className="App">
        <h1>Game Night Trivia</h1>
        <label htmlFor="question-count">Enter the number of questions:</label>
        <input
            type="number"
            id="question-count"
            value={questionCount}
            onChange={handleInputChange}
        />
        <button type= 'button' onClick={handleButtonClick}>Fetch Trivia Questions</button>

        {questions.length > 0 ? (
            <div>
                <h2>Trivia Questions:</h2>
                <ul>
                    {questions.map((question) => (
                        <li key={question.question}>{question.question}</li>
                    ))}
                </ul>
            </div>
        ) : (
            <p>No questions available</p>
        )}
    </div>
  );
}

export default App;
