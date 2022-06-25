const express = require('express');
const cors = require('cors');

import AppChoiceRepository from "./repository";

const app = express()
app.use(cors())
const appChoiceRepository = new AppChoiceRepository()
app.get("/get-choice", (req, res) => {
    appChoiceRepository.getRandomChoice().then((data) => {
        res.send(data)
    })
})

app.listen(8080)