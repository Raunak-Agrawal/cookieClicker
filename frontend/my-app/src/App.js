// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [userId] = useState('user123'); // Example user ID. can be changed based on login status of user.
    const [totalScore, setTotalScore] = useState(0);
    const [prizesWon, setPrizesWon] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/user/${userId}`)
            .then(response => {
                setTotalScore(response.data.totalScore);
                setPrizesWon(response.data.prizesWon);
            });
    }, [userId]);

    const handleClick = () => {
        axios.post('http://localhost:3001/click', { userId })
            .then(response => {
                setTotalScore(response.data.totalScore);
                if (response.data.prizeWon) {
                    setMessage('You won a prize!');
                    setPrizesWon(prev => prev + 1);
                } else {
                    setMessage('');
                }
            });
    };

    return (
        <div>
            <h1>Cookie Clicker</h1>
            <p>Total Score: {totalScore}</p>
            <p>Prizes Won: {prizesWon}</p>
            <button onClick={handleClick}>Click Me!</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;