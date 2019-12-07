const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const passwordHandler = require('./handlers/passwordHandler');
const wordHandler = require('./handlers/wordHandler');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const accountSid = 'AC95bfe27a0ac8428f8eb4332059043810';
const authToken = process.env.TWILAUTH;
const client = require('twilio')(accountSid, authToken);

const VoiceResponse = require('twilio').twiml.VoiceResponse;

mongoose.connect('mongodb+srv://public:KZq4PKjfQDE1nKEc@password123-ehxc4.gcp.mongodb.net/test?retryWrites=true&w=majority')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/libs/p5/p5.min.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/libs/p5/p5.min.js'));
});

app.get('/subpublic/sha256.min.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/subpublic/sha256.min.js'));
});

app.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/main.js'));
});

app.get('/subpublic/pwdGenerator.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/subpublic/pwdGenerator.js'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/style.css'));
});

app.get('/api/makecall', (req, res) => {

    let password = req.query.password;

    client.calls
        .create({
            url: 'https://password123cs326.herokuapp.com/api/voice.xml?password=' + password,
            to: '+19193604710',
            from: '+14133073766'
        })
        .then(call => console.log(call.sid));

    res.sendStatus(200);
});

app.post('/api/voice.xml', (req, res) => {

    let password = req.query.password;

    let readableString = "";

    password.split("").forEach(char => {
    
        '!@#$%^*'
    
        if(char == char.toUpperCase() && !'23456789!@#$%^*'.includes(char)) {
          readableString += 'capital ' + char + ' ';
        } else if (char == ' ') {
          readableString += 'space ';
        } else if(char == '!') {
          readableString += 'exclamation point ';
        } else if(char == '@') {
          readableString += 'at ';
        } else if(char == '#') {
          readableString += 'pound ';
        } else if(char == '%') {
          readableString += 'percent ';
        } else if(char == '^') {
          readableString += 'carrot ';
        } else if(char == '*') {
          readableString += 'star ';
        } else {
          readableString += char + ' ';
        }
      });

    const twiml = new VoiceResponse();
    twiml.say('Hello this is Password123! We are calling to read your password to you. Your password is ' + readableString);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

app.post('/api/addPassword', passwordHandler.addPassword);
app.get('/api/checkMatchingPassword', passwordHandler.checkMatchingPassword);
app.get('/api/getRandomWords', wordHandler.getRandomWords);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
