const express = require('express');
const repo = require("./repository");
const cors = require('cors');

const app = express()
app.use(cors())
const appChoiceRepository = new repo.AppChoiceRepository()
app.get("/get-choice", (req, res) => {
    appChoiceRepository.getRandomChoice().then((data) => {res.send(data)})
})

app.listen(8080)