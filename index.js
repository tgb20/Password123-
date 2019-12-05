const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const passwordHandler = require('./handlers/passwordHandler');
const wordHandler = require('./handlers/wordHandler');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://public:KZq4PKjfQDE1nKEc@password123-ehxc4.gcp.mongodb.net/test?retryWrites=true&w=majority')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/api/addPassword', passwordHandler.addPassword);
app.get('/api/checkMatchingPassword', passwordHandler.checkMatchingPassword);
app.get('/api/getRandomWords', wordHandler.getRandomWords);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});