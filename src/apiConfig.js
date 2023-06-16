import React from 'react';

const API_URL = 'https://opentdb.com/api.php'

const fetchTriviaQuestions = async (amount = 10) => {
    try {
        const response = await fetch(`${API_URL}?amount=${amount}&type=multiple`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
        throw error;
    }
}
export default fetchTriviaQuestions;