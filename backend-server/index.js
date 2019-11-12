const express = require('express');
const passwordHandler = require('../backend-server/handlers/passwordHandler');
const app = express();
const path = require('path');
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/api/addPassword', passwordHandler.addPassword);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});