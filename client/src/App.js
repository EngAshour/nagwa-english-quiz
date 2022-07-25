import React, { useEffect, useState } from "react";

function App() {
    const [backendWord, setBackendWord] = useState([
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ]);
    const [backendRank, setBackendRank] = useState([{}]);
    const [showFinalResults, setFinalResults] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    useEffect(() => {
        fetch(`/words`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => setBackendWord(actualData))
            .catch((err) => {
                console.log(err.message);
            });
        fetch(`/rank`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => setBackendRank(actualData))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // Helper Functions:
    const ansClicked = (pos, value) => {
        if (backendWord[currentQuestion].pos === value) {
            setScore(score + 1);
        }
        if (currentQuestion + 1 < 10) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setFinalResults(true);
        }
        console.log(score);
    };

    const restartQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
        setFinalResults(false);
    };

    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }
}

export default App;
