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
    };

    const restartQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
        setFinalResults(false);
    };
    // shuffle the array to generate random word
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
    shuffle(backendWord);
    //the tracking rank helper function
    const ranking = [];
    function calculateSourceRank(scoreSeries, scoreNew) {
        for (let i = 0; i < scoreSeries.length; i++) {
            if (scoreSeries[i] <= scoreNew * 10) {
                ranking.push(scoreSeries[i]);
            }
        }
    }
    calculateSourceRank(backendRank, score);
    console.log(Math.round((ranking.length / 30) * 100 * 100) / 100);

    const progressStyle = {
        width: `${(currentQuestion + 1) * 10}%`,
    };
    // --------------------------------------------

    return (
        <div className="App">
            {/* 1- Header */}
            <h1>English Quiz</h1>
            {/* 2- progress */}
            <h2 className="score-mid-quiz">{score} out of 10 correct !</h2>
            <div className="progress-bar-holder">
                <div className="progress-bar" style={progressStyle}></div>
            </div>
            {showFinalResults ? (
                /* 4- Final Results */
                <div className="final-result">
                    <h1>Final Results</h1>
                    {console.log(backendRank)}
                    <h2>
                        Rank :{" "}
                        {Math.round((ranking.length / 30) * 100 * 100) / 100}
                    </h2>
                    <button onClick={() => restartQuiz()}>Restart Quiz</button>
                </div>
            ) : (
                /* 3- Quiz card */
                <div className="q-card">
                    <h3>
                        Question {currentQuestion + 1} out of {10}
                    </h3>
                    <h3 className="q-text">
                        Which part of speech is "
                        <span>{backendWord[currentQuestion].word}</span>"
                    </h3>
                    <ul>
                        <li
                            onClick={() =>
                                ansClicked(
                                    backendWord[currentQuestion].pos,
                                    "noun"
                                )
                            }
                        >
                            noun
                        </li>
                        <li
                            onClick={() =>
                                ansClicked(
                                    backendWord[currentQuestion].pos,
                                    "verb"
                                )
                            }
                        >
                            verb
                        </li>
                        <li
                            onClick={() =>
                                ansClicked(
                                    backendWord[currentQuestion].pos,
                                    "adjective"
                                )
                            }
                        >
                            adjective
                        </li>
                        <li
                            onClick={() =>
                                ansClicked(
                                    backendWord[currentQuestion].pos,
                                    "adverb"
                                )
                            }
                        >
                            adverb
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
