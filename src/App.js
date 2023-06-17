import './App.css';
import React, { useEffect, useState } from 'react';
import  fetchTriviaQuestions  from './apiConfig';
import quizImage from './quiz.png';

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

    const renderOptions = (question) => {
        const options = [...question.incorrect_answers, question.correct_answer];
        const shuffledOptions = shuffleArray(options); // Shuffle the options randomly
        return shuffledOptions.map((option, index) => <li key={index}>{option}</li>);
    };
    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

  return (
    <div className="App">
        <img src={quizImage}/>
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
                    {questions.map((question, index) => (
                        <li key={index}>
                            {question.question}
                            <ul>{renderOptions(question)}</ul>
                        </li>
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
