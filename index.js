const express = require('express');
const mongoose = require('mongoose');
const passwordHandler = require('../backend-server/handlers/passwordHandler');
const app = express();
const path = require('path');
const port = 3000;

mongoose.connect('mongodb://localhost/password123')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.post('/api/addPassword', passwordHandler.addPassword);
app.get('/api/checkMatchingPassword', passwordHandler.checkMatchingPassword);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});