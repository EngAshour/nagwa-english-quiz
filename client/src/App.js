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
}

export default App;
