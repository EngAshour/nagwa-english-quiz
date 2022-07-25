const express = require("express");
const app = express();
const data = require("./TestData.json");

app.get("/words", (req, res) => {
    res.json(data.wordList);
});

app.get("/rank", (req, res) => {
    res.json(data.scoresList);
});

app.listen(5000, () => {
    console.log("Server started on Port 5000");
});
